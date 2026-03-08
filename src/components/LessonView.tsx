import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Heart, Check, AlertCircle } from 'lucide-react';
import { Lesson, Question, Course } from '../types';
import { ChessBoard } from './ChessBoard';

interface LessonViewProps {
  lesson: Lesson;
  onClose: () => void;
  onComplete: (xpEarned: number) => void;
  hearts: number;
  onLoseHeart: () => void;
  courseTheme: Course['theme'];
}

export function LessonView({ lesson, onClose, onComplete, hearts, onLoseHeart, courseTheme }: LessonViewProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  
  // For pair words
  const [selectedPairs, setSelectedPairs] = useState<string[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);

  const currentQuestion = lesson.questions[currentQuestionIndex];
  const progress = (currentQuestionIndex / lesson.questions.length) * 100;

  const handleCheck = () => {
    if (!selectedAnswer && currentQuestion.type !== 'pair_words') return;
    
    setIsChecking(true);
    
    let correct = false;
    if (currentQuestion.type === 'select_image') {
      const option = currentQuestion.imageOptions?.find(o => o.id === selectedAnswer);
      correct = !!option?.isCorrect;
    } else if (currentQuestion.type === 'translate') {
      correct = selectedAnswer?.toLowerCase() === currentQuestion.answer?.toLowerCase();
    } else if (currentQuestion.type === 'pair_words') {
      // For pair words, the check button is only active when all pairs are matched
      correct = matchedPairs.length === (currentQuestion.pairs?.length || 0) * 2;
    } else if (currentQuestion.type === 'chess_board') {
      correct = selectedAnswer === currentQuestion.chessConfig?.targetSquare;
    }
    
    setIsCorrect(correct);
    
    if (!correct) {
      onLoseHeart();
    }
  };

  const handleNext = () => {
    setIsChecking(false);
    setIsCorrect(null);
    setSelectedAnswer(null);
    setSelectedPairs([]);
    
    if (currentQuestionIndex < lesson.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      onComplete(10); // 10 XP per lesson
    }
  };

  const handlePairClick = (id: string, isLeft: boolean) => {
    if (matchedPairs.includes(id)) return;
    
    // If clicking same side, replace selection
    // Simplified logic for brevity: just select two and check
    const newSelection = [...selectedPairs, id];
    setSelectedPairs(newSelection);
    
    if (newSelection.length === 2) {
      // Check if they match
      const [first, second] = newSelection;
      const pair = currentQuestion.pairs?.find(p => 
        (p.left === first && p.right === second) || 
        (p.right === first && p.left === second)
      );
      
      if (pair) {
        setMatchedPairs([...matchedPairs, first, second]);
        setSelectedPairs([]);
        
        // Check if all matched
        if (matchedPairs.length + 2 === (currentQuestion.pairs?.length || 0) * 2) {
          setIsCorrect(true);
          setIsChecking(true);
        }
      } else {
        // Wrong match
        setTimeout(() => setSelectedPairs([]), 300);
        onLoseHeart();
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-zinc-950 z-50 flex flex-col font-sans">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-safe">
        <button onClick={onClose} className="p-2 text-zinc-400 hover:text-zinc-200">
          <X className="w-6 h-6" />
        </button>
        
        <div className="flex-1 mx-4 h-4 bg-zinc-800 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-emerald-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.15 }}
          />
        </div>
        
        <div className="flex items-center gap-1.5 text-rose-500 font-bold">
          <Heart className="w-6 h-6 fill-rose-500" />
          <span>{hearts}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full p-6 pb-32 overflow-y-auto">
        <h2 className="text-2xl font-bold text-zinc-100 mb-8">{currentQuestion.prompt}</h2>
        
        {currentQuestion.type === 'select_image' && (
          <div className="grid grid-cols-2 gap-4">
            {currentQuestion.imageOptions?.map((option) => (
              <button
                key={option.id}
                onClick={() => !isChecking && setSelectedAnswer(option.id)}
                disabled={isChecking}
                className={`p-6 rounded-2xl border-2 flex flex-col items-center gap-4 transition-all ${
                  selectedAnswer === option.id
                    ? `${courseTheme.border} ${courseTheme.primary}/10 ${courseTheme.text}`
                    : 'border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-800'
                }`}
              >
                <span className="text-6xl">{option.emoji}</span>
                <span className="font-medium">{option.text}</span>
              </button>
            ))}
          </div>
        )}
        
        {currentQuestion.type === 'translate' && (
          <div className="flex flex-col gap-8">
            <div className="min-h-[100px] p-4 border-b-2 border-zinc-800 flex flex-wrap gap-2 items-start">
              {selectedAnswer && (
                <button 
                  onClick={() => !isChecking && setSelectedAnswer(null)}
                  className="px-4 py-2 bg-zinc-800 rounded-xl text-zinc-200 font-medium"
                >
                  {selectedAnswer}
                </button>
              )}
            </div>
            
            <div className="flex flex-wrap gap-3 justify-center">
              {currentQuestion.wordBank?.map((word, i) => (
                <button
                  key={i}
                  onClick={() => !isChecking && setSelectedAnswer(word)}
                  disabled={isChecking || selectedAnswer === word}
                  className={`px-4 py-3 rounded-xl font-medium transition-all ${
                    selectedAnswer === word
                      ? 'bg-zinc-900 text-zinc-900 border-b-4 border-zinc-900 cursor-default'
                      : 'bg-zinc-800 text-zinc-200 border-b-4 border-zinc-950 hover:bg-zinc-700 active:border-b-0 active:translate-y-1'
                  }`}
                >
                  {word}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {currentQuestion.type === 'pair_words' && (
          <div className="grid grid-cols-2 gap-4">
            {/* Left side */}
            <div className="flex flex-col gap-3">
              {currentQuestion.pairs?.map((pair) => (
                <button
                  key={`left-${pair.id}`}
                  onClick={() => !isChecking && handlePairClick(pair.left, true)}
                  disabled={isChecking || matchedPairs.includes(pair.left)}
                  className={`p-4 rounded-xl font-medium border-2 transition-all ${
                    matchedPairs.includes(pair.left)
                      ? 'bg-zinc-900 border-zinc-800 text-zinc-700 opacity-50'
                      : selectedPairs.includes(pair.left)
                      ? `${courseTheme.primary}/20 ${courseTheme.border} ${courseTheme.text}`
                      : 'bg-zinc-800 border-zinc-700 text-zinc-200 hover:bg-zinc-700'
                  }`}
                >
                  {pair.left}
                </button>
              ))}
            </div>
            {/* Right side (shuffled in a real app, keeping simple here) */}
            <div className="flex flex-col gap-3">
              {[...(currentQuestion.pairs || [])].reverse().map((pair) => (
                <button
                  key={`right-${pair.id}`}
                  onClick={() => !isChecking && handlePairClick(pair.right, false)}
                  disabled={isChecking || matchedPairs.includes(pair.right)}
                  className={`p-4 rounded-xl font-medium border-2 transition-all ${
                    matchedPairs.includes(pair.right)
                      ? 'bg-zinc-900 border-zinc-800 text-zinc-700 opacity-50'
                      : selectedPairs.includes(pair.right)
                      ? `${courseTheme.primary}/20 ${courseTheme.border} ${courseTheme.text}`
                      : 'bg-zinc-800 border-zinc-700 text-zinc-200 hover:bg-zinc-700'
                  }`}
                >
                  {pair.right}
                </button>
              ))}
            </div>
          </div>
        )}

        {currentQuestion.type === 'chess_board' && currentQuestion.chessConfig && (
          <div className="flex flex-col items-center justify-center w-full">
            <ChessBoard 
              fen={currentQuestion.chessConfig.fen}
              onSquareClick={(square) => !isChecking && setSelectedAnswer(square)}
              selectedSquare={selectedAnswer}
              isChecking={isChecking}
              correctSquare={currentQuestion.chessConfig.targetSquare}
              isCorrect={isCorrect}
            />
            {selectedAnswer && !isChecking && (
              <p className="mt-6 text-xl font-bold text-zinc-300">
                Casa selecionada: <span className={courseTheme.text}>{selectedAnswer}</span>
              </p>
            )}
          </div>
        )}
      </div>

      {/* Footer / Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-zinc-800 bg-zinc-950 p-4 pb-safe">
        <div className="max-w-2xl mx-auto">
          {isChecking && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className={`absolute bottom-full left-0 right-0 p-6 flex items-center gap-4 ${
                isCorrect ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
              }`}
            >
              <div className={`p-2 rounded-full ${isCorrect ? 'bg-emerald-500/20' : 'bg-rose-500/20'}`}>
                {isCorrect ? <Check className="w-8 h-8" /> : <AlertCircle className="w-8 h-8" />}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold">{isCorrect ? 'Excelente!' : 'Incorreto'}</h3>
                {!isCorrect && currentQuestion.answer && (
                  <p className="opacity-80 mt-1">Resposta correta: {currentQuestion.answer}</p>
                )}
              </div>
            </motion.div>
          )}

          <button
            onClick={isChecking ? handleNext : handleCheck}
            disabled={!isChecking && !selectedAnswer && currentQuestion.type !== 'pair_words'}
            className={`w-full py-4 rounded-2xl font-bold text-lg uppercase tracking-wider transition-all active:translate-y-1 ${
              isChecking
                ? isCorrect
                  ? 'bg-emerald-500 text-zinc-950 border-b-4 border-emerald-700'
                  : 'bg-rose-500 text-zinc-950 border-b-4 border-rose-700'
                : selectedAnswer || currentQuestion.type === 'pair_words'
                ? `${courseTheme.primary} text-white border-b-4 ${courseTheme.border}`
                : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
            }`}
          >
            {isChecking ? 'Continuar' : 'Verificar'}
          </button>
        </div>
      </div>
    </div>
  );
}
