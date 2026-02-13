'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ExamResult } from '@/types';

export default function ResultsChecker() {
  const [hasExistingResults, setHasExistingResults] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedResult = localStorage.getItem('examResult');
    setHasExistingResults(!!storedResult);
  }, []);

  const viewExistingResults = () => {
    router.push('/results');
  };

  const clearExistingResults = () => {
    localStorage.removeItem('examResult');
    setHasExistingResults(false);
  };

  if (!hasExistingResults) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4 shadow-lg max-w-sm z-50">
      <div className="flex items-start space-x-3">
        <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-yellow-800 mb-1">Previous Results Available</h3>
          <p className="text-yellow-700 text-sm mb-2">
            You have exam results from a previous session.
          </p>
          <div className="flex space-x-2">
            <button
              onClick={viewExistingResults}
              className="bg-yellow-600 text-white px-3 py-1 rounded text-sm hover:bg-yellow-700 transition-colors"
            >
              View Results
            </button>
            <button
              onClick={clearExistingResults}
              className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600 transition-colors"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}