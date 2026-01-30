import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Hero = () => {
  const heroRef = useRef(null);
  const rolesRef = useRef(null);

  // Wrappers (used for entrance + hover transforms)
  const designRef = useRef(null);
  const developRef = useRef(null);
  const deliverRef = useRef(null);

  // Overlay masks (cursor reveal)
  const designMaskRef = useRef(null);
  const developMaskRef = useRef(null);
  const deliverMaskRef = useRef(null);

  const scrollIndicatorRef = useRef(null);

  useEffect(() => {
    const cleanups = [];

    const ctx = gsap.context(() => {
      /* ------------------------------
         Roles entrance
      ------------------------------ */
      if (rolesRef.current) {
        gsap.fromTo(
          rolesRef.current,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.1,
          }
        );
      }

      /* ------------------------------
         Headline entrance
      ------------------------------ */
      const headlineWrappers = [
        designRef.current,
        developRef.current,
        deliverRef.current,
      ].filter(Boolean);

      if (headlineWrappers.length) {
        gsap.fromTo(
          headlineWrappers,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.15,
            ease: "power4.out",
            stagger: 0.12,
            delay: 0.15,
          }
        );
      }

      /* ------------------------------
         Scroll indicator motion
      ------------------------------ */
      if (scrollIndicatorRef.current) {
        gsap.to(scrollIndicatorRef.current, {
          y: 8,
          duration: 1.8,
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true,
        });
      }

      /* ------------------------------
         Cursor Reveal Mask (overlay)
      ------------------------------ */
      const pairs = [
        { wrap: designRef.current, mask: designMaskRef.current },
        { wrap: developRef.current, mask: developMaskRef.current },
        { wrap: deliverRef.current, mask: deliverMaskRef.current },
      ].filter((p) => p.wrap && p.mask);

      pairs.forEach(({ wrap, mask }) => {
        gsap.set(mask, {
          clipPath: "inset(0 100% 0 0)",
          willChange: "clip-path",
        });

        const onMove = (e) => {
          const rect = wrap.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width;
          const clamped = Math.max(0, Math.min(1, x));
          const rightInset = (1 - clamped) * 100;

          gsap.to(mask, {
            clipPath: `inset(0 ${rightInset}% 0 0)`,
            duration: 0.12,
            ease: "power2.out",
            overwrite: "auto",
          });
        };

        const onEnter = () => {
          gsap.to(mask, {
            clipPath: "inset(0 65% 0 0)",
            duration: 0.18,
            ease: "power2.out",
            overwrite: "auto",
          });
        };

        const onLeave = () => {
          gsap.to(mask, {
            clipPath: "inset(0 100% 0 0)",
            duration: 0.35,
            ease: "power3.inOut",
            overwrite: "auto",
          });
        };

        wrap.addEventListener("mousemove", onMove);
        wrap.addEventListener("mouseenter", onEnter);
        wrap.addEventListener("mouseleave", onLeave);

        cleanups.push(() => {
          wrap.removeEventListener("mousemove", onMove);
          wrap.removeEventListener("mouseenter", onEnter);
          wrap.removeEventListener("mouseleave", onLeave);
        });
      });

      /* ------------------------------
         Option 3: Brutal Nudge
      ------------------------------ */
      headlineWrappers.forEach((el) => {
        gsap.set(el, {
          transformOrigin: "50% 50%",
          willChange: "transform",
        });

        const onEnter = () => {
          gsap.to(el, {
            x: 18,
            duration: 0.22,
            ease: "power3.out",
            overwrite: "auto",
          });
        };

        const onLeave = () => {
          gsap.to(el, {
            x: 0,
            duration: 0.35,
            ease: "power3.out",
            overwrite: "auto",
          });
        };

        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);

        cleanups.push(() => {
          el.removeEventListener("mouseenter", onEnter);
          el.removeEventListener("mouseleave", onLeave);
        });
      });

      /* ------------------------------
         NEW: Hover Color Shift (editorial)
      ------------------------------ */
      headlineWrappers.forEach((el) => {
        const originalColor = getComputedStyle(el).color;

        const onEnter = () => {
          gsap.to(el, {
            color: "#7f38c7", // almost-black (safe + editorial)
            duration: 0.25,
            ease: "power2.out",
            overwrite: "auto",
          });
        };

        const onLeave = () => {
          gsap.to(el, {
            color: originalColor,
            duration: 0.35,
            ease: "power3.out",
            overwrite: "auto",
          });
        };

        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);

        cleanups.push(() => {
          el.removeEventListener("mouseenter", onEnter);
          el.removeEventListener("mouseleave", onLeave);
        });
      });
    }, heroRef);

    return () => {
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen bg-soft-white text-almost-black px-6 md:px-12 lg:px-17 pt-24 pb-16"
    >
      <div className="max-w-[1600px]">
        {/* Headline */}
        <div className="mt-6">
          <h1 className="font-display tracking-[-0.06em] leading-[0.8]">
            {/* DESIGN */}
            <div
              ref={designRef}
              className="relative inline-block"
              style={{ fontSize: "clamp(72px, 30vw, 210px)" }}
            >
              <span className="block">DESIGN.</span>
              <span
                ref={designMaskRef}
                aria-hidden
                className="absolute inset-0 block pointer-events-none"
              >
                <span className="block text-almost-black">DESIGN.</span>
              </span>
            </div>

            {/* DEVELOP */}
            <div
              ref={developRef}
              className="relative inline-block ml-[12vw] md:ml-[14vw]"
              style={{ fontSize: "clamp(72px, 30vw, 210px)" }}
            >
              <span className="block">DEVELOP.</span>
              <span
                ref={developMaskRef}
                aria-hidden
                className="absolute inset-0 block pointer-events-none"
              >
                <span className="block text-almost-black">DEVELOP.</span>
              </span>
            </div>

            {/* DELIVER */}
            <div
              ref={deliverRef}
              className="relative inline-block ml-[24vw] md:ml-[28vw]"
              style={{ fontSize: "clamp(72px, 30vw, 210px)" }}
            >
              <span className="block">DELIVER.</span>
              <span
                ref={deliverMaskRef}
                aria-hidden
                className="absolute inset-0 block pointer-events-none"
              >
                <span className="block text-almost-black">DELIVER.</span>
              </span>
            </div>
          </h1>
        </div>

        {/* Roles */}
        <div
          ref={rolesRef}
          className="
            mt-8 md:mt-16
            font-body italic text-xl md:text-2xl leading-[1.9]

            lg:absolute
            lg:left-16
            lg:top-[80%]

            lg:mt-0
            lg:whitespace-nowrap
          "
        >
          <div>FULL-STACK DEVELOPER</div>
          <div>UI/UX DESIGNER</div>
          <div>GRAPHIC ARTIST</div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-1 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="font-accent text-[10px] uppercase tracking-[0.18em] text-charcoal">
          Scroll
        </span>
        <div className="w-[1px] h-16 bg-almost-black/40" />
      </div>
    </section>
  );
};

export default Hero;
