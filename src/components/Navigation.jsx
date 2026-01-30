import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useLocation, useNavigate } from "react-router-dom";

const Navigation = () => {
  const navRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 1, ease: "expo.out", delay: 0.5 }
      );
    }
  }, []);

  const navItems = [
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ];

  const scrollToSection = (href) => {
    const el = document.querySelector(href);
    if (!el) return false;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    return true;
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();

    // If already on home, just scroll
    if (location.pathname === "/") {
      scrollToSection(href);
      return;
    }

    // If NOT on home (e.g. /work/:slug), route to home with hash,
    // and Home will scroll after mount (see hash effect below).
    navigate(`/${href}`);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();

    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    navigate("/");
  };

  // When route changes to "/" with a hash (/#work), scroll after mount
  useEffect(() => {
    if (location.pathname !== "/") return;
    if (!location.hash) return;

    // Wait a tick so sections exist before querying
    const t = window.setTimeout(() => {
      scrollToSection(location.hash);
    }, 50);

    return () => window.clearTimeout(t);
  }, [location.pathname, location.hash]);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-[9997] transition-all duration-500 ${
        isScrolled ? "bg-soft-white/95 backdrop-blur-sm border-b border-light-gray" : ""
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-5 lg:px-4 xl:px-2 py-6">
        <div className="flex items-center justify-between">
          <a
            href="/"
            onClick={handleLogoClick}
            className="font-display text-xl md:text-2xl font-medium hover:opacity-70 transition-opacity duration-300"
          >
            Portfolio
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, i) => (
              <a
                key={i}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="font-body text-sm uppercase tracking-wider text-charcoal hover:text-almost-black transition-colors duration-300"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
