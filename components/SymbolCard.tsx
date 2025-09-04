import React from 'react';
import type { SymbolData } from '../types';
import SymbolItem from './SymbolItem';

interface SymbolCardProps {
  symbols: SymbolData[];
  isFlipped: boolean;
  gridCols: number;
}

const SymbolCard: React.FC<SymbolCardProps> = ({ symbols, isFlipped, gridCols }) => {
  return (
    <div className="w-full h-full relative" style={{ perspective: '1000px' }}>
      <div
        className={`w-full h-full absolute transition-transform duration-700 ease-in-out ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front of the card */}
        <div className="absolute w-full h-full bg-slate-100 p-4 rounded-xl shadow-lg border-2 border-slate-300" style={{ backfaceVisibility: 'hidden' }}>
          <div className="grid gap-4 w-full h-full" style={{ gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`}}>
            {symbols.map((symbol) => (
              <div key={symbol.id} className="flex items-center justify-center p-1 bg-white rounded-md">
                 <symbol.component className="w-full h-full text-slate-800" />
              </div>
            ))}
          </div>
        </div>
        {/* Back of the card */}
        <div className="absolute w-full h-full bg-indigo-500 text-white p-4 rounded-xl shadow-lg flex items-center justify-center [transform:rotateY(180deg)]" style={{ backfaceVisibility: 'hidden' }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-1/2 w-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </div>
      </div>
    </div>
  );
};

export default SymbolCard;
