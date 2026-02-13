'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ExamResult, Subject } from '@/types';
import { getSubjectDisplayName } from '@/lib/questions';

export default function ResultsPage() {
  const [result, setResult] = useState<ExamResult | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedResult = localStorage.getItem('examResult');
    if (!storedResult) {
      router.push('/login');
      return;
    }
    setResult(JSON.parse(storedResult));
  }, [router]);

  const handleCloseResults = () => {
    setIsVisible(false);
    // Clear exam data but keep result for future reference
    localStorage.removeItem('studentData');
    localStorage.removeItem(`examAnswers_${result?.subject}`);
    router.push('/');
  };

  const handleRetakeExam = () => {
    // Clear all exam-related data
    localStorage.removeItem('studentData');
    localStorage.removeItem('examResult');
    if (result?.subject) {
      localStorage.removeItem(`examAnswers_${result.subject}`);
    }
    router.push('/login');
  };

  const handleTakeAnotherSubject = () => {
    // Clear current exam data but keep student info
    localStorage.removeItem('examResult');
    if (result?.subject) {
      localStorage.removeItem(`examAnswers_${result.subject}`);
    }
    router.push('/login');
  };

  if (!result || !isVisible) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Session Ended</h1>
          <p className="text-gray-600 mb-6">Your exam session has been closed.</p>
          <button
            onClick={() => router.push('/')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const subjectDisplayName = getSubjectDisplayName(result.subject);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl p-8 relative">
        {/* Close Button */}
        <button
          onClick={handleCloseResults}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close results"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Exam Submitted Successfully!
          </h1>
          <div className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-medium text-lg mb-2">
            {subjectDisplayName}
          </div>
          <p className="text-gray-600 text-lg">
            Your results have been recorded and saved to the system.
          </p>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200 max-w-md mx-auto">
            <p className="text-blue-700 text-sm">
              💡 <strong>Note:</strong> These results will remain visible until you close this page.
            </p>
          </div>
        </div>

        {/* Student Information */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Student Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Student ID</p>
              <p className="font-semibold text-lg">{result.studentId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Student Name</p>
              <p className="font-semibold text-lg">{result.studentName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Subject</p>
              <p className="font-semibold">{subjectDisplayName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Submitted At</p>
              <p className="font-semibold">{new Date(result.submittedAt).toLocaleString()}</p>
            </div>
            {result.studentClass && (
              <div>
                <p className="text-sm text-gray-600">Class</p>
                <p className="font-semibold">{result.studentClass}</p>
              </div>
            )}
            <div>
              <p className="text-sm text-gray-600">Time Spent</p>
              <p className="font-semibold">{result.timeSpent}</p>
            </div>
          </div>
        </div>

        {/* Exam Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Multiple Choice Results</h2>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {result.multipleChoiceScore}/60
              </div>
              <div className="w-full bg-blue-200 rounded-full h-3">
                <div 
                  className="bg-blue-600 h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${(result.multipleChoiceScore / 60) * 100}%` }}
                ></div>
              </div>
              <p className="text-gray-600 mt-2">
                {((result.multipleChoiceScore / 60) * 100).toFixed(1)}% Correct
              </p>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-6 border border-green-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Overall Performance</h2>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {result.totalScore}/60
              </div>
              <div className="w-full bg-green-200 rounded-full h-3">
                <div 
                  className="bg-green-600 h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${(result.totalScore / 60) * 100}%` }}
                ></div>
              </div>
              <p className="text-gray-600 mt-2">
                {((result.totalScore / 60) * 100).toFixed(1)}% Overall Score
              </p>
            </div>
          </div>
        </div>

        {/* Theory Questions Summary */}
        <div className="bg-yellow-50 rounded-lg p-6 mb-8 border border-yellow-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Theory Questions Status</h2>
          <p className="text-gray-700 mb-3">
            You have completed <strong>{result.theoryAnswers?.length || 0}/10</strong> theory questions.
          </p>
          <div className="grid grid-cols-5 gap-2 mb-4">
            {Array.from({ length: 10 }, (_, i) => (
              <div
                key={i}
                className={`text-center p-2 rounded-lg text-sm font-medium ${
                  result.theoryAnswers?.[i] && result.theoryAnswers[i] !== 'Not answered'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                Q{i + 61}
              </div>
            ))}
          </div>
          <p className="text-yellow-700 text-sm">
            <strong>Note:</strong> Theory questions require manual grading by your instructor.
          </p>
        </div>

        {/* Performance Feedback */}
        <div className="bg-purple-50 rounded-lg p-6 mb-8 border border-purple-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Performance Feedback</h2>
          {result.multipleChoiceScore >= 45 ? (
            <div className="text-green-700">
              <p className="font-semibold text-lg">🎉 Excellent Work!</p>
              <p>You have demonstrated strong understanding of {subjectDisplayName}. Keep up the great work!</p>
            </div>
          ) : result.multipleChoiceScore >= 30 ? (
            <div className="text-blue-700">
              <p className="font-semibold text-lg">👍 Good Performance</p>
              <p>You have a solid understanding of {subjectDisplayName}. Review the missed questions to improve further.</p>
            </div>
          ) : (
            <div className="text-orange-700">
              <p className="font-semibold text-lg">📚 Areas for Improvement</p>
              <p>Consider reviewing the {subjectDisplayName} material and practicing similar questions to strengthen your understanding.</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-6 border-t border-gray-200">
          <div className="text-sm text-gray-500">
            {subjectDisplayName} • Submitted: {new Date(result.submittedAt).toLocaleString()}
          </div>
          
          {/* <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleTakeAnotherSubject}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Take Another Subject
            </button>
            <button
              onClick={handleRetakeExam}
              className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              Retake This Exam
            </button>
            <button
              onClick={handleCloseResults}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Close Results
            </button>
          </div> */}

          <div className="flex flex-col sm:flex-row gap-3">
  <button
    onClick={() => router.push('/progress')}
    className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
  >
    View My Progress
  </button>
  <button
    onClick={handleCloseResults}
    className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
  >
    Close Results
  </button>
</div>
        </div>

        // Add this to the action buttons section:


        {/* Persistent Notice */}
        <div className="mt-6 p-4 bg-gray-100 rounded-lg text-center">
          <p className="text-gray-600 text-sm">
            🔒 Your {subjectDisplayName} results are securely saved. You can close this page anytime.
          </p>
        </div>
      </div>
    </div>
  );
}