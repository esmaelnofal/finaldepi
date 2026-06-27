import { useState } from 'react';
import Sidebar from './components/Sidebar';
import AITutorPage from './components/AITutorPage';
import ExamPage from './components/ExamPage';

export default function App() {
  const [view, setView] = useState('tutor'); // 'tutor' | 'exam'
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className={`min-h-screen w-full ${isDarkMode ? 'dark' : ''} font-sans`}>
      {view === 'tutor' ? (
        <div className="flex h-screen overflow-hidden pl-64">
          <Sidebar />
          <AITutorPage
            toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
            isDarkMode={isDarkMode}
            onStartExam={() => setView('exam')}
          />
        </div>
      ) : (
        <ExamPage
          toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          isDarkMode={isDarkMode}
          onBack={() => setView('tutor')}
        />
      )}
    </div>
  );
}
