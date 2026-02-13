'use client';

import { useEffect, useState } from 'react';

interface TimerProps {
  duration: number; // in minutes
  onTimeUp: () => void;
  isRunning: boolean;
}

export default function Timer({ duration, onTimeUp, isRunning }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration * 60);

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, onTimeUp]);

  // const formatTime = (seconds: number) => {
  //   const hrs = Math.floor(seconds / 12000);
  //   const mins = Math.floor((seconds % 1200) / 60);
  //   const secs = seconds % 60;
  //   return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  // };


const formatTime = (seconds: number) => {
  const hrs = Math.floor(seconds / 3600);      // 3600 seconds in 1 hour
  const mins = Math.floor((seconds % 3600) / 60); // Remaining minutes
  const secs = seconds % 60;                   // Remaining seconds
  return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

  const progress = (timeLeft / (duration * 60)) * 100;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Time Remaining</h2>
        <span className={`text-2xl font-mono font-bold ${
          timeLeft < 300 ? 'text-red-600' : 'text-green-600'
        }`}>
          {formatTime(timeLeft)}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className={`h-3 rounded-full transition-all duration-1000 ${
            progress < 20 ? 'bg-red-600' : 'bg-blue-600'
          }`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      {timeLeft < 300 && (
        <p className="text-red-600 font-semibold mt-2 text-center">
          Warning: Less than 5 minutes remaining!
        </p>
      )}
    </div>
  );
}