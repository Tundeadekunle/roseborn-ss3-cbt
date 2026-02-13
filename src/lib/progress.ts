import { StudentProgress, Subject, ExamResult } from '@/types';

const STORAGE_KEY = 'studentProgress';

export const getStudentProgress = (studentId: string): StudentProgress => {
  if (typeof window === 'undefined') {
    return { studentId, completedSubjects: [], results: {} };
  }

  try {
    const allProgress = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return allProgress[studentId] || { studentId, completedSubjects: [], results: {} };
  } catch {
    return { studentId, completedSubjects: [], results: {} };
  }
};

export const saveStudentProgress = (studentId: string, progress: StudentProgress): void => {
  if (typeof window === 'undefined') return;

  try {
    const allProgress = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    allProgress[studentId] = progress;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress));
  } catch (error) {
    console.error('Error saving student progress:', error);
  }
};

export const markSubjectAsCompleted = (result: ExamResult): void => {
  const progress = getStudentProgress(result.studentId);
  
  // Add to completed subjects if not already there
  if (!progress.completedSubjects.includes(result.subject)) {
    progress.completedSubjects.push(result.subject);
  }
  
  // Save result
  progress.results[result.subject] = {
    score: result.totalScore,
    submittedAt: result.submittedAt,
    timeSpent: result.timeSpent
  };
  
  saveStudentProgress(result.studentId, progress);
};

export const getCompletedSubjects = (studentId: string): Subject[] => {
  const progress = getStudentProgress(studentId);
  return progress.completedSubjects;
};

export const getAvailableSubjects = (studentId: string, allSubjects: Subject[]): Subject[] => {
  const completed = getCompletedSubjects(studentId);
  return allSubjects.filter(subject => !completed.includes(subject));
};

export const hasCompletedSubject = (studentId: string, subject: Subject): boolean => {
  const progress = getStudentProgress(studentId);
  return progress.completedSubjects.includes(subject);
};

export const getStudentResults = (studentId: string) => {
  const progress = getStudentProgress(studentId);
  return progress.results;
};