import React from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { Check, Flame } from 'lucide-react';

const DEFAULT_HABITS = [
  { id: 'water', label: 'Beber 8 vasos de agua' },
  { id: 'sleep', label: 'Dormir 7+ horas' },
  { id: 'study', label: 'Estudiar 2 horas' },
  { id: 'exercise', label: '30 mins de ejercicio' },
  { id: 'meditate', label: '10 mins de meditación' },
];

const HabitTracker = () => {
  const [habitHistory, setHabitHistory] = useLocalStorage('habitHistory', {});

  const today = new Date().toISOString().split('T')[0];
  const completedToday = habitHistory[today] || [];

  const toggleHabit = (habitId) => {
    const isCompleted = completedToday.includes(habitId);
    let newCompleted;

    if (isCompleted) {
      newCompleted = completedToday.filter(id => id !== habitId);
    } else {
      newCompleted = [...completedToday, habitId];
    }

    setHabitHistory({
      ...habitHistory,
      [today]: newCompleted
    });
  };

  const calculateStreak = (habitId) => {
    let streak = 0;

    for (let i = 0; i < 365; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];

      if (habitHistory[dateStr]?.includes(habitId)) {
        streak++;
      } else if (i === 0 && !habitHistory[dateStr]?.includes(habitId)) {
        continue;
      } else {
        break;
      }
    }
    return streak;
  };

  const progress = Math.round((completedToday.length / DEFAULT_HABITS.length) * 100);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gradient-to-br from-blue-600 to-teal-600 text-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-white/20 border-4 border-white/40 flex flex-col items-center justify-center backdrop-blur-sm">
            <span className="text-2xl font-bold">{progress}%</span>
            <span className="text-xs opacity-90">Hoy</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-1">Hábitos Diarios</h2>
            <p className="text-blue-100">Pequeños pasos conducen a grandes cambios.</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {DEFAULT_HABITS.map((habit) => {
          const isCompleted = completedToday.includes(habit.id);
          const streak = calculateStreak(habit.id);

          return (
            <button
              key={habit.id}
              className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 flex items-center gap-4 hover:translate-x-1 transition-transform text-left"
              onClick={() => toggleHabit(habit.id)}
            >
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${isCompleted
                  ? 'bg-teal-600 border-teal-600'
                  : 'border-gray-300'
                }`}>
                {isCompleted && <Check size={20} color="#fff" />}
              </div>
              <div className="flex-1">
                <span className="font-medium text-lg text-gray-900 block">{habit.label}</span>
                {streak > 0 && (
                  <span className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                    <Flame size={14} color="#FF6B6B" fill="#FF6B6B" />
                    {streak} día{streak !== 1 ? 's' : ''} de racha
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>💡 Consejo:</strong> Mantener hábitos saludables te ayuda a rendir mejor en tus estudios y reduce el estrés durante los exámenes.
        </p>
      </div>
    </div>
  );
};

export default HabitTracker;
