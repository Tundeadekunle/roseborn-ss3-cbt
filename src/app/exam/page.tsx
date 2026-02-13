'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Question, Answer, Subject } from '@/types';
import { getQuestionsBySubject, getExamDurationBySubject, getSubjectDisplayName } from '../../lib/questions';
import Timer from '@/components/Timer';
import QuestionCard from '@/components/QuestionCard';

export default function ExamPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [timeUp, setTimeUp] = useState(false);
  const [examStarted, setExamStarted] = useState(false);
  const [studentData, setStudentData] = useState<{ studentId: string; studentName: string; studentClass?: string; subject: Subject } | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [examQuestions, setExamQuestions] = useState<Question[]>([]);
  const [examDuration, setExamDuration] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const storedData = localStorage.getItem('studentData');
    if (!storedData) {
      router.push('/login');
      return;
    }
    
    const data = JSON.parse(storedData);
    setStudentData(data);
    
    // Load questions and duration for the selected subject
    const questions = getQuestionsBySubject(data.subject);
    const duration = getExamDurationBySubject(data.subject);
    
    setExamQuestions(questions);
    setExamDuration(duration);
    setTimeLeft(duration * 60);
  }, [router]);

  useEffect(() => {
    if (!examStarted || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [examStarted, timeLeft]);

  // Load saved answers from localStorage
  useEffect(() => {
    if (examStarted && studentData) {
      const savedAnswers = localStorage.getItem(`examAnswers_${studentData.subject}`);
      if (savedAnswers) {
        setAnswers(JSON.parse(savedAnswers));
      }
    }
  }, [examStarted, studentData]);

  // Save answers to localStorage whenever they change
  useEffect(() => {
    if (examStarted && answers.length > 0 && studentData) {
      localStorage.setItem(`examAnswers_${studentData.subject}`, JSON.stringify(answers));
    }
  }, [answers, examStarted, studentData]);

  const handleAnswer = (answer: Answer) => {
    if (!studentData) return;
    
    const answerWithSubject = {
      ...answer,
      subject: studentData.subject
    };

    setAnswers(prev => {
      const existingIndex = prev.findIndex(a => a.questionId === answer.questionId);
      let updated;
      
      if (existingIndex >= 0) {
        updated = [...prev];
        updated[existingIndex] = answerWithSubject;
      } else {
        updated = [...prev, answerWithSubject];
      }

      return updated;
    });
  };

  const handleTimeUp = () => {
    setTimeUp(true);
    handleSubmit();
  };

  const calculateScore = () => {
    let score = 0;
    answers.forEach(answer => {
      if (answer.type === 'multiple-choice') {
        const question = examQuestions.find(q => q.id === answer.questionId);
        if (question && question.correctAnswer === answer.answer) {
          score += question.marks;
        }
      }
    });
    return score;
  };

  const handleSubmit = async () => {
    if (!studentData) return;

    const multipleChoiceScore = calculateScore();
    const theoryAnswers = examQuestions
      .filter(q => q.type === 'theory')
      .map(q => {
        const answer = answers.find(a => a.questionId === q.id);
        return answer?.answer || 'Not answered';
      });

    // const timeSpentMinutes = Math.floor((examDuration * 60 - timeLeft) / 60);
    // const timeSpentFormatted = `${timeSpentMinutes} minutes`;

    const timeSpentMinutes = examDuration * 60 - timeLeft;
const timeSpentFormatted = `${timeSpentMinutes} minutes`;

    const result = {
      ...studentData,
      multipleChoiceScore,
      theoryAnswers,
      totalScore: multipleChoiceScore,
      submittedAt: new Date().toISOString(),
      timeSpent: timeSpentFormatted
    };

    try {
      // Mark subject as completed before anything else
      const { markSubjectAsCompleted } = await import('@/lib/progress');
      markSubjectAsCompleted(result);

      // Save to Google Sheets
      const response = await fetch('/api/save-result', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result)
      });

      if (response.ok) {
        // Clear exam data but keep result
        localStorage.removeItem(`examAnswers_${studentData.subject}`);
        localStorage.removeItem('examStartTime');
        localStorage.setItem('examResult', JSON.stringify(result));
        window.dispatchEvent(new Event('examCompleted'));
        router.push('/results');
      } else {
        const errorData = await response.json();
        console.error('Save failed:', errorData);
        alert('Failed to save results to server. Please contact administrator.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      // Mark subject as completed even if Google Sheets fails
      const { markSubjectAsCompleted } = await import('@/lib/progress');
      markSubjectAsCompleted(result);
      localStorage.removeItem(`examAnswers_${studentData.subject}`);
      localStorage.removeItem('examStartTime');
      localStorage.setItem('examResult', JSON.stringify(result));
      window.dispatchEvent(new Event('examCompleted'));
      router.push('/results');
    }
  };

  const getCurrentAnswer = (questionId: number) => {
    return answers.find(a => a.questionId === questionId) || null;
  };

  const getAnsweredCount = () => {
    return answers.filter(answer => answer.answer.trim() !== '').length;
  };

  const getQuestionStatus = (questionId: number) => {
    const answer = answers.find(a => a.questionId === questionId);
    if (!answer || answer.answer.trim() === '') return 'unanswered';
    return 'answered';
  };

  if (!studentData || examQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading exam...</p>
        </div>
      </div>
    );
  }

  if (!examStarted) {
    const subjectDisplayName = getSubjectDisplayName(studentData.subject);
    
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {subjectDisplayName} Examination
            </h1>
            <p className="text-gray-600 mb-2">Welcome, {studentData.studentName}</p>
            <p className="text-gray-600">Student ID: {studentData.studentId}</p>
            {studentData.studentClass && (
              <p className="text-gray-600">Class: {studentData.studentClass}</p>
            )}
            <div className="mt-4 inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-medium">
              Subject: {subjectDisplayName}
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-yellow-800 mb-4">Exam Structure</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Section A: Multiple Choice (25 Questions)</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• Various topics covering the subject</li>
                  <li>• Choose from options A, B, C, or D</li>
                  <li>• 1 mark per question</li>
                </ul>
              </div>
              {/* <div>
                <h3 className="font-semibold text-gray-800 mb-3">Section B: Theory (10 Questions)</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• Comprehensive questions</li>
                  <li>• Show all your working</li>
                  <li>• 5 marks per question</li>
                </ul>
              </div> */}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">Important Instructions</h2>
            <ul className="space-y-3 text-blue-700">
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span><strong>Duration:</strong> 25 minutes</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span><strong>Total Marks:</strong> 25</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span><strong>Multiple Choice:</strong> Select options A, B, C, or D</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span><strong>Warning:</strong> Do not refresh the page. Exam auto-submits when time expires.</span>
              </li>
            </ul>
          </div>

          <div className="text-center">
            <button
              onClick={() => setExamStarted(true)}
              className="bg-green-600 text-white px-12 py-4 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors shadow-lg"
            >
              Start {subjectDisplayName} Exam
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = examQuestions[currentQuestionIndex];
  const answeredCount = getAnsweredCount();
  const progress = (answeredCount / examQuestions.length) * 100;
  const subjectDisplayName = getSubjectDisplayName(studentData.subject);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{subjectDisplayName} Examination</h1>
              <p className="text-gray-600">
                Student: {studentData.studentName} (ID: {studentData.studentId})
                {studentData.studentClass && ` • Class: ${studentData.studentClass}`}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">
                Question {currentQuestionIndex + 1} of {examQuestions.length}
              </p>
              <p className="text-sm text-green-600 font-medium">
                Answered: {answeredCount}/{examQuestions.length}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-green-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Timer */}
        <Timer
          duration={examDuration}
          onTimeUp={handleTimeUp}
          isRunning={examStarted && !timeUp}
        />

        {/* Current Question */}
        <QuestionCard
          question={currentQuestion}
          answer={getCurrentAnswer(currentQuestion.id)}
          onAnswer={handleAnswer}
          disabled={timeUp}
          questionNumber={currentQuestionIndex + 1}
        />

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
            disabled={currentQuestionIndex === 0}
            className="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>

          {currentQuestionIndex === examQuestions.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={timeUp}
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center shadow-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Submit Exam
            </button>
          ) : (
            <button
              onClick={() => setCurrentQuestionIndex(prev => Math.min(examQuestions.length - 1, prev + 1))}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center"
            >
              Next
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>

        {/* Question Navigation Grid */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Question Navigation</h3>
          <div className="grid grid-cols-10 gap-2 mb-4">
            {examQuestions.map((question, index) => {
              const status = getQuestionStatus(question.id);
              const isCurrent = index === currentQuestionIndex;
              
              let bgColor = 'bg-gray-200 text-gray-700';
              if (status === 'answered') {
                bgColor = question.type === 'multiple-choice' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800';
              }

              return (
                <button
                  key={index}
                  onClick={() => setCurrentQuestionIndex(index)}
                  className={`p-3 rounded-lg text-sm font-medium transition-all relative ${
                    isCurrent
                      ? 'bg-blue-600 text-white shadow-md transform scale-105 ring-2 ring-blue-300'
                      : bgColor
                  } hover:shadow-md hover:scale-105`}
                  title={`Question ${index + 1} - ${question.type === 'multiple-choice' ? 'Multiple Choice' : 'Theory'}`}
                >
                  {index + 1}
                  {status === 'answered' && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 text-xs text-gray-600">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-300 rounded mr-2"></div>
              <span>Unanswered</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
              <span>Multiple Choice Answered</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
              <span>Theory Answered</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-600 rounded mr-2"></div>
              <span>Current Question</span>
            </div>
          </div>
        </div>

        {/* Section Indicators */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <h4 className="font-semibold text-gray-800 mb-2">Section A: Multiple Choice (60 Questions)</h4>
            <div className="grid grid-cols-5 gap-1 text-xs">
              <span className="text-center p-1 bg-blue-100 rounded">Q1-10</span>
              <span className="text-center p-1 bg-blue-100 rounded">Q11-20</span>
              <span className="text-center p-1 bg-blue-100 rounded">Q21-30</span>
              <span className="text-center p-1 bg-blue-100 rounded">Q31-40</span>
              <span className="text-center p-1 bg-blue-100 rounded">Q41-50</span>
              <span className="text-center p-1 bg-blue-100 rounded col-span-5">Q51-60</span>
            </div>
          </div>
          {/* <div className="bg-white rounded-lg shadow p-4">
            <h4 className="font-semibold text-gray-800 mb-2">Section B: Theory (10 Questions)</h4>
            <div className="grid grid-cols-5 gap-1 text-xs">
              <span className="text-center p-1 bg-green-100 rounded">Q61</span>
              <span className="text-center p-1 bg-green-100 rounded">Q62</span>
              <span className="text-center p-1 bg-green-100 rounded">Q63</span>
              <span className="text-center p-1 bg-green-100 rounded">Q64</span>
              <span className="text-center p-1 bg-green-100 rounded">Q65</span>
              <span className="text-center p-1 bg-green-100 rounded">Q66</span>
              <span className="text-center p-1 bg-green-100 rounded">Q67</span>
              <span className="text-center p-1 bg-green-100 rounded">Q68</span>
              <span className="text-center p-1 bg-green-100 rounded">Q69</span>
              <span className="text-center p-1 bg-green-100 rounded">Q70</span>
            </div>
          </div> */}
        </div>

        {/* Quick Jump Buttons */}
        <div className="mt-6 flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setCurrentQuestionIndex(0)}
            className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm hover:bg-blue-200 transition-colors"
          >
            First Question
          </button>
          <button
            onClick={() => setCurrentQuestionIndex(59)}
            className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm hover:bg-blue-200 transition-colors"
          >
            Last MC Question
          </button>
          <button
            onClick={() => setCurrentQuestionIndex(60)}
            className="bg-green-100 text-green-700 px-3 py-1 rounded text-sm hover:bg-green-200 transition-colors"
          >
            First Theory Question
          </button>
          <button
            onClick={() => setCurrentQuestionIndex(69)}
            className="bg-green-100 text-green-700 px-3 py-1 rounded text-sm hover:bg-green-200 transition-colors"
          >
            Last Question
          </button>
        </div>
      </div>
    </div>
  );
}