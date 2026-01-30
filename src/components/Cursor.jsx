import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Cursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);
  const animationFrame = useRef(null);

  useEffect(() => {
    // Only enable on desktop
    if (!window.matchMedia('(pointer: fine)').matches) {
      return;
    }

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    // Update mouse position
    const handleMouseMove = (e) => {
      mouse.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    // Animate cursor to mouse position
    const animateCursor = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.15;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.15;

      gsap.set(cursor, {
        x: mouse.current.x,
        y: mouse.current.y,
      });

      gsap.set(follower, {
        x: pos.current.x,
        y: pos.current.y,
      });

      animationFrame.current = requestAnimationFrame(animateCursor);
    };

    animateCursor();
    window.addEventListener('mousemove', handleMouseMove);

    // Check if element is interactive
    const isInteractiveElement = (element) => {
      if (!element) return false;
      return (
        element.tagName === 'A' ||
        element.tagName === 'BUTTON' ||
        element.closest('a') ||
        element.closest('button') ||
        element.closest('.project-card') ||
        element.closest('.role-item') ||
        element.closest('input') ||
        element.closest('textarea') ||
        element.closest('.skill-item') ||
        element.closest('[role="button"]')
      );
    };

    // Handle hover states
    const handleMouseEnter = (e) => {
      if (isInteractiveElement(e.target)) {
        isHovering.current = true;
        gsap.to(cursor, {
          scale: 0.2,
          opacity: 0.8,
          duration: 0.3,
          ease: 'expo.out',
        });
        gsap.to(follower, {
          width: '2.5rem',
          height: '2.5rem',
          duration: 0.3,
          ease: 'expo.out',
        });
      }
    };

    const handleMouseLeave = (e) => {
      if (isInteractiveElement(e.target)) {
        isHovering.current = false;
        gsap.to(cursor, {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          ease: 'expo.out',
        });
        gsap.to(follower, {
          width: '1rem',
          height: '1rem',
          duration: 0.3,
          ease: 'expo.out',
        });
      }
    };

    // Magnetic effect for interactive elements
    const setupMagneticEffect = () => {
      const magneticElements = document.querySelectorAll(
        'a, button, .project-card, .role-item, .skill-item, input, textarea, [role="button"]'
      );

      magneticElements.forEach((element) => {
        const handleMagneticEnter = () => {
          const handleMagneticMove = (e) => {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const distanceX = e.clientX - centerX;
            const distanceY = e.clientY - centerY;
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
            const maxDistance = 120;

            if (distance < maxDistance) {
              const force = (maxDistance - distance) / maxDistance;
              const moveX = distanceX * force * 0.3;
              const moveY = distanceY * force * 0.3;

              gsap.to(element, {
                x: moveX,
                y: moveY,
                duration: 0.4,
                ease: 'power2.out',
              });
            }
          };

          const handleMagneticLeave = () => {
            gsap.to(element, {
              x: 0,
              y: 0,
              duration: 0.6,
              ease: 'expo.out',
            });
            element.removeEventListener('mousemove', handleMagneticMove);
            element.removeEventListener('mouseleave', handleMagneticLeave);
          };

          element.addEventListener('mousemove', handleMagneticMove);
          element.addEventListener('mouseleave', handleMagneticLeave);
        };

        element.addEventListener('mouseenter', handleMagneticEnter);
      });
    };

    // Setup magnetic effects after a short delay to ensure DOM is ready
    setTimeout(setupMagneticEffect, 100);

    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    // Hide cursor on mouse leave window
    const handleMouseLeaveWindow = () => {
      gsap.to([cursor, follower], {
        opacity: 0,
        duration: 0.3,
      });
    };

    const handleMouseEnterWindow = () => {
      gsap.to([cursor, follower], {
        opacity: 1,
        duration: 0.3,
      });
    };

    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
    };
  }, []);

  // Hide default cursor on desktop
  useEffect(() => {
    if (window.matchMedia('(pointer: fine)').matches) {
      document.body.style.cursor = 'none';
    }

    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <>
      {/* Main cursor dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-almost-black rounded-full pointer-events-none z-[10000] mix-blend-difference transform -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: 'transform' }}
      />
      {/* Follower circle */}
      <div
        ref={followerRef}
        className="cursor-follower fixed top-0 left-0 w-4 h-4 border border-almost-black rounded-full pointer-events-none z-[9999] transform -translate-x-1/2 -translate-y-1/2"
        style={{ 
          willChange: 'transform, width, height',
          transformOrigin: 'center center',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}
      />
    </>
  );
};

export default Cursor;
