import { ResumeData, SectionConfig } from '@/types/portfolio';

export const portfolioData: ResumeData = {
  personalInfo: {
    name: "Jainab Bee",
    title: "Computer Science Engineering (AI) Student",
    email: "jainabbee94@gmail.com",
    phone: "+919509310354",
    linkedin: "linkedin.com/in/jainab-bee",
    github: "github.com/jainab-bee",
    leetcode: "leetcode.com/u/Jainab1007",
    location: "Jaipur, India",
    summary: "An AI Engineering student passionate about Machine Learning, Deep Learning, NLP, and Generative AI. I enjoy building intelligent systems, experimenting with emerging AI technologies, and transforming complex problems into practical AI-powered solutions."
  },
  experience: [
    {
      title: "AI/ML Intern",
      company: "Infosys Springboard Virtual Internship 6.0 | Remote",
      dates: "Dec 2025 – Feb 2026",
      description: "Built AI-powered code review tools leveraging LLM capabilities.",
      highlights: [
        "Built an AI Code Reviewer and Quality Assistant leveraging LLM capabilities to automate code review, detect bugs, and provide quality improvement suggestions",
        "Designed intelligent feedback pipeline integrating static analysis with AI-driven recommendations for code optimization",
        "Gained hands-on experience with AI/ML frameworks, prompt engineering, and end-to-end project development"
      ]
    },
    {
      title: "Open Source Contributor",
      company: "GirlScript Summer of Code | Remote",
      dates: "Jul 2025 – Oct 2025",
      description: "Contributed to multiple open source repositories, improving functionality and resolving bugs across projects.",
      highlights: [
        "Contributed to multiple open source repositories, improving functionality and resolving bugs across projects",
        "Collaborated with a global developer community using Git, GitHub, and agile workflows"
      ]
    },
    {
      title: "Web Development Intern",
      company: "KistechnoSoftware | Inhouse",
      dates: "Jul 2025 – Aug 2025",
      description: "Developed full-stack Expense Tracker application using modern web technologies.",
      highlights: [
        "Developed full-stack Expense Tracker application using HTML, CSS, Bootstrap, JavaScript, MySQL, and Supabase",
        "Implemented user authentication, transaction management, and automated financial reporting features",
        "Designed responsive UI and integrated database with backend logic for seamless data flow and storage"
      ]
    }
  ],
  education: [
    {
      degree: "B.Tech – Computer Science Engineering (AI)",
      institution: "Swami Keshvanand Institute of Technology (SKIT), Jaipur",
      years: "2024 – 2028",
      gpa: "9.68/10.0"
    },
    {
      degree: "Higher Secondary Education (12th)",
      institution: "Board of Secondary Education, Rajasthan",
      years: "2023",
      gpa: "92.2%"
    },
    {
      degree: "Secondary Education (10th)",
      institution: "Board of Secondary Education, Rajasthan",
      years: "2021",
      gpa: "97%"
    }
  ],
  skills: {
    "Languages": ["C", "C++", "Java", "Python"],
    "Web Technologies": ["HTML5", "CSS3", "JavaScript", "Bootstrap", "React"],
    "Database": ["MySQL", "Supabase", "Database Design", "Query Optimization"],
    "AI/ML & Emerging Tech": ["Machine Learning", "LLMs", "Prompt Engineering", "Streamlit", "Deep Learning"],
    "Soft Skills": ["Leadership", "Time Management", "Quick Learning Ability", "Effective Communication"]
  },
  projects: [
    {
      name: "SafeQR – QR Code Safety Scanner",
      description: "Built Streamlit web app to detect phishing/malicious URLs from QR codes using ML and rule-based analysis. Trained Random Forest classifier on dataset and added 8 URL features with multi-library QR decoding and fallback support. Implemented UPI payment QR handling with safety scoring, confidence metrics, and per-check breakdown.",
      technologies: ["Python", "Streamlit", "Random Forest", "OpenCV"],
      link: "",
      github: "https://github.com/jainab-bee/SAFE_QR_ML"
    },
    {
      name: "Expense Tracker Application",
      description: "Built responsive financial management web app with full CRUD operations and data visualization dashboards. Designed database schema, optimized SQL queries, and configured cloud-based backend using Supabase.",
      technologies: ["HTML", "CSS", "Bootstrap", "JavaScript", "MySQL", "Supabase"],
      link: "",
      github: "https://github.com/jainab-bee/my_first_website"
    }
  ],
  certifications: [
    {
      title: "Problem Solving Through Programming in C",
      issuer: "NPTEL",
      year: "2026",
      badge: "Elite"
    },
    {
      title: "Programming in Modern C++",
      issuer: "NPTEL",
      year: "2025",
      badge: "Elite"
    },
    {
      title: "Artificial Intelligence with Machine Learning in Java",
      issuer: "Oracle Academy",
      year: "2026"
    },
    {
      title: "Cybersecurity Analyst Job Simulation",
      issuer: "Forage (TCS)",
      year: "2025"
    },
    {
      title: "Bronze Medal – Secured 9.74 SGPA in 2nd Semester, SKIT Jaipur",
      issuer: "SKIT Jaipur",
      year: "2025"
    }
  ]
};

export const sectionConfig: SectionConfig = {
  hero: "spotlight",
  about: "modern",
  experience: "timeline",
  projects: "showcase",
  skills: "categories",
  skillsDisplay: "separate",
  contact: "modern",
  colorPalette: "cyan"
};
