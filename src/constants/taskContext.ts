import {DEFAULT_TASKS, Task} from '../utils/task';

export interface TaskContextValueProps {
  tasks: Task[];
  updateTask: (task: Task) => void;
  deleteTask: (index: number) => void;
}

export const defaultTaskContextValue: TaskContextValueProps = {
  tasks: DEFAULT_TASKS,
  updateTask: (_: Task) => {},
  deleteTask: (_: number) => {},
};
