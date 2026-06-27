import { Bot, User } from 'lucide-react';

const ChatMessage = ({ msg }) => {
  const isBot = msg.sender === 'bot';

  return (
    <div className={`flex w-full ${isBot ? 'justify-start' : 'justify-end'} mb-4`}>
      {isBot && (
        <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white mr-3 shrink-0 mt-1">
          <Bot size={18} />
        </div>
      )}
      <div
        className={`max-w-[80%] rounded-2xl px-5 py-3.5 text-[15px] leading-relaxed shadow-sm ${
          isBot
            ? 'bg-[#eff4ff] dark:bg-blue-900/20 text-slate-800 dark:text-slate-200 rounded-tl-none'
            : 'bg-blue-600 text-white rounded-tr-none'
        }`}
      >
        {msg.text.split('\n').map((line, i) => (
          <p key={i} className="mb-2 last:mb-0">
            {line}
          </p>
        ))}
      </div>
      {!isBot && (
        <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 ml-3 shrink-0 mt-1">
          <User size={18} />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
