import { Project } from "@/lib/projects";

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
		<div className="group p-6 rounded-2xl border border-zinc-800 bg-zinc-900/20 hover:border-blue-500/50 transition-all duration-300 flex flex-col h-full">
			<div className="flex justify-between items-start mb-4">
				<h3 className="text-xl font-bold group-hover:text-blue-400 transition-colors">
					<a href={project.link} target="_blank" rel="noopener noreferrer">
						{project.title} <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
					</a>
				</h3>
			</div>
			
			<p className="text-zinc-400 text-sm mb-6 flex-grow">
				{project.description}
			</p>

			<div className="flex flex-wrap gap-2 mb-8">
				{project.stack.map((tech) => (
					<span key={tech} className="text-[10px] uppercase border border-zinc-800 px-2 py-1 rounded text-zinc-500">
						{tech}
					</span>
				))}
			</div>

			<a 
				href={project.github} 
				target="_blank" 
				className="mt-auto text-xs font-mono text-zinc-600 hover:text-white transition-colors"
			>
				[ VIEW_SOURCE_CODE ]
			</a>
		</div>
  );
};