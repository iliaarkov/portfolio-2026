'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { translations, Locale } from '@/lib/translations';
import { 
  DndContext, 
  closestCenter, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import { 
  arrayMove, 
  SortableContext, 
  sortableKeyboardCoordinates, 
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Типы
interface Task {
	id: string;
	content: string;
	column: 'todo' | 'progress' | 'done';
}

// Компонент отдельной задачи
const SortableItem = ({ task }: { task: Task }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...attributes} 
      {...listeners}
      className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl mb-3 cursor-grab active:cursor-grabbing hover:border-blue-500/50 transition-colors text-sm text-zinc-300 shadow-lg"
    >
      {task.content}
    </div>
  );
};

export default function KanbanBoard() {
  const [lang, setLang] = useState<Locale>('ru');
  const t = translations[lang];
  
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState('');

  // Загрузка из LocalStorage
  useEffect(() => {
		const saved = localStorage.getItem('portfolio-tasks');
		if (saved) {
			try {
				// Мы добавляем "as Task[]", чтобы указать тип явно
				const parsedTasks = JSON.parse(saved) as Task[];
				setTasks(parsedTasks);
			} catch (error) {
				console.error("Ошибка парсинга задач:", error);
			}
		}
	}, []);

  // Сохранение в LocalStorage
  useEffect(() => {
    localStorage.setItem('portfolio-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const addTask = () => {
    if (!inputValue.trim()) return;
    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9),
      content: inputValue,
      column: 'todo'
    };
    setTasks([...tasks, newTask]);
    setInputValue('');
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      setTasks((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const moveTask = (id: string, newCol: Task['column']) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, column: newCol } : t));
  };

  const renderColumn = (colId: Task['column'], title: string) => (
    <div className="flex flex-col bg-zinc-950/50 border border-zinc-900 p-5 rounded-[2rem] w-full min-h-[400px]">
      <h3 className="text-[10px] font-mono font-bold tracking-[0.3em] text-zinc-600 mb-6 uppercase text-center">{title}</h3>
      <div className="flex-grow">
        {tasks.filter(t => t.column === colId).map(task => (
          <div key={task.id} className="relative group">
            <SortableItem task={task} />
            <div className="absolute top-2 right-2 hidden group-hover:flex gap-1">
                {colId !== 'done' && (
                    <button onClick={() => moveTask(task.id, colId === 'todo' ? 'progress' : 'done')} className="p-1 bg-blue-600 rounded text-[8px]">NEXT</button>
                )}
                <button onClick={() => setTasks(tasks.filter(it => it.id !== task.id))} className="p-1 bg-zinc-800 rounded text-[8px]">DEL</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 font-sans">
      <Reveal>
        <div className="max-w-6xl mx-auto mt-10 md:mt-20">
          <div className="flex justify-between items-center mb-12">
            <Link href="/" className="text-zinc-500 hover:text-white transition-colors font-mono text-[10px] uppercase tracking-[0.3em]">
              {t.tasksBack}
            </Link>
            <div className="flex gap-4">
              {(['ru', 'en', 'es'] as Locale[]).map((l) => (
                <button key={l} onClick={() => setLang(l)} className={`text-[10px] font-bold ${lang === l ? 'text-blue-500' : 'text-zinc-700'}`}>
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-black mb-4 italic tracking-tighter uppercase">{t.tasksTitle}<span className="text-blue-600">.</span></h1>
          <p className="text-zinc-500 text-sm max-w-xl mb-12">{t.tasksSub}</p>

          {/* Add Task Input */}
          <div className="flex gap-4 mb-16 max-w-md">
            <input 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={t.tasksPlaceholder}
              className="flex-grow bg-zinc-900 border border-zinc-800 p-4 rounded-2xl focus:outline-none focus:border-blue-600 text-sm"
            />
            <button onClick={addTask} className="bg-white text-black px-6 rounded-2xl font-bold text-xs hover:bg-blue-500 hover:text-white transition-all uppercase tracking-widest">
              {t.tasksAdd}
            </button>
          </div>

          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {renderColumn('todo', t.tasksTodo)}
              {renderColumn('progress', t.tasksProgress)}
              {renderColumn('done', t.tasksDone)}
            </div>
          </DndContext>
        </div>
      </Reveal>
    </div>
  );
}