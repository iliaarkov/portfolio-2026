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

            Ранее создавал проекты для винных кооперативов и школ вождения.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
        </div>
      </main>
			<footer className="mt-32 pb-10 text-zinc-600 text-xs tracking-widest uppercase">
        © 2026 Ilia Arkov. Built with Next.js & TypeScript.
      </footer>
    </div>
  );
}