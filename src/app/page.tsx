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
      <main className="flex flex-col items-center p-6 md:p-12">
        
        {/* Header */}
        <div className="w-full max-w-5xl flex items-center justify-between font-mono text-sm mt-4">
          <h1 className="text-3xl font-bold italic tracking-tighter">
            ILIA ARKOV <span className="text-blue-500">.</span>
          </h1>
          <div className="flex gap-6 items-center">
            <LangSwitcher currentLang={lang} setLang={setLang} />
            <span className="hidden md:inline px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/50 text-zinc-400 text-xs">
              {t.role}
            </span>
          </div>
        </div>

        {/* Hero Section */}
				<section className="w-full max-w-5xl mt-32 md:mt-48 text-center">
					<Reveal>
						<div className="mt-32 text-center">
							<h2 className="text-5xl md:text-8xl font-extrabold mb-8 bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent leading-[1.1]">
								{t.heroTitle}
							</h2>
							<p className="text-xl text-zinc-400 max-w-2xl leading-relaxed">
								{t.heroSub}
							</p>
						</div>
					</Reveal>
				</section>

				{/* Projects Grid */}
				<section className="w-full max-w-5xl mt-48">
					<Reveal>
						<h2 className="text-2xl font-bold mb-12 text-blue-500 font-mono italic uppercase tracking-tighter decoration-zinc-800 underline underline-offset-[12px]">
							{t.featuredProjTitle}
						</h2>
					</Reveal>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{projects.map((project) => (
							<Reveal key={project.id}>
								<div onClick={() => setSelectedProject(project)} className="cursor-pointer h-full">
									<ProjectCard project={project} lang={lang} />
								</div>
							</Reveal>
						))}
					</div>
				</section>

				{/* Modal Logic */}
				{selectedProject && (
					<ProjectModal 
						project={selectedProject}
						lang={lang}
						onClose={() => setSelectedProject(null)} 
					/>
				)}

				{/* About Section */}
				<section className="w-full max-w-5xl mt-48 grid grid-cols-1 md:grid-cols-2 gap-20 border-t border-zinc-900 pt-24">
					<Reveal>
						<h2 className="text-2xl font-bold mb-10 text-blue-500 font-mono italic uppercase tracking-tighter">{t.aboutTitle}</h2>
						<div className="space-y-6 text-zinc-400 leading-relaxed text-base">
							<p>{t.aboutText1}</p>
							<p>{t.aboutText2}</p>
							<p>{t.aboutText3}</p>
						</div>
					</Reveal>

					{/* Skills Column */}
					<Reveal>
						<h2 className="text-2xl font-bold mb-10 text-blue-500 font-mono italic uppercase tracking-tighter">{t.skillsTitle}</h2>
						<div className="grid grid-cols-2 gap-10">
							<div className="space-y-4">
								<h4 className="text-white font-bold text-[10px] uppercase tracking-[0.2em]">{t.frontend}</h4>
								<ul className="text-zinc-500 text-xs space-y-3 font-mono">
									<li>— React / Next.js</li>
									<li>— TypeScript</li>
									<li>— Tailwind CSS</li>
									<li>— Figma</li>
								</ul>
							</div>
							<div className="space-y-4">
								<h4 className="text-white font-bold text-[10px] uppercase tracking-[0.2em]">{t.backend}</h4>
								<ul className="text-zinc-500 text-xs space-y-3 font-mono">
									<li>— Node.js</li>
									<li>— PHP / MySQL</li>
									<li>— Python / C++</li>
									<li>— REST API</li>
								</ul>
							</div>
						</div>
					</Reveal>
				</section>

				{/* Playground */}
				<section className="w-full max-w-5xl mt-48 border-t border-zinc-900 pt-24 text-left">
					<Reveal>
						<h2 className="text-2xl font-bold mb-12 text-blue-500 font-mono italic uppercase tracking-tighter">
							{t.playgroundTitle}
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<Link href="/playground/currency">
								<div className="group p-8 rounded-3xl border border-zinc-800 bg-zinc-900/20 hover:border-blue-500/50 transition-all cursor-pointer">
									<h3 className="text-xl font-bold mb-4 text-white uppercase italic">{t.converterTitle}</h3>
									<p className="text-zinc-500 text-sm mb-8 leading-relaxed">{t.converterSub}</p>
									<span className="text-[10px] font-bold text-blue-500 group-hover:translate-x-2 transition-transform inline-block font-mono uppercase tracking-widest">
										{t.tryTool}
									</span>
								</div>
							</Link>
							<div className="p-8 rounded-3xl border border-zinc-800 bg-zinc-900/5 opacity-50 flex items-center justify-center italic text-zinc-700 text-xs font-mono uppercase tracking-widest">
								[ Next_Experiment_In_Progress ]
							</div>
						</div>
					</Reveal>
				</section>

				{/* Contact Form Component */}
				<section className="w-full max-w-5xl mt-48 mb-32 border-t border-zinc-900 pt-24">
					<Reveal>
						<ContactForm lang={lang} />
					</Reveal>
				</section>
				{/* Footer */}
				<footer className="w-full max-w-5xl pb-10 text-zinc-700 text-[10px] tracking-[0.3em] uppercase font-mono border-t border-zinc-900 pt-10">
					{t.footer}
				</footer>
			</main>
			{selectedProject && (
				<ProjectModal project={selectedProject} lang={lang} onClose={() => setSelectedProject(null)} />
			)}
		</div>
	);
}