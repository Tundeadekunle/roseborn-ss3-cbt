'use client';

import { Question, Answer, Subject } from '@/types';
import { useEffect } from 'react';

interface QuestionCardProps {
  question: Question;
  answer: Answer | null;
  onAnswer: (answer: Answer) => void;
  disabled: boolean;
  questionNumber: number;
}

export default function QuestionCard({
  question,
  answer,
  onAnswer,
  disabled,
  questionNumber
}: QuestionCardProps) {
  const handleAnswerChange = (value: string) => {
    if (disabled) return;
    
    onAnswer({
      questionId: question.id,
      answer: value,
      type: question.type,
      subject: question.subject // Add the subject from the question
    });
  };

  const getOptionLetter = (index: number): string => {
    return String.fromCharCode(65 + index); // 65 = 'A' in ASCII
  };

  // Keyboard navigation for A, B, C, D keys
  useEffect(() => {
    if (disabled || question.type !== 'multiple-choice') return;

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key >= 'a' && event.key <= 'd') {
        const optionIndex = event.key.charCodeAt(0) - 97; // 97 = 'a' in ASCII
        if (question.options && question.options[optionIndex]) {
          handleAnswerChange(question.options[optionIndex]);
        }
      }
      // Also handle uppercase A, B, C, D
      if (event.key >= 'A' && event.key <= 'D') {
        const optionIndex = event.key.charCodeAt(0) - 65; // 65 = 'A' in ASCII
        if (question.options && question.options[optionIndex]) {
          handleAnswerChange(question.options[optionIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [disabled, question.type, question.options]);

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 mb-4 border-2 ${
      disabled ? 'border-red-300 bg-gray-50' : 'border-transparent'
    }`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Question {questionNumber} ({question.marks} mark{question.marks > 1 ? 's' : ''})
        </h3>
        <div className="flex items-center space-x-2">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            {question.type === 'multiple-choice' ? 'Multiple Choice' : 'Theory'}
          </span>
          {question.type === 'multiple-choice' && !disabled && (
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
              Press A, B, C, D
            </span>
          )}
        </div>
      </div>
      
      <p className="text-gray-700 mb-6 text-lg leading-relaxed">{question.question}</p>

      {question.type === 'multiple-choice' && question.options && (
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const optionLetter = getOptionLetter(index);
            const isSelected = answer?.answer === option;
            
            return (
              <div
                key={index}
                onClick={() => handleAnswerChange(option)}
                className={`flex items-start p-4 rounded-lg border-2 cursor-pointer transition-all group ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50 shadow-sm'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className={`
                  flex-shrink-0 w-10 h-10 rounded-full border-2 flex items-center justify-center mr-4 font-semibold text-lg
                  ${isSelected 
                    ? 'bg-blue-500 border-blue-500 text-white' 
                    : 'bg-white border-gray-300 text-gray-700 group-hover:border-blue-300'
                  }
                  ${disabled ? 'bg-gray-100 border-gray-300' : ''}
                `}>
                  {optionLetter}
                </div>
                <span className="text-gray-700 text-lg pt-1.5">{option}</span>
                
                {/* Keyboard shortcut hint */}
                {!disabled && (
                  <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                    <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-300 rounded">
                      {optionLetter}
                    </kbd>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {question.type === 'theory' && (
        <div>
          <textarea
            value={answer?.answer || ''}
            onChange={(e) => handleAnswerChange(e.target.value)}
            disabled={disabled}
            placeholder="Type your answer here... Be as detailed as possible. You can write multiple paragraphs."
            className={`w-full h-48 p-4 border-2 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg leading-relaxed ${
              disabled ? 'bg-gray-100 border-gray-300 cursor-not-allowed' : 'border-gray-300'
            }`}
          />
          {!disabled && (
            <div className="mt-2 text-sm text-gray-500">
              💡 Tip: Provide detailed explanations with examples where possible.
            </div>
          )}
        </div>
      )}

      {disabled && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-lg font-medium flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Time's up! This question is now disabled.
          </p>
        </div>
      )}

      {/* Selected Answer Display */}
      {answer?.answer && question.type === 'multiple-choice' && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-green-700 text-lg font-medium">
              Selected: <strong>{answer.answer}</strong>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}