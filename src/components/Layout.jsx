import React from 'react';
import { Heart, CheckCircle, Zap, BarChart3 } from 'lucide-react';

const Layout = ({ children, activeTab, setActiveTab }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 md:px-4 py-3 md:py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 md:gap-4">
            <div className="flex items-center gap-2 md:gap-3">
              <img src={`${import.meta.env.BASE_URL}brain.svg`} alt="Brain" className="w-8 h-8 md:w-10 md:h-10 fill-blue-600" />
              <h1 className="text-lg md:text-xl font-bold text-gray-900">Estudiante Consciente</h1>
            </div>
            <nav className="flex gap-1.5 md:gap-2 w-full sm:w-auto justify-center">
              <button
                className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full font-medium transition-all text-sm md:text-base ${activeTab === 'mood'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
                  }`}
                onClick={() => setActiveTab('mood')}
              >
                <Heart size={18} className="md:w-5 md:h-5" />
                <span className="hidden xs:inline">Ánimo</span>
              </button>
              <button
                className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full font-medium transition-all text-sm md:text-base ${activeTab === 'habits'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
                  }`}
                onClick={() => setActiveTab('habits')}
              >
                <CheckCircle size={18} className="md:w-5 md:h-5" />
                <span className="hidden xs:inline">Hábitos</span>
              </button>
              <button
                className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full font-medium transition-all text-sm md:text-base ${activeTab === 'activities'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
                  }`}
                onClick={() => setActiveTab('activities')}
              >
                <Zap size={18} className="md:w-5 md:h-5" />
                <span className="hidden xs:inline">Actividades</span>
              </button>
              <button
                className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full font-medium transition-all text-sm md:text-base ${activeTab === 'stats'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
                  }`}
                onClick={() => setActiveTab('stats')}
              >
                <BarChart3 size={18} className="md:w-5 md:h-5" />
                <span className="hidden xs:inline">Progreso</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-3 md:px-4 py-6 md:py-8">
        {children}
      </main>

      <footer className="bg-white py-6 md:py-8 mt-auto border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-3 md:px-4">
          {/* SDG Icons Section */}
          <div className="mb-4 md:mb-6">
            <h3 className="text-[10px] md:text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3 md:mb-4 text-center">
              Alineado con los Objetivos de Desarrollo Sostenible de la ONU
            </h3>
            <div className="flex justify-center items-center gap-3 md:gap-4 flex-wrap">
              <a
                href="https://sdgs.un.org/es/goals/goal3"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-110"
                title="ODS 3: Salud y Bienestar"
              >
                <img src={`${import.meta.env.BASE_URL}assets/ods-3.png`} alt="ODS 3: Salud y Bienestar" className="h-12 w-12 md:h-16 md:w-16" />
              </a>
              <a
                href="https://sdgs.un.org/es/goals/goal4"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-110"
                title="ODS 4: Educación de Calidad"
              >
                <img src={`${import.meta.env.BASE_URL}assets/ods-4.png`} alt="ODS 4: Educación de Calidad" className="h-12 w-12 md:h-16 md:w-16" />
              </a>
              <a
                href="https://sdgs.un.org/es/goals/goal9"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-110"
                title="ODS 9: Industria, Innovación y Infraestructura"
              >
                <img src={`${import.meta.env.BASE_URL}assets/ods-9.png`} alt="ODS 9: Industria, Innovación y Infraestructura" className="h-12 w-12 md:h-16 md:w-16" />
              </a>
            </div>
          </div>

          {/* Copyright */}
          <p className="text-center text-gray-500 text-xs md:text-sm">
            &copy; {new Date().getFullYear()} Estudiante Consciente. Prioriza tu bienestar.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
