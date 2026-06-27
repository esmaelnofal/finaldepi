import { useState } from 'react';
import { Moon, Sun, Clock, Flag, ChevronLeft, ChevronRight, LayoutGrid } from 'lucide-react';
import { MOCK_QUESTIONS } from '../data/mockData';
const [timeLeft, setTimeLeft] = useState(105 * 60); // 1h 45m in seconds

useEffect(() => {
  if (timeLeft <= 0) return;
  const timer = setInterval(() => {
    setTimeLeft((prev) => prev - 1);
  }, 1000);
  return () => clearInterval(timer);
}, [timeLeft]);

const formatTime = (seconds) => {
  const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');
  return `${h}:${m}:${s}`;
};

const ExamPage = ({ toggleDarkMode, isDarkMode, onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flagged, setFlagged] = useState(new Set());

  const question = MOCK_QUESTIONS[currentIndex];

  const handleOptionSelect = (optionIdx) => {
    setAnswers((prev) => ({ ...prev, [currentIndex]: optionIdx }));
  };

  const toggleFlag = () => {
    setFlagged((prev) => {
      const newFlags = new Set(prev);
      if (newFlags.has(currentIndex)) newFlags.delete(currentIndex);
      else newFlags.add(currentIndex);
      return newFlags;
    });
  };

  const getQuestionStatus = (idx) => {
    if (flagged.has(idx)) return 'flagged';
    if (answers[idx] !== undefined) return 'answered';
    if (idx === currentIndex) return 'current';
    return 'unseen';
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col transition-colors duration-200">
      {/* Exam Header */}
      <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold text-blue-600">EduSphere</h1>
          <div className="h-6 w-px bg-slate-200 dark:bg-slate-700"></div>
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
            Machine Learning Midterm
          </h2>
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={toggleDarkMode}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <div className="flex items-center gap-2 text-red-500 bg-red-50 dark:bg-red-900/20 px-4 py-1.5 rounded-lg font-medium">
  <Clock size={18} />
  <span>{formatTime(timeLeft)}</span>
</div>
          <button
            onClick={onBack}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-sm"
          >
            Submit Exam
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-6 flex gap-8">

        {/* Left Column: Question Area */}
        <div className="flex-1 flex flex-col min-h-[600px]">
          <div className="flex-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-8 relative flex flex-col">

            <div className="flex justify-between items-center mb-8">
              <span className="text-sm font-bold text-blue-600 uppercase tracking-widest">
                Question {currentIndex + 1} of {MOCK_QUESTIONS.length}
              </span>
              <button
                onClick={toggleFlag}
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                  flagged.has(currentIndex)
                    ? 'text-amber-500'
                    : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
              >
                <Flag
                  size={16}
                  className={flagged.has(currentIndex) ? 'fill-current' : ''}
                />
                {flagged.has(currentIndex) ? 'Flagged' : 'Flag for Review'}
              </button>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-6 leading-snug">
              {question.text}
            </h3>

            {question.code && (
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 mb-8 font-mono text-sm text-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700 overflow-x-auto">
                <pre>{question.code}</pre>
              </div>
            )}

            <div className="space-y-4 mb-8 flex-1">
              {question.options.map((opt, idx) => {
                const isSelected = answers[currentIndex] === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => handleOptionSelect(idx)}
                    className={`flex items-center p-5 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/10'
                        : 'border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-slate-500'
                    }`}
                  >
                    <div
                      className={`h-6 w-6 rounded-full border-2 flex items-center justify-center mr-4 shrink-0 transition-colors ${
                        isSelected ? 'border-blue-600' : 'border-slate-300 dark:border-slate-600'
                      }`}
                    >
                      {isSelected && (
                        <div className="h-3 w-3 rounded-full bg-blue-600" />
                      )}
                    </div>
                    <span
                      className={`text-[15px] ${
                        isSelected
                          ? 'text-blue-900 dark:text-blue-100 font-medium'
                          : 'text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {opt}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Footer Navigation */}
            <div className="flex justify-between items-center pt-6 border-t border-slate-100 dark:border-slate-800 mt-auto">
              <button
                onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
                disabled={currentIndex === 0}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                <ChevronLeft size={18} /> Previous
              </button>
              <button
                onClick={() =>
                  setCurrentIndex(Math.min(MOCK_QUESTIONS.length - 1, currentIndex + 1))
                }
                disabled={currentIndex === MOCK_QUESTIONS.length - 1}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                Next <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Navigation Grid */}
        <div className="w-[340px] flex flex-col gap-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 flex-1 flex flex-col">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4">
              Question Navigation
            </h3>

            <div className="flex flex-col gap-2 mb-6">
              <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                <div className="w-3.5 h-3.5 rounded bg-emerald-500 mr-2"></div>
                Answered ({Object.keys(answers).length})
              </div>
              <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                <div className="w-3.5 h-3.5 rounded bg-amber-500 mr-2 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-2 h-2 bg-amber-700 transform rotate-45 translate-x-1 -translate-y-1"></div>
                </div>
                Flagged ({flagged.size})
              </div>
              <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                <div className="w-3.5 h-3.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 mr-2"></div>
                Unseen ({MOCK_QUESTIONS.length - Object.keys(answers).length})
              </div>
            </div>

            <div className="grid grid-cols-5 gap-2.5 overflow-y-auto pr-2 pb-2 custom-scrollbar">
              {MOCK_QUESTIONS.map((_, idx) => {
                const status = getQuestionStatus(idx);
                let btnClass =
                  'h-10 w-full rounded font-medium text-sm flex items-center justify-center transition-all relative border ';

                if (idx === currentIndex) {
                  btnClass +=
                    'bg-blue-600 text-white border-blue-600 shadow-md transform scale-105';
                } else if (status === 'flagged') {
                  btnClass +=
                    'bg-amber-50 text-amber-700 border-amber-300 dark:bg-amber-900/20 dark:text-amber-500 dark:border-amber-700';
                } else if (status === 'answered') {
                  btnClass +=
                    'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800';
                } else {
                  btnClass +=
                    'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700 dark:hover:border-slate-600';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={btnClass}
                  >
                    {status === 'flagged' && (
                      <div className="absolute top-0 right-0 w-0 h-0 border-t-[8px] border-r-[8px] border-t-amber-500 border-r-transparent"></div>
                    )}
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          <button className="w-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 py-3.5 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700">
            <LayoutGrid size={18} /> Overview Map
          </button>
        </div>

      </main>
    </div>
  );
};

export default ExamPage;
