import { motion } from 'motion/react';
import { Star, Lock, Check } from 'lucide-react';
import { Lesson, UserState, Course } from '../types';

interface PathViewProps {
  lessons: Lesson[];
  userState: UserState;
  onStartLesson: (lessonId: string) => void;
  courseTheme: Course['theme'];
}

export function PathView({ lessons, userState, onStartLesson, courseTheme }: PathViewProps) {
  return (
    <div className="flex-1 overflow-y-auto pb-32 pt-8 px-4">
      <div className="max-w-md mx-auto flex flex-col items-center gap-12">
        {lessons.map((lesson, index) => {
          const isCompleted = userState.completedLessons.includes(lesson.id);
          const isCurrent = userState.currentLessonId === lesson.id;
          const isLocked = !isCompleted && !isCurrent;
          
          // Calculate horizontal offset for the snake-like path
          const offset = Math.sin(index * 1.5) * 60;
          
          return (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="relative flex flex-col items-center"
              style={{ transform: `translateX(${offset}px)` }}
            >
              {/* Connecting line to previous node */}
              {index > 0 && (
                <div 
                  className="absolute -top-12 w-2 h-12 bg-zinc-800 -z-10"
                  style={{
                    transform: `translateX(${-offset + Math.sin((index - 1) * 1.5) * 60}px) rotate(${Math.atan2(12, offset - Math.sin((index - 1) * 1.5) * 60)}rad)`,
                    transformOrigin: 'top center'
                  }}
                />
              )}
              
              <button
                onClick={() => !isLocked && onStartLesson(lesson.id)}
                disabled={isLocked}
                className={`relative w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95 ${
                  isCompleted 
                    ? 'bg-amber-400 text-amber-900 border-b-4 border-amber-600' 
                    : isCurrent
                    ? `${courseTheme.primary} text-white border-b-4 ${courseTheme.border} ring-4 ${courseTheme.ring}`
                    : 'bg-zinc-800 text-zinc-500 border-b-4 border-zinc-900'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-8 h-8 stroke-[3]" />
                ) : isCurrent ? (
                  <Star className="w-8 h-8 fill-white stroke-[2]" />
                ) : (
                  <Lock className="w-8 h-8" />
                )}
                
                {/* Floating crown for current lesson */}
                {isCurrent && (
                  <motion.div
                    animate={{ y: [-4, 4, -4] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className={`absolute -top-6 bg-white ${courseTheme.text} text-xs font-bold px-3 py-1 rounded-full shadow-md whitespace-nowrap`}
                  >
                    COMEÇAR
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45" />
                  </motion.div>
                )}
              </button>
              
              <span className="mt-3 text-sm font-bold text-zinc-400 uppercase tracking-wider">
                {lesson.title}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
