import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navigation from "./components/Navigation";
import Cursor from "./components/Cursor";
import Hero from "./components/Hero";
import About from "./components/About";
import SelectedWorks from "./components/SelectedWorks";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import CaseStudy from "./components/CaseStudy";

gsap.registerPlugin(ScrollTrigger);

/**
 * Home page (your existing single-page layout).
 * Kept intact. Cursor/Nav/Chatbot are now global in App().
 */
function Home() {
  return (
    <div className="relative">
      <Hero />

      <div id="about">
        <About />
      </div>

      <div id="work">
        <SelectedWorks />
      </div>

      <div id="skills">
        <Skills />
      </div>

      <div id="contact">
        <Contact />
      </div>

      <Footer />
    </div>
  );
}

function App() {
  const SHOW_CHATBOT =
    import.meta.env.VITE_SHOW_CHATBOT === "true" ||
    import.meta.env.VITE_SHOW_CHATBOT === "1";

  useEffect(() => {
    document.body.style.opacity = "1";

    gsap.fromTo(
      "body",
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: "expo.out", delay: 0.1 }
    );

    if (window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
      document.documentElement.style.scrollBehavior = "smooth";
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="relative">
      {/* GLOBAL: shows on all routes */}
      <Cursor />
      <Navigation />
      {SHOW_CHATBOT && <Chatbot />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work/:slug" element={<CaseStudy />} />
        {/* Optional */}
        <Route path="/work" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
