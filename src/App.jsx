import React, { useState } from 'react';
import Layout from './components/Layout';
import MoodTracker from './components/MoodTracker';
import HabitTracker from './components/HabitTracker';
import ActivityCard from './components/ActivityCard';
import StatsView from './components/StatsView';

function App() {
  const [activeTab, setActiveTab] = useState('mood');

  const renderContent = () => {
    switch (activeTab) {
      case 'mood':
        return <MoodTracker />;
      case 'habits':
        return <HabitTracker />;
      case 'activities':
        return <ActivityCard />;
      case 'stats':
        return <StatsView />;
      default:
        return <MoodTracker />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="animate-fade-in">
        {renderContent()}
      </div>
    </Layout>
  );
}

export default App;
