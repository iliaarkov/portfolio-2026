import { Project } from "../lib/projects";
import { Locale, translations } from "../lib/translations";

interface ProjectCard {
  project: Project;
  lang: Locale;
}

export const ProjectCard = ({ project, lang }: ProjectCard) => {
  const t = translations[lang];

  return (
    <div className="group p-6 rounded-2xl border border-zinc-800 bg-zinc-900/20 hover:border-blue-500/50 transition-all duration-300 flex flex-col h-full shadow-lg">
      <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
        {project.title}
      </h3>
      <p className="text-zinc-400 text-sm mb-6 flex-grow leading-relaxed">
        {project.description[lang]}
      </p>
      <div className="flex flex-wrap gap-2 mb-8">
        {project.stack.map((tech) => (
          <span key={tech} className="text-[10px] uppercase border border-zinc-800 px-2 py-1 rounded text-zinc-500 font-mono">
            {tech}
          </span>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <span className="text-xs font-mono text-zinc-600 hover:text-white transition-colors uppercase">
          {t.viewCode}
        </span>
      </div>
    </div>
  );
};