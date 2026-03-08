import { motion } from 'motion/react';
import { Target, Zap, Star, Gift, Check } from 'lucide-react';
import { UserState } from '../types';

interface QuestsViewProps {
  userState: UserState;
}

export function QuestsView({ userState }: QuestsViewProps) {
  const dailyQuests = [
    {
      id: 'q1',
      title: 'Ganhe 50 XP',
      current: userState.xp % 50,
      target: 50,
      reward: 10,
      icon: Zap,
      color: 'text-amber-500',
      bg: 'bg-amber-500/20',
      border: 'border-amber-500/30'
    },
    {
      id: 'q2',
      title: 'Complete 3 lições',
      current: userState.completedLessons.length % 3,
      target: 3,
      reward: 15,
      icon: Target,
      color: 'text-blue-500',
      bg: 'bg-blue-500/20',
      border: 'border-blue-500/30'
    },
    {
      id: 'q3',
      title: 'Faça 1 lição perfeita',
      current: 0,
      target: 1,
      reward: 20,
      icon: Star,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/20',
      border: 'border-emerald-500/30'
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto pb-32 pt-6 px-4">
      <div className="max-w-md mx-auto flex flex-col gap-6">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3 mb-2">
          <div className="w-24 h-24 bg-indigo-500/20 rounded-full flex items-center justify-center border-4 border-indigo-500/30">
            <Gift className="w-12 h-12 text-indigo-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-zinc-100">Missões Diárias</h2>
            <p className="text-zinc-400 text-sm mt-1">Complete missões para ganhar gemas</p>
          </div>
        </div>

        {/* Quests List */}
        <div className="flex flex-col gap-4">
          {dailyQuests.map((quest, index) => {
            const progress = Math.min((quest.current / quest.target) * 100, 100);
            const isCompleted = quest.current >= quest.target;
            const Icon = quest.icon;

            return (
              <motion.div
                key={quest.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex items-center gap-4"
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 border-2 ${quest.bg} ${quest.border}`}>
                  {isCompleted ? (
                    <Check className={`w-7 h-7 ${quest.color}`} />
                  ) : (
                    <Icon className={`w-7 h-7 ${quest.color}`} />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-zinc-200">{quest.title}</h3>
                    <div className="flex items-center gap-1 text-blue-400 font-bold text-sm">
                      <Gift className="w-4 h-4" />
                      <span>{quest.reward}</span>
                    </div>
                  </div>
                  
                  <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div 
                      className={`h-full rounded-full ${isCompleted ? 'bg-emerald-500' : 'bg-indigo-500'}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                    />
                  </div>
                  <p className="text-xs text-zinc-500 mt-1.5 font-medium text-right">
                    {quest.current} / {quest.target}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
        
      </div>
    </div>
  );
}
