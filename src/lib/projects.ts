export interface Project {
  id: number;
  title: string;
  description: string;
  stack: string[];
  link?: string;
  github?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Wine Intuition",
    description: "Разработка системы управления данными для винного кооператива. Работа с БД и серверной логикой.",
    stack: ["PHP", "MySQL", "JavaScript", "CSS"],
    github: "https://github.com/iliaarkov" // Можешь заменить на прямую ссылку на репо
  },
  {
    id: 2,
    title: "Driftet School",
    description: "Сайт школы контраварийного вождения. Адаптивная верстка и проработка пользовательского опыта.",
    stack: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/iliaarkov"
  },
  {
    id: 3,
    title: "Portfolio 2026",
    description: "Текущий проект на современном стеке для демонстрации навыков и поиска международных заказов.",
    stack: ["Next.js 15", "TypeScript", "Tailwind CSS", "pnpm"],
    github: "https://github.com/iliaarkov/portfolio-2026"
  }
];