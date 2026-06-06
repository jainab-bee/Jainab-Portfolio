'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ResumeData, ColorPalette } from '@/types/portfolio';
import { getThemeColors } from '@/utils/theme';

/* ──────────────────────────────────────────────
   Timeline Card – single experience entry
   ────────────────────────────────────────────── */
interface TimelineCardProps {
  exp: ResumeData['experience'][number];
  index: number;
  isLeft: boolean;
  theme: ReturnType<typeof getThemeColors>;
  accentHex: string;
}

function TimelineCard({ exp, index, isLeft, theme, accentHex }: TimelineCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-60px 0px' });

  /* Determine location type from description / highlights or fallback */
  const locationLabels = ['Remote', 'Inhouse', 'Hybrid', 'On-site', 'Onsite'];
  const extractLocation = (): string | null => {
    for (const label of locationLabels) {
      if (exp.description?.toLowerCase().includes(label.toLowerCase())) return label;
      if (exp.highlights?.some((h) => h.toLowerCase().includes(label.toLowerCase()))) return label;
    }
    return null;
  };

  /* Hard-coded locations matching the three entries requested */
  const locationMap: Record<number, string> = { 0: 'Remote', 1: 'Remote', 2: 'Inhouse' };
  const location = locationMap[index] ?? extractLocation();

  return (
    <div
      ref={cardRef}
      className={`relative flex w-full items-start md:items-center ${
        isLeft ? 'md:flex-row-reverse' : 'md:flex-row'
      } flex-col md:gap-0 gap-4`}
    >
      {/* ──── Card ──── */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? 80 : -80 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className={`relative w-full md:w-[calc(50%-2.5rem)] ${
          isLeft ? 'md:ml-auto md:pl-0 md:pr-0' : 'md:mr-auto md:pl-0 md:pr-0'
        } ml-10 md:ml-0`}
      >
        {/* Glassmorphism card */}
        <div
          className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6 sm:p-7
                     transition-all duration-500 hover:border-cyan-400/30 hover:bg-white/[0.06]
                     hover:shadow-[0_0_40px_-10px_rgba(6,182,212,0.2)]"
        >
          {/* Subtle gradient glow on hover */}
          <div
            className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: `linear-gradient(135deg, ${accentHex}18 0%, transparent 50%, ${accentHex}10 100%)`,
            }}
          />

          {/* Step number badge */}
          <div
            className={`absolute -top-3 ${
              isLeft ? 'md:-left-3 -right-3' : '-right-3'
            } flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${theme.gradient} text-xs font-bold text-white shadow-lg`}
          >
            {String(index + 1).padStart(2, '0')}
          </div>

          {/* Header row */}
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-white sm:text-xl leading-tight">
                {exp.title}
              </h3>
              <p className={`mt-1 flex items-center gap-2 text-sm font-semibold ${theme.primary}`}>
                <svg className="h-4 w-4 flex-shrink-0 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span className="truncate">{exp.company}</span>
              </p>
            </div>
          </div>

          {/* Date + Location badges */}
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {/* Date badge */}
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-sm ${theme.border} ${theme.primary} bg-white/5`}
            >
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {exp.dates}
            </span>

            {/* Location badge */}
            {location && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300 backdrop-blur-sm">
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {location}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="mb-5 text-sm leading-relaxed text-slate-400 sm:text-[0.938rem]">
            {exp.description}
          </p>

          {/* Highlights */}
          {exp.highlights && exp.highlights.length > 0 && (
            <div className="border-t border-white/[0.06] pt-4">
              <p className="mb-3 flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-widest text-slate-500">
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                Key Highlights
              </p>
              <ul className="space-y-2.5">
                {exp.highlights.map((highlight, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: isLeft ? 16 : -16 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.45,
                      ease: 'easeOut',
                      delay: 0.35 + i * 0.08,
                    }}
                    className="flex items-start gap-2.5 text-sm text-slate-300"
                  >
                    <span
                      className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${theme.gradient}`}
                    >
                      <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="leading-relaxed">{highlight}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </motion.div>

      {/* ──── Timeline Dot (center) ──── */}
      <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 z-20 flex items-center justify-center">
        {/* Outer pulse ring */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative"
        >
          {/* Pulsing glow */}
          {isInView && (
            <span
              className="absolute -inset-2 animate-ping rounded-full opacity-25"
              style={{ backgroundColor: accentHex }}
            />
          )}
          {/* Outer ring */}
          <span
            className="block h-5 w-5 rounded-full border-2 sm:h-6 sm:w-6"
            style={{
              borderColor: accentHex,
              boxShadow: isInView ? `0 0 12px ${accentHex}80, 0 0 24px ${accentHex}40` : 'none',
            }}
          >
            {/* Inner dot */}
            <span
              className={`block h-full w-full rounded-full bg-gradient-to-br ${theme.gradient} scale-[0.55]`}
            />
          </span>
        </motion.div>
      </div>

      {/* ──── Spacer for opposite side (desktop only) ──── */}
      <div className="hidden md:block md:w-[calc(50%-2.5rem)]" />
    </div>
  );
}

/* ──────────────────────────────────────────────
   Main Experience Section
   ────────────────────────────────────────────── */
interface ExperienceSectionProps {
  data: ResumeData;
  variant: string;
  palette: ColorPalette;
}

export default function ExperienceSection({ data, variant, palette }: ExperienceSectionProps) {
  const theme = getThemeColors(palette);
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-80px 0px' });
  const lineRef = useRef<HTMLDivElement>(null);
  const lineInView = useInView(lineRef, { once: true, margin: '-40px 0px' });

  /* Accent hex color for glow effects */
  const accentMap: Record<string, string> = {
    blue: '#3b82f6', purple: '#a855f7', emerald: '#10b981', rose: '#f43f5e',
    amber: '#f59e0b', slate: '#94a3b8', cyan: '#06b6d4', indigo: '#6366f1',
    orange: '#f97316', teal: '#14b8a6',
  };
  const accentHex = accentMap[theme.name] || '#06b6d4';

  return (
    <section
      id="experience"
      className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-[#0a0f1e] to-slate-950 px-4 py-20 sm:px-6 sm:py-28"
    >
      {/* ── Background ambience ── */}
      <div className="pointer-events-none absolute inset-0">
        {/* Radial gradient glow */}
        <div
          className="absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.07] blur-[120px]"
          style={{ background: accentHex }}
        />
        <div
          className="absolute bottom-0 left-1/4 h-[400px] w-[500px] translate-y-1/2 rounded-full opacity-[0.05] blur-[100px]"
          style={{ background: accentHex }}
        />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* ── Section Heading ── */}
        <div ref={headingRef} className="mb-16 text-center sm:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className={`mb-3 inline-block text-xs font-semibold uppercase tracking-[0.25em] ${theme.primary}`}
          >
            Career Journey
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl"
          >
            Experience
          </motion.h2>

          {/* Decorative gradient underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={headingInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className={`mx-auto mt-4 h-1 w-24 origin-center rounded-full bg-gradient-to-r ${theme.gradient}`}
            style={{
              boxShadow: `0 0 20px ${accentHex}60, 0 0 40px ${accentHex}30`,
            }}
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={headingInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mx-auto mt-5 max-w-lg text-sm text-slate-400 sm:text-base"
          >
            A timeline of roles, contributions, and growth across the tech landscape.
          </motion.p>
        </div>

        {/* ── Timeline ── */}
        <div ref={lineRef} className="relative">
          {/* Glowing vertical line */}
          {/* Static track */}
          <div className="absolute left-[9px] top-0 bottom-0 w-px bg-white/[0.06] md:left-1/2 md:-translate-x-px" />

          {/* Animated glowing line */}
          <motion.div
            initial={{ height: 0 }}
            animate={lineInView ? { height: '100%' } : {}}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="absolute left-[9px] top-0 w-px md:left-1/2 md:-translate-x-px"
            style={{
              background: `linear-gradient(to bottom, transparent, ${accentHex}, ${accentHex}80, transparent)`,
              boxShadow: `0 0 8px ${accentHex}60, 0 0 20px ${accentHex}30, 0 0 40px ${accentHex}15`,
            }}
          />

          {/* Timeline entries */}
          <div className="relative space-y-12 sm:space-y-16">
            {data.experience.map((exp, index) => (
              <TimelineCard
                key={index}
                exp={exp}
                index={index}
                isLeft={index % 2 === 0}
                theme={theme}
                accentHex={accentHex}
              />
            ))}
          </div>

          {/* Terminal dot at bottom */}
          <motion.div
            initial={{ scale: 0 }}
            animate={lineInView ? { scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 1.6 }}
            className="absolute -bottom-3 left-[5px] md:left-1/2 md:-translate-x-1/2"
          >
            <span
              className="block h-3 w-3 rounded-full"
              style={{
                background: accentHex,
                boxShadow: `0 0 10px ${accentHex}80`,
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
