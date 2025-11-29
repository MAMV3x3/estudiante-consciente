import React, { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { Smile, Frown, Meh, CloudRain, Sun } from 'lucide-react';

const MOODS = [
  { id: 'happy', label: 'Feliz', icon: Smile, color: '#FFD93D' },
  { id: 'calm', label: 'Tranquilo/a', icon: Sun, color: '#6BCB77' },
  { id: 'neutral', label: 'Neutral', icon: Meh, color: '#A2D2FF' },
  { id: 'sad', label: 'Triste', icon: CloudRain, color: '#A0A0A0' },
  { id: 'stressed', label: 'Estresado/a', icon: Frown, color: '#FF6B6B' },
];

const MoodTracker = () => {
  const [moodLogs, setMoodLogs] = useLocalStorage('moodLogs', []);
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState('');

  const handleLogMood = (e) => {
    e.preventDefault();
    if (!selectedMood) return;

    const newLog = {
      id: Date.now(),
      date: new Date().toISOString(),
      moodId: selectedMood,
      note,
    };

    setMoodLogs([newLog, ...moodLogs]);
    setSelectedMood(null);
    setNote('');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
      <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-100">
        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-900">¿Cómo te sientes hoy?</h2>
        <form onSubmit={handleLogMood}>
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-between gap-2 md:gap-2 mb-4 md:mb-6">
            {MOODS.map((mood) => {
              const Icon = mood.icon;
              const isSelected = selectedMood === mood.id;
              return (
                <button
                  key={mood.id}
                  type="button"
                  className={`sm:flex-1 sm:min-w-[60px] flex flex-col items-center gap-1.5 md:gap-2 p-3 md:p-3 border-2 rounded-lg transition-all hover:-translate-y-1 ${isSelected ? 'shadow-md' : 'border-transparent'
                    }`}
                  onClick={() => setSelectedMood(mood.id)}
                  style={{
                    backgroundColor: isSelected ? mood.color : 'transparent',
                    borderColor: mood.color
                  }}
                >
                  <Icon size={28} className="md:w-8 md:h-8" color={isSelected ? '#fff' : mood.color} />
                  <span className={`text-xs md:text-sm font-medium ${isSelected ? 'text-white' : 'text-gray-600'}`}>
                    {mood.label}
                  </span>
                </button>
              );
            })}
          </div>

          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg resize-vertical focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
            placeholder="Agrega una nota (opcional)..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
          />

          <button
            type="submit"
            className="w-full mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
            disabled={!selectedMood}
          >
            Registrar Estado de Ánimo
          </button>
        </form>
      </div>

      <div>
        <h3 className="text-lg md:text-xl font-bold mb-4 text-gray-900">Registros Recientes</h3>
        <div className="flex flex-col gap-3 md:gap-4">
          {moodLogs.length === 0 && (
            <p className="text-center text-gray-500 p-6 md:p-8 bg-gray-50 rounded-lg text-sm md:text-base">
              Aún no has registrado ningún estado de ánimo.
            </p>
          )}
          {moodLogs.map((log) => {
            const mood = MOODS.find(m => m.id === log.moodId);
            const Icon = mood?.icon || Meh;
            return (
              <div key={log.id} className="bg-white rounded-lg shadow-sm p-3 md:p-4 border border-gray-100">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2" style={{ color: mood?.color }}>
                    <Icon size={18} className="md:w-5 md:h-5" />
                    <strong className="font-semibold text-sm md:text-base">{mood?.label}</strong>
                  </div>
                  <span className="text-[10px] md:text-xs text-gray-500">
                    {new Date(log.date).toLocaleDateString('es-ES')} {new Date(log.date).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                {log.note && <p className="text-xs md:text-sm text-gray-700">{log.note}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MoodTracker;
