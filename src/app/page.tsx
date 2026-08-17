import { Geist, Geist_Mono } from "next/font/google";
import { projects } from "../lib/projects";
import { ProjectCard } from "../components/ProjectCard";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],

});

export default function Home() {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
      <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-black text-white">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          <h1 className="text-4xl font-bold italic tracking-tighter">

            ILIA ARKOV <span className="text-blue-500">.</span>
          </h1>
          <div className="flex gap-4 items-center">
             <span className="px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/50">
               Fullstack Developer
             </span>
          </div>
        </div>

        <div className="mt-24 text-center">
          <h2 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
            Building digital products.
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Специализируюсь на React, Node.js и современных веб-технологиях.

            Ранее создавал проекты для винного кооператива, школы вождения.
          </p>
        </div>
				{/* Projects */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
        </div>

				{/* About */}
				<section className="mt-32 w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-16">
					<div>
						<h2 className="text-3xl font-bold mb-6 text-blue-500 font-mono italic">01. ABOUT ME</h2>
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
								Активно использую и обучаю AI-модели, применяя навыки «вайб-кодинга» и глубокого промпт-инжиниринга для ускорения разработки.
							</p>
						</div>
					</div>

					<div>
						<h2 className="text-3xl font-bold mb-6 text-blue-500 font-mono italic">02. SKILLS</h2>
						<div className="grid grid-cols-2 gap-4">
							<div>
								<h4 className="text-white font-bold mb-2 text-sm uppercase tracking-tighter">Frontend</h4>
								<ul className="text-zinc-500 text-sm space-y-1">
									<li>React / Next.js</li>
									<li>TypeScript</li>
									<li>Tailwind CSS</li>
									<li>SCSS / Figma</li>
								</ul>
							</div>
							<div>
								<h4 className="text-white font-bold mb-2 text-sm uppercase tracking-tighter">Backend</h4>
								<ul className="text-zinc-500 text-sm space-y-1">
									<li>Node.js</li>
									<li>PHP / MySQL</li>
									<li>Python / C++</li>
									<li>REST API</li>
								</ul>
							</div>
						</div>
					</div>
				</section>
      </main>
			<footer className="mt-32 pb-10 text-zinc-600 text-xs tracking-widest uppercase">
        © 2026 Ilia Arkov. Built with Next.js & TypeScript.
      </footer>
    </div>
  );
}