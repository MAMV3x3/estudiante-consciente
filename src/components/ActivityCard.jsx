import React, { useState } from 'react';
import { Zap, RefreshCw, Clock, BookOpen } from 'lucide-react';

const ACTIVITIES = [
  {
    id: 1,
    title: 'Respiración Cuadrada',
    duration: '2 mins',
    description: 'Inhala 4s, sostén 4s, exhala 4s, sostén 4s. Repite.',
    category: 'Mindfulness',
    tip: 'Ideal antes de un examen para calmar los nervios.'
  },
  {
    id: 2,
    title: 'Estiramiento Rápido',
    duration: '3 mins',
    description: 'Párate y toca tus pies. Alcanza el cielo. Rueda tus hombros.',
    category: 'Físico',
    tip: 'Después de estudiar mucho tiempo, tu cuerpo lo agradecerá.'
  },
  {
    id: 3,
    title: 'Pausa de Hidratación',
    duration: '1 min',
    description: 'Bebe un vaso completo de agua lentamente.',
    category: 'Bienestar',
    tip: 'La deshidratación reduce tu concentración hasta un 20%.'
  },
  {
    id: 4,
    title: 'Técnica 5-4-3-2-1',
    duration: '5 mins',
    description: 'Identifica 5 cosas que ves, 4 que sientes, 3 que oyes, 2 que hueles, 1 que saboreas.',
    category: 'Mindfulness',
    tip: 'Perfecto cuando sientes ansiedad antes de una presentación.'
  },
  {
    id: 5,
    title: 'Canción Favorita',
    duration: '4 mins',
    description: 'Escucha tu canción favorita y concéntrate solo en la música.',
    category: 'Mental',
    tip: 'La música puede mejorar tu estado de ánimo instantáneamente.'
  },
  {
    id: 6,
    title: 'Organiza tu Espacio',
    duration: '5 mins',
    description: 'Limpia un área pequeña de tu escritorio o habitación.',
    category: 'Productividad',
    tip: 'Un espacio ordenado ayuda a tener una mente más clara.'
  },
  {
    id: 7,
    title: 'Garabateo Libre',
    duration: '5 mins',
    description: 'Dibuja algo al azar en un papel. Sin juicios.',
    category: 'Creativo',
    tip: 'Libera tu mente cuando estés bloqueado estudiando.'
  },
  {
    id: 8,
    title: 'Desconexión Digital',
    duration: '10 mins',
    description: 'Guarda tu teléfono y mira por la ventana.',
    category: 'Mental',
    tip: 'Descansar de las pantallas mejora tu concentración.'
  },
  {
    id: 9,
    title: 'Técnica Pomodoro',
    duration: '25 mins',
    description: 'Estudia 25 min sin distracciones, luego descansa 5 min.',
    category: 'Productividad',
    tip: 'Método comprobado para maximizar tu tiempo de estudio.'
  },
  {
    id: 10,
    title: 'Visualización Positiva',
    duration: '3 mins',
    description: 'Cierra los ojos. Imagínate teniendo éxito en tu próximo examen.',
    category: 'Mindfulness',
    tip: 'La visualización reduce la ansiedad pre-examen.'
  },
];

const ActivityCard = () => {
  const [currentActivity, setCurrentActivity] = useState(ACTIVITIES[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  const getNewActivity = () => {
    setIsAnimating(true);
    setTimeout(() => {
      const otherActivities = ACTIVITIES.filter(a => a.id !== currentActivity.id);
      const random = otherActivities[Math.floor(Math.random() * otherActivities.length)];
      setCurrentActivity(random);
      setIsAnimating(false);
    }, 300);
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Mindfulness': 'bg-purple-100 text-purple-700',
      'Físico': 'bg-green-100 text-green-700',
      'Bienestar': 'bg-blue-100 text-blue-700',
      'Mental': 'bg-indigo-100 text-indigo-700',
      'Productividad': 'bg-orange-100 text-orange-700',
      'Creativo': 'bg-pink-100 text-pink-700',
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 md:p-8 text-center border border-gray-100">
        <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
          <Zap size={24} className="md:w-8 md:h-8 text-blue-600" fill="rgb(191 219 254)" />
        </div>

        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-900">Microactividad para Estudiantes</h2>

        <div className={`transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
          <div className="mb-3 md:mb-4">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(currentActivity.category)}`}>
              {currentActivity.category}
            </span>
          </div>

          <h3 className="text-xl md:text-2xl font-bold text-blue-700 mb-3">  {currentActivity.title}</h3>

          <div className="inline-flex items-center gap-2 bg-gray-100 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm text-gray-600 mb-3 md:mb-4">
            <Clock size={14} className="md:w-4 md:h-4" />
            <span>{currentActivity.duration}</span>
          </div>

          <p className="text-base md:text-lg text-gray-700 mb-3 md:mb-4 max-w-md mx-auto leading-relaxed px-2">
            {currentActivity.description}
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 md:p-4 mb-4 md:mb-6">
            <div className="flex items-start gap-2">
              <BookOpen size={16} className="md:w-[18px] md:h-[18px] text-amber-700 mt-0.5 flex-shrink-0" />
              <p className="text-xs md:text-sm text-amber-800 text-left">
                <strong>Consejo:</strong> {currentActivity.tip}
              </p>
            </div>
          </div>
        </div>

        <button
          className="bg-blue-600 text-white px-5 md:px-6 py-2.5 md:py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto text-sm md:text-base"
          onClick={getNewActivity}
        >
          <RefreshCw size={16} className="md:w-[18px] md:h-[18px]" />
          Nueva Actividad
        </button>
      </div>

      <div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-4 md:p-5">
          <h4 className="font-bold text-purple-900 mb-2 text-sm md:text-base">📚 Antes de un Examen</h4>
          <p className="text-xs md:text-sm text-purple-800">
            Practica respiración cuadrada o visualización positiva para reducir la ansiedad.
          </p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-4 md:p-5">
          <h4 className="font-bold text-green-900 mb-2 text-sm md:text-base">⏰ Durante Sesiones Largas</h4>
          <p className="text-xs md:text-sm text-green-800">
            Usa la técnica Pomodoro y haz estiramientos cada hora para mantener la concentración.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
