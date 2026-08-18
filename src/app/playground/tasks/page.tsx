'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { translations, Locale } from '@/lib/translations';
import { 
  DndContext, 
  PointerSensor, 
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
const SortableItem = ({ task, onDelete }: { task: Task; onDelete: (id: string) => void }) => {
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
    <div ref={setNodeRef} style={style} className="relative group mb-3 outline-none">
      <div 
        {...attributes} {...listeners}
        className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl cursor-grab active:cursor-grabbing hover:border-blue-500/50 transition-colors text-sm text-zinc-300 shadow-lg"
      >
        {task.content}
      </div>
      <button 
        onClick={() => onDelete(task.id)}
        className="absolute top-2 right-2 p-1 bg-zinc-800 rounded text-[8px] text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-900"
      >
        ✕
      </button>
    </div>
  );
};

// --- КОМПОНЕНТ КОЛОНКИ ---
const DroppableColumn = ({ id, title, tasks, onDelete }: { id: string; title: string; tasks: Task[]; onDelete: (id: string) => void }) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div 
      ref={setNodeRef}
      className={`flex flex-col p-5 rounded-[2rem] w-full min-h-[450px] transition-all duration-300 border ${
        isOver ? 'bg-blue-500/5 border-blue-500/50 scale-[1.02]' : 'bg-zinc-950/50 border-zinc-900'
      }`}
    >
      <h3 className="text-[10px] font-mono font-bold tracking-[0.3em] text-zinc-600 mb-6 uppercase text-center">
        {title} ({tasks.length})
      </h3>
      
      <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
        <div className="flex-grow">
          {tasks.map(task => (
            <SortableItem key={task.id} task={task} onDelete={onDelete} />
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

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

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

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 font-sans">
      <Reveal>
        <div className="max-w-6xl mx-auto mt-10">
          <div className="flex justify-between items-center mb-12">
            <Link href="/" className="text-zinc-500 hover:text-white transition-colors font-mono text-[10px] uppercase tracking-[0.3em]">{t.tasksBack}</Link>
            <div className="flex gap-4">
              {(['ru', 'en', 'es'] as Locale[]).map((l) => (
                <button key={l} onClick={() => setLang(l)} className={`text-[10px] font-bold ${lang === l ? 'text-blue-500' : 'text-zinc-700'}`}>{l.toUpperCase()}</button>
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
            <button onClick={addTask} className="bg-white text-black px-6 rounded-2xl font-bold text-xs hover:bg-blue-500 hover:text-white transition-all uppercase tracking-widest">{t.tasksAdd}</button>
          </div>

          <DndContext 
            sensors={sensors} 
            collisionDetection={rectIntersection} 
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <DroppableColumn 
                id="todo" 
                title={t.tasksTodo} 
                tasks={tasks.filter(t => t.column === 'todo')} 
                onDelete={deleteTask} 
              />
              <DroppableColumn 
                id="progress" 
                title={t.tasksProgress} 
                tasks={tasks.filter(t => t.column === 'progress')} 
                onDelete={deleteTask} 
              />
              <DroppableColumn 
                id="done" 
                title={t.tasksDone} 
                tasks={tasks.filter(t => t.column === 'done')} 
                onDelete={deleteTask} 
              />
            </div>
          </DndContext>
        </div>
      </Reveal>
    </div>
  );
}