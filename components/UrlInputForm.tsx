
import React, { useState } from 'react';

interface UrlInputFormProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

const UrlInputForm: React.FC<UrlInputFormProps> = ({ onSubmit, isLoading }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onSubmit(url);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="flex items-center border-b-2 border-indigo-500 py-2">
        <input
          className="appearance-none bg-transparent border-none w-full text-slate-200 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="text"
          placeholder="Enter YouTube or TikTok URL"
          aria-label="Video URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={isLoading}
        />
        <button
          className="flex-shrink-0 bg-indigo-500 hover:bg-indigo-700 disabled:bg-slate-600 disabled:cursor-not-allowed border-indigo-500 hover:border-indigo-700 text-sm border-4 text-white py-2 px-6 rounded-lg transition-all duration-300"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Analyzing...' : 'Analyze'}
        </button>
      </div>
    </form>
  );
};

export default UrlInputForm;
