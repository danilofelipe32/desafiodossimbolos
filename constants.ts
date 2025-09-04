import type { SymbolData, Difficulty, DifficultySetting } from './types';
import {
  ThreeDotsIcon,
  SmileyFaceIcon,
  HashIcon,
  CrossCircleIcon,
  Num58Icon,
  ArrowBoxIcon,
  Num2CircleIcon,
  SunIcon,
  SearchIcon,
  Num3SquareIcon,
  WaveIcon,
  Num86Icon,
  StarIcon,
  HeartIcon,
  CloudIcon,
  LightningIcon
} from './components/icons';

export const SYMBOLS: SymbolData[] = [
  { id: 'dots', component: ThreeDotsIcon },
  { id: 'smiley', component: SmileyFaceIcon },
  { id: 'hash', component: HashIcon },
  { id: 'cross', component: CrossCircleIcon },
  { id: 'num58', component: Num58Icon },
  { id: 'arrow', component: ArrowBoxIcon },
  { id: 'num2', component: Num2CircleIcon },
  { id: 'sun', component: SunIcon },
  { id: 'search', component: SearchIcon },
  { id: 'num3', component: Num3SquareIcon },
  { id: 'wave', component: WaveIcon },
  { id: 'num86', component: Num86Icon },
  { id: 'star', component: StarIcon },
  { id: 'heart', component: HeartIcon },
  { id: 'cloud', component: CloudIcon },
  { id: 'lightning', component: LightningIcon },
];

export const DIFFICULTY_LEVELS: Record<Difficulty, DifficultySetting> = {
    easy: {
        label: 'Fácil',
        gridSize: 9,
        gridCols: 3,
        memorizeTime: 15
    },
    medium: {
        label: 'Médio',
        gridSize: 12,
        gridCols: 3,
        memorizeTime: 10
    },
    hard: {
        label: 'Difícil',
        gridSize: 16,
        gridCols: 4,
        memorizeTime: 8
    }
}
