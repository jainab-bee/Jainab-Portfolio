'use client';

import { motion } from 'framer-motion';
import { ColorPalette } from '@/types/portfolio';
import { getThemeColors } from '@/utils/theme';

interface Certification {
  title: string;
  issuer: string;
  year: string;
  badge?: string;
}

const defaultCertifications: Certification[] = [
  {
    title: 'Problem Solving Through Programming in C',
    issuer: 'NPTEL',
    year: '2026',
    badge: 'Elite',
  },
  {
    title: 'Programming in Modern C++',
    issuer: 'NPTEL',
    year: '2025',
    badge: 'Elite',
  },
  {
    title: 'Artificial Intelligence with Machine Learning in Java',
    issuer: 'Oracle Academy',
    year: '2026',
  },
  {
    title: 'Cybersecurity Analyst Job Simulation',
    issuer: 'Forage (TCS)',
    year: '2025',
  },
  {
    title: 'Bronze Medal – Secured 9.74 SGPA in 2nd Semester, SKIT Jaipur',
    issuer: 'SKIT Jaipur',
    year: '2025',
    badge: 'Bronze Medal',
  },
];

/* ─── Icon helpers ─── */

const TrophyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);

const CertificateIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="18" height="14" rx="2" />
    <path d="M3 7h18" />
    <path d="M7 17v4" />
    <path d="M17 17v4" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const MedalIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15" />
    <path d="M11 12 5.12 2.2" />
    <path d="m13 12 5.88-9.8" />
    <path d="M8 7h8" />
    <circle cx="12" cy="17" r="5" />
    <path d="M12 18v-2h-.5" />
  </svg>
);

function getIcon(cert: Certification) {
  const isBronze =
    cert.badge?.toLowerCase().includes('bronze') ||
    cert.title.toLowerCase().includes('bronze');
  if (isBronze) return <MedalIcon />;
  if (cert.badge === 'Elite') return <TrophyIcon />;
  return <CertificateIcon />;
}

function isBronzeMedal(cert: Certification) {
  return (
    cert.badge?.toLowerCase().includes('bronze') ||
    cert.title.toLowerCase().includes('bronze')
  );
}

/* ─── Animation variants ─── */

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

/* ─── Card Component ─── */

const CertCard = ({
  cert,
  theme,
}: {
  cert: Certification;
  theme: ReturnType<typeof getThemeColors>;
}) => {
  const bronze = isBronzeMedal(cert);

  return (
    <motion.div
      variants={cardVariants}
      className={`group relative rounded-2xl p-[1px] transition-all duration-500 ${
        bronze
          ? 'bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-500 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40'
          : 'bg-gradient-to-br from-slate-700/60 via-slate-700/30 to-slate-700/60 hover:from-cyan-500/60 hover:via-blue-500/40 hover:to-cyan-500/60'
      }`}
    >
      {/* Glassmorphism inner card */}
      <div
        className={`relative h-full rounded-2xl p-6 sm:p-7 backdrop-blur-xl transition-all duration-500 group-hover:-translate-y-1 ${
          bronze
            ? 'bg-gradient-to-br from-amber-950/80 via-slate-900/90 to-slate-900/90'
            : 'bg-slate-900/80'
        }`}
      >
        {/* Subtle glow */}
        <div
          className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
            bronze
              ? 'bg-gradient-to-br from-amber-500/5 via-transparent to-yellow-500/5'
              : 'bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5'
          }`}
        />

        {/* Badge / Year pill */}
        <div className="flex items-center justify-between mb-4 relative z-10">
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide ${
              bronze
                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                : `bg-slate-800/80 ${theme.primary} border border-slate-700/50`
            }`}
          >
            {getIcon(cert)}
            <span>{cert.badge || 'Certified'}</span>
          </div>
          <span className="text-xs text-slate-500 font-mono">{cert.year}</span>
        </div>

        {/* Title */}
        <h3
          className={`text-base sm:text-lg font-bold mb-2 leading-snug relative z-10 ${
            bronze
              ? 'bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 bg-clip-text text-transparent'
              : 'text-white group-hover:text-cyan-50'
          }`}
        >
          {cert.title}
        </h3>

        {/* Issuer */}
        <p
          className={`text-sm relative z-10 ${
            bronze ? 'text-amber-400/70' : 'text-slate-400'
          }`}
        >
          {cert.issuer}
        </p>

        {/* Bronze sparkle decoration */}
        {bronze && (
          <div className="absolute top-3 right-3 opacity-30 group-hover:opacity-60 transition-opacity">
            <svg
              className="w-8 h-8 text-amber-400"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2l2.09 6.26L20.18 9l-5.09 3.74L16.18 19 12 15.27 7.82 19l1.09-6.26L3.82 9l6.09-.74L12 2z" />
            </svg>
          </div>
        )}
      </div>
    </motion.div>
  );
};

/* ─── Main Section ─── */

interface CertificationsSectionProps {
  data: any;
  palette: string;
}

export default function CertificationsSection({
  data,
  palette,
}: CertificationsSectionProps) {
  const theme = getThemeColors(palette as ColorPalette);
  const certifications: Certification[] =
    data?.certifications && Array.isArray(data.certifications) && data.certifications.length > 0
      ? data.certifications
      : defaultCertifications;

  return (
    <section
      id="certifications"
      className="relative py-20 sm:py-28 px-4 sm:px-6 bg-slate-950 text-white overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-cyan-500/[0.03] rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-blue-500/[0.03] rounded-full blur-3xl" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Heading */}
        <motion.div
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-14 sm:mb-20"
        >
          <p
            className={`${theme.primary} font-mono text-xs sm:text-sm mb-3 tracking-widest uppercase`}
          >
            Recognition
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400 mb-4">
            Certifications &amp; Achievements
          </h2>
          {/* Decorative gradient underline */}
          <div className="flex justify-center">
            <div
              className={`h-1 w-24 sm:w-32 rounded-full bg-gradient-to-r ${theme.gradient} relative`}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 blur-sm opacity-60" />
            </div>
          </div>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mt-4">
            Industry certifications and academic honors that reflect my
            dedication to continuous learning
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {certifications.map((cert, index) => (
            <CertCard key={index} cert={cert} theme={theme} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
