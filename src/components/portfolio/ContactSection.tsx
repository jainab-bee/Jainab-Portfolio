'use client';

import { motion } from 'framer-motion';
import { ResumeData, ColorPalette } from '@/types/portfolio';
import { getThemeColors } from '@/utils/theme';

/* ───────────────────────── SVG Icon Components ───────────────────────── */

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="3" />
    <path d="M22 7l-10 7L2 7" />
  </svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const LeetCodeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.483 0a1.374 1.374 0 00-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 00-1.209 2.104 5.35 5.35 0 00-.125.513 5.527 5.527 0 00.062 2.362 5.83 5.83 0 00.349 1.017 5.938 5.938 0 001.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 00-1.951-.003l-2.396 2.392a3.021 3.021 0 01-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 01.066-.523 2.545 2.545 0 01.619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 00-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0013.483 0zm-2.866 12.815a1.38 1.38 0 00-1.38 1.382 1.38 1.38 0 001.38 1.382H20.79a1.38 1.38 0 001.38-1.382 1.38 1.38 0 00-1.38-1.382z" />
  </svg>
);

/* ───────────────────────── Animation Variants ───────────────────────── */

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const footerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.5, ease: 'easeOut' },
  },
};

/* ────────────────────── Contact Card Data ────────────────────── */

interface ContactItem {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  external: boolean;
}

const contactItems: ContactItem[] = [
  {
    icon: <EmailIcon />,
    label: 'Email',
    value: 'jainabbee94@gmail.com',
    href: 'mailto:jainabbee94@gmail.com',
    external: false,
  },
  {
    icon: <PhoneIcon />,
    label: 'Phone',
    value: '+91 9509310354',
    href: 'tel:+919509310354',
    external: false,
  },
  {
    icon: <LinkedInIcon />,
    label: 'LinkedIn',
    value: 'linkedin.com/in/jainab-bee',
    href: 'https://linkedin.com/in/jainab-bee',
    external: true,
  },
  {
    icon: <GitHubIcon />,
    label: 'GitHub',
    value: 'github.com/jainab-bee',
    href: 'https://github.com/jainab-bee',
    external: true,
  },
  {
    icon: <LeetCodeIcon />,
    label: 'LeetCode',
    value: 'leetcode.com/u/Jainab1007',
    href: 'https://leetcode.com/u/Jainab1007',
    external: true,
  },
];

/* ───────────── Glassmorphism Contact Card ───────────── */

function GlassCard({
  item,
  index,
  theme,
}: {
  item: ContactItem;
  index: number;
  theme: ReturnType<typeof getThemeColors>;
}) {
  return (
    <motion.a
      href={item.href}
      target={item.external ? '_blank' : undefined}
      rel={item.external ? 'noopener noreferrer' : undefined}
      variants={cardVariants}
      whileHover={{ scale: 1.045, y: -6 }}
      whileTap={{ scale: 0.97 }}
      className="group relative flex flex-col items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 sm:p-8 backdrop-blur-xl text-center transition-shadow duration-500 hover:shadow-[0_0_40px_-6px] hover:shadow-current focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      {/* Glow orb behind icon */}
      <span
        className={`pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 h-20 w-20 rounded-full bg-gradient-to-br ${theme.gradient} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-40`}
      />

      {/* Icon */}
      <span className={`relative z-10 ${theme.icon} transition-transform duration-300 group-hover:scale-110`}>
        {item.icon}
      </span>

      {/* Label */}
      <span className="text-xs font-medium uppercase tracking-widest text-slate-500">
        {item.label}
      </span>

      {/* Value / Link */}
      <span className={`text-sm font-semibold ${theme.primary} truncate max-w-full transition-colors duration-300 group-hover:text-white`}>
        {item.value}
      </span>

      {/* Bottom gradient line on hover */}
      <span
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 bg-gradient-to-r ${theme.gradient} transition-all duration-500 group-hover:w-3/4 rounded-full`}
      />
    </motion.a>
  );
}

/* ═══════════════════════ Main Component ═══════════════════════ */

interface ContactSectionProps {
  data: ResumeData;
  variant: string;
  palette: ColorPalette;
}

export default function ContactSection({ data, variant, palette }: ContactSectionProps) {
  const theme = getThemeColors(palette);
  // variant kept for interface compat — single premium design
  void variant;
  void data;

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-slate-950 px-4 py-24 sm:px-6 sm:py-32 text-white"
    >
      {/* ── Ambient background glow ── */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className={`absolute -top-40 left-1/4 h-[480px] w-[480px] rounded-full bg-gradient-to-br ${theme.gradient} opacity-[0.07] blur-[120px]`}
        />
        <div
          className={`absolute -bottom-40 right-1/4 h-[420px] w-[420px] rounded-full bg-gradient-to-br ${theme.gradient} opacity-[0.05] blur-[100px]`}
        />
      </div>

      <motion.div
        className="relative z-10 mx-auto max-w-5xl"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {/* ── Section Heading ── */}
        <motion.div variants={headingVariants} className="mb-6 text-center">
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Get In Touch
          </h2>
          {/* Decorative gradient underline */}
          <motion.div
            className={`mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r ${theme.gradient}`}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>

        {/* ── Call-to-action ── */}
        <motion.p
          variants={headingVariants}
          className="mx-auto mb-16 max-w-2xl text-center text-lg leading-relaxed text-slate-400 sm:text-xl"
        >
          Let&apos;s connect and build something great together
        </motion.p>

        {/* ── Contact Cards Grid ── */}
        <motion.div
          variants={sectionVariants}
          className="mb-20 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {contactItems.map((item, i) => (
            <GlassCard key={item.label} item={item} index={i} theme={theme} />
          ))}
        </motion.div>

        {/* ── Footer ── */}
        <motion.footer
          variants={footerVariants}
          className="border-t border-white/[0.06] pt-8 text-center"
        >
          <p className="text-sm text-slate-500">
              Jainab Bee.
          </p>
          <p className="mt-1 text-xs text-slate-600">
            AI / ML enthusiast 
          </p>
        </motion.footer>
      </motion.div>
    </section>
  );
}
