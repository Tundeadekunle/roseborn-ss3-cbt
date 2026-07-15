import { Question, Subject } from '@/types';
import { dataProcessingQuestions } from './computer';
import { chemistryQuestions as chemistryQuestions } from './chemistry';
import {biologyQuestions as biologyQuestions} from './biology';
import {economicsQuestions as economicsQuestions} from './economics';
import {agricQuestions as agricQuestions} from './agric';
import {agric2Questions as agric2Questions} from './agricss2';
import {ictQuestions as ictQuestions} from './ict';
import {govtss1Questions as govtss1Questions} from './govtss1';
import {govtss2Questions as govtss2Questions} from './govtss2';
import {litss1Questions as litss1Questions} from './litss1';
import {litss2Questions as litss2Questions} from './litss2';
import {civicQuestions as civicQuestions} from './civic';
import {econs2Questions as econs2Questions} from './econs2';
import {chemistry2Questions as chemistry2Questions} from './chemistry2';
import {biology2Questions as biology2Questions} from './biology2';
import {physics2Questions as physics2Questions} from './physics2';
import {physicsQuestions as physicsQuestions} from './physics';
import {phonicsQuestions as phonicsQuestions} from './phonics';
import {phonics2Questions as phonics2Questions} from './phonics2';


export const getQuestionsBySubject = (subject: Subject): Question[] => {
  switch (subject) {
    case 'data processing':
      return dataProcessingQuestions;
    // case 'history':
    //   return historyQuestions;
    case 'agric':
      return agricQuestions;
    case 'agric2':
      return agric2Questions;
    case 'chemistry':
      return chemistryQuestions;
      case 'chemistry2':
      return chemistry2Questions;
    case 'biology':
      return biologyQuestions;
      case 'biology2':
      return biology2Questions;
    case 'econs2':
      return econs2Questions;
    case 'economics':
      return economicsQuestions;
    case 'ict':
      return ictQuestions;
      case 'civic':
      return civicQuestions;
    //   case 'computer':
    //   return dataProcessingQuestions;
    case 'govtss2':
      return govtss2Questions;
      case 'govtss1':
      return govtss1Questions;
      case 'litss1':
      return litss1Questions;
      case 'litss2':
      return litss2Questions;
      case 'physics2':
      return physics2Questions;
      case 'physics':
      return physicsQuestions;
      case 'phonics':
      return phonicsQuestions;
      case 'phonics2':
      return phonics2Questions;
    // case 'science':
    //   return scienceQuestions;
    // case 'scs':
    //   return scsQuestions;
    default:
      return [];
  }
};

export const getExamDurationBySubject = (subject: Subject): number => {
  // All subjects have 25-minute duration
  return 20; // 25 minutes in minutes
};

export const getSubjectDisplayName = (subject: Subject): string => {
  switch (subject) {
    case 'data processing':
      return 'Data Processing';
    // case 'history':
    //   return 'History';
    case 'agric':
      return 'Agricultural Science';
    case 'agric2':
      return 'Agricultural Science SS2';
    case 'ict':
      return 'ICT SS2';
    case 'chemistry':
      return 'Chemistry';
      case 'chemistry2':
      return 'Chemistry SS2';
    case 'biology':
      return 'Biology';
      case 'biology2':
      return 'Biology SS2';
    case 'economics':
      return 'Economics Studies';
      case 'econs2':
      return 'Economics Studies SS2';
      case 'govtss1':
      return 'Government SS1';
    case 'govtss2':
      return 'Government SS2';
      case 'litss1':
      return 'Literature SS1';
      case 'litss2':
      return 'Literature SS2';
    case 'civic':
      return 'Civic';
      case 'physics':
      return 'Physics SS1';
      case 'physics2':
      return 'Physics SS2';
      case 'phonics':
      return 'Spoken English SS1';
      case 'phonics2':
      return 'Spoken English SS2';
    // case 'scs':
    //   return 'Social and Citizenship Studies';
    // default:
    //   return 'CCA';
    default:
      return 'Unknown Subject';
  }
};

export const getAllSubjects = (): Subject[] => {
  return ['data processing' , 'chemistry', 'chemistry2', 'biology', 'biology2', 'economics', 'agric', 'ict', 'agric2', 'history', 'litss2', 'econs2', 'civic', 'litss1', 'govtss1', 'govtss2', 'physics', 'physics2', 'phonics', 'phonics2'];
};