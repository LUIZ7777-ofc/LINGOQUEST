import { Home, Shield, BookOpen, User } from 'lucide-react';

interface BottomBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function BottomBar({ activeTab, setActiveTab }: BottomBarProps) {
  const tabs = [
    { id: 'home', icon: Home, label: 'Aprender' },
    { id: 'leaderboard', icon: Shield, label: 'Ligas' },
    { id: 'quests', icon: BookOpen, label: 'Missões' },
    { id: 'profile', icon: User, label: 'Perfil' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-zinc-950 border-t border-zinc-800 px-6 py-3 pb-safe">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors ${
                isActive ? 'text-indigo-400' : 'text-zinc-500 hover:text-zinc-400'
              }`}
            >
              <Icon className={`w-6 h-6 ${isActive ? 'fill-indigo-400/20' : ''}`} />
              <span className="text-[10px] font-bold uppercase tracking-wider">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
