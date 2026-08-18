'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';

const CURRENCIES = ['GEL', 'USD', 'EUR', 'RUB', 'GBP'];

export default function CurrencyConverter() {
  const [amount, setAmount] = useState<number>(1);
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('GEL');
  const [rate, setRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // Функция для получения курса
  const fetchRate = async () => {
    if (from === to) {
      setRate(1);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`);
      const data = await res.json();
      setRate(data.rates[to]);
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchRate();
    }, 500); // Задержка (debounce), чтобы не спамить API при каждом вводе цифры
    return () => clearTimeout(timeoutId);
  }, [amount, from, to]);

  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans">
      <Reveal>
        <div className="max-w-2xl mx-auto mt-20">
          <Link href="/" className="text-zinc-500 hover:text-white transition-colors mb-8 inline-block font-mono">
            ← BACK_TO_HOME
          </Link>
          
          <h1 className="text-4xl font-bold mb-4 italic">CURRENCY_LAB <span className="text-blue-500">.</span></h1>
          <p className="text-zinc-400 mb-12">
            Техническая демо-страница: Интеграция с внешним API курсов валют в реальном времени. 
            Актуально для экспатов в Грузии.
          </p>

          <div className="bg-zinc-900/30 border border-zinc-800 p-8 rounded-3xl backdrop-blur-xl">
            <div className="space-y-6">
              {/* Ввод суммы */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2 font-mono">Amount</label>
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-xl focus:outline-none focus:border-blue-500 text-2xl font-bold transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Из валюты */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2 font-mono">From</label>
                  <select 
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-xl focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                {/* В валюту */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2 font-mono">To</label>
                  <select 
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-xl focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              {/* Результат */}
              <div className="mt-12 p-6 bg-blue-600/10 border border-blue-500/20 rounded-2xl text-center">
                {loading ? (
                  <span className="text-zinc-500 animate-pulse font-mono uppercase tracking-widest">Calculating...</span>
                ) : (
                  <div>
                    <span className="text-zinc-400 text-sm block mb-1 uppercase tracking-widest font-mono">Result</span>
                    <span className="text-4xl font-black text-white">
                      {rate?.toFixed(2)} <span className="text-blue-500">{to}</span>
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-zinc-500 font-mono">
             <div className="p-4 border border-zinc-900 rounded-xl italic">
               {/* // TECH_INFO: Используется Frankfurter API для получения данных. Реализован Debounce для оптимизации запросов. */}
             </div>
             <div className="p-4 border border-zinc-900 rounded-xl italic">
               {/* // USE_CASE: Финансовые инструменты, Dashboards, E-commerce системы с мультивалютностью. */}
             </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}