import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const roles = [
  {
    title: "Full-Stack Developer",
    description:
      "Building scalable web applications with modern technologies. From frontend inte10aces to backend architectures, I craft robust digital solutions.",
    logos: [
      { src: "/logos/react.svg", alt: "React", tilt: 6, x: 2 },
      { src: "/logos/tailwind.svg", alt: "Tailwind CSS", tilt: -6, x: 12 },
      { src: "/logos/ts.svg", alt: "TypeScript", tilt: 10, x: 10 },
    ],
  },
  {
    title: "UI/UX Designer",
    description:
      "Designing intuitive user experiences that blend aesthetics with functionality. Every pixel serves a purpose, every interaction tells a story.",
    logos: [
      { src: "/logos/wireframe.svg", alt: "Wireframe", tilt: -8, x: 2 },
      { src: "/logos/figma.svg", alt: "Figma", tilt: 3, x: 2 },
      { src: "/logos/pen.svg", alt: "Design Tool", tilt: -8, x: 10 },
    ],
  },
  {
    title: "Graphic Artist",
    description:
      "Creating visual narratives through typography, color, and composition. Where code meets canvas, digital art comes to life.",
    logos: [
      { src: "/logos/canva.svg", alt: "Canva", tilt: -10, x: -6 },
      { src: "/logos/ps.svg", alt: "Photoshop", tilt: 6, x: 10 },
      { src: "/logos/ai.svg", alt: "Illustrator", tilt: -6, x: 22 },
    ],
  },
];

const About = () => {
  const aboutRef = useRef(null);
  const sectionRef = useRef(null);
  const chipRacksRef = useRef([]); // array of rack DOM nodes

  const [activeRole, setActiveRole] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      const roleElements = sectionRef.current?.querySelectorAll(".role-item");
      if (roleElements?.length) {
        gsap.fromTo(
          roleElements,
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "expo.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Ensure racks start hidden (no layout shift)
      chipRacksRef.current.forEach((rack) => {
        if (!rack) return;
        gsap.set(rack, { y: 28, opacity: 0 });
      });
    }, aboutRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const activeContent = document.querySelector(".role-content.active");
      if (activeContent) {
        gsap.fromTo(
          activeContent,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "expo.out" }
        );
      }
    }, aboutRef);

    return () => ctx.revert();
  }, [activeRole]);

  // Hover: tray slides up + logos stagger in
  const handleEnter = (index) => {
    const rack = chipRacksRef.current[index];
    if (!rack) return;

    const logos = rack.querySelectorAll(".role-logo");

    gsap.killTweensOf([rack, logos]);

    gsap.to(rack, {
      y: 0,
      opacity: 1,
      duration: 0.35,
      ease: "power3.out",
      overwrite: "auto",
    });

    gsap.fromTo(
      logos,
      { y: 16, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.35,
        ease: "power3.out",
        stagger: 0.05,
        delay: 0.02,
        overwrite: "auto",
      }
    );
  };

  // Leave: tray slides down + fades out
  const handleLeave = (index) => {
    const rack = chipRacksRef.current[index];
    if (!rack) return;

    const logos = rack.querySelectorAll(".role-logo");

    gsap.killTweensOf([rack, logos]);

    gsap.to(logos, {
      y: 12,
      opacity: 0,
      duration: 0.2,
      ease: "power2.in",
      stagger: 0.03,
      overwrite: "auto",
    });

    gsap.to(rack, {
      y: 28,
      opacity: 0,
      duration: 0.28,
      ease: "power3.inOut",
      overwrite: "auto",
      delay: 0.02,
    });
  };

  return (
    <section
      ref={aboutRef}
      className="min-h-screen flex items-center px-6 md:px-12 lg:px-24 xl:px-17 py-20"
    >
      <div ref={sectionRef} className="max-w-[1400px] w-full">
        <div className="mb-6 md:mb-8">
          <span className="font-accent text-[10px] text-charcoal/50 uppercase tracking-[0.2em]">
            © About
          </span>
          <span className="font-accent text-[10px] text-charcoal/30 ml-4">
            (01)
          </span>
        </div>

        <h2 className="font-display text-6xl md:text-7xl lg:text-8xl xl:text-9xl mb-24 md:mb-32">
          About
        </h2>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-20">
          {roles.map((role, index) => (
            <div
              key={index}
              className="relative"
              onMouseEnter={() => handleEnter(index)}
              onMouseLeave={() => handleLeave(index)}
            >
              {/* Hover Tray (logos appear from below, no layout shift) */}
              <div
                ref={(el) => (chipRacksRef.current[index] = el)}
                className="
                  absolute left-[35%]
                  -translate-x-1/2
                  -top-15
                  pointer-events-none
                  flex items-end gap-1/2
                  overflow-visible
                "
                aria-hidden
              >
                {role.logos.map((logo, i) => (
                  <img
                    key={i}
                    src={logo.src}
                    alt={logo.alt}
                    className="
                      role-logo
                      h-16 md:h-18 lg:h-22
                      object-contain
                      select-none
                      drop-shadow-[0_6px_18px_rgba(0,0,0,0.08)]
                    "
                    style={{
                      transform: `translateX(${logo.x}px) rotate(${logo.tilt}deg)`,
                      filter: "saturate(0.92) contrast(0.96)",
                    }}
                    draggable={false}
                  />
                ))}
              </div>

              <button
                onClick={() => setActiveRole(index)}
                className={`role-item text-left p-8 md:p-10 border border-light-gray transition-all duration-500 w-full bg-soft-white ${
                  activeRole === index
                    ? "border-almost-black"
                    : "hover:border-charcoal/40"
                }`}
              >
                <h3 className="font-display text-2xl md:text-2xl lg:text-3xl font-medium">
                  {role.title}
                </h3>
              </button>
            </div>
          ))}
        </div>

        <div className="min-h-[280px] md:min-h-[320px]">
          <div
            className={`role-content ${activeRole === 0 ? "active" : "hidden"}`}
          >
            <p className="font-body text-xl md:text-2xl lg:text-3xl text-charcoal leading-[1.7] max-w-4xl font-light">
              {roles[0].description}
            </p>
          </div>

          <div
            className={`role-content ${activeRole === 1 ? "active" : "hidden"}`}
          >
            <p className="font-body text-xl md:text-2xl lg:text-3xl text-charcoal leading-[1.7] max-w-4xl font-light">
              {roles[1].description}
            </p>
          </div>

          <div
            className={`role-content ${activeRole === 2 ? "active" : "hidden"}`}
          >
            <p className="font-body text-xl md:text-2xl lg:text-3xl text-charcoal leading-[1.7] max-w-4xl font-light">
              {roles[2].description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
