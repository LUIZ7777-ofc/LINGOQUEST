import { motion } from 'motion/react';
import { User, Zap, Shield, BookOpen, Trophy, Medal, Award } from 'lucide-react';
import { UserState } from '../types';

interface ProfileViewProps {
  userState: UserState;
}

export function ProfileView({ userState }: ProfileViewProps) {
  const stats = [
    { label: 'Ofensiva', value: userState.streak, icon: Zap, color: 'text-amber-500', bg: 'bg-amber-500/20' },
    { label: 'XP Total', value: userState.xp, icon: Zap, color: 'text-blue-500', bg: 'bg-blue-500/20' },
    { label: 'Liga Atual', value: 'Ouro', icon: Shield, color: 'text-amber-400', bg: 'bg-amber-400/20' },
    { label: 'Top 3', value: '4', icon: Trophy, color: 'text-emerald-500', bg: 'bg-emerald-500/20' },
  ];

  const achievements = [
    { id: 'a1', title: 'Sábio', desc: 'Ganhe 1000 XP', icon: BookOpen, color: 'text-indigo-400', bg: 'bg-indigo-500/20', unlocked: true },
    { id: 'a2', title: 'Campeão', desc: 'Termine em 1º lugar', icon: Medal, color: 'text-amber-400', bg: 'bg-amber-500/20', unlocked: true },
    { id: 'a3', title: 'Lendário', desc: 'Ofensiva de 30 dias', icon: Award, color: 'text-rose-400', bg: 'bg-rose-500/20', unlocked: false },
  ];

  return (
    <div className="flex-1 overflow-y-auto pb-32 pt-6 px-4">
      <div className="max-w-md mx-auto flex flex-col gap-8">
        
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center gap-4">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-32 h-32 bg-indigo-500/20 rounded-full flex items-center justify-center border-4 border-indigo-500/30 text-6xl"
          >
            😎
          </motion.div>
          <div>
            <h2 className="text-3xl font-bold text-zinc-100">Você</h2>
            <p className="text-zinc-400 font-medium mt-1">@estudante_dedicado</p>
            <p className="text-zinc-500 text-sm mt-2">Entrou em Janeiro de 2024</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div>
          <h3 className="text-xl font-bold text-zinc-200 mb-4 px-2">Estatísticas</h3>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex items-center gap-4"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border-2 border-zinc-800 ${stat.bg}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div>
                    <div className="font-bold text-xl text-zinc-100">{stat.value}</div>
                    <div className="text-xs font-medium text-zinc-500">{stat.label}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h3 className="text-xl font-bold text-zinc-200 mb-4 px-2">Conquistas</h3>
          <div className="flex flex-col gap-4">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + (index * 0.1) }}
                  className={`border rounded-2xl p-4 flex items-center gap-4 ${
                    achievement.unlocked 
                      ? 'bg-zinc-900 border-zinc-800' 
                      : 'bg-zinc-900/50 border-zinc-800/50 opacity-60'
                  }`}
                >
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 border-2 ${
                    achievement.unlocked ? achievement.bg : 'bg-zinc-800 border-zinc-700'
                  }`}>
                    <Icon className={`w-7 h-7 ${achievement.unlocked ? achievement.color : 'text-zinc-600'}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-zinc-200">{achievement.title}</h4>
                    <p className="text-sm text-zinc-500 mt-1">{achievement.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
        
      </div>
    </div>
  );
}
