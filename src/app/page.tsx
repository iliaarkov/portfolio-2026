'use client';

import { useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { projects, Project } from "../lib/projects";
import { ProjectCard } from "../components/ProjectCard";
import { ProjectModal } from "../components/ProjectModal";
import { ContactForm } from "../components/ContactForm";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  // Состояние для выбранного проекта (для модалки)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} font-sans bg-black text-white min-h-screen`}>
      <main className="flex flex-col items-center p-8">
        
        {/* Header / Navigation */}
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex mt-10">
          <h1 className="text-4xl font-bold italic tracking-tighter">
            ILIA ARKOV <span className="text-blue-500">.</span>
          </h1>
          <div className="flex gap-4 items-center">
             <span className="px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/50">
               Fullstack Developer
             </span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="mt-32 text-center">
          <h2 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
            Building digital products.
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Специализируюсь на React, Node.js и современных веб-технологиях.
            Ранее создавал продукты для винного кооператива и школы контраварийного вождения.
          </p>
        </div>

        {/* Projects */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
          {projects.map((project) => (
            <div 
              key={project.id} 
              onClick={() => setSelectedProject(project)} 
              className="cursor-pointer"
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        {/* Modal Windows */}
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}

        {/* About / Skills */}
        <section className="mt-48 w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-bold mb-8 text-blue-500 font-mono italic">01. ABOUT ME</h2>
            <div className="space-y-4 text-zinc-400 leading-relaxed">
              <p>
                Студент-отличник <span className="text-white font-medium">РТУ МИРЭА</span> по специальности «Прикладная информатика». 
                Мой путь в IT начался с разработки систем на PHP и MySQL, что дало мне прочный фундамент в понимании архитектуры данных.
              </p>
              <p>
                Помимо кодинга, я имею опыт в <span className="text-white font-medium">профессиональном копирайтинге и контент-менеджменте</span> (проекты 12SIRENS, Зелёный ДОМ). 
                Это позволяет мне создавать продукты, которые не только работают технически, но и эффективно общаются с пользователем.
              </p>
              <p>
                Активно использую и обучаю AI-модели, применяя навыки глубокого промпт-инжиниринга для ускорения разработки.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-8 text-blue-500 font-mono italic">02. SKILLS</h2>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-widest">Frontend</h4>
                <ul className="text-zinc-500 text-sm space-y-2 font-mono">
                  <li>— React / Next.js</li>
                  <li>— TypeScript</li>
                  <li>— Tailwind CSS</li>
                  <li>— SCSS / Figma</li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-widest">Backend</h4>
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

        {/* Contact Form */}
        <ContactForm />

        {/* Footer */}
        <footer className="mt-32 pb-10 text-zinc-600 text-xs tracking-widest uppercase font-mono">
          © 2026 Ilia Arkov. Built with Next.js & TypeScript.
        </footer>
      </main>
    </div>
  );
}