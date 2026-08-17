'use client';

import { useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { projects, Project } from "../lib/projects";
import { ProjectCard } from "../components/ProjectCard";
import { ProjectModal } from "../components/ProjectModal";
import { ContactForm } from "../components/ContactForm";
import { translations, Locale } from "../lib/translations";
import { LangSwitcher } from "../components/LangSwitcher";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [lang, setLang] = useState<Locale>('ru');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const t = translations[lang];

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} font-sans bg-black text-white min-h-screen`}>
      <main className="flex flex-col items-center p-8">
        
        {/* Header */}
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex mt-10">
          <h1 className="text-4xl font-bold italic tracking-tighter">
            ILIA ARKOV <span className="text-blue-500">.</span>
          </h1>
          <div className="flex gap-6 items-center">
            <LangSwitcher currentLang={lang} setLang={setLang} />
            <span className="hidden md:inline px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/50 text-zinc-300">
              {t.role}
            </span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="mt-32 text-center">
          <h2 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
            {t.heroTitle}
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            {t.heroSub}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
          {projects.map((project) => (
            <div 
              key={project.id} 
              onClick={() => setSelectedProject(project)} 
              className="cursor-pointer"
            >
              <ProjectCard project={project} lang={lang} />
            </div>
          ))}
        </div>

        {/* Modal Logic */}
        {selectedProject && (
          <ProjectModal 
            project={selectedProject}
            lang={lang}
            onClose={() => setSelectedProject(null)} 
          />
        )}

        {/* About Section */}
        <section className="mt-48 w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-16 border-t border-zinc-900 pt-24">
          <div>
            <h2 className="text-3xl font-bold mb-8 text-blue-500 font-mono italic">
              {t.aboutTitle}
            </h2>
            <div className="space-y-4 text-zinc-400 leading-relaxed">
              <p>{t.aboutText1}</p>
              <p>{t.aboutText2}</p>
              <p>{t.aboutText3}</p>
            </div>
          </div>

          {/* Skills Column */}
          <div>
            <h2 className="text-3xl font-bold mb-8 text-blue-500 font-mono italic">
              {t.skillsTitle}
            </h2>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-widest">{t.frontend}</h4>
                <ul className="text-zinc-500 text-sm space-y-2 font-mono">
                  <li>— React / Next.js</li>
                  <li>— TypeScript</li>
                  <li>— Tailwind CSS</li>
                  <li>— Figma</li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-widest">{t.backend}</h4>
                <ul className="text-zinc-500 text-sm space-y-2 font-mono">
                  <li>— Node.js</li>
                  <li>— PHP / MySQL</li>
                  <li>— Python / C++</li>
                  <li>— REST API</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Component */}
        <ContactForm lang={lang} />

        {/* Footer */}
        <footer className="mt-32 pb-10 text-zinc-600 text-xs tracking-widest uppercase font-mono">
          {t.footer}
        </footer>
      </main>
    </div>
  );
}