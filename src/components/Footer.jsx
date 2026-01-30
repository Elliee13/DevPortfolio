import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        footerRef.current,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      const text = footerRef.current?.querySelectorAll('.footer-text');
      if (text) {
        gsap.fromTo(
          text,
          {
            opacity: 0,
            x: -20,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: 'expo.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="px-6 md:px-12 lg:px-24 xl:px-32 py-20 border-t border-light-gray"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-6 md:mb-8">
          <span className="font-accent text-[10px] text-charcoal/50 uppercase tracking-[0.2em]">
            © Footer
          </span>
          <span className="font-accent text-[10px] text-charcoal/30 ml-4">
            (05)
          </span>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="footer-text">
            <p className="font-body text-charcoal/70 text-base">
              © {new Date().getFullYear()} Creative Portfolio. All rights reserved.
            </p>
          </div>
          <div className="footer-text">
            <p className="font-accent text-xs text-charcoal/50 uppercase tracking-[0.15em]">
              Crafted with intention
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
