import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useGSAP = (callback, dependencies = []) => {
  const scope = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (callback) callback();
    }, scope);

    return () => ctx.revert();
  }, dependencies);

  return scope;
};

export const splitText = (text) => {
  return text.split(' ').map((word, i) => (
    <span key={i} className="inline-block overflow-hidden">
      <span className="inline-block">{word}</span>
    </span>
  ));
};

export const animateOnScroll = (element, options = {}) => {
  const defaults = {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power4.out',
  };

  const config = { ...defaults, ...options };

  gsap.fromTo(
    element,
    { opacity: config.opacity, y: config.y },
    {
      opacity: 1,
      y: 0,
      duration: config.duration,
      ease: config.ease,
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    }
  );
};
