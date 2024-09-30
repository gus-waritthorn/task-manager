import uuid from 'react-native-uuid';

export const generateUUID = (): string => {
  const newUUID = uuid.v4();
  return newUUID.toString();
};

export enum TaskStatus {
  ToDo = 'To Do',
  InProgress = 'In Progress',
  Done = 'Done',
}

export const DEFAULT_TASKS: Task[] = [
  {
    id: generateUUID(),
    title: 'Task 1',
    description: 'Description 1',
    status: TaskStatus.ToDo,
  },
  {
    id: generateUUID(),
    title: 'Task 2',
    description: 'Description 2',
    status: TaskStatus.InProgress,
  },
  {
    id: generateUUID(),
    title: 'Task 3',
    description: 'Description 3',
    status: TaskStatus.Done,
  },
];

export const EMPTY_TASK: Task = {
  id: undefined,
  title: '',
  description: '',
  status: TaskStatus.ToDo,
};

export interface Task {
  id?: string;
  title: string;
  description: string;
  status: TaskStatus;
}
