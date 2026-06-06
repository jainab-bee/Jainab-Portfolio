'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResumeData, ColorPalette } from '@/types/portfolio';
import { getThemeColors } from '@/utils/theme';

// ─── Types ───────────────────────────────────────────────────────────────────
interface HeroSectionProps {
  data: ResumeData;
  variant: string;
  palette: ColorPalette;
}

// ─── Constants ───────────────────────────────────────────────────────────────
const ROLES = [
  'CS Engineering (AI) Student',
  'AI/ML Enthusiast',
  'Open Source Contributor',
];

const NAV_SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
];

const SOCIAL_LINKS = [
  {
    key: 'email',
    label: 'Email',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    getHref: (d: ResumeData) => `mailto:${d.personalInfo.email}`,
    show: (d: ResumeData) => !!d.personalInfo.email,
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    getHref: (d: ResumeData) => `https://${d.personalInfo.linkedin}`,
    show: (d: ResumeData) => !!d.personalInfo.linkedin,
    external: true,
  },
  {
    key: 'github',
    label: 'GitHub',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    getHref: (d: ResumeData) => `https://${d.personalInfo.github}`,
    show: (d: ResumeData) => !!d.personalInfo.github,
    external: true,
  },
  {
    key: 'leetcode',
    label: 'LeetCode',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M13.483 0a1.374 1.374 0 00-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 00-1.209 2.104 5.35 5.35 0 00-.125.513 5.527 5.527 0 00.062 2.362 5.83 5.83 0 00.349 1.017 5.938 5.938 0 001.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 00-1.951-.003l-2.396 2.392a3.021 3.021 0 01-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 01.066-.523 2.545 2.545 0 01.619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 00-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0013.483 0zm-2.866 12.815a1.38 1.38 0 00-1.38 1.382 1.38 1.38 0 001.38 1.382H20.79a1.38 1.38 0 001.38-1.382 1.38 1.38 0 00-1.38-1.382z" />
      </svg>
    ),
    getHref: (d: ResumeData) => {
      const raw = d.personalInfo.leetcode || 'https://leetcode.com/u/jainab_bee';
      return raw.startsWith('http') ? raw : `https://${raw}`;
    },
    show: (d: ResumeData) => !!d.personalInfo.leetcode,
    external: true,
  },
];

// ─── CSS Particle Background ─────────────────────────────────────────────────
const ParticleField = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.5 + 0.1,
      drift: Math.random() * 40 - 20,
    }));
  }, []);

  const glowOrbs = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 300 + 150,
      duration: Math.random() * 25 + 20,
      delay: Math.random() * 5,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating glow orbs */}
      {glowOrbs.map((orb) => (
        <div
          key={`orb-${orb.id}`}
          className="absolute rounded-full animate-float-orb"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            background: `radial-gradient(circle, rgba(6,182,212,0.08) 0%, rgba(59,130,246,0.04) 40%, transparent 70%)`,
            animationDuration: `${orb.duration}s`,
            animationDelay: `${orb.delay}s`,
          }}
        />
      ))}
      {/* Star particles */}
      {particles.map((p) => (
        <div
          key={`particle-${p.id}`}
          className="absolute rounded-full animate-float-particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.size > 2.5 ? 'rgba(6,182,212,0.8)' : 'rgba(255,255,255,0.6)',
            boxShadow: p.size > 2 ? '0 0 6px rgba(6,182,212,0.4)' : 'none',
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            ['--drift' as string]: `${p.drift}px`,
          }}
        />
      ))}
      {/* Grid lines – subtle */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />
    </div>
  );
};

// ─── Typing Effect Hook ──────────────────────────────────────────────────────
function useTypingEffect(words: string[], typingSpeed = 80, deletingSpeed = 40, pauseDuration = 2000) {
  const [displayText, setDisplayText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayText.length < currentWord.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration]);

  return displayText;
}

// ─── Sticky Navbar ───────────────────────────────────────────────────────────
const StickyNavbar = ({ visible }: { visible: boolean }) => {
  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-slate-950/60 border-b border-white/[0.06] shadow-lg shadow-black/20"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
            {/* Name */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent hover:from-cyan-300 hover:to-blue-400 transition-all duration-300"
            >
              Jainab Bee
            </button>
            {/* Links */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_SECTIONS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className="px-3 py-1.5 text-sm text-slate-400 hover:text-cyan-400 rounded-lg hover:bg-white/[0.04] transition-all duration-200"
                >
                  {s.label}
                </button>
              ))}
            </div>
            {/* Mobile hamburger placeholder — links still work via floating dots */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => scrollTo('contact')}
                className="text-sm text-cyan-400 border border-cyan-400/30 px-3 py-1.5 rounded-lg hover:bg-cyan-400/10 transition-all"
              >
                Contact
              </button>
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

// ─── Floating Nav Dots ───────────────────────────────────────────────────────
const FloatingNavDots = () => {
  const [active, setActive] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    NAV_SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2, duration: 0.6 }}
      className="fixed right-4 lg:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-3"
    >
      {NAV_SECTIONS.map((s) => (
        <button
          key={s.id}
          onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })}
          className="group relative flex items-center"
          aria-label={`Go to ${s.label}`}
        >
          {/* Label tooltip */}
          <span className="absolute right-6 whitespace-nowrap text-xs text-slate-400 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200 pointer-events-none bg-slate-900/80 backdrop-blur-sm px-2 py-1 rounded">
            {s.label}
          </span>
          {/* Dot */}
          <span
            className={`block rounded-full transition-all duration-300 ${
              active === s.id
                ? 'w-3 h-3 bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.6)]'
                : 'w-2 h-2 bg-slate-600 hover:bg-slate-400'
            }`}
          />
        </button>
      ))}
    </motion.div>
  );
};

// ─── Scroll Down Indicator ───────────────────────────────────────────────────
const ScrollIndicator = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 2.5, duration: 0.8 }}
    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
    onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
  >
    <span className="text-xs text-slate-500 tracking-[0.2em] uppercase">Scroll</span>
    <motion.div
      animate={{ y: [0, 8, 0] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 text-cyan-400/70"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </motion.div>
  </motion.div>
);

// ─── Main Component ──────────────────────────────────────────────────────────
export default function HeroSection({ data, variant, palette }: HeroSectionProps) {
  const theme = getThemeColors(palette);
  const typedRole = useTypingEffect(ROLES, 70, 35, 2200);
  const [showNav, setShowNav] = useState(false);

  const resumeHref = (() => {
    const r = (data.personalInfo as any).resume;
    if (!r) return '/resume.pdf';
    if (r.startsWith('http')) return r;
    if (r.startsWith('/')) return r;
    return `/${r}`;
  })();

  // Scroll detection for sticky nav
  useEffect(() => {
    const handleScroll = () => {
      setShowNav(window.scrollY > window.innerHeight * 0.85);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Suppress unused var lint — variant & theme are received for API compatibility
  void variant;
  void theme;

  // ── Animation variants ──
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <>
      {/* ── Injected CSS keyframes ── */}
      {/* eslint-disable-next-line react/no-unknown-property */}
      <style jsx global>{`
        @keyframes float-particle {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: var(--particle-opacity, 0.3);
          }
          25% {
            transform: translateY(-30px) translateX(var(--drift, 10px));
            opacity: calc(var(--particle-opacity, 0.3) + 0.2);
          }
          50% {
            transform: translateY(-15px) translateX(calc(var(--drift, 10px) * -0.5));
            opacity: var(--particle-opacity, 0.3);
          }
          75% {
            transform: translateY(-45px) translateX(var(--drift, 10px));
            opacity: calc(var(--particle-opacity, 0.3) + 0.1);
          }
        }
        @keyframes float-orb {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -40px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.95);
          }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-float-particle {
          animation: float-particle var(--duration, 20s) ease-in-out infinite;
        }
        .animate-float-orb {
          animation: float-orb var(--duration, 25s) ease-in-out infinite;
        }
        .animate-shimmer {
          background-size: 200% auto;
          animation: shimmer 3s linear infinite;
        }
        .animate-cursor-blink {
          animation: cursor-blink 1s step-end infinite;
        }
      `}</style>

      {/* ── Sticky Navbar ── */}
      <StickyNavbar visible={showNav} />

      {/* ── Floating Nav Dots ── */}
      <FloatingNavDots />

      {/* ── Hero Section ── */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950"
      >
        {/* ── Background layers ── */}
        {/* Deep gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
        {/* Radial accent glow */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(6,182,212,0.08) 0%, transparent 70%)',
          }}
        />
        {/* Secondary glow */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 40% 60% at 30% 70%, rgba(59,130,246,0.06) 0%, transparent 60%)',
          }}
        />
        {/* Particles */}
        <ParticleField />
        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(2,6,23,0.7)_100%)]" />

        {/* ── Content ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto"
        >
          {/* Greeting badge */}
          <motion.div variants={childVariants} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium border border-cyan-500/20 bg-cyan-500/[0.06] text-cyan-300/90 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
              </span>
              Open to AI/ML Internships/jobs
            </span>
          </motion.div>

          {/* Name — gradient text */}
          <motion.h1
            variants={childVariants}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-[0.9] tracking-tight mb-4"
          >
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(6,182,212,0.3)]">
              Jainab
            </span>
            <br className="sm:hidden" />{' '}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]">
              Bee
            </span>
          </motion.h1>

          <motion.p variants={childVariants} className="text-sm sm:text-base md:text-lg text-cyan-200/80 uppercase tracking-[0.35em] mb-6">
            Machine Learning • Deep Learning • NLP • Generative AI
          </motion.p>

          {/* Divider line */}
          <motion.div
            variants={childVariants}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent to-cyan-400/50" />
            <div className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            <div className="h-px w-12 sm:w-20 bg-gradient-to-l from-transparent to-blue-400/50" />
          </motion.div>

          {/* Typing role */}
          <motion.div variants={childVariants} className="mb-6 min-h-[2rem] sm:min-h-[2.5rem]">
            <span className="text-lg sm:text-xl md:text-2xl font-mono text-slate-300/90">
              {'> '}
              <span className="text-cyan-400">{typedRole}</span>
              <span className="animate-cursor-blink text-cyan-400 ml-0.5 font-light">|</span>
            </span>
          </motion.div>

          {/* Summary */}
          <motion.p
            variants={childVariants}
            className="text-base sm:text-lg md:text-xl text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed"
          >
            From Data to Intelligence
            <br />
            <span className="block mt-2">Building the next generation of AI-powered systems.</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={childVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            {/* Download Resume — shimmer button */}
            <a
              href={resumeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm sm:text-base text-white overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]"
            >
              {/* Button bg */}
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full" />
              {/* Shimmer overlay */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shimmer rounded-full" />
              {/* Content */}
              <span className="relative flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                View Resume
              </span>
            </a>

            {/* Explore work */}
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm sm:text-base text-slate-300 border border-slate-700/80 hover:border-cyan-500/40 hover:text-cyan-300 hover:bg-cyan-500/[0.05] transition-all duration-300 hover:-translate-y-0.5 backdrop-blur-sm"
            >
              Explore Projects
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={childVariants}
            className="flex items-center justify-center gap-3 sm:gap-4"
          >
            {SOCIAL_LINKS.filter((s) => s.show(data)).map((social) => (
              <a
                key={social.key}
                href={social.getHref(data)}
                target={social.external ? '_blank' : undefined}
                rel={social.external ? 'noopener noreferrer' : undefined}
                aria-label={social.label}
                className="group relative p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-slate-400 hover:text-cyan-400 hover:border-cyan-400/30 hover:bg-cyan-400/[0.06] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]"
              >
                {social.icon}
                {/* Tooltip */}
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  {social.label}
                </span>
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Scroll indicator ── */}
        <ScrollIndicator />
      </section>
    </>
  );
}
