'use client';
import { useState } from 'react';
import { Locale, translations } from '../lib/translations';

interface ContactFormProps {
  lang: Locale;
}

export const ContactForm = ({ lang }: ContactFormProps) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const t = translations[lang];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
        // Сброс статуса через 5 секунд, чтобы форма снова стала пустой
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
  	}
	};

  return (
    <section className="mt-32 w-full max-w-2xl mx-auto pb-20 px-4">
      <h2 className="text-3xl font-bold mb-8 text-left font-mono italic text-blue-500 underline decoration-zinc-800 underline-offset-8 uppercase tracking-tighter">
        {t.contactTitle}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="name"
            type="text"
            placeholder={t.formName}
            required
            className="bg-zinc-900/50 border border-zinc-800 p-3 rounded-lg focus:outline-none focus:border-blue-500 text-white placeholder:text-zinc-600 transition-all"
          />
          <input
            name="email"
            type="email"
            placeholder={t.formEmail}
            required
            className="bg-zinc-900/50 border border-zinc-800 p-3 rounded-lg focus:outline-none focus:border-blue-500 text-white placeholder:text-zinc-600 transition-all"
          />
        </div>
        
        <textarea
          name="message"
          placeholder={t.formMessage}
          rows={5}
          required
          className="w-full bg-zinc-900/50 border border-zinc-800 p-3 rounded-lg focus:outline-none focus:border-blue-500 text-white placeholder:text-zinc-600 transition-all resize-none"
        />
        
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-lg transition-all disabled:bg-zinc-800 disabled:text-zinc-500 font-mono tracking-widest uppercase shadow-lg shadow-blue-900/20"
        >
          {status === 'loading' ? t.formSending : t.formButton}
        </button>

        {/* Статус сообщения */}
        <div className="h-6 mt-4">
          {status === 'success' && (
            <p className="text-green-500 text-center font-mono text-sm animate-pulse">
              {t.formSuccess}
            </p>
          )}
          {status === 'error' && (
            <p className="text-red-500 text-center font-mono text-sm">
              {t.formError}
            </p>
          )}
        </div>
      </form>
    </section>
  );
};