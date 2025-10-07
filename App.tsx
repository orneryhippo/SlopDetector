
import React, { useState } from 'react';
import UrlInputForm from './components/UrlInputForm';
import LoadingSpinner from './components/LoadingSpinner';
import ResultsDisplay from './components/ResultsDisplay';
import RobotBrainIcon from './components/icons/RobotBrainIcon';
import type { AnalysisResult } from './types';
import { detectSlop } from './services/geminiService';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (url: string) => {
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);
    try {
      const result = await detectSlop(url);
      setAnalysisResult(result);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const welcomeContent = (
    <div className="text-center max-w-2xl">
      <h2 className="text-3xl md:text-4xl font-bold text-slate-100">Welcome to the AI Slop Detector</h2>
      <p className="mt-4 text-slate-400">
        Is that viral video a masterpiece or machine-made mush? Paste a YouTube or TikTok URL below to analyze its content for signs of low-effort, AI-generated "slop". Our advanced model will provide a score and a detailed breakdown.
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center p-4 sm:p-8">
      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
        `}
      </style>
      <header className="flex items-center justify-center mb-8">
        <RobotBrainIcon className="w-12 h-12 text-indigo-400 mr-4" />
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-indigo-500">
          AI Slop Detector
        </h1>
      </header>

      <main className="w-full flex-grow flex flex-col items-center justify-start space-y-8">
        <UrlInputForm onSubmit={handleAnalyze} isLoading={isLoading} />
        
        {isLoading && <LoadingSpinner />}
        
        {error && (
            <div className="mt-4 p-4 bg-red-900/50 border border-red-500 text-red-300 rounded-lg max-w-2xl text-center animate-fade-in">
              <strong>Analysis Failed:</strong> {error}
            </div>
        )}

        {analysisResult && <ResultsDisplay result={analysisResult} />}
        
        {!isLoading && !analysisResult && !error && welcomeContent}

      </main>
      
      <footer className="w-full text-center p-4 mt-8">
        <p className="text-slate-500 text-sm">
          Powered by Gemini. Analysis is based on content patterns and may not be 100% accurate.
        </p>
      </footer>
    </div>
  );
};

export default App;
