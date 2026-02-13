import { Student } from '@/types';

export const students: Student[] = [
  { 
    id: 'RSB036STU', 
    name: 'Excellent First', 
    class: 'SS 3', 
    email: 'sodim@school.edu',
    subjects: [ 'data processing']
  },
  { 
    id: 'RSB037STU', 
    name: 'Sanni Bazeet', 
    class: 'SS 3', 
    email: 'salam@school.edu',
    subjects: [ 'data processing']
  },
  { 
    id: 'RSB038STU', 
    name: 'Koleoso Rachael', 
    class: 'SS 3', 
    email: 'alamuy@school.edu',
    subjects: [ 'data processing']
  },
  
{ 
    id: 'RSB0027STU', 
    name: 'Wale Seun', 
    class: 'BASIC VI', 
    email: 'jsy@school.edu',
    subjects: [ 'data processing']
  },
  { 
    id: 'RSB0028STU', 
    name: 'Kay Will', 
    class: 'SS 3', 
    email: 'jsy@school.edu',
    subjects: ['data processing']
  },
  {
    id: 'RSB0029STU', 
    name: 'Adeyemi Tunde', 
    class: 'JSS 1', 
    email: 'adeyemi@school.edu',
    subjects: ['data processing']
  },
  {
    id: 'RSB0030STU', 
    name: 'Oluwaseun Oluwaseun', 
    class: 'JSS 3', 
    email: 'oluwaseun@school.edu',
    subjects: ['data processing']
  },
  {
    id: 'RSB0031STU', 
    name: 'Kay Will', 
    class: 'SS 3', 
    email: 'jsy@school.edu',
    subjects: ['data processing']
  },
  {
  id: 'RSB0028STU', 
    name: 'Kay Will', 
    class: 'SS 3', 
    email: 'jsy@school.edu',
    subjects: ['data processing']
  },
  {
    id: 'RSB0032STU', 
    name: 'Adeyemi Tunde', 
    class: 'JSS 1', 
    email: 'adeyemi@school.edu',
    subjects: ['data processing']
  },
  {
  id: 'RSB0033STU', 
    name: 'Oluwaseun Oluwaseun', 
    class: 'JSS 3', 
    email: 'oluwaseun@school.edu',
    subjects: ['data processing']
  },
  {
    id: 'RSB0034STU', 
    name: 'Kay Will', 
    class: 'SS 3', 
    email: 'jsy@school.edu',
    subjects: ['data processing']
  },
  
  // Add more students...
];

export const getStudentById = (id: string): Student | undefined => {
  return students.find(student => student.id === id);
};

export const getStudentByName = (name: string): Student | undefined => {
  return students.find(student => 
    student.name.toLowerCase().includes(name.toLowerCase())
  );
};

export const validateStudent = (id: string, name: string): { isValid: boolean; student?: Student } => {
  const student = getStudentById(id);
  if (student && student.name.toLowerCase() === name.toLowerCase()) {
    return { isValid: true, student };
  }
  return { isValid: false };
};