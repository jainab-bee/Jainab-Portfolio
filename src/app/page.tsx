'use client';

import { portfolioData, sectionConfig } from '@/data/portfolio';
import HeroSection from '@/components/portfolio/HeroSection';
import AboutSection from '@/components/portfolio/AboutSection';
import ExperienceSection from '@/components/portfolio/ExperienceSection';
import ProjectsSection from '@/components/portfolio/ProjectsSection';
import SkillsSection from '@/components/portfolio/SkillsSection';
import CertificationsSection from '@/components/portfolio/CertificationsSection';
import ContactSection from '@/components/portfolio/ContactSection';

// Helper function to check if skills have any data
function hasSkillsData(skills: typeof portfolioData.skills): boolean {
  if (!skills) return false;
  if (typeof skills !== 'object') return false;
  return Object.values(skills).some(
    (skillList) => Array.isArray(skillList) && skillList.length > 0
  );
}

// Helper function to check if contact info exists
function hasContactData(personalInfo: typeof portfolioData.personalInfo): boolean {
  return !!(
    personalInfo.email ||
    personalInfo.phone ||
    personalInfo.linkedin ||
    personalInfo.github ||
    personalInfo.location
  );
}

export default function Home() {
  const data = portfolioData;
  const config = sectionConfig;
  
  const showAbout = !!(data.personalInfo.summary && data.personalInfo.summary.trim());
  const showExperience = data.experience && data.experience.length > 0;
  const showProjects = data.projects && data.projects.length > 0;
  const showSkills = hasSkillsData(data.skills);
  const showCertifications = data.certifications && data.certifications.length > 0;
  const showContact = hasContactData(data.personalInfo);

  return (
    <main className="min-h-screen bg-slate-950">
      {/* Hero - Full viewport landing */}
      <HeroSection data={data} variant={config.hero} palette={config.colorPalette} />
      
      {/* About Me + Education */}
      {showAbout && (
        <section id="about">
          <AboutSection data={data} variant={config.about} palette={config.colorPalette} />
        </section>
      )}

      {/* Professional Experience Timeline */}
      {showExperience && (
        <section id="experience">
          <ExperienceSection data={data} variant={config.experience} palette={config.colorPalette} />
        </section>
      )}

      {/* Featured Projects */}
      {showProjects && (
        <section id="projects">
          <ProjectsSection data={data} variant={config.projects} palette={config.colorPalette} />
        </section>
      )}

      {/* Technical Skills */}
      {showSkills && (
        <section id="skills">
          <SkillsSection data={data} variant={config.skills} palette={config.colorPalette} />
        </section>
      )}

      {/* Certifications & Achievements */}
      {showCertifications && (
        <section id="certifications">
          <CertificationsSection data={data} palette={config.colorPalette} />
        </section>
      )}

      {/* Contact & Footer */}
      {showContact && (
        <section id="contact">
          <ContactSection data={data} variant={config.contact} palette={config.colorPalette} />
        </section>
      )}
    </main>
  );
}
