// export type Subject = 'mathematics' | 'english' | 'science' | 'social-studies';

// export interface Question {
//   id: number;
//   type: 'multiple-choice' | 'theory';
//   question: string;
//   options?: string[];
//   correctAnswer?: string;
//   marks: number;
//   subject: Subject;
// }

// export interface Answer {
//   questionId: number;
//   answer: string;
//   type: 'multiple-choice' | 'theory';
//   subject: Subject;
// }

// export interface ExamResult {
//   studentId: string;
//   studentName: string;
//   subject: Subject;
//   multipleChoiceScore: number;
//   theoryAnswers: string[];
//   totalScore: number;
//   submittedAt: string;
//   timeSpent: string;
//   studentClass?: string;
// }

// export interface Student {
//   id: string;
//   name: string;
//   class?: string;
//   email?: string;
//   subjects: Subject[];
// }








export type Subject = 'data processing';

export interface Question {
  id: number;
  type: 'multiple-choice' | 'theory';
  question: string;
  options?: string[];
  correctAnswer?: string;
  marks: number;
  subject: Subject;
}

export interface Answer {
  questionId: number;
  answer: string;
  type: 'multiple-choice' | 'theory';
  subject: Subject;
}

export interface ExamResult {
  studentId: string;
  studentName: string;
  subject: Subject;
  multipleChoiceScore: number;
  theoryAnswers: string[];
  totalScore: number;
  submittedAt: string;
  timeSpent: string;
  studentClass?: string;
}

export interface Student {
  id: string;
  name: string;
  class?: string;
  email?: string;
  subjects: Subject[];
}

// Track completed subjects for each student
export interface StudentProgress {
  studentId: string;
  completedSubjects: Subject[];
  results: {
    [subject in Subject]?: {
      score: number;
      submittedAt: string;
      timeSpent: string;
    }
  };
}