
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 my-8">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 rounded-full border-4 border-indigo-500/50"></div>
        <div className="absolute inset-0 rounded-full border-t-4 border-b-4 border-sky-400 animate-spin"></div>
      </div>
      <p className="text-slate-300 text-lg font-medium animate-pulse">
        Analyzing content patterns...
      </p>
    </div>
  );
};

export default LoadingSpinner;
