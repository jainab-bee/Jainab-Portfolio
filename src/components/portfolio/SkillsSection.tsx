'use client';

import { motion } from 'framer-motion';
import { ResumeData, ColorPalette } from '@/types/portfolio';
import { getThemeColors } from '@/utils/theme';

/* ─────────────────────────── Category Icons (inline SVGs) ─────────────────────────── */

const CategoryIcons: Record<string, React.ReactNode> = {
  Languages: (
    <svg
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
      <line x1="14" y1="4" x2="10" y2="20" />
    </svg>
  ),
  'Web Technologies': (
    <svg
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z" />
    </svg>
  ),
  Database: (
    <svg
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  'AI/ML & Emerging Tech': (
    <svg
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" rx="1" />
      <line x1="9" y1="2" x2="9" y2="4" />
      <line x1="15" y1="2" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="22" />
      <line x1="15" y1="20" x2="15" y2="22" />
      <line x1="2" y1="9" x2="4" y2="9" />
      <line x1="2" y1="15" x2="4" y2="15" />
      <line x1="20" y1="9" x2="22" y2="9" />
      <line x1="20" y1="15" x2="22" y2="15" />
    </svg>
  ),
  'Soft Skills': (
    <svg
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
};

/** Return an icon for a category, falling back to a generic star if none matched */
function getCategoryIcon(categoryName: string): React.ReactNode {
  return (
    CategoryIcons[categoryName] ?? (
      <svg
        className="w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    )
  );
}

/* ─────────────────────────── Animation Variants ─────────────────────────── */

const sectionVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 80, damping: 18 },
  },
};

const pillContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.15 },
  },
};

const pillVariants = {
  hidden: { opacity: 0, scale: 0.7, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 120, damping: 14 },
  },
};

/* ─────────────────────────── Skill Pill Component ─────────────────────────── */

function SkillPill({ skill, theme }: { skill: string; theme: ReturnType<typeof getThemeColors> }) {
  return (
    <motion.span
      variants={pillVariants}
      whileHover={{ scale: 1.12, y: -2 }}
      className={`
        relative cursor-default select-none
        px-4 py-2 rounded-full text-sm font-medium
        bg-white/[0.06] backdrop-blur-md
        border border-white/10
        text-slate-200
        transition-shadow duration-300
        hover:border-white/25
        hover:shadow-[0_0_18px_rgba(34,211,238,0.25)]
        hover:text-white
      `}
      style={{ willChange: 'transform' }}
    >
      {/* subtle gradient glow behind text */}
      <span
        className={`absolute inset-0 rounded-full opacity-0 hover:opacity-100 bg-gradient-to-r ${theme.gradient} blur-[1px] transition-opacity duration-300 -z-10`}
        aria-hidden
      />
      {skill}
    </motion.span>
  );
}

/* ─────────────────────────── Category Card ─────────────────────────── */

function CategoryCard({
  categoryName,
  skills,
  theme,
}: {
  categoryName: string;
  skills: string[];
  theme: ReturnType<typeof getThemeColors>;
}) {
  return (
    <motion.div
      variants={cardVariants}
      className="group relative rounded-2xl p-[1px] overflow-hidden"
    >
      {/* animated border gradient */}
      <div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${theme.gradient} opacity-20 group-hover:opacity-40 transition-opacity duration-500`}
        aria-hidden
      />

      {/* card body – glassmorphism */}
      <div className="relative rounded-2xl bg-slate-900/70 backdrop-blur-xl border border-white/[0.08] p-6 sm:p-8 h-full flex flex-col">
        {/* header */}
        <div className="flex items-center gap-3 mb-6">
          <div
            className={`flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${theme.gradient} flex items-center justify-center text-white shadow-lg shadow-cyan-500/20`}
          >
            {getCategoryIcon(categoryName)}
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-white tracking-tight">
            {categoryName}
          </h3>
        </div>

        {/* skill pills */}
        <motion.div
          variants={pillContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-wrap gap-2.5"
        >
          {skills.map((skill) => (
            <SkillPill key={skill} skill={skill} theme={theme} />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────── Main Section ─────────────────────────── */

interface SkillsSectionProps {
  data: ResumeData;
  variant: string;
  palette: ColorPalette;
}

export default function SkillsSection({ data, variant: _variant, palette }: SkillsSectionProps) {
  const theme = getThemeColors(palette);
  const skills = data.skills;
  const categories = Object.entries(skills).filter(
    ([, list]) => list && list.length > 0
  );

  if (categories.length === 0) return null;

  return (
    <section
      id="skills"
      className="relative py-20 sm:py-28 px-4 sm:px-6 bg-slate-950 text-white overflow-hidden"
    >
      {/* ambient background glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-cyan-500/[0.06] blur-[120px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-purple-600/[0.05] blur-[100px]"
        aria-hidden
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* ── Section Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-14 sm:mb-20"
        >
          <p className={`${theme.primary} font-mono text-xs sm:text-sm tracking-widest mb-3 uppercase`}>
            Expertise
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
            Technical Skills
          </h2>
          {/* decorative gradient underline */}
          <div className="mt-4 mx-auto flex items-center justify-center gap-1.5">
            <span className={`block h-1 w-8 rounded-full bg-gradient-to-r ${theme.gradient}`} />
            <span className={`block h-1 w-16 rounded-full bg-gradient-to-r ${theme.gradient} opacity-80`} />
            <span className={`block h-1 w-8 rounded-full bg-gradient-to-r ${theme.gradient} opacity-50`} />
          </div>
        </motion.div>

        {/* ── Skills Grid ── */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {categories.map(([categoryName, skillList]) => (
            <CategoryCard
              key={categoryName}
              categoryName={categoryName}
              skills={skillList}
              theme={theme}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
