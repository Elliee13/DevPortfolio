import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initMagneticButton } from '../utils/magneticButton';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const contactRef = useRef(null);
  const sectionRef = useRef(null);
  const submitButtonRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitState, setSubmitState] = useState({
    status: 'idle',
    message: '',
  });

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

      const inputs = sectionRef.current?.querySelectorAll('input, textarea');
      if (inputs) {
        gsap.fromTo(
          inputs,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'expo.out',
            stagger: 0.12,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, contactRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (submitButtonRef.current) {
      const cleanup = initMagneticButton(submitButtonRef.current, 0.2);
      return cleanup;
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submitState.status === 'submitting') return;

    setSubmitState({ status: 'submitting', message: '' });

    try {
      const response = await fetch('https://formspree.io/f/xpqqqnbg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      setSubmitState({
        status: 'success',
        message: "Thanks! I'll get back to you soon.",
      });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitState({
        status: 'error',
        message: 'Something went wrong. Please try again.',
      });
    }
  };

  const socialLinks = [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/john-ellemeleck-p-austria-6b2a85302/?skipRedirect=true' },
    { name: 'GitHub', url: 'https://github.com/Elliee13' },
  ];

  const handleSocialHover = (e) => {
    gsap.to(e.currentTarget, {
      x: 5,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleSocialLeave = (e) => {
    gsap.to(e.currentTarget, {
      x: 0,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  return (
    <section
      ref={contactRef}
      className="min-h-screen flex items-center px-6 md:px-12 lg:px-24 xl:px-17 py-20"
    >
      <div ref={sectionRef} className="max-w-[1400px] w-full">
        <div className="mb-6 md:mb-8">
          <span className="font-accent text-[10px] text-charcoal/50 uppercase tracking-[0.2em]">
            © Get in touch
          </span>
          <span className="font-accent text-[10px] text-charcoal/30 ml-4">
            (04)
          </span>
        </div>
        <h2 className="font-display text-6xl md:text-7xl lg:text-8xl xl:text-9xl mb-24 md:mb-32">
          Get In Touch
        </h2>

        <div className="grid md:grid-cols-2 gap-20 md:gap-24 lg:gap-32">
          <div>
            <p className="font-body text-xl md:text-2xl lg:text-3xl text-charcoal mb-12 leading-[1.7] font-light max-w-xl">
              Have a project in mind? Let's collaborate and bring your vision to life.
            </p>

            <div className="space-y-6">
              {socialLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  className="block font-body text-xl md:text-2xl text-almost-black hover:text-muted-olive transition-colors duration-500"
                  onMouseEnter={handleSocialHover}
                  onMouseLeave={handleSocialLeave}
                >
                  {link.name} →
                </a>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                required
                className="w-full px-6 py-4 border border-light-gray bg-soft-white text-charcoal font-body text-lg focus:outline-none focus:border-almost-black transition-colors duration-500"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="w-full px-6 py-4 border border-light-gray bg-soft-white text-charcoal font-body text-lg focus:outline-none focus:border-almost-black transition-colors duration-500"
              />
            </div>
            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
                required
                rows="6"
                className="w-full px-6 py-4 border border-light-gray bg-soft-white text-charcoal font-body text-lg focus:outline-none focus:border-almost-black transition-colors duration-500 resize-none"
              />
            </div>
            <button
              ref={submitButtonRef}
              type="submit"
              disabled={submitState.status === 'submitting'}
              className="w-full md:w-auto px-10 py-5 bg-almost-black text-soft-white font-body text-lg font-medium hover:bg-muted-olive transition-colors duration-500 rounded disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitState.status === 'submitting' ? 'Sending...' : 'Send Message'}
            </button>
            {submitState.message ? (
              <p
                className={`font-body text-base ${
                  submitState.status === 'error' ? 'text-red-600' : 'text-muted-olive'
                }`}
                aria-live="polite"
              >
                {submitState.message}
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
