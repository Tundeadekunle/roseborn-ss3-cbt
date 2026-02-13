'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getStudentProgress, getCompletedSubjects, getStudentResults } from '@/lib/progress';
import { getAllSubjects, getSubjectDisplayName } from '@/lib/questions';
import type { Subject } from '@/types';

export default function ProgressPage() {
  const [studentData, setStudentData] = useState<{ studentId: string; studentName: string; studentClass?: string } | null>(null);
  const [completedSubjects, setCompletedSubjects] = useState<Subject[]>([]);
  const [studentResults, setStudentResults] = useState<{[key: string]: any}>({});
  const router = useRouter();

  useEffect(() => {
    const storedData = localStorage.getItem('studentData');
    if (!storedData) {
      router.push('/login');
      return;
    }
    
    const data = JSON.parse(storedData);
    setStudentData(data);
    
    const completed = getCompletedSubjects(data.studentId);
    const results = getStudentResults(data.studentId);
    
    setCompletedSubjects(completed);
    setStudentResults(results);
  }, [router]);

  if (!studentData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const allSubjects = getAllSubjects();
  const progressPercentage = (completedSubjects.length / allSubjects.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Your Progress</h1>
              <p className="text-gray-600 mt-2">
                {studentData.studentName} (ID: {studentData.studentId})
                {studentData.studentClass && ` • ${studentData.studentClass}`}
              </p>
            </div>
            <Link
              href="/login"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Take Another Exam
            </Link>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Overall Progress</span>
              <span>{completedSubjects.length}/{allSubjects.length} subjects</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-green-600 h-4 rounded-full transition-all duration-1000"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <p className="text-center text-sm text-gray-600 mt-2">
              {Math.round(progressPercentage)}% Complete
            </p>
          </div>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {allSubjects.map((subject) => {
            const isCompleted = completedSubjects.includes(subject);
            const result = studentResults[subject];
            
            return (
              <div
                key={subject}
                className={`bg-white rounded-2xl shadow-lg p-6 border-2 ${
                  isCompleted ? 'border-green-200' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {getSubjectDisplayName(subject)}
                  </h3>
                  {isCompleted ? (
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      Completed
                    </span>
                  ) : (
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      Available
                    </span>
                  )}
                </div>

                {isCompleted && result ? (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Score</p>
                        <p className="text-2xl font-bold text-green-600">
                          {result.score}/60
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Time Spent</p>
                        <p className="font-semibold">{result.timeSpent}</p>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      Completed: {new Date(result.submittedAt).toLocaleString()}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-gray-600 mb-4">This subject is available for you to take.</p>
                    <Link
                      href="/login"
                      className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Start Exam
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Completion Message */}
        {completedSubjects.length === allSubjects.length && (
          <div className="mt-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-8 text-center text-white">
            <div className="text-4xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold mb-2">Congratulations!</h2>
            <p className="text-lg mb-4">You have successfully completed all subjects.</p>
            <p className="text-green-100">
              Your results have been saved and you can view them anytime.
            </p>
          </div>
        )}

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}