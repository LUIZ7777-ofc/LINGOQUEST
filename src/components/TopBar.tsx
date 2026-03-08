import { useState } from 'react';
import { Heart, Zap, Gem, ChevronDown } from 'lucide-react';
import { UserState, Course } from '../types';
import { mockCourses } from '../data/mockData';

interface TopBarProps {
  userState: UserState;
  currentCourse: Course;
  onCourseChange: (courseId: string) => void;
}

export function TopBar({ userState, currentCourse, onCourseChange }: TopBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-10 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 px-4 py-3 flex items-center justify-between">
      <div className="relative">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center gap-2 hover:bg-zinc-800/50 p-1.5 rounded-xl transition-colors"
        >
          <div className={`w-8 h-8 rounded-full ${currentCourse.color} flex items-center justify-center`}>
            <span className={`${currentCourse.textColor} font-bold text-sm`}>{currentCourse.code}</span>
          </div>
          <ChevronDown className="w-4 h-4 text-zinc-500" />
        </button>

        {isMenuOpen && (
          <>
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsMenuOpen(false)}
            />
            <div className="absolute top-full left-0 mt-2 w-48 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl z-50 overflow-hidden">
              {mockCourses.map(course => (
                <button
                  key={course.id}
                  onClick={() => {
                    onCourseChange(course.id);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 p-3 hover:bg-zinc-800 transition-colors ${
                    currentCourse.id === course.id ? 'bg-zinc-800/50' : ''
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full ${course.color} flex items-center justify-center shrink-0`}>
                    <span className={`${course.textColor} font-bold text-sm`}>{course.code}</span>
                  </div>
                  <span className="font-medium text-zinc-200">{course.name}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 text-amber-500 font-bold">
          <Zap className="w-5 h-5 fill-amber-500" />
          <span>{userState.streak}</span>
        </div>
        
        <div className="flex items-center gap-1.5 text-blue-400 font-bold">
          <Gem className="w-5 h-5 fill-blue-400" />
          <span>{userState.gems}</span>
        </div>
        
        <div className="flex items-center gap-1.5 text-rose-500 font-bold">
          <Heart className="w-5 h-5 fill-rose-500" />
          <span>{userState.hearts}</span>
        </div>
      </div>
    </div>
  );
}
