import React from 'react';
import type { SymbolData, DragItem } from '../types';
import SymbolItem from './SymbolItem';

interface SymbolPaletteProps {
  symbols: SymbolData[];
  onDragStart: (e: React.DragEvent<HTMLDivElement>, item: DragItem) => void;
  disabledSymbols: Set<string>;
  gridCols: number;
}

const SymbolPalette: React.FC<SymbolPaletteProps> = ({ symbols, onDragStart, disabledSymbols, gridCols }) => {
  return (
    <div className="grid gap-4 w-full h-full bg-slate-200 p-4 rounded-xl shadow-inner" style={{ gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`}}>
      {symbols.map((symbol) => {
        const isDisabled = disabledSymbols.has(symbol.id);
        return (
            <div key={symbol.id} className={`transition-opacity ${isDisabled ? 'opacity-30' : 'opacity-100'}`}>
                <SymbolItem
                    symbol={symbol}
                    onDragStart={onDragStart}
                    sourceIndex={null} // From palette
                    isDraggable={!isDisabled}
                />
            </div>
        );
      })}
    </div>
  );
};

export default SymbolPalette;
