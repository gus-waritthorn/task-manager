export const DEFAULT_TASKS: Task[] = [
  {id: 1, title: 'Task 1', description: 'Description 1', status: 'To Do'},
  {id: 2, title: 'Task 2', description: 'Description 2', status: 'In Progress'},
  {id: 3, title: 'Task 3', description: 'Description 3', status: 'Done'},
];

export const EMPTY_TASK: Task = {
  id: undefined,
  title: '',
  description: '',
  status: 'To Do',
};

export interface Task {
  id?: number;
  title: string;
  description: string;
  status: string;
}
