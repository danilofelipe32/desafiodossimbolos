import React from 'react';

export const ThreeDotsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" {...props}>
    <circle cx="20" cy="50" r="10" />
    <circle cx="50" cy="50" r="10" />
    <circle cx="80" cy="50" r="10" />
  </svg>
);

export const SmileyFaceIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" {...props}>
    <circle cx="50" cy="50" r="45" stroke="black" strokeWidth="5" fill="none" />
    <circle cx="35" cy="40" r="5" />
    <circle cx="65" cy="40" r="5" />
    <path d="M30 65 Q 50 80, 70 65" stroke="black" strokeWidth="5" fill="none" />
  </svg>
);

export const HashIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" {...props}>
    <path d="M20 40 L80 40 M20 60 L80 60 M40 20 L40 80 M60 20 L60 80" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
  </svg>
);

export const CrossCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" {...props}>
    <circle cx="50" cy="50" r="45" stroke="black" strokeWidth="5" fill="none" />
    <line x1="30" y1="30" x2="70" y2="70" stroke="red" strokeWidth="5" />
    <line x1="70" y1="30" x2="30" y2="70" stroke="red" strokeWidth="5" />
  </svg>
);

export const Num58Icon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" {...props}>
    <text x="50" y="70" fontSize="60" textAnchor="middle" fill="#0ea5e9" fontWeight="bold">58</text>
  </svg>
);

export const ArrowBoxIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" {...props}>
    <rect x="10" y="10" width="80" height="80" stroke="black" strokeWidth="5" fill="none" />
    <path d="M50 25 L50 75 M35 40 L50 25 L65 40" stroke="#f43f5e" strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Num2CircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" {...props}>
    <circle cx="50" cy="50" r="45" stroke="black" strokeWidth="5" fill="none" />
    <text x="50" y="70" fontSize="60" textAnchor="middle" fill="black" fontWeight="bold">2</text>
  </svg>
);

export const SunIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" {...props}>
    <circle cx="50" cy="50" r="25" fill="#facc15" />
    <path d="M50 10 L50 20 M50 80 L50 90 M10 50 L20 50 M80 50 L90 50 M22 22 L29 29 M71 71 L78 78 M22 78 L29 71 M71 29 L78 22" stroke="#facc15" strokeWidth="5" strokeLinecap="round" />
  </svg>
);

export const SearchIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" {...props}>
    <circle cx="45" cy="45" r="30" stroke="black" strokeWidth="8" fill="none" />
    <line x1="68" y1="68" x2="90" y2="90" stroke="black" strokeWidth="8" strokeLinecap="round" />
  </svg>
);

export const Num3SquareIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" {...props}>
    <rect x="10" y="10" width="80" height="80" fill="#ec4899" />
    <text x="50" y="70" fontSize="60" textAnchor="middle" fill="white" fontWeight="bold">3</text>
  </svg>
);

export const WaveIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" {...props}>
    <path d="M10 50 Q 30 20, 50 50 T 90 50" stroke="black" strokeWidth="5" fill="none" />
  </svg>
);

export const Num86Icon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" {...props}>
    <text x="50" y="70" fontSize="60" textAnchor="middle" fill="#d2b48c" fontWeight="bold">86</text>
  </svg>
);

export const StarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 100 100" {...props}>
        <path d="M50 5 L61.8 38.2 L98 42.6 L73 66.4 L79.6 100 L50 82.2 L20.4 100 L27 66.4 L2 42.6 L38.2 38.2 Z" fill="#fde047" stroke="#ca8a04" strokeWidth="3" />
    </svg>
);

export const HeartIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 100 100" {...props}>
        <path d="M90 35 C90 15, 70 10, 50 30 C30 10, 10 15, 10 35 C10 60, 50 90, 50 90 C50 90, 90 60, 90 35 Z" fill="#ef4444" stroke="#991b1b" strokeWidth="3" />
    </svg>
);

export const CloudIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 100 100" {...props}>
        <path d="M25 70 A20 20 0 0 1 25 30 A25 25 0 0 1 75 30 A20 20 0 0 1 75 70 Z" fill="#60a5fa" stroke="#2563eb" strokeWidth="3" />
    </svg>
);

export const LightningIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 100 100" {...props}>
        <polygon points="50,5 30,50 60,50 40,95 70,40 40,40" fill="#f59e0b" stroke="#b45309" strokeWidth="3" />
    </svg>
);
