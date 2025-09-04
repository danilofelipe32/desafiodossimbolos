import type React from 'react';

export type SymbolId = 'dots' | 'smiley' | 'hash' | 'cross' | 'num58' | 'arrow' | 'num2' | 'sun' | 'search' | 'num3' | 'wave' | 'num86' | 'star' | 'heart' | 'cloud' | 'lightning';

export interface SymbolData {
  id: SymbolId;
  component: React.FC<React.SVGProps<SVGSVGElement>>;
}

export enum GameState {
  Start,
  Memorize,
  Play,
  Win
}

export interface DragItem {
    id: SymbolId;
    sourceIndex: number | null; // null if from palette, index if from grid
}

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface DifficultySetting {
    gridSize: number;
    gridCols: number;
    memorizeTime: number;
    label: string;
}
