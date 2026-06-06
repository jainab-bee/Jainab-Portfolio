'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { ResumeData, ColorPalette } from '@/types/portfolio';
import { getThemeColors } from '@/utils/theme';
import { ABOUT_VARIANTS } from '@/utils/constants';
import { AboutProps, AboutSectionProps } from '@/types/IAboutSection';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';

const ABOUT_ME_TEXT = "I'm Jainab Bee, a B.Tech Computer Science Engineering (AI) student at SKIT Jaipur with a CGPA of 9.68. My interests lie in Machine Learning, Deep Learning, Natural Language Processing, and Generative AI. Through internships, open-source contributions, and hands-on projects, I have gained practical experience in building AI-powered applications, working with Large Language Models (LLMs), and applying machine learning techniques to solve real-world challenges. I am continuously exploring emerging AI technologies and aspire to contribute to impactful innovations in artificial intelligence.";

const ABOUT_ME_INTRO = [
  "Hi, I'm Jainab Bee 👋",
  "A B.Tech Computer Science Engineering (AI) student at SKIT Jaipur with a CGPA of 9.68.",
  "I'm passionate about Machine Learning, Deep Learning, Natural Language Processing, Large Language Models (LLMs), and Generative AI. Through internships, open-source contributions, and personal projects, I continuously explore how intelligent systems can solve real-world challenges.",
];

/* ──────────────────────────────────────────────
   Animated Counter Hook
   ────────────────────────────────────────────── */
function useAnimatedCounter(target: number, isInView: boolean, duration = 2) {
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) => Math.round(v * 100) / 100);
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(motionVal, target, {
      duration,
      ease: [0.25, 0.46, 0.45, 0.94],
    });
    return controls.stop;
  }, [isInView, target, duration, motionVal]);

  useEffect(() => {
    const unsubscribe = rounded.on('change', (v) => {
      if (Number.isInteger(target)) {
        setDisplay(String(Math.round(v)));
      } else {
        setDisplay(v.toFixed(2));
      }
    });
    return unsubscribe;
  }, [rounded, target]);

  return display;
}

/* ──────────────────────────────────────────────
   Stat Counter Card
   ────────────────────────────────────────────── */
interface StatCardProps {
  value: number;
  suffix: string;
  label: string;
  isInView: boolean;
  delay: number;
  theme: ReturnType<typeof getThemeColors>;
  isDecimal?: boolean;
}

function StatCard({ value, suffix, label, isInView, delay, theme, isDecimal }: StatCardProps) {
  const display = useAnimatedCounter(value, isInView, 2.2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative flex-1 min-w-[140px]"
    >
      <div className="relative rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-5 text-center
                      transition-all duration-500 hover:border-white/[0.15] hover:bg-white/[0.06]
                      hover:shadow-[0_0_30px_rgba(255,255,255,0.04)]">
        {/* Subtle glow on hover */}
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${theme.gradient} opacity-0 
                        group-hover:opacity-[0.06] transition-opacity duration-500`} />
        <div className="relative z-10">
          <span className={`text-3xl sm:text-4xl font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
            {display}{suffix}
          </span>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 font-medium tracking-wide uppercase">
            {label}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   Academic Cap SVG Icon
   ────────────────────────────────────────────── */
function AcademicCapIcon({ className = 'w-7 h-7' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15v-3.75m0 0 5.25 3 5.25-3" />
    </svg>
  );
}

/* ──────────────────────────────────────────────
   Key Stats Row
   ────────────────────────────────────────────── */
interface StatsRowProps {
  theme: ReturnType<typeof getThemeColors>;
}

function StatsRow({ theme }: StatsRowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  const stats = [
    { value: 9.68, suffix: '', label: 'CGPA', isDecimal: true },
    { value: 3, suffix: '+', label: 'Internships', isDecimal: false },
    { value: 5, suffix: '+', label: 'Projects', isDecimal: false },
    { value: 5, suffix: '+', label: 'Certifications', isDecimal: false },
  ];

  return (
    <div ref={ref} className="flex flex-wrap gap-4 justify-center mt-12 sm:mt-16">
          {stats.map((stat, i) => (
        <StatCard
          key={stat.label}
          value={stat.value}
          suffix={stat.suffix}
          label={stat.label}
          isInView={isInView}
          delay={0.15 * i}
          theme={theme}
          isDecimal={stat.isDecimal}
        />
          ))}
    </div>
  );
}

/* ──────────────────────────────────────────────
   Glowing Border Wrapper
   ────────────────────────────────────────────── */
function GlowCard({
  children,
  theme,
  className = '',
  delay = 0,
  isInView = true,
}: {
  children: React.ReactNode;
  theme: ReturnType<typeof getThemeColors>;
  className?: string;
  delay?: number;
  isInView?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={`group relative rounded-2xl ${className} flex flex-col justify-between min-h-[180px]`}
    >
      {/* Animated glow border */}
      <div className={`absolute -inset-[1px] rounded-2xl bg-gradient-to-r ${theme.gradient} opacity-20
                       group-hover:opacity-40 blur-[2px] transition-opacity duration-700`} />
      <div className={`absolute -inset-[1px] rounded-2xl bg-gradient-to-r ${theme.gradient} opacity-[0.12]
                       group-hover:opacity-25 transition-opacity duration-700`} />
      {/* Card body */}
      <div className="relative rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-white/[0.08]
                      p-6 sm:p-8 h-full overflow-hidden">
        {/* Inner ambient glow */}
        <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full bg-gradient-to-br ${theme.gradient}
                        opacity-[0.04] blur-3xl pointer-events-none`} />
        <div className="relative z-10">{children}</div>
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   Section Heading
   ────────────────────────────────────────────── */
function SectionHeading({
  theme,
  isInView,
}: {
  theme: ReturnType<typeof getThemeColors>;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="text-center mb-12 sm:mb-16"
    >
      <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
        About Me
      </h2>
      {/* Decorative underline */}
      <div className="flex items-center justify-center gap-2 mt-4">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: 48 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className={`h-[3px] rounded-full bg-gradient-to-r ${theme.gradient}`}
        />
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.5, type: 'spring', stiffness: 300 }}
          className={`w-2 h-2 rounded-full bg-gradient-to-r ${theme.gradient}`}
        />
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: 48 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className={`h-[3px] rounded-full bg-gradient-to-r ${theme.gradient}`}
        />
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   VARIANT: Simple
   ────────────────────────────────────────────── */
const SimpleAbout = ({ data, theme }: AboutProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="about" ref={ref} className="relative py-16 sm:py-24 px-4 sm:px-6 bg-slate-950 overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <SectionHeading theme={theme} isInView={isInView} />

        <GlowCard theme={theme} isInView={isInView} delay={0.2}>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed text-center">
            {ABOUT_ME_TEXT}
          </p>
        </GlowCard>

        <StatsRow theme={theme} />
      </div>
    </section>
  );
};

/* ──────────────────────────────────────────────
   VARIANT: Split (About + Education side-by-side)
   ────────────────────────────────────────────── */
const SplitAbout = ({ data, theme }: AboutProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="about" ref={ref} className="relative py-16 sm:py-24 px-4 sm:px-6 bg-slate-950 overflow-hidden">
      {/* Background accents */}
      <div className={`absolute top-20 -left-32 w-64 h-64 rounded-full bg-gradient-to-br ${theme.gradient} opacity-[0.03] blur-3xl pointer-events-none`} />
      <div className={`absolute bottom-20 -right-32 w-64 h-64 rounded-full bg-gradient-to-br ${theme.gradient} opacity-[0.03] blur-3xl pointer-events-none`} />

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeading theme={theme} isInView={isInView} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Left: About Me */}
          <GlowCard theme={theme} isInView={isInView} delay={0.2}>
            <div className="flex items-center gap-3 mb-5">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${theme.gradient} flex items-center justify-center shadow-lg`}>
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-white">Who I Am</h3>
            </div>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              {ABOUT_ME_TEXT}
            </p>
          </GlowCard>

          {/* Right: Education */}
          <GlowCard theme={theme} isInView={isInView} delay={0.4}>
            <div className="flex items-center gap-3 mb-5">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${theme.gradient} flex items-center justify-center shadow-lg`}>
                <AcademicCapIcon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-white">Education</h3>
            </div>

            <div className="space-y-5">
              {data.education.map((edu, index) => {
                const scoreLabel = edu.gpa?.includes('%') ? 'Percentage' : 'GPA';
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.15 }}
                        className="group relative rounded-xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-lg p-5 hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-300 flex flex-col justify-between min-h-[180px]"
                  >
                    <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${theme.gradient} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500`} />
                    <div className="relative z-10">
                      {(() => {
                        const degMatch = edu.degree.match(/^(.*?)\s*\((.*?)\)\s*$/);
                        const degMain = degMatch ? degMatch[1] : edu.degree;
                        const degParen = degMatch ? degMatch[2] : null;
                        const instParts = edu.institution.split(',').map(s => s.trim());
                        const combineFirstTwo = instParts.length >= 2 && /skit|swami keshvanand/i.test(edu.institution);
                        const firstLine = combineFirstTwo ? `${instParts[0]}, ${instParts[1]}` : instParts[0];
                        const rest = combineFirstTwo ? instParts.slice(2) : instParts.slice(1);
                        return (
                          <>
                            <h4 className="text-white font-semibold text-base sm:text-lg">
                              {degMain}
                              {degParen && <span className="block text-sm text-slate-300 mt-1">({degParen})</span>}
                            </h4>
                            <p className={`text-sm sm:text-base ${theme.primary} font-medium mt-1`}>
                              {firstLine}
                              {rest.map((r, i) => (
                                <span key={i} className="block">{r}</span>
                              ))}
                            </p>
                          </>
                        );
                      })()}

                      <div className="mt-4 flex items-center justify-between gap-3">
                        <span className="text-xs text-slate-400 bg-white/[0.06] px-3 py-1 rounded-full">{edu.years}</span>
                        {edu.gpa && (
                          <span className="text-sm font-semibold text-white">{scoreLabel}: {edu.gpa}</span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </GlowCard>
        </div>

        <StatsRow theme={theme} />
      </div>
    </section>
  );
};

/* ──────────────────────────────────────────────
   VARIANT: Modern (Full-width immersive)
   ────────────────────────────────────────────── */
const ModernAbout = ({ data, theme }: AboutProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const highlightItems = [
    { icon: '🏅', label: 'CGPA', value: '9.68 / 10' },
    { icon: '🤖', label: 'Experience', value: 'AI/ML Intern' },
    { icon: '🌟', label: 'Contributions', value: 'Open Source Contributor' },
    { icon: '🚀', label: 'Focus', value: 'ML • DL • NLP • GenAI' },
  ];

  return (
    <section id="about" ref={ref} className="relative py-16 sm:py-24 px-4 sm:px-6 bg-slate-950 overflow-hidden">
      {/* Mesh-like background dots */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }} />

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeading theme={theme} isInView={isInView} />

        <div className="grid gap-8 xl:grid-cols-[1.5fr_1fr]">
          <GlowCard theme={theme} isInView={isInView} delay={0.2} className="h-full">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/[0.08] px-4 py-2 text-sm text-cyan-200">
                <span className="text-lg">👋</span>
                <span>Now hiring? Let's connect.</span>
              </div>

              <div className="space-y-5">
                <h3 className="text-4xl sm:text-5xl font-semibold text-white leading-tight">
                  Hi, I'm Jainab Bee
                </h3>
                <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                  A B.Tech Computer Science Engineering (AI) student at SKIT Jaipur with a CGPA of 9.68.
                </p>
                <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                  I'm passionate about Machine Learning, Deep Learning, Natural Language Processing, Large Language Models (LLMs), and Generative AI. Through internships, open-source contributions, and personal projects, I continuously explore how intelligent systems can solve real-world challenges.
                </p>
              </div>
            </div>
          </GlowCard>

          <div className="grid gap-4 sm:grid-cols-2">
            {highlightItems.map((item) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, ease: 'easeOut' }}
                className="group relative rounded-3xl border border-white/[0.08] bg-slate-900/80 backdrop-blur-xl p-6 min-h-[160px] overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.25)] transition-all duration-400 hover:-translate-y-1 hover:border-white/[0.16] hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]"
              >
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${theme.gradient} opacity-0 group-hover:opacity-[0.08] transition-opacity duration-500`} />
                <div className="relative z-10 flex h-full flex-col justify-between gap-4">
                  <div className="text-4xl leading-none">{item.icon}</div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-400 mb-2">{item.label}</p>
                    <p className="text-lg sm:text-xl font-semibold text-white">{item.value}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="flex items-center gap-3 text-xl sm:text-2xl font-semibold text-white mb-6"
          >
            <AcademicCapIcon className={`w-6 h-6 ${theme.primary}`} />
            Education
          </motion.h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.education.map((edu, index) => {
              const scoreLabel = edu.gpa?.includes('%') ? 'Percentage' : 'GPA';
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.12 }}
                  className="group relative rounded-xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-lg p-5 hover:border-white/[0.14] hover:bg-white/[0.05] transition-all duration-500 flex flex-col justify-between min-h-[180px]"
                >
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${theme.gradient} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500`} />
                  <div className="relative z-10">
                    {(() => {
                      const degMatch = edu.degree.match(/^(.*?)\s*\((.*?)\)\s*$/);
                      const degMain = degMatch ? degMatch[1] : edu.degree;
                      const degParen = degMatch ? degMatch[2] : null;
                      const instParts = edu.institution.split(',').map(s => s.trim());
                      const combineFirstTwo = instParts.length >= 2 && /skit|swami keshvanand/i.test(edu.institution);
                      const firstLine = combineFirstTwo ? `${instParts[0]}, ${instParts[1]}` : instParts[0];
                      const rest = combineFirstTwo ? instParts.slice(2) : instParts.slice(1);
                      return (
                        <>
                          <h4 className="text-white font-semibold text-base">{degMain}{degParen && <span className="block text-sm text-slate-300 mt-1">({degParen})</span>}</h4>
                          <p className={`text-sm ${theme.primary} mt-1`}>
                            {firstLine}
                            {rest.map((r, i) => (
                              <span key={i} className="block">{r}</span>
                            ))}
                          </p>
                        </>
                      );
                    })()}
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <span className="text-xs text-slate-400 bg-white/[0.06] px-3 py-1 rounded-full">{edu.years}</span>
                      {edu.gpa && (
                        <span className="text-sm font-semibold text-white">{scoreLabel}: {edu.gpa}</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <StatsRow theme={theme} />
      </div>
    </section>
  );
};

/* ──────────────────────────────────────────────
   VARIANT: Cards (Bento-style layout)
   ────────────────────────────────────────────── */
const CardsAbout = ({ data, theme }: AboutProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="about" ref={ref} className="relative py-16 sm:py-24 px-4 sm:px-6 bg-slate-950 overflow-hidden">
      {/* Ambient glow */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full
                       bg-gradient-to-br ${theme.gradient} opacity-[0.02] blur-[100px] pointer-events-none`} />

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeading theme={theme} isInView={isInView} />

        {/* Bento grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
          {/* About - takes 2 columns */}
          <div className="lg:col-span-2">
            <GlowCard theme={theme} isInView={isInView} delay={0.2} className="h-full">
              <div className="flex items-center gap-3 mb-5">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${theme.gradient} flex items-center justify-center shadow-lg`}>
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-white">Who I Am</h3>
              </div>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                {ABOUT_ME_TEXT}
              </p>

              {/* Quick info chips */}
              <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-white/[0.06]">
                {data.personalInfo.location && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.6, duration: 0.4 }}
                    className="text-xs text-slate-300 bg-white/[0.06] px-3 py-1.5 rounded-full flex items-center gap-1.5"
                  >
                    <span>📍</span> {data.personalInfo.location}
                  </motion.span>
                )}
                {data.personalInfo.title && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.7, duration: 0.4 }}
                    className="text-xs text-slate-300 bg-white/[0.06] px-3 py-1.5 rounded-full flex items-center gap-1.5"
                  >
                    <span>💼</span> {data.personalInfo.title}
                  </motion.span>
                )}
                {data.personalInfo.email && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.8, duration: 0.4 }}
                    className="text-xs text-slate-300 bg-white/[0.06] px-3 py-1.5 rounded-full flex items-center gap-1.5"
                  >
                    <span>✉️</span> {data.personalInfo.email}
                  </motion.span>
                )}
              </div>
            </GlowCard>
          </div>

          {/* Education - 1 column */}
          <GlowCard theme={theme} isInView={isInView} delay={0.35} className="h-full">
            <div className="flex items-center gap-3 mb-5">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${theme.gradient} flex items-center justify-center shadow-lg`}>
                <AcademicCapIcon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-white">Education</h3>
            </div>

            <div className="space-y-4">
              {data.education.map((edu, index) => {
                const scoreLabel = edu.gpa?.includes('%') ? 'Percentage' : 'GPA';
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 15 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.12 }}
                    className="group relative rounded-xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-lg p-5 hover:border-white/[0.14] hover:bg-white/[0.05] transition-all duration-300 flex flex-col justify-between min-h-[180px]"
                  >
                    <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${theme.gradient} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500`} />
                    <div className="relative z-10">
                      {(() => {
                        const degMatch = edu.degree.match(/^(.*?)\s*\((.*?)\)\s*$/);
                        const degMain = degMatch ? degMatch[1] : edu.degree;
                        const degParen = degMatch ? degMatch[2] : null;
                        const instParts = edu.institution.split(',').map(s => s.trim());
                        const combineFirstTwo = instParts.length >= 2 && /skit|swami keshvanand/i.test(edu.institution);
                        const firstLine = combineFirstTwo ? `${instParts[0]}, ${instParts[1]}` : instParts[0];
                        const rest = combineFirstTwo ? instParts.slice(2) : instParts.slice(1);
                        return (
                          <>
                            <h4 className="text-white font-semibold text-sm sm:text-base">
                              {degMain}
                              {degParen && <span className="block text-xs text-slate-300 mt-0.5">({degParen})</span>}
                            </h4>
                            <p className={`text-xs sm:text-sm ${theme.primary} mt-0.5`}>
                              {firstLine}
                              {rest.map((r, i) => (
                                <span key={i} className="block">{r}</span>
                              ))}
                            </p>
                          </>
                        );
                      })()}
                      <div className="mt-3 flex items-center justify-between gap-3">
                        <span className="text-[10px] text-slate-400 bg-white/[0.05] px-2 py-0.5 rounded-full">{edu.years}</span>
                        {edu.gpa && (
                          <span className="text-[10px] font-semibold text-white">{scoreLabel}: {edu.gpa}</span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </GlowCard>
        </div>

        <StatsRow theme={theme} />
      </div>
    </section>
  );
};

/* ──────────────────────────────────────────────
   Main Export – Variant Router
   ────────────────────────────────────────────── */
export default function AboutSection({ data, variant, palette }: AboutSectionProps) {
  const theme = getThemeColors(palette);

  switch (variant) {
    case ABOUT_VARIANTS.SIMPLE:
      return <SimpleAbout data={data} theme={theme} />;
    case ABOUT_VARIANTS.SPLIT:
      return <SplitAbout data={data} theme={theme} />;
    case ABOUT_VARIANTS.MODERN:
      return <ModernAbout data={data} theme={theme} />;
    case ABOUT_VARIANTS.CARDS:
      return <CardsAbout data={data} theme={theme} />;
    default:
      return <SplitAbout data={data} theme={theme} />;
  }
}
