'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { translations, Locale } from '@/lib/translations';

const CURRENCIES = ['GEL', 'USD', 'EUR', 'RUB', 'GBP'];

export default function CurrencyConverter() {
  const [lang, setLang] = useState<Locale>('ru'); // Можно потом прокидывать из контекста
  const t = translations[lang];

  const [amount, setAmount] = useState<string>("1"); // Храним как строку, чтобы избежать проблем с 0
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('GEL');
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchRate = async () => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setResult(0);
      return;
    }
    if (from === to) {
      setResult(numAmount);
      return;
    }
    
    setLoading(true);
    try {
      const res = await fetch(`https://api.frankfurter.app/latest?amount=${numAmount}&from=${from}&to=${to}`);
      const data = await res.json();
      setResult(data.rates[to]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(fetchRate, 500);
    return () => clearTimeout(timeoutId);
  }, [amount, from, to]);

  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans">
      <Reveal>
        <div className="max-w-2xl mx-auto mt-20">
          <div className="flex justify-between items-center mb-8">
            <Link href="/" className="text-zinc-500 hover:text-white transition-colors font-mono text-xs uppercase tracking-widest">
              {t.backHome}
            </Link>
            <div className="flex gap-2">
              {(['ru', 'en', 'es'] as Locale[]).map((l) => (
                <button key={l} onClick={() => setLang(l)} className={`text-xs ${lang === l ? 'text-blue-500' : 'text-zinc-600'}`}>
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          
          <h1 className="text-4xl font-bold mb-4 italic uppercase">{t.labTitle} <span className="text-blue-500">.</span></h1>
          <p className="text-zinc-400 mb-12 text-sm">{t.labSub}</p>

          <div className="bg-zinc-900/30 border border-zinc-800 p-8 rounded-3xl backdrop-blur-xl">
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-3 font-mono">{t.amount}</label>
                <input 
                  type="number" 
                  min="0"
                  value={amount}
                  onChange={(e) => {
                    const val = e.target.value;
                    // Убираем ведущие нули при вводе
                    if (val === "" || parseFloat(val) >= 0) setAmount(val);
                  }}
                  className="w-full bg-zinc-950 border border-zinc-800 p-4 rounded-2xl focus:outline-none focus:border-blue-500 text-2xl font-bold transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-3 font-mono">{t.from}</label>
                  <select 
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 p-4 rounded-2xl focus:outline-none focus:border-blue-500 cursor-pointer appearance-none"
                  >
                    {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-3 font-mono">{t.to}</label>
                  <select 
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 p-4 rounded-2xl focus:outline-none focus:border-blue-500 cursor-pointer appearance-none"
                  >
                    {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="mt-10 p-8 bg-zinc-950 border border-zinc-800 rounded-3xl text-center relative overflow-hidden">
                {loading && <div className="absolute inset-0 bg-blue-500/5 animate-pulse" />}
                <span className="text-zinc-500 text-[10px] block mb-2 uppercase tracking-[0.3em] font-mono">{t.result}</span>
                <span className="text-5xl font-black text-white">
                  {loading ? "..." : result?.toFixed(2)} <span className="text-blue-600 ml-2">{to}</span>
                </span>
              </div>
            </div>
          </div>

          <div className="mt-12 space-y-4">
             <div className="p-4 bg-zinc-900/20 border border-zinc-900 rounded-2xl text-[10px] text-zinc-500 font-mono leading-relaxed">
               {t.techInfo}
             </div>
             <div className="p-4 bg-zinc-900/20 border border-zinc-900 rounded-2xl text-[10px] text-zinc-500 font-mono leading-relaxed">
               {t.useCase}
             </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}