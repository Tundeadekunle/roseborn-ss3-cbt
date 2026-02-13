import { Question, Subject } from '@/types';
import { dataProcessingQuestions } from './computer';


export const getQuestionsBySubject = (subject: Subject): Question[] => {
  switch (subject) {
    case 'data processing':
      return dataProcessingQuestions;
    // case 'history':
    //   return historyQuestions;
    //   case 'business':
    //   return businessQuestions;
    // case 'cca':
    //   return ccaQuestions;
    //   case 'computer':
    //   return dataProcessingQuestions;
    //   case 'phe':
    //   return pheQuestions;
    //   case 'crs':
    //   return crsQuestions;
    // case 'science':
    //   return scienceQuestions;
    // case 'scs':
    //   return scsQuestions;
    // default:
    //   return historyQuestions;
  }
};

export const getExamDurationBySubject = (subject: Subject): number => {
  // All subjects have 25-minute duration
  return 25; // 25 minutes in minutes
};

export const getSubjectDisplayName = (subject: Subject): string => {
  switch (subject) {
    case 'data processing':
      return 'Data Processing';
    // case 'history':
    //   return 'History';
    // case 'cca':
    //   return 'CCA';
    //   case 'data processing':
    //   return 'Data Processing';
    //   case 'business':
    //   return 'Business Studies';
    //   case 'crs':
    //   return 'Christian Religious Studies';
    //   case 'phe':
    //   return 'Physical and Health Education';
    // case 'science':
    //   return 'Basic Science';
    // case 'scs':
    //   return 'Social and Citizenship Studies';
    // default:
    //   return 'CCA';
  }
};

export const getAllSubjects = (): Subject[] => {
  return ['data processing'];
};