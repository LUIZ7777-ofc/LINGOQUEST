import { useState } from 'react';
import { TopBar } from './components/TopBar';
import { BottomBar } from './components/BottomBar';
import { PathView } from './components/PathView';
import { LessonView } from './components/LessonView';
import { LeagueView } from './components/LeagueView';
import { QuestsView } from './components/QuestsView';
import { ProfileView } from './components/ProfileView';
import { mockCourses } from './data/mockData';
import { UserState } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [currentCourseId, setCurrentCourseId] = useState(mockCourses[0].id);
  
  const [userState, setUserState] = useState<UserState>({
    hearts: 5,
    streak: 12,
    gems: 450,
    xp: 1250,
    currentLessonId: mockCourses[0].lessons[0].id,
    completedLessons: [],
  });

  const currentCourse = mockCourses.find(c => c.id === currentCourseId) || mockCourses[0];

  const handleCourseChange = (courseId: string) => {
    setCurrentCourseId(courseId);
    const newCourse = mockCourses.find(c => c.id === courseId);
    if (newCourse && newCourse.lessons.length > 0) {
      // Find the first uncompleted lesson in this course, or just the first one
      const firstUncompleted = newCourse.lessons.find(l => !userState.completedLessons.includes(l.id));
      setUserState(prev => ({
        ...prev,
        currentLessonId: firstUncompleted ? firstUncompleted.id : newCourse.lessons[0].id
      }));
    }
  };

  const handleStartLesson = (lessonId: string) => {
    if (userState.hearts > 0) {
      setActiveLessonId(lessonId);
    } else {
      alert("Você não tem corações suficientes! Espere recarregar ou compre mais com gemas.");
    }
  };

  const handleCompleteLesson = (xpEarned: number) => {
    setUserState(prev => {
      const isNewCompletion = !prev.completedLessons.includes(activeLessonId!);
      const newCompleted = isNewCompletion 
        ? [...prev.completedLessons, activeLessonId!] 
        : prev.completedLessons;
        
      // Find next lesson to unlock in current course
      const currentIndex = currentCourse.lessons.findIndex(l => l.id === activeLessonId);
      const nextLessonId = currentIndex < currentCourse.lessons.length - 1 
        ? currentCourse.lessons[currentIndex + 1].id 
        : prev.currentLessonId;

      return {
        ...prev,
        xp: prev.xp + xpEarned,
        completedLessons: newCompleted,
        currentLessonId: isNewCompletion ? nextLessonId : prev.currentLessonId,
      };
    });
    setActiveLessonId(null);
  };

  const handleLoseHeart = () => {
    setUserState(prev => ({
      ...prev,
      hearts: Math.max(0, prev.hearts - 1)
    }));
  };

  const activeLesson = currentCourse.lessons.find(l => l.id === activeLessonId);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans flex flex-col">
      {activeLessonId && activeLesson ? (
        <LessonView
          lesson={activeLesson}
          onClose={() => setActiveLessonId(null)}
          onComplete={handleCompleteLesson}
          hearts={userState.hearts}
          onLoseHeart={handleLoseHeart}
          courseTheme={currentCourse.theme}
        />
      ) : (
        <>
          <TopBar 
            userState={userState} 
            currentCourse={currentCourse}
            onCourseChange={handleCourseChange}
          />
          
          <main className="flex-1 flex flex-col relative">
            {activeTab === 'home' && (
              <PathView 
                lessons={currentCourse.lessons} 
                userState={userState} 
                onStartLesson={handleStartLesson} 
                courseTheme={currentCourse.theme}
              />
            )}
            
            {activeTab === 'leaderboard' && (
              <LeagueView />
            )}
            
            {activeTab === 'quests' && (
              <QuestsView userState={userState} />
            )}
            
            {activeTab === 'profile' && (
              <ProfileView userState={userState} />
            )}
          </main>
          
          <BottomBar activeTab={activeTab} setActiveTab={setActiveTab} />
        </>
      )}
    </div>
  );
}

