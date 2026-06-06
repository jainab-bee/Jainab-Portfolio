'use client';

import { ResumeData, ColorPalette } from '@/types/portfolio';
import { getThemeColors } from '@/utils/theme';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

/* ------------------------------------------------------------------ */
/*  3D Tilt Card wrapper – pure CSS perspective + Framer Motion values */
/* ------------------------------------------------------------------ */
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

  function handleMouse(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleLeave}
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
        rotateX,
        rotateY,
      }}
      className={`${className} transition-shadow duration-500 ${isHovered ? 'z-10' : ''}`}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  GitHub SVG icon                                                    */
/* ------------------------------------------------------------------ */
const GitHubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */
interface ProjectsSectionProps {
  data: ResumeData;
  variant: string;
  palette: ColorPalette;
}

export default function ProjectsSection({ data, palette }: ProjectsSectionProps) {
  const theme = getThemeColors(palette);
  const { projects } = data;

  /* ---- animation variants ---- */
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.18 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="projects"
      className="relative py-20 sm:py-28 px-4 sm:px-6 bg-slate-950 overflow-hidden"
    >
      {/* ---------- ambient background blobs ---------- */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className={`absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br ${theme.gradient} opacity-[0.07] blur-3xl`}
        />
        <div
          className={`absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-tl ${theme.gradient} opacity-[0.05] blur-3xl`}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* ---------- Section Heading ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16 sm:mb-20"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            Projects
          </h2>
          {/* decorative gradient underline */}
          <div className="mt-4 mx-auto flex items-center justify-center gap-1">
            <span
              className={`block h-1 w-8 rounded-full bg-gradient-to-r ${theme.gradient} opacity-60`}
            />
            <span
              className={`block h-1.5 w-16 rounded-full bg-gradient-to-r ${theme.gradient}`}
            />
            <span
              className={`block h-1 w-8 rounded-full bg-gradient-to-r ${theme.gradient} opacity-60`}
            />
          </div>
          <p className="mt-5 text-base sm:text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
            A showcase of applications I&apos;ve designed &amp; built
          </p>
        </motion.div>

        {/* ---------- Project Cards Grid ---------- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
        >
          {projects.map((project, index) => (
            <motion.div key={index} variants={cardVariants}>
              <TiltCard className="h-full">
                {/* --- Glassmorphism Card --- */}
                <div
                  className={`group relative h-full rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-2xl shadow-black/30
                    hover:border-white/[0.15] hover:shadow-black/50 transition-all duration-500 overflow-hidden`}
                >
                  {/* inner glow on hover */}
                  <div
                    className={`pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700
                      bg-gradient-to-br ${theme.gradient} blur-xl`}
                    style={{ opacity: 0 }}
                  />
                  {/* re-layer the card body so glow sits behind */}
                  <div className="relative z-10 h-full flex flex-col rounded-2xl bg-slate-900/90 backdrop-blur-xl">
                    {/* ---- Gradient Header Band ---- */}
                    <div
                      className={`relative h-2 w-full bg-gradient-to-r ${theme.gradient} rounded-t-2xl`}
                    />

                    <div className="flex-1 flex flex-col p-6 sm:p-8">
                      {/* Project number + name */}
                      <div className="flex items-start gap-4 mb-4">
                        <span
                          className={`shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${theme.gradient} text-white text-sm font-bold shadow-lg`}
                        >
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight pt-1">
                          {project.name}
                        </h3>
                      </div>

                      {/* Full description (multi-line) */}
                      <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-6">
                        {project.description}
                      </p>

                      {/* ---- Tech badges (pill-shaped with glow) ---- */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies?.map((tech, i) => (
                          <span
                            key={i}
                            className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide
                              bg-white/[0.06] ${theme.primary} border border-white/[0.08]
                              shadow-[0_0_12px_rgba(255,255,255,0.04)] hover:shadow-[0_0_20px_rgba(255,255,255,0.08)]
                              hover:bg-white/[0.1] transition-all duration-300 cursor-default`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Spacer pushes actions to bottom */}
                      <div className="flex-1" />

                      {/* ---- Actions row ---- */}
                      <div className="flex items-center justify-between pt-5 border-t border-white/[0.06]">
                        {/* Live link (if any) */}
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white
                              bg-gradient-to-r ${theme.gradient} hover:opacity-90 transition-opacity shadow-lg`}
                          >
                            View Live
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14 3h7m0 0v7m0-7L10 14"
                              />
                            </svg>
                          </a>
                        )}

                        {/* GitHub icon button */}
                        {project.github && (
                          <motion.a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.15, rotate: -8 }}
                            whileTap={{ scale: 0.92 }}
                            className={`inline-flex items-center justify-center w-11 h-11 rounded-xl
                              bg-white/[0.06] border border-white/[0.1] text-slate-300
                              hover:text-white hover:bg-white/[0.12] hover:border-white/[0.2]
                              transition-colors duration-300 shadow-lg`}
                            title="View on GitHub"
                          >
                            <GitHubIcon />
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
