import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' })

export const metadata: Metadata = {
  title: 'Jainab Bee | CS Engineering (AI) Student & Full-Stack Developer',
  description: 'Portfolio of Jainab Bee - Computer Science Engineering (AI) student with expertise in AI/ML, web development, and open source contribution. CGPA: 9.68/10. Infosys Springboard & KistechnoSoftware intern.',
  keywords: ['Jainab Bee', 'Portfolio', 'AI/ML', 'Web Developer', 'Computer Science', 'SKIT Jaipur', 'Full Stack Developer', 'Python', 'React'],
  authors: [{ name: 'Jainab Bee' }],
  openGraph: {
    title: 'Jainab Bee | CS Engineering (AI) Student & Developer',
    description: 'Explore the portfolio of Jainab Bee - AI/ML enthusiast, web developer, and open source contributor.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💎</text></svg>" />
      </head>
      <body className={`${inter.variable} ${outfit.variable} font-sans bg-slate-950 text-white antialiased`}>
        {children}
      </body>
    </html>
  )
}
