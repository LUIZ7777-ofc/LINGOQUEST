import { useState } from 'react';

interface ChessBoardProps {
  fen: string;
  onSquareClick: (square: string) => void;
  selectedSquare: string | null;
  isChecking: boolean;
  correctSquare?: string;
  isCorrect?: boolean | null;
}

const fenToPiece: Record<string, string> = {
  r: '♜', n: '♞', b: '♝', q: '♛', k: '♚', p: '♟',
  R: '♖', N: '♘', B: '♗', Q: '♕', K: '♔', P: '♙'
};

export function ChessBoard({ fen, onSquareClick, selectedSquare, isChecking, correctSquare, isCorrect }: ChessBoardProps) {
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

  // Parse FEN
  const board: (string | null)[][] = [];
  const rows = fen.split(' ')[0].split('/');
  
  for (const row of rows) {
    const boardRow: (string | null)[] = [];
    for (const char of row) {
      if (/\d/.test(char)) {
        const emptyCount = parseInt(char, 10);
        for (let i = 0; i < emptyCount; i++) {
          boardRow.push(null);
        }
      } else {
        boardRow.push(fenToPiece[char] || null);
      }
    }
    board.push(boardRow);
  }

  return (
    <div className="w-full max-w-sm mx-auto aspect-square flex flex-col border-4 border-zinc-800 rounded-lg overflow-hidden shadow-2xl">
      {ranks.map((rank, rowIndex) => (
        <div key={rank} className="flex-1 flex">
          {files.map((file, colIndex) => {
            const squareId = `${file}${rank}`;
            const isLight = (rowIndex + colIndex) % 2 === 0;
            const piece = board[rowIndex][colIndex];
            
            const isSelected = selectedSquare === squareId;
            const isTarget = isChecking && correctSquare === squareId;
            
            let bgClass = isLight ? 'bg-zinc-300 text-zinc-800' : 'bg-zinc-600 text-zinc-900';
            
            if (isSelected && !isChecking) {
              bgClass = 'bg-indigo-400 text-indigo-900';
            } else if (isChecking) {
              if (isTarget) {
                bgClass = 'bg-emerald-400 text-emerald-900';
              } else if (isSelected && !isCorrect) {
                bgClass = 'bg-rose-400 text-rose-900';
              }
            }

            return (
              <button
                key={squareId}
                disabled={isChecking}
                onClick={() => onSquareClick(squareId)}
                className={`flex-1 flex items-center justify-center text-3xl sm:text-4xl transition-colors relative ${bgClass}`}
              >
                {piece}
                
                {/* Coordinates for bottom and left edges */}
                {colIndex === 0 && (
                  <span className="absolute top-0.5 left-1 text-[8px] font-bold opacity-50">{rank}</span>
                )}
                {rowIndex === 7 && (
                  <span className="absolute bottom-0.5 right-1 text-[8px] font-bold opacity-50">{file}</span>
                )}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
