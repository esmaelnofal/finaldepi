import {
  LayoutDashboard,
  BookOpen,
  Bot,
  GraduationCap,
  Settings,
  HelpCircle,
  Lock,
} from 'lucide-react';

const Sidebar = () => (
  <div className="w-64 bg-[#1e293b] text-slate-300 flex flex-col h-screen fixed left-0 top-0">
    <div className="p-6">
      <h1 className="text-xl font-bold text-white tracking-tight">EduSphere</h1>
      <p className="text-xs text-slate-400 mt-1">Enterprise Learning</p>
    </div>

    <nav className="flex-1 px-4 space-y-2 mt-4">
      <a
        href="#"
        className="flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-slate-800 transition-colors"
      >
        <LayoutDashboard size={20} />
        <span className="text-sm font-medium">Dashboard</span>
      </a>
      <a
        href="#"
        className="flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-slate-800 transition-colors"
      >
        <BookOpen size={20} />
        <span className="text-sm font-medium">Courses</span>
      </a>
      <a
        href="#"
        className="flex items-center space-x-3 px-3 py-2.5 rounded-lg bg-blue-600 text-white transition-colors"
      >
        <Bot size={20} />
        <span className="text-sm font-medium">AI Tutor</span>
      </a>
      <a
        href="#"
        className="flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-slate-800 transition-colors"
      >
        <GraduationCap size={20} />
        <span className="text-sm font-medium">Exams</span>
      </a>
      <a
        href="#"
        className="flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-slate-800 transition-colors text-slate-500"
      >
        <Lock size={16} />
        <span className="text-sm font-medium">Admin</span>
      </a>
    </nav>

    <div className="p-4 mt-auto">
      <button className="w-full bg-slate-100 text-slate-900 py-2.5 rounded-lg text-sm font-semibold hover:bg-white transition-colors mb-4">
        Upgrade Plan
      </button>
      <div className="space-y-1">
        <a
          href="#"
          className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <Settings size={18} />
          <span className="text-sm">Settings</span>
        </a>
        <a
          href="#"
          className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <HelpCircle size={18} />
          <span className="text-sm">Support</span>
        </a>
      </div>
    </div>
  </div>
);

export default Sidebar;
