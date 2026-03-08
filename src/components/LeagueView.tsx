import { motion } from 'motion/react';
import { Shield, Trophy, Medal } from 'lucide-react';

const mockLeaderboard = [
  { id: '1', name: 'Maria Silva', xp: 2450, isCurrentUser: false, avatar: '👩' },
  { id: '2', name: 'João Souza', xp: 2100, isCurrentUser: false, avatar: '👨' },
  { id: '3', name: 'Você', xp: 1250, isCurrentUser: true, avatar: '😎' },
  { id: '4', name: 'Ana Costa', xp: 1100, isCurrentUser: false, avatar: '👧' },
  { id: '5', name: 'Pedro Santos', xp: 950, isCurrentUser: false, avatar: '👦' },
  { id: '6', name: 'Lucas Lima', xp: 820, isCurrentUser: false, avatar: '👱‍♂️' },
  { id: '7', name: 'Julia Alves', xp: 750, isCurrentUser: false, avatar: '👱‍♀️' },
];

export function LeagueView() {
  return (
    <div className="flex-1 overflow-y-auto pb-32 pt-6 px-4">
      <div className="max-w-md mx-auto flex flex-col gap-6">
        
        {/* League Header */}
        <div className="flex flex-col items-center text-center gap-3 mb-4">
          <div className="w-24 h-24 bg-amber-500/20 rounded-full flex items-center justify-center border-4 border-amber-500/30">
            <Shield className="w-12 h-12 text-amber-500" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-zinc-100">Liga Ouro</h2>
            <p className="text-zinc-400 text-sm mt-1">Os 3 primeiros avançam para a Liga Safira</p>
          </div>
        </div>

        {/* Leaderboard List */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
          {mockLeaderboard.map((user, index) => {
            const isTop3 = index < 3;
            
            return (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex items-center gap-4 p-4 border-b border-zinc-800/50 last:border-0 ${
                  user.isCurrentUser ? 'bg-indigo-500/10' : ''
                }`}
              >
                {/* Rank */}
                <div className="w-8 font-bold text-center flex justify-center">
                  {index === 0 ? <Trophy className="w-6 h-6 text-amber-400" /> :
                   index === 1 ? <Medal className="w-6 h-6 text-zinc-300" /> :
                   index === 2 ? <Medal className="w-6 h-6 text-amber-700" /> :
                   <span className={user.isCurrentUser ? 'text-indigo-400' : 'text-zinc-500'}>{index + 1}</span>}
                </div>
                
                {/* Avatar */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                  user.isCurrentUser ? 'bg-indigo-500/20 border-2 border-indigo-500' : 'bg-zinc-800'
                }`}>
                  {user.avatar}
                </div>
                
                {/* Name */}
                <div className="flex-1">
                  <h3 className={`font-bold ${user.isCurrentUser ? 'text-indigo-400' : 'text-zinc-200'}`}>
                    {user.name}
                  </h3>
                </div>
                
                {/* XP */}
                <div className="text-right">
                  <span className="font-bold text-zinc-300">{user.xp}</span>
                  <span className="text-xs text-zinc-500 ml-1">XP</span>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Promotion Zone Indicator */}
        <div className="flex items-center gap-2 justify-center text-sm text-amber-500/80 font-medium mt-2">
          <div className="w-full h-px bg-amber-500/20 flex-1" />
          <span>Zona de Promoção</span>
          <div className="w-full h-px bg-amber-500/20 flex-1" />
        </div>
      </div>
    </div>
  );
}
