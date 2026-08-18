'use client';

import { useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { projects, Project } from "../lib/projects";
import { ProjectCard } from "../components/ProjectCard";
import { ProjectModal } from "../components/ProjectModal";
import { ContactForm } from "../components/ContactForm";
import { translations, Locale } from "../lib/translations";
import { LangSwitcher } from "../components/LangSwitcher";
import { Reveal } from "../components/Reveal";
import Link from "next/link";

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
				<Reveal>
					<div className="mt-32 text-center">
						<h2 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
							{t.heroTitle}
						</h2>
						<p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
							{t.heroSub}
						</p>
					</div>
				</Reveal>

        {/* Projects Grid */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
          {projects.map((project) => (
						<Reveal key={project.id}>
							<div 
								key={project.id} 
								onClick={() => setSelectedProject(project)} 
								className="cursor-pointer"
							>
								<ProjectCard project={project} lang={lang} />
							</div>
						</Reveal>
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
          <Reveal>
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
					</Reveal>

          {/* Skills Column */}
					<Reveal>
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
					</Reveal>
        </section>

				{/* Playground */}
				<Reveal>
					<section className="mt-48 w-full max-w-5xl">
						<h2 className="text-3xl font-bold mb-12 text-blue-500 font-mono italic underline decoration-zinc-800 underline-offset-8">
							03. TECHNICAL PLAYGROUND
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<Link href="/playground/currency">
								<div className="group p-8 rounded-3xl border border-zinc-800 bg-zinc-900/10 hover:border-blue-500/50 transition-all cursor-pointer">
									<div className="flex justify-between items-start mb-6">
										<div className="p-3 bg-blue-500/10 rounded-2xl text-blue-500">
												<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
										</div>
										<span className="text-[10px] font-mono text-zinc-600 group-hover:text-zinc-300 transition-colors uppercase tracking-widest">Interactive Demo</span>
									</div>
									<h3 className="text-xl font-bold mb-3 text-white">Currency Converter API</h3>
									<p className="text-zinc-500 text-sm leading-relaxed mb-6">
										Интерактивный виджет для расчета курсов валют в реальном времени. Демонстрация работы с внешними REST API и управления состоянием React.
									</p>
									<span className="text-xs font-bold text-blue-500 group-hover:translate-x-2 transition-transform inline-block uppercase tracking-tighter">
										Try Tool →
									</span>
								</div>
							</Link>
							
							{/* Здесь можно будет добавить второй Playground позже (например, Task Board) */}
							<div className="p-8 rounded-3xl border border-zinc-800 bg-zinc-900/5 opacity-50 flex items-center justify-center italic text-zinc-700 text-sm">
								Next experiment in progress...
							</div>
						</div>
					</section>
				</Reveal>

        {/* Contact Form Component */}
				<Reveal>
        	<ContactForm lang={lang} />
				</Reveal>
        {/* Footer */}
        <footer className="mt-32 pb-10 text-zinc-600 text-xs tracking-widest uppercase font-mono">
          {t.footer}
        </footer>
      </main>
    </div>
  );
}