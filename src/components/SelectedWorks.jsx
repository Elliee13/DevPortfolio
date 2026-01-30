import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* -----------------------------
   PROJECT DATA (unchanged)
----------------------------- */
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
      "Built role-based platform supporting 500+ student health records with secure admin + student access.",
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
      "Delivered a production-grade admin dashboard with pagination, filtering, search, CSV export, and activity logs.",
      "Implemented secure API auth, validated file uploads, and design metadata logging for traceability.",
    ],
    tags: ["React", "TypeScript", "PHP", "MySQL", "Shopify API"],
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
      "Implemented smooth scroll navigation and parallax effects.",
      "Achieved 95+ Lighthouse scores across mobile and desktop.",
    ],
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite"],
  },
  {
    id: 5,
    title: "WebDaVinci Client Work",
    slug: "webdavinci-client-work",
    category: "UI/UX + Backend",
    description:
      "Designed responsive interfaces and delivered backend services supporting dashboards and real-time visualization features.",
    year: "2024–2025",
    role: "UI/UX Designer & Backend Developer",
    timeline: "Oct 2024 – Feb 2025",
    highlights: [
      "Designed dashboards and UI systems using Figma + Tailwind.",
      "Developed backend services supporting real-time data visualization.",
      "Improved usability through iterative design changes.",
    ],
    tags: ["Figma", "UI/UX", "PHP", "MySQL"],
  },
  {
    id: 6,
    title: "UI/UX & Graphic Design Systems",
    slug: "uiux-graphic-design-systems",
    category: "UI/UX & Graphic Design",
    description:
      "Designing UI/UX systems, brand identities, and high-fidelity prototypes for academic and institutional projects.",
    year: "2024–Present",
    role: "UI/UX & Graphic Designer",
    timeline: "Ongoing",
    highlights: [
      "Designed end-to-end UI/UX systems for logistics and delivery research projects.",
      "Created brand identities and marketing assets for academic departments.",
      "Produced 10+ Figma prototypes with a 95% client satisfaction rate.",
    ],
    tags: ["UI/UX", "Graphic Design", "Figma", "Branding"],
  },
];

/* -----------------------------
   CURATED FILTERS
----------------------------- */
const FILTERS = ["All", "Web Applications", "UI/UX & Graphic Design"];

const getGroup = (project) => {
  const c = project.category.toLowerCase();
  if (c.includes("ui/ux") || c.includes("graphic")) {
    return "UI/UX & Graphic Design";
  }
  return "Web Applications";
};

/* -----------------------------
   COMPONENT
----------------------------- */
const SelectedWorks = () => {
  const worksRef = useRef(null);
  const sectionRef = useRef(null);
  const previewRef = useRef(null);
  const listRef = useRef(null);

  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((p) => getGroup(p) === activeFilter);
  }, [activeFilter]);

  /* Entrance animation */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }, worksRef);
    return () => ctx.revert();
  }, []);

  /* Re-animate rows on filter change */
  useEffect(() => {
    if (!listRef.current) return;
    gsap.fromTo(
      listRef.current.children,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.45, stagger: 0.04, ease: "power3.out" }
    );
  }, [activeFilter]);

  /* Preview animation */
  useEffect(() => {
    if (!selectedProject || !previewRef.current) return;
    gsap.fromTo(
      previewRef.current,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.6, ease: "expo.out" }
    );
  }, [selectedProject]);

  return (
    <section
      ref={worksRef}
      className="min-h-screen px-6 md:px-12 lg:px-24 xl:px-17 py-20"
    >
      <div ref={sectionRef} className="max-w-[1400px] w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12">
          <h2 className="font-display text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
            Selected Works
          </h2>

          {/* Filters */}
          <div className="flex gap-2">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 border font-accent text-[10px] uppercase tracking-[0.18em] transition-colors ${
                  activeFilter === filter
                    ? "bg-almost-black text-soft-white border-almost-black"
                    : "border-light-gray text-charcoal hover:border-almost-black"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Row list */}
        <div ref={listRef} className="border border-light-gray">
          {filteredProjects.map((project, i) => (
            <div
              key={project.id}
              className={`grid grid-cols-12 gap-6 px-6 md:px-8 py-6 items-center hover:bg-almost-black/[0.03] ${
                i !== 0 ? "border-t border-light-gray" : ""
              }`}
            >
              <div className="col-span-12 md:col-span-6">
                <div className="font-display text-2xl md:text-3xl">
                  {project.title}
                </div>
                <p className="mt-2 font-body text-sm md:text-base text-charcoal/80 max-w-xl">
                  {project.description}
                </p>
              </div>

              <div className="col-span-12 md:col-span-2">
                <span className="font-accent text-[10px] uppercase tracking-[0.18em] text-charcoal/60">
                  {getGroup(project)}
                </span>
                <div className="mt-1 font-accent text-[10px] uppercase tracking-[0.18em] text-charcoal/60">
                  {project.year}
                </div>
              </div>

              <div className="col-span-12 md:col-span-3 flex flex-wrap gap-2">
                {project.tags.slice(0, 3).map((tag, i) => (
                  <span
                    key={i}
                    className="font-accent text-[10px] px-2.5 py-1 border border-light-gray uppercase tracking-[0.12em]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="col-span-12 md:col-span-1 flex gap-3 justify-end">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="text-xs border border-light-gray px-3 py-2 hover:border-almost-black"
                >
                  Preview
                </button>
                <Link
                  to={`/work/${project.slug}`}
                  className="text-xs bg-almost-black text-soft-white px-3 py-2"
                >
                  Case →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Preview */}
        {selectedProject && (
          <div
            ref={previewRef}
            className="mt-12 border border-light-gray p-8"
          >
            <h3 className="font-display text-3xl mb-3">
              {selectedProject.title}
            </h3>
            <p className="font-body text-charcoal mb-6">
              {selectedProject.description}
            </p>
            <Link
              to={`/work/${selectedProject.slug}`}
              className="inline-block bg-almost-black text-soft-white px-5 py-3"
            >
              Read Full Case Study →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default SelectedWorks;
