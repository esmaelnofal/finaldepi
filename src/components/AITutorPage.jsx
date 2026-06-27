import { useState, useEffect, useRef } from 'react';
import {
  BookOpen,
  Bot,
  CheckCircle2,
  PlayCircle,
  Lock,
  Paperclip,
  Send,
  Clock,
  MoreVertical,
} from 'lucide-react';
import Header from './Header';
import ChatMessage from './ChatMessage';

const AITutorPage = ({ toggleDarkMode, isDarkMode, onStartExam }) => {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hello! I am ready to help you with Neural Networks Fundamentals. What would you like to know today?',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (text) => {
    if (!text.trim()) return;

    const newMessages = [...messages, { sender: 'user', text }];
    setMessages(newMessages);
    setInputValue('');

    setTimeout(() => {
      let botResponse =
        "That's an interesting point! Could you elaborate on what specific aspect you want to explore?";
      const lowerText = text.toLowerCase();

      if (lowerText.includes('activation')) {
        botResponse =
          'Without non-linear activation functions, a neural network is just a linear regression model, no matter how many layers it has.\n\nThey allow networks to learn complex patterns in data.';
      } else if (lowerText.includes('relu')) {
        botResponse =
          'ReLU (Rectified Linear Unit) is very popular! It simply outputs the input if it\'s positive, and 0 if it\'s negative. It helps solve the vanishing gradient problem.';
      } else if (lowerText.includes('python')) {
        botResponse =
          'Sure! Here is a simple Python example for ReLU:\n\ndef relu(x):\n  return max(0, x)';
      }

      setMessages((prev) => [...prev, { sender: 'bot', text: botResponse }]);
    }, 800);
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
      <Header toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode}>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm font-medium transition-colors shadow-sm">
          Join Session
        </button>
      </Header>

      <main className="flex-1 overflow-hidden p-6">
        <div className="max-w-7xl mx-auto h-full flex space-x-6">

          {/* Left Column: Course Outline */}
          <div className="w-72 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col overflow-hidden">
            <div className="p-5 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider flex items-center gap-2">
                <BookOpen size={14} /> Module 4
              </span>
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-2">
                Neural Networks
                <br />
                Fundamentals
              </h2>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-1">
              <button className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300 transition-colors">
                <CheckCircle2 size={18} className="text-emerald-500" />
                <span className="text-sm font-medium">Introduction to Deep Learning</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300 transition-colors">
                <CheckCircle2 size={18} className="text-emerald-500" />
                <span className="text-sm font-medium">Perceptrons</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20 transition-colors">
                <PlayCircle size={18} className="text-blue-200" />
                <span className="text-sm font-medium">Activation Functions</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-500 dark:text-slate-500 transition-colors">
                <Lock size={18} />
                <span className="text-sm font-medium">Backpropagation</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-500 dark:text-slate-500 transition-colors">
                <Lock size={18} />
                <span className="text-sm font-medium">Loss Functions</span>
              </button>
            </div>
          </div>

          {/* Middle Column: Chat Interface */}
          <div className="flex-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col relative overflow-hidden">
            {/* Chat Header */}
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm z-10 absolute top-0 w-full">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-sm">
                  <Bot size={22} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-slate-100">
                    EduSphere AI Tutor
                  </h3>
                  <div className="flex items-center text-xs text-emerald-600 dark:text-emerald-500 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></div>
                    Online & Ready to help
                  </div>
                </div>
              </div>
              <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <MoreVertical size={20} />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 pt-24 pb-32">
              {messages.map((msg, idx) => (
                <ChatMessage key={idx} msg={msg} />
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input Area */}
            <div className="absolute bottom-0 w-full p-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-100 dark:border-slate-800">
              <div className="max-w-3xl mx-auto">
                <div className="relative flex items-center">
                  <button className="absolute left-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                    <Paperclip size={20} />
                  </button>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                    placeholder="Ask a question or type '/' for commands..."
                    className="w-full pl-12 pr-14 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
                  />
                  <button
                    onClick={() => handleSendMessage(inputValue)}
                    className="absolute right-3 h-10 w-10 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center justify-center transition-colors shadow-sm"
                  >
                    <Send size={18} className="ml-0.5" />
                  </button>
                </div>
                <div className="flex items-center space-x-2 mt-3 pl-2">
                  <span className="text-xs text-slate-400 font-medium">Suggested:</span>
                  <button
                    onClick={() => handleSendMessage('What is ReLU?')}
                    className="text-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 px-3 py-1.5 rounded-full transition-colors border border-slate-200 dark:border-slate-700"
                  >
                    What is ReLU?
                  </button>
                  <button
                    onClick={() => handleSendMessage('Show Python example')}
                    className="text-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 px-3 py-1.5 rounded-full transition-colors border border-slate-200 dark:border-slate-700"
                  >
                    Show Python example
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Context & Quiz */}
          <div className="w-80 space-y-6">
            {/* Context Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-5">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-4">
                <span className="text-amber-500">✨</span> Recommended for Context
              </h3>
              <div className="space-y-3">
                <div className="flex gap-3 items-start p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer border border-transparent hover:border-slate-100 dark:hover:border-slate-700">
                  <div className="h-12 w-16 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                    <PlayCircle size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 leading-snug">
                      Visualizing Activation Functions
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
                      <Clock size={12} /> 5 mins
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 items-start p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer border border-transparent hover:border-slate-100 dark:hover:border-slate-700">
                  <div className="h-12 w-16 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center text-indigo-500 shrink-0">
                    <BookOpen size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 leading-snug">
                      Cheatsheet: ReLU vs Sigmoid vs Tanh
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
                      <Paperclip size={12} /> PDF
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quiz Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-2">
                <CheckCircle2 size={16} className="text-emerald-500" /> Knowledge Check
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                Test your understanding of non-linearity and basic concepts before moving on.
              </p>
              <button
                onClick={onStartExam}
                className="w-full bg-[#1e293b] hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 text-white py-3 rounded-xl font-medium transition-colors shadow-sm"
              >
                Start Quick Quiz
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default AITutorPage;
