'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { translations, Locale } from '@/lib/translations';
import { 
  DndContext, 
  PointerSensor, 
  TouchSensor,
  useSensor, 
  useSensors,
  DragEndEvent,
  DragOverEvent,
  useDroppable,
  rectIntersection,
} from '@dnd-kit/core';
import { 
  arrayMove, 
  SortableContext, 
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Task {
  id: string;
  content: string;
  column: 'todo' | 'progress' | 'done';
}

// --- КОМПОНЕНТ КАРТОЧКИ ---
const SortableItem = ({ task, onDelete, onMove, lang }: { 
  task: Task; 
  onDelete: (id: string) => void;
  onMove: (id: string) => void;
  lang: Locale;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ 
    id: task.id,
    data: { type: 'Task', task }
  });
  
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative group mb-3 outline-none touch-none">
      <div 
        {...attributes} {...listeners}
        className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl cursor-grab active:cursor-grabbing hover:border-blue-500/50 transition-colors text-sm text-zinc-300 shadow-lg"
      >
        {task.content}
      </div>
      
      {/* Кнопки управления: на мобилках видны всегда, на десктопе при ховере */}
      <div className="absolute top-2 right-2 flex gap-1 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
        <button 
          onClick={() => onMove(task.id)}
          className="p-2 bg-blue-600/80 rounded-lg text-[10px] text-white backdrop-blur-sm"
        >
          {task.column === 'done' ? '↺' : '→'}
        </button>
        <button 
          onClick={() => onDelete(task.id)}
          className="p-2 bg-zinc-800/80 rounded-lg text-[10px] text-white hover:bg-red-900/80 backdrop-blur-sm"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

// --- КОМПОНЕНТ КОЛОНКИ ---
const DroppableColumn = ({ id, title, tasks, onDelete, onMove, lang }: any) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div 
      ref={setNodeRef}
      className={`flex flex-col p-5 rounded-[2rem] min-w-[85vw] md:min-w-0 md:w-full min-h-[450px] transition-all duration-300 border snap-center ${
        isOver ? 'bg-blue-500/5 border-blue-500/50 scale-[1.01]' : 'bg-zinc-950/50 border-zinc-900'
      }`}
    >
      <h3 className="text-[10px] font-mono font-bold tracking-[0.3em] text-zinc-600 mb-6 uppercase text-center">
        {title} ({tasks.length})
      </h3>
      
      <SortableContext items={tasks.map((t: any) => t.id)} strategy={verticalListSortingStrategy}>
        <div className="flex-grow">
          {tasks.map((task: any) => (
            <SortableItem key={task.id} task={task} onDelete={onDelete} onMove={onMove} lang={lang} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

// --- ОСНОВНАЯ СТРАНИЦА ---
export default function KanbanBoard() {
  const [lang, setLang] = useState<Locale>('ru');
  const t = translations[lang];
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('portfolio-tasks');
    if (saved) {
      try { setTasks(JSON.parse(saved) as Task[]); } catch (e) { console.error(e); }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('portfolio-tasks', JSON.stringify(tasks));
  }, [tasks]);

  // СЕНСОРЫ: Добавляем TouchSensor для мобильных
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 10 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } }) // Долгая задержка для отличия от скролла
  );

  const addTask = () => {
    if (!inputValue.trim()) return;
    const newTask: Task = { id: `task-${Date.now()}`, content: inputValue, column: 'todo' };
    setTasks([...tasks, newTask]);
    setInputValue('');
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;
    const activeId = active.id;
    const overId = over.id;
    const activeTask = tasks.find(t => t.id === activeId);
    if (!activeTask) return;
    const isOverAColumn = ['todo', 'progress', 'done'].includes(overId as string);
    if (isOverAColumn && activeTask.column !== overId) {
      setTasks(prev => prev.map(t => t.id === activeId ? { ...t, column: overId as Task['column'] } : t));
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id !== over.id) {
      const oldIndex = tasks.findIndex((i) => i.id === active.id);
      const newIndex = tasks.findIndex((i) => i.id === over.id);
      if (oldIndex !== -1 && newIndex !== -1 && tasks[oldIndex].column === tasks[newIndex].column) {
        setTasks((items) => arrayMove(items, oldIndex, newIndex));
      }
    }
  };

  const fastMove = (id: string) => {
    setTasks(prev => prev.map(task => {
      if (task.id === id) {
        const next: Record<string, Task['column']> = { todo: 'progress', progress: 'done', done: 'todo' };
        return { ...task, column: next[task.column] };
      }
      return task;
    }));
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-12 font-sans overflow-x-hidden">
      <Reveal>
        <div className="max-w-6xl mx-auto mt-6 md:mt-10">
          <div className="flex justify-between items-center mb-10">
            <Link href="/" className="text-zinc-500 hover:text-white transition-colors font-mono text-[10px] uppercase tracking-[0.3em]">{t.tasksBack}</Link>
            <div className="flex gap-4">
              {(['ru', 'en', 'es'] as Locale[]).map((l) => (
                <button key={l} onClick={() => setLang(l)} className={`text-[10px] font-bold ${lang === l ? 'text-blue-500' : 'text-zinc-700'}`}>{l.toUpperCase()}</button>
              ))}
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-black mb-4 italic tracking-tighter uppercase">{t.tasksTitle}<span className="text-blue-600">.</span></h1>
          <p className="text-zinc-500 text-sm max-w-xl mb-10 leading-relaxed">{t.tasksSub}</p>

          <div className="flex flex-col md:flex-row gap-3 mb-12 max-w-md">
            <input 
              value={inputValue} 
              onChange={(e) => setInputValue(e.target.value)} 
              onKeyDown={(e) => e.key === 'Enter' && addTask()}
              placeholder={t.tasksPlaceholder} 
              className="flex-grow bg-zinc-900 border border-zinc-800 p-4 rounded-2xl focus:outline-none focus:border-blue-600 text-sm" 
            />
            <button onClick={addTask} className="bg-white text-black px-6 py-4 md:py-0 rounded-2xl font-bold text-xs hover:bg-blue-500 hover:text-white transition-all uppercase tracking-widest">{t.tasksAdd}</button>
          </div>

          {/* КОНТЕЙНЕР КОЛОНОК: На мобилках горизонтальный скролл */}
          <DndContext 
            sensors={sensors} 
            collisionDetection={rectIntersection} 
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
          >
            <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-8 overflow-x-auto md:overflow-visible pb-10 snap-x snap-mandatory scrollbar-hide">
              <DroppableColumn 
                id="todo" 
                title={t.tasksTodo} 
                tasks={tasks.filter(t => t.column === 'todo')} 
                onDelete={(id: string) => setTasks(tasks.filter(t => t.id !== id))}
                onMove={fastMove}
                lang={lang}
              />
              <DroppableColumn 
                id="progress" 
                title={t.tasksProgress} 
                tasks={tasks.filter(t => t.column === 'progress')} 
                onDelete={(id: string) => setTasks(tasks.filter(t => t.id !== id))}
                onMove={fastMove}
                lang={lang}
              />
              <DroppableColumn 
                id="done" 
                title={t.tasksDone} 
                tasks={tasks.filter(t => t.column === 'done')} 
                onDelete={(id: string) => setTasks(tasks.filter(t => t.id !== id))}
                onMove={fastMove}
                lang={lang}
              />
            </div>
            
            {/* Подсказка для мобилок */}
            <div className="md:hidden text-center text-[10px] text-zinc-700 font-mono uppercase tracking-widest mt-4">
              ← Swipe to scroll columns →
            </div>
          </DndContext>
        </div>
      </Reveal>
    </div>
  );
}