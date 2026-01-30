import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skills = {
  frontend: ['HTML', 'CSS', 'React', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'GSAP'],
  backend: ['PHP', 'RESTapi', 'PostgreSQL', 'Storefront API', 'Shopify Liquid'],
  design: ['Figma', 'After Effects', 'Davinci Resolve', 'Photoshop', 'Canva']
};

const Skills = () => {
  const skillsRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        {
          opacity: 0,
          y: 100,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      const categories = sectionRef.current?.querySelectorAll('.skill-category');
      if (categories) {
        gsap.fromTo(
          categories,
          {
            opacity: 0,
            x: -50,
          },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'expo.out',
            stagger: 0.15,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      const skillItems = sectionRef.current?.querySelectorAll('.skill-item');
      if (skillItems) {
        gsap.fromTo(
          skillItems,
          {
            opacity: 0,
            scale: 0.8,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: 'expo.out',
            stagger: 0.04,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, skillsRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={skillsRef}
      className="min-h-screen flex items-center px-6 md:px-12 lg:px-24 xl:px-17 py-20"
    >
      <div ref={sectionRef} className="max-w-[1400px] w-full">
        <div className="mb-6 md:mb-8">
          <span className="font-accent text-[10px] text-charcoal/50 uppercase tracking-[0.2em]">
            © Skills
          </span>
          <span className="font-accent text-[10px] text-charcoal/30 ml-4">
            (03)
          </span>
        </div>
        <h2 className="font-display text-6xl md:text-7xl lg:text-8xl xl:text-9xl mb-24 md:mb-32">
          Skills & Tools
        </h2>

        <div className="grid md:grid-cols-2 gap-16 md:gap-20 lg:gap-24">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="skill-category">
              <h3 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium mb-10 capitalize">
                {category}
              </h3>
              <div className="flex flex-wrap gap-3 md:gap-4">
                {items.map((skill, i) => (
                  <span
                    key={i}
                    className="skill-item font-body text-base md:text-lg px-5 py-2.5 border border-light-gray text-charcoal hover:border-almost-black transition-colors duration-500"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
