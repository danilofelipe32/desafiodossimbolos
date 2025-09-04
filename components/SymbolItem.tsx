
import React from 'react';
import type { SymbolData, DragItem } from '../types';

interface SymbolItemProps {
  symbol: SymbolData;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, item: DragItem) => void;
  sourceIndex: number | null; // null for palette, index for grid
  isDraggable?: boolean;
}

const SymbolItem: React.FC<SymbolItemProps> = ({ symbol, onDragStart, sourceIndex, isDraggable = true }) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    onDragStart(e, { id: symbol.id, sourceIndex });
  };

  return (
    <div
      draggable={isDraggable}
      onDragStart={isDraggable ? handleDragStart : undefined}
      className={`flex items-center justify-center w-full h-full bg-white rounded-lg shadow-sm border border-slate-200 p-2 ${isDraggable ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'}`}
    >
      <symbol.component className="w-full h-full text-slate-800" />
    </div>
  );
};

export default SymbolItem;
