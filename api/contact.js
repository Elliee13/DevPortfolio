import nodemailer from "nodemailer";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const rateLimitStore = new Map();

const REQUIRED_FIELDS = ["name", "email", "message"];

const getClientIp = (req) => {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length > 0) {
    return forwarded.split(",")[0].trim();
  }
  return req.headers["x-real-ip"] || "unknown";
};

const isValidEmail = (value) => /\S+@\S+\.\S+/.test(value);

const normalizeBody = (body) => {
  if (!body) return {};
  if (typeof body === "string") {
    try {
      return JSON.parse(body);
    } catch {
      return {};
    }
  }
  return body;
};

const rateLimit = (ip) => {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now - entry.start > RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(ip, { start: now, count: 1 });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }

  entry.count += 1;
  return true;
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const body = normalizeBody(req.body);
  const { name, email, message, website } = body;

  if (website && String(website).trim().length > 0) {
    return res.status(400).json({ ok: false, error: "Bad request" });
  }

  if (!REQUIRED_FIELDS.every((field) => body?.[field]?.trim())) {
    return res.status(400).json({ ok: false, error: "Missing fields" });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ ok: false, error: "Invalid email" });
  }

  const ip = getClientIp(req);
  if (!rateLimit(ip)) {
    return res.status(429).json({ ok: false, error: "Rate limited" });
  }

  const {
    SMTP_HOST = "smtp.gmail.com",
    SMTP_PORT = "465",
    SMTP_SECURE = "true",
    SMTP_USER,
    SMTP_PASS,
    CONTACT_TO,
  } = process.env;

  if (!SMTP_USER || !SMTP_PASS || !CONTACT_TO) {
    return res.status(500).json({ ok: false, error: "Email not configured" });
  }

  const safeName = String(name).slice(0, 200);
  const safeEmail = String(email).slice(0, 320);
  const safeMessage = String(message).slice(0, 4000);

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: SMTP_SECURE === "true",
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `Portfolio Contact <${SMTP_USER}>`,
      to: CONTACT_TO,
      replyTo: safeEmail,
      subject: `New portfolio message from ${safeName}`,
      text: `Name: ${safeName}\nEmail: ${safeEmail}\n\n${safeMessage}`,
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(500).json({ ok: false, error: "Send failed" });
  }
}
