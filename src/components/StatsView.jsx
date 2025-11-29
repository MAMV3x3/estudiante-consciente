import React from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { TrendingUp, Calendar, Heart, Target } from 'lucide-react';

const StatsView = () => {
    const [moodLogs] = useLocalStorage('moodLogs', []);
    const [habitHistory] = useLocalStorage('habitHistory', {});

    // Calculate mood frequency
    const moodFrequency = moodLogs.reduce((acc, log) => {
        acc[log.moodId] = (acc[log.moodId] || 0) + 1;
        return acc;
    }, {});

    const moodLabels = {
        happy: 'Feliz',
        calm: 'Tranquilo/a',
        neutral: 'Neutral',
        sad: 'Triste',
        stressed: 'Estresado/a'
    };

    const moodColors = {
        happy: '#FFD93D',
        calm: '#6BCB77',
        neutral: '#A2D2FF',
        sad: '#A0A0A0',
        stressed: '#FF6B6B'
    };

    // Calculate total moods logged
    const totalMoods = moodLogs.length;

    // Calculate this week's habit completion
    const getLast7Days = () => {
        const days = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            days.push(d.toISOString().split('T')[0]);
        }
        return days;
    };

    const last7Days = getLast7Days();
    const weeklyHabitData = last7Days.map(date => ({
        date,
        completed: habitHistory[date]?.length || 0,
        total: 5 // DEFAULT_HABITS.length
    }));

    const weeklyCompletionRate = Math.round(
        (weeklyHabitData.reduce((sum, day) => sum + day.completed, 0) /
            (weeklyHabitData.length * 5)) * 100
    );

    // Most common mood
    const mostCommonMoodId = Object.keys(moodFrequency).reduce((a, b) =>
        moodFrequency[a] > moodFrequency[b] ? a : b
        , Object.keys(moodFrequency)[0]);

    return (
        <div className="max-w-5xl mx-auto">
            <div className="mb-6 md:mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Tu Progreso Emocional</h2>
                <p className="text-sm md:text-base text-gray-600">Analiza tu bienestar y patrones de comportamiento</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-5 md:p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-3 md:mb-4">
                        <Heart size={28} className="md:w-8 md:h-8" />
                        <Calendar size={20} className="md:w-6 md:h-6 opacity-80" />
                    </div>
                    <div className="text-2xl md:text-3xl font-bold mb-1">{totalMoods}</div>
                    <div className="text-sm md:text-base text-blue-100">Registros de Ánimo</div>
                </div>

                <div className="bg-gradient-to-br from-teal-500 to-teal-600 text-white rounded-xl p-5 md:p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-3 md:mb-4">
                        <Target size={28} className="md:w-8 md:h-8" />
                        <TrendingUp size={20} className="md:w-6 md:h-6 opacity-80" />
                    </div>
                    <div className="text-2xl md:text-3xl font-bold mb-1">{weeklyCompletionRate}%</div>
                    <div className="text-sm md:text-base text-teal-100">Hábitos esta Semana</div>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-5 md:p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-3 md:mb-4">
                        <Heart size={28} className="md:w-8 md:h-8" fill="white" />
                        <span className="text-3xl md:text-4xl">😊</span>
                    </div>
                    <div className="text-lg md:text-xl font-bold mb-1">
                        {mostCommonMoodId ? moodLabels[mostCommonMoodId] : 'N/A'}
                    </div>
                    <div className="text-sm md:text-base text-purple-100">Estado Más Frecuente</div>
                </div>
            </div>

            {/* Mood Distribution */}
            <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-100 mb-6 md:mb-8">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6">Distribución de Estados de Ánimo</h3>
                {totalMoods === 0 ? (
                    <p className="text-gray-500 text-center py-8 text-sm md:text-base">Aún no has registrado estados de ánimo.</p>
                ) : (
                    <div className="space-y-4">
                        {Object.entries(moodFrequency).map(([moodId, count]) => {
                            const percentage = Math.round((count / totalMoods) * 100);
                            return (
                                <div key={moodId}>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-medium text-sm md:text-base text-gray-700">{moodLabels[moodId]}</span>
                                        <span className="text-xs md:text-sm text-gray-600">{count} veces ({percentage}%)</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                        <div
                                            className="h-3 rounded-full transition-all duration-500"
                                            style={{
                                                width: `${percentage}%`,
                                                backgroundColor: moodColors[moodId]
                                            }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Weekly Habit Progress */}
            <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-100">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6">Progreso de Hábitos (Últimos 7 Días)</h3>
                <div className="overflow-x-auto -mx-4 md:mx-0 px-4 md:px-0">
                    <div className="min-w-[280px] grid grid-cols-7 gap-1.5 md:gap-2">
                        {weeklyHabitData.map((day, index) => {
                            // Parse date in local timezone to avoid UTC offset issues
                            const [year, month, dayNum] = day.date.split('-').map(Number);
                            const date = new Date(year, month - 1, dayNum);
                            const dayName = date.toLocaleDateString('es-ES', { weekday: 'short' });
                            const percentage = Math.round((day.completed / day.total) * 100);

                            return (
                                <div key={index} className="text-center">
                                    <div className="text-[10px] md:text-xs text-gray-500 mb-1.5 md:mb-2 capitalize">{dayName}</div>
                                    <div
                                        className="h-16 md:h-24 bg-gray-200 rounded-lg relative overflow-hidden"
                                        title={`${day.completed}/${day.total} completados`}
                                    >
                                        <div
                                            className="absolute bottom-0 w-full bg-gradient-to-t from-teal-600 to-teal-400 transition-all duration-500"
                                            style={{ height: `${percentage}%` }}
                                        />
                                    </div>
                                    <div className="text-[10px] md:text-xs font-semibold text-gray-700 mt-1.5 md:mt-2">
                                        {day.completed}/{day.total}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Insights */}
            <div className="mt-6 md:mt-8 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 md:p-6">
                <h3 className="text-base md:text-lg font-bold text-amber-900 mb-3 flex items-center gap-2">
                    <TrendingUp size={18} className="md:w-5 md:h-5" />
                    Recomendaciones Personalizadas
                </h3>
                <ul className="space-y-2 text-xs md:text-sm text-amber-900">
                    {weeklyCompletionRate < 50 && (
                        <li>• Trata de completar al menos 3 hábitos diarios para mejorar tu bienestar.</li>
                    )}
                    {moodFrequency.stressed > totalMoods * 0.3 && (
                        <li>• Has registrado estrés frecuentemente. Considera practicar más actividades de mindfulness.</li>
                    )}
                    {totalMoods < 7 && (
                        <li>• Registra tu estado de ánimo diariamente para obtener mejores insights sobre tu bienestar.</li>
                    )}
                    {weeklyCompletionRate >= 80 && (
                        <li>• ¡Excelente trabajo! Mantén tus hábitos saludables durante los exámenes.</li>
                    )}
                    {!moodFrequency.stressed && totalMoods > 5 && (
                        <li>• ¡Genial! No has registrado estrés recientemente. Sigue así.</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default StatsView;
