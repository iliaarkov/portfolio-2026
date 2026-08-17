export interface Project {
  id: number;
  title: string;
  description: string;
  stack: string[];
  link: string; // Ссылка на сайт
  github: string; // Ссылка на GitHub
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Wine Intuition",
    description: "Разработка полнофункциональной системы для винного кооператива: от каталога до личного кабинета и управления заказами.",
    stack: ["PHP", "MySQL", "JavaScript", "UI/UX"],
    link: "https://vash-sait.ru", // Замени на реальный или #
    github: "https://github.com/iliaarkov"
  },
  {
    id: 2,
    title: "Driftet School",
    description: "Адаптивный лендинг для школы контраварийного вождения с проработанной логикой выбора программ обучения.",
    stack: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    link: "https://driftet.ru", // Замени на реальный или #
    github: "https://github.com/iliaarkov"
  },
  {
    id: 3,
    title: "Portfolio 2026",
    description: "Современное портфолио на Next.js 15 с интеграцией Telegram API для обратной связи.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    link: "https://portfolio-2026-iota-one.vercel.app/",
    github: "https://github.com/iliaarkov/portfolio-2026"
  }
];