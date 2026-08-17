'use client';
import { useState } from 'react';

export const ContactForm = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

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
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="mt-32 w-full max-w-2xl mx-auto pb-20">
      <h2 className="text-3xl font-bold mb-8 text-left font-mono italic text-blue-500 underline decoration-zinc-800 underline-offset-8">
        03. GET IN TOUCH
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="name"
            placeholder="Name"
            required
            className="bg-zinc-900/50 border border-zinc-800 p-3 rounded-lg focus:outline-none focus:border-blue-500 text-white"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="bg-zinc-900/50 border border-zinc-800 p-3 rounded-lg focus:outline-none focus:border-blue-500 text-white"
          />
        </div>
        <textarea
          name="message"
          placeholder="Your message"
          rows={5}
          required
          className="w-full bg-zinc-900/50 border border-zinc-800 p-3 rounded-lg focus:outline-none focus:border-blue-500 text-white"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition-colors disabled:bg-zinc-700"
        >
          {status === 'loading' ? 'SENDING...' : 'SEND MESSAGE'}
        </button>
        {status === 'success' && <p className="text-green-500 text-center">Message sent successfully!</p>}
        {status === 'error' && <p className="text-red-500 text-center">Something went wrong. Please try again.</p>}
      </form>
    </section>
  );
};