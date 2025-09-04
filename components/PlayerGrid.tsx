import React from 'react';
import type { SymbolData, SymbolId, DragItem } from '../types';
import SymbolItem from './SymbolItem';

interface PlayerGridProps {
  playerSymbols: (SymbolData | null)[];
  onDrop: (targetIndex: number, item: DragItem) => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, item: DragItem) => void;
  gridCols: number;
}

const PlayerGrid: React.FC<PlayerGridProps> = ({ playerSymbols, onDrop, onDragStart, gridCols }) => {
    const [dragOverIndex, setDragOverIndex] = React.useState<number | null>(null);

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
        e.preventDefault();
        setDragOverIndex(index);
    };

    const handleDragLeave = () => {
        setDragOverIndex(null);
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetIndex: number) => {
        e.preventDefault();
        setDragOverIndex(null);
        const item = JSON.parse(e.dataTransfer.getData('application/json')) as DragItem;
        onDrop(targetIndex, item);
    };

    return (
        <div className="grid gap-4 w-full h-full bg-slate-200 p-4 rounded-xl shadow-inner" style={{ gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`}}>
        {playerSymbols.map((symbol, index) => (
            <div
            key={index}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, index)}
            className={`w-full h-full rounded-lg transition-colors ${dragOverIndex === index ? 'animate-pulse-drop' : 'bg-slate-300'}`}
            >
            {symbol ? (
                <SymbolItem 
                    symbol={symbol} 
                    onDragStart={onDragStart}
                    sourceIndex={index}
                />
            ) : (
                <div className="w-full h-full"></div>
            )}
            </div>
        ))}
        </div>
    );
};

export default PlayerGrid;