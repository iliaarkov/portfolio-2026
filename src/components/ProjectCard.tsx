import { Project } from "@/lib/projects";

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="group p-6 rounded-2xl border border-zinc-800 bg-zinc-900/20 hover:border-blue-500/50 transition-all duration-300">
      <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
        {project.title}
      </h3>
      <p className="text-zinc-400 text-sm mb-4">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2 mb-6">
        {project.stack.map((tech) => (
          <span key={tech} className="text-[10px] uppercase tracking-widest px-2 py-1 rounded bg-zinc-800 text-zinc-300">
            {tech}
          </span>
        ))}
      </div>
      <a 
        href={project.github} 
        target="_blank" 
        className="text-xs font-bold text-zinc-500 hover:text-white transition-colors"
      >
        VIEW CODE →
      </a>
    </div>
  );
};