
import React from 'react';

interface SlopOMeterProps {
  score: number;
}

const SlopOMeter: React.FC<SlopOMeterProps> = ({ score }) => {
  const rotation = (score / 100) * 180 - 90;

  const getGradientColor = () => {
    if (score <= 33) return 'from-green-500 via-yellow-500 to-red-500';
    if (score <= 66) return 'from-green-500 via-yellow-500 to-red-500';
    return 'from-green-500 via-yellow-500 to-red-500';
  };
  
  const getVerdictColor = () => {
    if (score <= 33) return 'text-green-400';
    if (score <= 66) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col items-center p-6 bg-slate-800/50 rounded-2xl shadow-lg">
      <div className="relative w-64 h-32 overflow-hidden">
        <div className={`absolute top-0 left-0 w-full h-full rounded-t-full bg-gradient-to-r ${getGradientColor()}`}></div>
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-end">
          <div className="absolute top-0 w-60 h-60 bg-slate-800 rounded-full transform translate-y-4"></div>
        </div>
        <div
          className="absolute bottom-0 left-1/2 w-0.5 h-32 bg-slate-100 transition-transform duration-1000 ease-out origin-bottom"
          style={{ transform: `translateX(-50%) rotate(${rotation}deg)` }}
        >
          <div className="w-2 h-2 rounded-full bg-sky-400 absolute -top-1 -left-0.75"></div>
        </div>
      </div>
      <div className={`text-5xl font-black ${getVerdictColor()} mt-[-1rem] drop-shadow-lg`}>
        {score}
        <span className="text-3xl text-slate-400">%</span>
      </div>
      <div className="flex justify-between w-full mt-2 text-slate-400 text-xs">
        <span>Human</span>
        <span>Maybe</span>
        <span>Slop</span>
      </div>
    </div>
  );
};

export default SlopOMeter;
