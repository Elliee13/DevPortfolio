import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { gsap } from "gsap";

const projects = [
  {
    id: 1,
    title: "Clinic Management System",
    slug: "clinic-management-system",
    category: "Web Application",
    description:
      "Secure student health records platform with role-based access, and an admin dashboard for efficient record operations.",
    year: "2024–Present",
    role: "Full Stack Web Developer (Academic Project)",
    timeline: "Ongoing",
    highlights: [
      "Built role-based platform supporting 5000+ student health records with secure admin + student access.",
      "Implemented JWT auth + session management with encryption for strong data privacy controls.",
      "Optimized database queries and schemas, reducing page load times by ~40% and improving concurrency handling.",
    ],
    tags: ["HTML", "Tailwind CSS", "MySQL", "PHP"],
  },
  {
    id: 2,
    title: "Lourdebella",
    slug: "lourdebella-backend",
    category: "Backend System",
    description:
      "Backend infrastructure and secure authentication for a production web platform supporting day-to-day business operations.",
    year: "2025",
    role: "Backend Web Developer (Remote, Project-Based)",
    timeline: "Jul 2025 – Sep 2025",
    highlights: [
      "Engineered secure authentication with role-based permissions and REST endpoints using PHP + MySQL.",
      "Designed normalized relational schema to reduce redundancy and improve reliability of data access.",
      "Implemented logging/monitoring practices supporting stable production usage and operational visibility.",
    ],
    tags: ["HTML", "Tailwind CSS", "MySQL", "PHP"],
  },
  {
    id: 3,
    title: "Custom Shopify Builder System",
    slug: "custom-shopify-builder-system",
    category: "E-Commerce Builder",
    description:
      "Custom product builder with real-time mockup previews, artwork upload pipeline, and Shopify checkout generation plus a production admin dashboard.",
    year: "2025",
    role: "Full Stack Web Developer (Project-Based)",
    timeline: "Oct 2025 – Nov 2025",
    highlights: [
      "Built hybrid React + PHP + MySQL platform integrated with Shopify Storefront API for product customization.",
      "Delivered a production-grade admin dashboard: pagination, filtering, search, CSV export, and activity logs.",
      "Implemented secure API auth, validated file uploads, and design metadata logging for traceability.",
    ],
    tags: [
      "React",
      "Typescript",
      "PHP",
      "MySQL",
      "RESTapi",
      "Shopify Storefront API",
    ],
  },
  {
    id: 4,
    title: "Three Pines Industries Website",
    slug: "three-pines-industries",
    category: "Frontend Build",
    description:
      "Modern Vite + React SPA with performance-focused UI, smooth navigation, and deployment automation.",
    year: "2025",
    role: "Frontend Developer (Project-Based)",
    timeline: "Nov 2025 – Dec 2025",
    highlights: [
      "Built responsive SPA using Vite, TypeScript, and Tailwind CSS.",
      "Implemented smooth scroll navigation + parallax effects using custom React hooks.",
      "Optimized UI performance to achieve 95+ Lighthouse scores across mobile and desktop.",
    ],
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite"],
  },
  {
    id: 5,
    title: "WebDaVinci Client Work",
    slug: "webdavinci-client-work",
    category: "UI/UX + Backend",
    description:
      "Designed responsive interfaces and delivered backend services supporting dashboards and real-time visualization features for multiple client projects.",
    year: "2024–2025",
    role: "UI/UX Designer & Backend Developer",
    timeline: "Oct 2024 – Feb 2025",
    highlights: [
      "Designed user-centered interfaces and dashboards for multiple client projects using Figma + Tailwind.",
      "Developed backend services (PHP + MySQL) supporting real-time data visualization.",
      "Improved usability through iterative design changes that reduced task completion time.",
    ],
    tags: ["Figma", "UI/UX", "HTML", "Tailwind CSS", "PHP", "MySQL", "FileZilla"],
  },
  {
    id: 6,
    title: "UI/UX & Graphic Design Systems",
    slug: "uiux-graphic-design-systems",
    category: "UI/UX & Graphic Design",
    description:
      "Designing complete UI/UX systems, brand identities, and high-fidelity prototypes for academic research, logistics applications, and institutional departments.",
    year: "2024–Present",
    role: "UI/UX & Graphic Designer",
    timeline: "Ongoing",
    highlights: [
      "Designed end-to-end UI/UX systems for logistics and delivery applications supporting academic research projects.",
      "Created brand identities, logos, and marketing materials for institutional departments including Juris Doctor and Education at St. Mary's College of Tagum, Inc.",
      "Produced 10+ high-fidelity Figma prototypes for client and student projects, achieving a 95% client satisfaction rate.",
    ],
    tags: [
      "UI/UX Design",
      "Graphic Design",
      "Figma",
      "Brand Identity",
      "Prototyping",
      "Design Systems",
    ],
  },
];

const CaseStudy = () => {
  const { slug } = useParams();
  const pageRef = useRef(null);

  const project = useMemo(() => projects.find((p) => p.slug === slug), [slug]);

  const nav = useMemo(() => {
    const idx = projects.findIndex((p) => p.slug === slug);
    const prev = idx > 0 ? projects[idx - 1] : null;
    const next = idx >= 0 && idx < projects.length - 1 ? projects[idx + 1] : null;
    return { prev, next };
  }, [slug]);

  // Always start at top on route change (prevents landing mid-page)
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (!pageRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        pageRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.85, ease: "expo.out" }
      );
    }, pageRef);
    return () => ctx.revert();
  }, [slug]);

  if (!project) {
    return (
      <section className="min-h-screen px-6 md:px-12 lg:px-24 xl:px-17 py-24 bg-soft-white text-almost-black">
        <div className="max-w-[1100px]">
          <p className="font-body text-lg text-charcoal">Project not found.</p>
          <Link
            to="/#work"
            className="inline-flex items-center gap-2 mt-6 font-body text-base text-almost-black border border-light-gray px-4 py-2 hover:border-almost-black transition-colors"
          >
            ← Back to Selected Works
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={pageRef}
      className="min-h-screen bg-soft-white text-almost-black px-6 md:px-12 lg:px-24 xl:px-17 py-10 md:py-12"
    >
      {/* Sticky controls: always visible and easy to find */}
      <div className="sticky top-0 z-40 -mx-6 md:-mx-12 lg:-mx-24 xl:-mx-17 px-6 md:px-12 lg:px-24 xl:px-17 pt-5 pb-4 bg-soft-white/90 backdrop-blur border-b border-light-gray">
        <div className="max-w-[1400px] w-full flex items-center justify-between gap-4">
          <Link
            to="/#work"
            className="inline-flex items-center gap-2 font-body text-sm md:text-base text-almost-black border border-light-gray px-4 py-2 hover:border-almost-black transition-colors"
          >
            ← Back to Works
          </Link>

          <div className="flex items-center gap-2">
            {nav.prev ? (
              <Link
                to={`/work/${nav.prev.slug}`}
                className="font-body text-sm md:text-base text-almost-black border border-light-gray px-4 py-2 hover:border-almost-black transition-colors"
              >
                ← Prev
              </Link>
            ) : null}

            {nav.next ? (
              <Link
                to={`/work/${nav.next.slug}`}
                className="font-body text-sm md:text-base text-almost-black border border-light-gray px-4 py-2 hover:border-almost-black transition-colors"
              >
                Next →
              </Link>
            ) : null}
          </div>
        </div>
      </div>

      {/* Single-screen canvas */}
      <div className="max-w-[1400px] w-full pt-6 md:pt-8">
        <div className="border border-light-gray bg-soft-white p-7 md:p-9">
          {/* Top chips */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="font-accent text-[10px] uppercase tracking-[0.2em] text-charcoal/60">
              {project.category}
            </span>
            <span className="w-1 h-1 rounded-full bg-charcoal/30" />
            <span className="font-accent text-[10px] uppercase tracking-[0.2em] text-charcoal/60">
              {project.year}
            </span>
          </div>

          {/* Title + description */}
          <div className="grid lg:grid-cols-12 gap-7 lg:gap-10 items-start">
            <div className="lg:col-span-7">
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-[-0.04em]">
                {project.title}
              </h1>
              <p className="mt-4 font-body text-base md:text-lg text-charcoal leading-[1.7] font-light max-w-3xl">
                {project.description}
              </p>

              {/* Tags */}
              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="font-accent text-xs px-3 py-1.5 border border-light-gray text-charcoal/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Compact meta */}
            <div className="lg:col-span-5">
              <div className="border border-light-gray p-6">
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <span className="font-accent text-[10px] text-charcoal/50 uppercase tracking-[0.2em] block mb-2">
                      Role
                    </span>
                    <p className="font-body text-sm md:text-base text-charcoal">
                      {project.role}
                    </p>
                  </div>
                  <div>
                    <span className="font-accent text-[10px] text-charcoal/50 uppercase tracking-[0.2em] block mb-2">
                      Timeline
                    </span>
                    <p className="font-body text-sm md:text-base text-charcoal">
                      {project.timeline}
                    </p>
                  </div>

                  <div className="col-span-2">
                    <span className="font-accent text-[10px] text-charcoal/50 uppercase tracking-[0.2em] block mb-2">
                      Deliverables
                    </span>
                    <p className="font-body text-sm md:text-base text-charcoal">
                      UI/UX • Build • Systems
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-5 border-t border-light-gray">
                  <span className="font-accent text-[10px] text-charcoal/50 uppercase tracking-[0.2em] block mb-2">
                    Key Outcome
                  </span>
                  <p className="font-body text-sm md:text-base text-charcoal leading-[1.7] font-light">
                    {project.highlights?.[0]}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Key outcomes (3-up), sized to fit one screen */}
          <div className="mt-7 grid md:grid-cols-3 gap-5">
            {project.highlights.slice(0, 3).map((h, i) => (
              <div key={i} className="border border-light-gray p-6">
                <span className="font-accent text-[10px] uppercase tracking-[0.2em] text-charcoal/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-4 font-body text-sm md:text-base text-charcoal leading-[1.65] font-light">
                  {h}
                </p>
              </div>
            ))}
          </div>

          {/* Optional tiny footer hint (non-scrolling) */}
          <div className="mt-6 pt-5 border-t border-light-gray flex items-center justify-between gap-4">
            <p className="font-body text-sm text-charcoal/70">
              Want deeper process + visuals? Add a “Read more” section later.
            </p>
            <div className="flex items-center gap-2">
              {nav.prev ? (
                <Link
                  to={`/work/${nav.prev.slug}`}
                  className="font-body text-sm text-almost-black border border-light-gray px-3 py-2 hover:border-almost-black transition-colors"
                >
                  ← Prev
                </Link>
              ) : null}
              {nav.next ? (
                <Link
                  to={`/work/${nav.next.slug}`}
                  className="font-body text-sm text-almost-black border border-light-gray px-3 py-2 hover:border-almost-black transition-colors"
                >
                  Next →
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudy;
