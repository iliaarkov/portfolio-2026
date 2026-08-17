import { Locale } from './translations';

export interface Project {
  id: number;
  title: string;
  // Мы говорим, что ключами могут быть ТОЛЬКО значения из Locale (ru, en, es)
  description: Record<Locale, string>;
  longDescription: Record<Locale, string>;
  stack: string[];
  link: string;
  github: string;
  videoUrl?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Wine Intuition",
    description: {
      ru: "Разработка полнофункциональной системы для винного кооператива.",
      en: "Full-featured system development for a wine cooperative.",
      es: "Desarrollo de un sistema completo para una cooperativa vinícola."
    },
    longDescription: {
      ru: "Проект включал в себя создание архитектуры базы данных MySQL, разработку серверной логики на PHP и создание интуитивно понятного интерфейса. Реализована система лояльности, личный кабинет пользователя и панель управления заказами.",
      en: "The project involved creating a MySQL database architecture, developing server-side logic in PHP, and building an intuitive interface. Implemented a loyalty system, user dashboard, and order management panel.",
      es: "El proyecto consistió en la creación de una arquitectura de base de datos MySQL, el desarrollo de la lógica del servidor en PHP y la construcción de una interfaz intuitiva. Se implementó un sistema de fidelización, un panel de usuario y un panel de gestión de pedidos."
    },
    stack: ["PHP", "MySQL", "JavaScript", "UI/UX"],
    link: "#",
    github: "https://github.com/iliaarkov",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" // Замени на свое демо
  },
  {
    id: 2,
    title: "Driftet School",
    description: {
      ru: "Адаптивный лендинг для школы контраварийного вождения.",
      en: "Responsive landing page for a defensive driving school.",
      es: "Página de aterrizaje responsiva para una escuela de conducción defensiva."
    },
    longDescription: {
      ru: "Фокус проекта был сделан на максимальной конверсии и удобстве пользователя. Создана сложная система выбора программ обучения и реализована полная адаптивность для мобильных устройств.",
      en: "The project focus was on maximum conversion and user experience. Created a complex system for selecting training programs and implemented full responsiveness for mobile devices.",
      es: "El enfoque del proyecto fue la máxima conversión y la experiencia del usuario. Se creó un sistema complejo para seleccionar programas de formación y se implementó una capacidad de respuesta total para dispositivos móviles."
    },
    stack: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    link: "#",
    github: "https://github.com/iliaarkov"
  },
  {
    id: 3,
    title: "Portfolio 2026",
    description: {
      ru: "Современное портфолио с поддержкой трех языков и интеграцией API.",
      en: "Modern portfolio with tri-language support and API integration.",
      es: "Portafolio moderno con soporte trilingüe e integración de API."
    },
    longDescription: {
      ru: "Мой личный проект, построенный на стеке Next.js 15 и TypeScript. Включает в себя мультиязычность (RU/EN/ES), интеграцию с Telegram Bot API для обратной связи и динамическую подгрузку проектов.",
      en: "My personal project built on the Next.js 15 and TypeScript stack. Includes multi-language support (RU/EN/ES), Telegram Bot API integration for feedback, and dynamic project loading.",
      es: "Mi proyecto personal construido sobre Next.js 15 y TypeScript. Incluye soporte multilingüe (RU/EN/ES), integración de la API de Telegram Bot para comentarios y carga dinámica de proyectos."
    },
    stack: ["Next.js 15", "TypeScript", "Tailwind CSS", "Telegram API"],
    link: "https://portfolio-2026-iota-one.vercel.app/",
    github: "https://github.com/iliaarkov/portfolio-2026"
  }
];