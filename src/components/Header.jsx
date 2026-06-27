import { Search, Bell, Moon, Sun, User } from 'lucide-react';

const Header = ({ toggleDarkMode, isDarkMode, title, children }) => (
  <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 sticky top-0 z-10 transition-colors duration-200">
    <div className="flex items-center flex-1">
      {title ? (
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">{title}</h2>
      ) : (
        <div className="relative w-96">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search resources..."
            className="w-full pl-10 pr-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-transparent text-slate-900 dark:text-slate-100 transition-colors duration-200"
          />
        </div>
      )}
    </div>

    <div className="flex items-center space-x-6">
      {!title && (
        <nav className="hidden md:flex space-x-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">
            My Library
          </a>
          <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">
            Schedule
          </a>
          <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">
            Community
          </a>
        </nav>
      )}

      {children}

      <div className="flex items-center space-x-4 border-l border-slate-200 dark:border-slate-700 pl-6 ml-2">
        <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
          <Bell size={20} />
        </button>
        <button
          onClick={toggleDarkMode}
          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300">
          <User size={18} />
        </button>
      </div>
    </div>
  </header>
);

export default Header;
