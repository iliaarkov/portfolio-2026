'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { translations, Locale } from '@/lib/translations';
import { 
  DndContext, 
  closestCenter, 
  PointerSensor, 
  useSensor, 
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  defaultDropAnimationSideEffects
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

const SortableItem = ({ task, onDelete, onMove }: { 
  task: Task; 
  onDelete: (id: string) => void;
  onMove: (id: string) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id });
  
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className="relative group mb-3"
    >
      <div 
        {...attributes} 
        {...listeners}
        className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl cursor-grab active:cursor-grabbing hover:border-blue-500/50 transition-colors text-sm text-zinc-300 shadow-lg"
      >
        {task.content}
      </div>
      
      {/* Кнопки управления (вне зоны захвата для DND) */}
      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={() => onMove(task.id)}
          className="p-1 bg-blue-600 rounded text-[8px] text-white hover:bg-blue-500"
        >
          →
        </button>
        <button 
          onClick={() => onDelete(task.id)}
          className="p-1 bg-zinc-800 rounded text-[8px] text-white hover:bg-red-900"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default function KanbanBoard() {
  const [lang, setLang] = useState<Locale>('ru');
  const t = translations[lang];
  
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('portfolio-tasks');
    if (saved) {
      try {
        setTasks(JSON.parse(saved) as Task[]);
      } catch (e) { console.error(e); }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('portfolio-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Начинаем тащить только если сдвинули мышь на 8 пикселей
      },
    })
  );

  const addTask = () => {
    if (!inputValue.trim()) return;
    const newTask: Task = {
      id: `task-${Date.now()}`,
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

  const fastMove = (id: string) => {
    setTasks(prev => prev.map(task => {
      if (task.id === id) {
        const nextCol: Record<string, Task['column']> = { todo: 'progress', progress: 'done', done: 'todo' };
        return { ...task, column: nextCol[task.column] };
      }
      return task;
    }));
  };

  const renderColumn = (colId: Task['column'], title: string) => {
    const columnTasks = tasks.filter(t => t.column === colId);
    
    return (
      <div className="flex flex-col bg-zinc-950/50 border border-zinc-900 p-5 rounded-[2rem] w-full min-h-[400px]">
        <h3 className="text-[10px] font-mono font-bold tracking-[0.3em] text-zinc-600 mb-6 uppercase text-center">{title}</h3>
        
        <SortableContext items={columnTasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          <div className="flex-grow">
            {columnTasks.map(task => (
              <SortableItem 
                key={task.id} 
                task={task} 
                onDelete={(id) => setTasks(tasks.filter(t => t.id !== id))}
                onMove={fastMove}
              />
            ))}
          </div>
        </SortableContext>
      </div>
    );
  };

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

          <div className="flex gap-4 mb-16 max-w-md">
            <input 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTask()}
              placeholder={t.tasksPlaceholder}
              className="flex-grow bg-zinc-900 border border-zinc-800 p-4 rounded-2xl focus:outline-none focus:border-blue-600 text-sm"
            />
            <button onClick={addTask} className="bg-white text-black px-6 rounded-2xl font-bold text-xs hover:bg-blue-500 hover:text-white transition-all uppercase tracking-widest">
              {t.tasksAdd}
            </button>
          </div>

          <DndContext 
            sensors={sensors} 
            collisionDetection={closestCenter} 
            onDragEnd={handleDragEnd}
          >
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