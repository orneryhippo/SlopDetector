
import React from 'react';
import type { AnalysisResult } from '../types';
import SlopOMeter from './SlopOMeter';
import CheckCircleIcon from './icons/CheckCircleIcon';
import XCircleIcon from './icons/XCircleIcon';

interface ResultsDisplayProps {
  result: AnalysisResult;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result }) => {
    const getVerdictColor = () => {
    if (result.score <= 33) return 'text-green-400';
    if (result.score <= 66) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="w-full max-w-4xl p-8 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl animate-fade-in">
      <h2 className={`text-3xl font-bold text-center mb-4 ${getVerdictColor()}`}>
        Verdict: {result.verdict}
      </h2>
      <p className="text-slate-400 text-center mb-8">{result.summary}</p>
      
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <SlopOMeter score={result.score} />

        <div className="flex flex-col space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-green-400 mb-3 flex items-center">
                <CheckCircleIcon className="w-6 h-6 mr-2"/>
                Human-like Signals
            </h3>
            <ul className="space-y-2 list-inside">
              {result.positiveSigns.map((sign, index) => (
                <li key={index} className="text-slate-300 text-sm flex">
                  <span className="text-green-400 mr-2">✓</span>
                  {sign}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-red-400 mb-3 flex items-center">
                <XCircleIcon className="w-6 h-6 mr-2"/>
                AI Slop Indicators
            </h3>
            <ul className="space-y-2 list-inside">
              {result.negativeSigns.map((sign, index) => (
                <li key={index} className="text-slate-300 text-sm flex">
                    <span className="text-red-400 mr-2">✗</span>
                    {sign}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;
