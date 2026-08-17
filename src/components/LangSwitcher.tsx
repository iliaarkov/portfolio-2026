'use client';
import { Locale } from "@/lib/translations";

interface Props {
  currentLang: Locale;
  setLang: (lang: Locale) => void;
}

export const LangSwitcher = ({ currentLang, setLang }: Props) => {
  return (
    <div className="flex gap-3 bg-zinc-900/50 p-1 rounded-full border border-zinc-800">
      {(['ru', 'en', 'es'] as Locale[]).map((lang) => (
        <button
          key={lang}
          onClick={() => setLang(lang)}
          className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
            currentLang === lang ? 'bg-blue-600 text-white' : 'text-zinc-500 hover:text-white'
          }`}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
};