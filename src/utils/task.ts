import uuid from 'react-native-uuid';

export const generateUUID = (): string => {
  const newUUID = uuid.v4();
  console.log('Generated UUID:', newUUID);
  return newUUID.toString();
};

export const DEFAULT_TASKS: Task[] = [
  {
    id: generateUUID(),
    title: 'Task 1',
    description: 'Description 1',
    status: 'To Do',
  },
  {
    id: generateUUID(),
    title: 'Task 2',
    description: 'Description 2',
    status: 'In Progress',
  },
  {
    id: generateUUID(),
    title: 'Task 3',
    description: 'Description 3',
    status: 'Done',
  },
];

export const EMPTY_TASK: Task = {
  id: undefined,
  title: '',
  description: '',
  status: 'To Do',
};

export interface Task {
  id?: string;
  title: string;
  description: string;
  status: string;
}
