'use client';
import { Project } from "@/lib/projects";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
      {/* Кнопка закрытия вне окна для удобства или на нем */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden flex flex-col shadow-2xl">
        
        {/* Шапка модалки */}
        <div className="flex justify-between items-center p-6 border-b border-zinc-900 bg-zinc-950/50">
          <h2 className="text-2xl font-bold text-white">{project.title}</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        {/* Контент (прокручиваемый) */}
        <div className="overflow-y-auto p-6 space-y-8">
          
          {/* Видео-плеер */}
          {project.videoUrl && (
            <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800">
              <iframe 
                src={project.videoUrl}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              <h3 className="text-lg font-bold text-blue-500">О проекте</h3>
              <p className="text-zinc-300 leading-relaxed whitespace-pre-line">
                {project.longDescription}
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-xs uppercase tracking-widest text-zinc-500 mb-3">Технологии</h4>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map(tech => (
                    <span key={tech} className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded text-xs text-zinc-400">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <a 
                  href={project.link} 
                  target="_blank"
                  className="w-full py-3 bg-white text-black text-center font-bold rounded-xl hover:bg-zinc-200 transition-colors"
                >
                  Посетить сайт
                </a>
                <a 
                  href={project.github} 
                  target="_blank"
                  className="w-full py-3 border border-zinc-800 text-white text-center font-bold rounded-xl hover:bg-zinc-900 transition-colors"
                >
                  Исходный код
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Клик по фону тоже закрывает */}
      <div className="absolute inset-0 -z-10" onClick={onClose} />
    </div>
  );
};