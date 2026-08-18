'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { translations, Locale } from '@/lib/translations';

const CURRENCIES = ['GEL', 'USD', 'EUR', 'RUB', 'GBP'];

export default function CurrencyConverter() {
  const [lang, setLang] = useState<Locale>('ru');
  const t = translations[lang];

  const [amount, setAmount] = useState<string>("1");
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('GEL');
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchRate = async () => {
    const numAmount = parseFloat(amount);
    
    // Валидация: если не число или <= 0
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
      // Используем другой API, который поддерживает GEL и RUB
      const res = await fetch(`https://open.er-api.com/v6/latest/${from}`);
      const data = await res.json();
      
      if (data.result === "success") {
        const rate = data.rates[to];
        setResult(numAmount * rate);
      } else {
        throw new Error("API Error");
      }
    } catch (error) {
      console.error("Error fetching rates:", error);
      setResult(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(fetchRate, 500);
    return () => clearTimeout(timeoutId);
  }, [amount, from, to]);

  // Функция для обработки ввода, чтобы убрать ведущие нули (например 0342 -> 342)
  const handleAmountChange = (val: string) => {
    // Если ввели что-то, что не является числом (кроме пустой строки), игнорируем
    if (val !== "" && !/^\d*\.?\d*$/.test(val)) return;
    
    // Убираем ведущие нули, если это не десятичная дробь (0.1)
    const cleaned = val.replace(/^0+(?!\.|$)/, '');
    setAmount(cleaned === "" ? "0" : cleaned);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 font-sans selection:bg-blue-500/30">
      <Reveal>
        <div className="max-w-2xl mx-auto mt-10 md:mt-20">
          {/* Top Bar */}
          <div className="flex justify-between items-center mb-12">
            <Link href="/" className="text-zinc-500 hover:text-white transition-colors font-mono text-[10px] uppercase tracking-[0.3em] border-b border-zinc-900 pb-1">
              {t.backHome}
            </Link>
            <div className="flex gap-4">
              {(['ru', 'en', 'es'] as Locale[]).map((l) => (
                <button 
                  key={l} 
                  onClick={() => setLang(l)} 
                  className={`text-[10px] font-bold tracking-widest transition-colors ${lang === l ? 'text-blue-500' : 'text-zinc-700 hover:text-zinc-400'}`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-black mb-4 italic uppercase tracking-tighter">
              {t.labTitle}<span className="text-blue-600">.</span>
            </h1>
            <p className="text-zinc-500 text-sm font-medium max-w-md leading-relaxed">
              {t.labSub}
            </p>
          </div>

          {/* Calculator Card */}
          <div className="bg-zinc-900/10 border border-zinc-800 p-6 md:p-10 rounded-[2.5rem] backdrop-blur-3xl shadow-2xl">
            <div className="space-y-8">
              {/* Input Amount */}
              <div>
                <label className="block text-[10px] uppercase tracking-[0.25em] text-zinc-600 mb-4 font-mono font-bold">
                  {t.amount}
                </label>
                <input 
                  type="text" 
                  inputMode="decimal"
                  value={amount}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  className="w-full bg-zinc-950/50 border border-zinc-800 p-5 rounded-2xl focus:outline-none focus:border-blue-600 text-3xl font-black transition-all placeholder:text-zinc-800 shadow-inner"
                />
              </div>

              {/* Selectors */}
              <div className="grid grid-cols-2 gap-6">
                <div className="relative">
                  <label className="block text-[10px] uppercase tracking-[0.25em] text-zinc-600 mb-4 font-mono font-bold">{t.from}</label>
                  <select 
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="w-full bg-zinc-950/50 border border-zinc-800 p-4 rounded-2xl focus:outline-none focus:border-blue-600 cursor-pointer appearance-none font-bold text-zinc-300"
                  >
                    {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <div className="absolute right-4 bottom-5 pointer-events-none text-zinc-700 text-xs">▼</div>
                </div>
                <div className="relative">
                  <label className="block text-[10px] uppercase tracking-[0.25em] text-zinc-600 mb-4 font-mono font-bold">{t.to}</label>
                  <select 
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="w-full bg-zinc-950/50 border border-zinc-800 p-4 rounded-2xl focus:outline-none focus:border-blue-600 cursor-pointer appearance-none font-bold text-zinc-300"
                  >
                    {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <div className="absolute right-4 bottom-5 pointer-events-none text-zinc-700 text-xs">▼</div>
                </div>
              </div>

              {/* Result Display */}
              <div className="mt-12 p-10 bg-zinc-950 border border-zinc-800 rounded-[2rem] text-center relative overflow-hidden group">
                <div className={`absolute inset-0 bg-blue-600/5 transition-opacity duration-500 ${loading ? 'opacity-100' : 'opacity-0'}`} />
                <span className="text-zinc-600 text-[10px] block mb-4 uppercase tracking-[0.4em] font-mono font-bold">
                  {loading ? t.calculating : t.result}
                </span>
                <div className="flex items-center justify-center gap-3">
                   <span className={`text-5xl md:text-6xl font-black tracking-tighter transition-all duration-300 ${loading ? 'blur-sm opacity-50' : 'opacity-100'}`}>
                    {result?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <span className="text-blue-600 text-2xl font-black mt-4">{to}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="p-5 bg-zinc-900/10 border border-zinc-900/50 rounded-2xl text-[10px] text-zinc-500 font-mono leading-relaxed uppercase tracking-wider">
               {t.techInfo}
             </div>
             <div className="p-5 bg-zinc-900/10 border border-zinc-900/50 rounded-2xl text-[10px] text-zinc-500 font-mono leading-relaxed uppercase tracking-wider">
               {t.useCase}
             </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}