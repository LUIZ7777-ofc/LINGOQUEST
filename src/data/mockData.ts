import { Lesson, Course } from '../types';

export const mockLessons: Lesson[] = [
  {
    id: 'lesson-1',
    title: 'Básico 1',
    questions: [
      {
        id: 'q1',
        type: 'select_image',
        prompt: 'Qual destes é "a maçã"?',
        imageOptions: [
          { id: 'o1', emoji: '🍎', text: 'la manzana', isCorrect: true },
          { id: 'o2', emoji: '🍞', text: 'el pan', isCorrect: false },
          { id: 'o3', emoji: '🥛', text: 'la leche', isCorrect: false },
          { id: 'o4', emoji: '💧', text: 'el agua', isCorrect: false },
        ],
      },
      {
        id: 'q2',
        type: 'translate',
        prompt: 'Escreva isso em Espanhol: "A maçã"',
        answer: 'la manzana',
        wordBank: ['la', 'el', 'manzana', 'pan', 'niño', 'niña'],
      },
      {
        id: 'q3',
        type: 'pair_words',
        prompt: 'Toque nos pares',
        pairs: [
          { id: 'p1', left: 'maçã', right: 'manzana' },
          { id: 'p2', left: 'pão', right: 'pan' },
          { id: 'p3', left: 'leite', right: 'leche' },
          { id: 'p4', left: 'água', right: 'agua' },
        ],
      },
    ],
  },
  {
    id: 'lesson-2',
    title: 'Básico 2',
    questions: [
      {
        id: 'q1',
        type: 'translate',
        prompt: 'Escreva isso em Espanhol: "Eu bebo água"',
        answer: 'yo bebo agua',
        wordBank: ['yo', 'tú', 'bebo', 'agua', 'comes', 'pan'],
      },
      {
        id: 'q2',
        type: 'select_image',
        prompt: 'Qual destes é "o pão"?',
        imageOptions: [
          { id: 'o1', emoji: '🍎', text: 'la manzana', isCorrect: false },
          { id: 'o2', emoji: '🍞', text: 'el pan', isCorrect: true },
          { id: 'o3', emoji: '🥛', text: 'la leche', isCorrect: false },
          { id: 'o4', emoji: '💧', text: 'el agua', isCorrect: false },
        ],
      },
    ],
  },
  {
    id: 'lesson-3',
    title: 'Saudações',
    questions: [
      {
        id: 'q1',
        type: 'translate',
        prompt: 'Escreva isso em Espanhol: "Olá, bom dia"',
        answer: 'hola buenos días',
        wordBank: ['hola', 'adiós', 'buenos', 'días', 'noches', 'tardes'],
      },
      {
        id: 'q2',
        type: 'pair_words',
        prompt: 'Toque nos pares',
        pairs: [
          { id: 'p1', left: 'olá', right: 'hola' },
          { id: 'p2', left: 'adeus', right: 'adiós' },
          { id: 'p3', left: 'sim', right: 'sí' },
          { id: 'p4', left: 'não', right: 'no' },
        ],
      },
    ],
  },
];

export const mockCourses: Course[] = [
  {
    id: 'course-es',
    name: 'Espanhol',
    code: 'ES',
    color: 'bg-indigo-500/20',
    textColor: 'text-indigo-400',
    theme: {
      primary: 'bg-indigo-500',
      border: 'border-indigo-700',
      ring: 'ring-indigo-500/30',
      text: 'text-indigo-600',
    },
    lessons: mockLessons,
  },
  {
    id: 'course-en',
    name: 'Inglês',
    code: 'EN',
    color: 'bg-blue-500/20',
    textColor: 'text-blue-400',
    theme: {
      primary: 'bg-blue-500',
      border: 'border-blue-700',
      ring: 'ring-blue-500/30',
      text: 'text-blue-600',
    },
    lessons: [
      {
        id: 'en-lesson-1',
        title: 'Básico 1',
        questions: [
          {
            id: 'en-q1',
            type: 'select_image',
            prompt: 'Qual destes é "a maçã"?',
            imageOptions: [
              { id: 'o1', emoji: '🍎', text: 'the apple', isCorrect: true },
              { id: 'o2', emoji: '🍞', text: 'the bread', isCorrect: false },
              { id: 'o3', emoji: '🥛', text: 'the milk', isCorrect: false },
              { id: 'o4', emoji: '💧', text: 'the water', isCorrect: false },
            ],
          },
          {
            id: 'en-q2',
            type: 'translate',
            prompt: 'Escreva isso em Inglês: "A maçã"',
            answer: 'the apple',
            wordBank: ['the', 'a', 'apple', 'bread', 'boy', 'girl'],
          },
        ]
      }
    ]
  },
  {
    id: 'course-chess',
    name: 'Xadrez',
    code: 'XD',
    color: 'bg-zinc-500/20',
    textColor: 'text-zinc-400',
    theme: {
      primary: 'bg-zinc-500',
      border: 'border-zinc-700',
      ring: 'ring-zinc-500/30',
      text: 'text-zinc-600',
    },
    lessons: [
      {
        id: 'chess-lesson-1',
        title: 'Peças',
        questions: [
          {
            id: 'chess-q1',
            type: 'select_image',
            prompt: 'Qual destas é o "Cavalo"?',
            imageOptions: [
              { id: 'o1', emoji: '♞', text: 'Cavalo', isCorrect: true },
              { id: 'o2', emoji: '♜', text: 'Torre', isCorrect: false },
              { id: 'o3', emoji: '♝', text: 'Bispo', isCorrect: false },
              { id: 'o4', emoji: '♛', text: 'Rainha', isCorrect: false },
            ],
          },
          {
            id: 'chess-q2',
            type: 'pair_words',
            prompt: 'Toque nos pares',
            pairs: [
              { id: 'p1', left: 'Cavalo', right: 'L' },
              { id: 'p2', left: 'Torre', right: 'Reta' },
              { id: 'p3', left: 'Bispo', right: 'Diagonal' },
              { id: 'p4', left: 'Peão', right: 'Frente' },
            ],
          },
        ]
      },
      {
        id: 'chess-lesson-2',
        title: 'O Tabuleiro',
        questions: [
          {
            id: 'chess-q3',
            type: 'chess_board',
            prompt: 'Toque na casa e4 (Centro do tabuleiro)',
            chessConfig: {
              fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR',
              targetSquare: 'e4'
            }
          },
          {
            id: 'chess-q4',
            type: 'chess_board',
            prompt: 'Onde está o Rei Branco? (Toque na casa)',
            chessConfig: {
              fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR',
              targetSquare: 'e1'
            }
          }
        ]
      },
      {
        id: 'chess-lesson-3',
        title: 'Xeque-Mate',
        questions: [
          {
            id: 'chess-q5',
            type: 'chess_board',
            prompt: 'Mate do Pastor: Para qual casa a Dama Branca deve ir para dar Xeque-Mate?',
            chessConfig: {
              fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5Q2/PPPP1PPP/RNB1K1NR',
              targetSquare: 'f7'
            }
          },
          {
            id: 'chess-q6',
            type: 'chess_board',
            prompt: 'Mate da Gaveta: Para qual casa a Torre Branca deve ir para dar Xeque-Mate?',
            chessConfig: {
              fen: '6k1/5ppp/8/8/8/8/8/4R1K1',
              targetSquare: 'e8'
            }
          }
        ]
      }
    ]
  }
];
