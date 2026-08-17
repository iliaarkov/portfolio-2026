export interface Project {
  id: number;
  title: string;
  description: string;
	longDescription: string;
  stack: string[];
  link: string; // Ссылка на сайт
  github: string; // Ссылка на GitHub
	videoUrl?: string; // Ссылка на видео (YouTube или файл)
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Intuitivo - Wine Cooperative",
    description: "Разработка полнофункциональной системы для винного кооператива: от каталога до личного кабинета и управления заказами.",
    longDescription: "Здесь ты можешь расписать подробно: какие были сложности, как ты проектировал базу данных MySQL, как реализовал личный кабинет и систему лояльности. Это текст, который будет виден в модалке.",
		stack: ["PHP", "MySQL", "JavaScript", "UI/UX"],
    link: "https://vash-sait.ru",
    github: "https://github.com/iliaarkov",
		videoUrl: "https://www.youtube.com"
  },
  {
    id: 2,
    title: "Driftet School",
    description: "Адаптивный лендинг для школы контраварийного вождения с проработанной логикой выбора программ обучения.",
    longDescription: "Здесь ты можешь расписать подробно: какие были сложности, как ты проектировал базу данных MySQL, как реализовал личный кабинет и систему лояльности. Это текст, который будет виден в модалке.",
		stack: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    link: "https://driftet.ru", // Замени на реальный или #
    github: "https://github.com/iliaarkov",
		videoUrl: "https://www.youtube"
  },
  {
    id: 3,
    title: "Portfolio 2026",
    description: "Современное портфолио на Next.js 15 с интеграцией Telegram API для обратной связи.",
    longDescription: "Здесь ты можешь расписать подробно: какие были сложности, как ты проектировал базу данных MySQL, как реализовал личный кабинет и систему лояльности. Это текст, который будет виден в модалке.",
		stack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    link: "https://portfolio-2026-iota-one.vercel.app/",
    github: "https://github.com/iliaarkov/portfolio-2026",
		videoUrl: "https://www.youtube.com"
  }
];