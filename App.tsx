import React, { useState, useEffect, useCallback, useMemo } from 'react';
import type { SymbolData, DragItem, Difficulty, DifficultySetting } from './types';
import { GameState } from './types';
import { SYMBOLS, DIFFICULTY_LEVELS } from './constants';
import SymbolCard from './components/SymbolCard';
import PlayerGrid from './components/PlayerGrid';
import SymbolPalette from './components/SymbolPalette';
import Timer from './components/Timer';

const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const TrophyIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-yellow-400 drop-shadow-lg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v1.121l.672.336a1 1 0 01.328 1.638l-1.38 2.138a1 1 0 01-1.64.001l-1.38-2.138a1 1 0 01.328-1.638L12 3.12V2a1 1 0 01-.7-.954zM10 18a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1zM3 18a1 1 0 011-1h1a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
        <path d="M10 3a1 1 0 011 1v.074c.43.144.83.356 1.171.626l.01.008.007.005a1 1 0 01.213 1.413l-2.083 3.225a1 1 0 01-1.587 0L7.63 6.126a1 1 0 01.213-1.413l.007-.005.01-.008A4.956 4.956 0 019 4.074V4a1 1 0 011-1zm-2.5 5.5a.5.5 0 000 1h5a.5.5 0 000-1h-5z" />
        <path d="M5 11a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" />
        <path d="M3 14a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
    </svg>
);

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.Start);
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [gameSettings, setGameSettings] = useState<DifficultySetting | null>(null);
  const [solutionSymbols, setSolutionSymbols] = useState<SymbolData[]>([]);
  const [playerSymbols, setPlayerSymbols] = useState<(SymbolData | null)[]>([]);
  const [time, setTime] = useState(0);
  const [memorizeCountdown, setMemorizeCountdown] = useState(0);
  const [isPeeking, setIsPeeking] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'incorrect'>('idle');
  const [correctPlacements, setCorrectPlacements] = useState(0);

  const handleStartGame = useCallback(() => {
    if (!difficulty) return;
    const settings = DIFFICULTY_LEVELS[difficulty];
    setGameSettings(settings);

    const shuffledSymbols = shuffleArray(SYMBOLS);
    const newSolution = shuffledSymbols.slice(0, settings.gridSize);
    
    setSolutionSymbols(newSolution);
    setPlayerSymbols(Array(settings.gridSize).fill(null));
    setTime(0);
    setMemorizeCountdown(settings.memorizeTime);
    setCorrectPlacements(0);
    setVerificationStatus('idle');
    setGameState(GameState.Memorize);
  }, [difficulty]);

  const handleReset = useCallback(() => {
    setGameState(GameState.Start);
    setDifficulty(null);
    setGameSettings(null);
    setSolutionSymbols([]);
    setPlayerSymbols([]);
    setTime(0);
  }, []);
  
  useEffect(() => {
    if (gameState !== GameState.Memorize) return;
    if (memorizeCountdown === 0) {
        setGameState(GameState.Play);
        return;
    }
    const timerId = setTimeout(() => setMemorizeCountdown(prev => prev - 1), 1000);
    return () => clearTimeout(timerId);
  }, [gameState, memorizeCountdown]);

  useEffect(() => {
    if (gameState !== GameState.Play) return;
    const timerId = setInterval(() => {
      setTime(prevTime => {
        const newTime = prevTime + 1;
        if (newTime > 0 && newTime % 30 === 0) setIsPeeking(true);
        return newTime;
      });
    }, 1000);
    return () => clearInterval(timerId);
  }, [gameState]);

  useEffect(() => {
      if (isPeeking) {
          const peekTimer = setTimeout(() => setIsPeeking(false), 5000);
          return () => clearTimeout(peekTimer);
      }
  }, [isPeeking]);
  
  useEffect(() => {
    if (gameState === GameState.Play) {
      const correctCount = playerSymbols.reduce((count, symbol, index) => {
        return symbol?.id === solutionSymbols[index]?.id ? count + 1 : count;
      }, 0);
      setCorrectPlacements(correctCount);
    }
  }, [playerSymbols, solutionSymbols, gameState]);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: DragItem) => {
    e.dataTransfer.setData('application/json', JSON.stringify(item));
    e.dataTransfer.effectAllowed = 'move';
  };
  
  const handleDrop = (targetIndex: number, item: DragItem) => {
    const droppedSymbol = SYMBOLS.find(s => s.id === item.id);
    if (!droppedSymbol) return;

    const newPlayerSymbols = [...playerSymbols];
    const sourceSymbol = item.sourceIndex !== null ? newPlayerSymbols[item.sourceIndex] : droppedSymbol;
    const targetSymbol = newPlayerSymbols[targetIndex];

    if (item.sourceIndex === null) { // From palette
        if (targetSymbol) { // If target has a symbol, it's a swap with the palette (effectively removing it)
             // This logic prevents dropping on an occupied cell from palette. Could be changed to swap.
             return;
        }
        newPlayerSymbols[targetIndex] = sourceSymbol;
    } else { // From grid (swap)
        newPlayerSymbols[targetIndex] = sourceSymbol;
        newPlayerSymbols[item.sourceIndex] = targetSymbol;
    }
    setPlayerSymbols(newPlayerSymbols);
  };

  const handleVerify = () => {
    if (!gameSettings) return;
    const isGridFull = playerSymbols.every(symbol => symbol !== null);
    if (!isGridFull) {
        setVerificationStatus('incorrect');
        setTimeout(() => setVerificationStatus('idle'), 820);
        return;
    }
    const isCorrect = correctPlacements === gameSettings.gridSize;
    if (isCorrect) {
      setGameState(GameState.Win);
    } else {
      setVerificationStatus('incorrect');
      setTimeout(() => setVerificationStatus('idle'), 820); 
    }
  };

  const usedSymbolsInGrid = useMemo(() => {
    return new Set(playerSymbols.filter(s => s !== null).map(s => s!.id));
  }, [playerSymbols]);

  const paletteSymbols = useMemo(() => shuffleArray(solutionSymbols), [solutionSymbols]);

  const renderGameState = () => {
    switch (gameState) {
      case GameState.Memorize:
      case GameState.Play:
        if (!gameSettings) return null;
        const isPlaying = gameState === GameState.Play;
        return (
          <div className="w-full max-w-7xl mx-auto bg-slate-100/70 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-xl border border-slate-200/80">
            <div className="flex flex-wrap justify-between items-center gap-2 mb-4 px-2">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-700">
                {isPlaying ? "Monte a sequência!" : "Prepare-se para memorizar!"}
              </h1>
              <div className="flex items-center gap-4">
                 {isPlaying && <div className="text-lg font-semibold text-slate-600 bg-white px-3 py-2 rounded-lg shadow-md">Acertos: <span className="font-bold text-green-600">{correctPlacements}/{gameSettings.gridSize}</span></div>}
                 <Timer time={time} />
                 <button onClick={handleReset} className="px-4 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-colors shadow-md text-sm">Resetar</button>
              </div>
            </div>

            {isPlaying && isPeeking && <div className="text-center mb-2 font-medium text-indigo-600 animate-pulse">Mostrando a resposta por 5 segundos...</div>}

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 items-start">
              <div className="flex flex-col items-center gap-2">
                <h2 className="text-lg font-semibold text-slate-600">Cartão de Símbolos</h2>
                <div className="w-full max-w-[360px] aspect-[3/4]">
                  <SymbolCard symbols={solutionSymbols} isFlipped={isPlaying && !isPeeking} gridCols={gameSettings.gridCols}/>
                </div>
              </div>

              <div className="flex flex-col items-center gap-4 xl:col-span-1">
                 <h2 className="text-lg font-semibold text-slate-600">Seu Tabuleiro</h2>
                 <div className={`w-full max-w-[360px] aspect-[3/4] ${verificationStatus === 'incorrect' ? 'animate-shake' : ''}`}>
                   {isPlaying ? (
                      <PlayerGrid playerSymbols={playerSymbols} onDrop={handleDrop} onDragStart={handleDragStart} gridCols={gameSettings.gridCols} />
                   ) : (
                     <div className="w-full h-full bg-slate-200 p-4 rounded-xl shadow-inner flex flex-col items-center justify-center text-center">
                        <h2 className="text-2xl font-bold text-slate-700">Memorize!</h2>
                        <p className="text-slate-600">O jogo começa em...</p>
                        <p className="text-6xl font-bold text-indigo-600 mt-4">{memorizeCountdown}</p>
                     </div>
                   )}
                 </div>
                 {isPlaying && <button onClick={handleVerify} className="w-full max-w-[360px] px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-all shadow-md active:scale-95">Verificar</button>}
              </div>

              <div className={`flex flex-col items-center gap-2 transition-opacity duration-300 ${!isPlaying ? 'opacity-0 invisible' : 'opacity-100 visible'}`}>
                <h2 className="text-lg font-semibold text-slate-600">Símbolos</h2>
                <div className="w-full max-w-[360px] aspect-[3/4]">
                  <SymbolPalette symbols={paletteSymbols} onDragStart={handleDragStart} disabledSymbols={usedSymbolsInGrid} gridCols={gameSettings.gridCols} />
                </div>
              </div>
            </div>
          </div>
        );
      case GameState.Win:
        return (
          <div className="text-center bg-white p-10 rounded-xl shadow-2xl flex flex-col items-center gap-4 border-2 border-green-400">
            <TrophyIcon />
            <h2 className="text-4xl font-bold text-green-500">Parabéns!</h2>
            <p className="text-xl text-slate-600">Você completou o desafio {difficulty && `no nível ${DIFFICULTY_LEVELS[difficulty].label}`}!</p>
            <Timer time={time} />
            <button onClick={handleReset} className="mt-6 px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors shadow-md">Jogar Novamente</button>
          </div>
        );
      case GameState.Start:
      default:
        return (
            <div className="text-center bg-white p-12 rounded-2xl shadow-2xl flex flex-col items-center gap-4 border-2 border-slate-200">
                <h1 className="text-5xl lg:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-500 pb-2">Desafio dos Símbolos</h1>
                <p className="text-lg text-slate-600 max-w-md mt-2">Escolha a dificuldade e teste sua memória!</p>
                <div className="flex gap-4 my-4">
                  {(Object.keys(DIFFICULTY_LEVELS) as Difficulty[]).map(level => (
                    <button key={level} onClick={() => setDifficulty(level)} className={`px-6 py-2 font-bold rounded-lg border-2 transition-all ${difficulty === level ? 'bg-indigo-600 text-white border-indigo-600 scale-105' : 'bg-white text-indigo-600 border-indigo-300 hover:bg-indigo-100'}`}>
                      {DIFFICULTY_LEVELS[level].label}
                    </button>
                  ))}
                </div>
                <button onClick={handleStartGame} disabled={!difficulty} className="mt-4 px-12 py-4 bg-indigo-600 text-white text-xl font-bold rounded-lg hover:bg-indigo-700 transition-transform hover:scale-105 shadow-lg disabled:bg-slate-400 disabled:cursor-not-allowed disabled:scale-100">
                    Começar Jogo
                </button>
            </div>
        );
    }
  };

  return (
    <main className="bg-gradient-to-br from-indigo-200 via-sky-200 to-purple-200 min-h-screen w-full flex items-center justify-center p-4 font-sans">
      {renderGameState()}
    </main>
  );
};

export default App;
