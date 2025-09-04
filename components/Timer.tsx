
import React from 'react';

interface TimerProps {
  time: number;
}

const Timer: React.FC<TimerProps> = ({ time }) => {
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const paddedMinutes = String(minutes).padStart(2, '0');
    const paddedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${paddedMinutes}:${paddedSeconds}`;
  };

  return (
    <div className="text-4xl font-mono font-bold text-slate-700 bg-white px-4 py-2 rounded-lg shadow-md">
      {formatTime(time)}
    </div>
  );
};

export default Timer;
