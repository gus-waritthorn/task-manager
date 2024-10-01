import React, {createContext, useContext} from 'react';
import {DEFAULT_TASKS, generateUUID, Task} from '../utils/task';
import {
  defaultTaskContextValue,
  TaskContextValueProps,
} from '../constants/taskContext';

interface TaskContextProviderProps {
  children: React.ReactNode;
}

export const TaskContext = createContext<TaskContextValueProps>(
  defaultTaskContextValue,
);

export const TaskContextProvider = (props: TaskContextProviderProps) => {
  const [tasks, setTasks] = React.useState<Task[]>(DEFAULT_TASKS);

  const updateTask = (updatedTask: Task) => {
    setTasks(prevTasks => {
      if (updatedTask.id) {
        return prevTasks.map(task =>
          task.id === updatedTask.id ? updatedTask : task,
        );
      }
      // add new task to the list
      return [...prevTasks, {...updatedTask, id: generateUUID()}];
    });
  };

  const deleteTask = (index: number) => {
    setTasks(prevTasks => prevTasks.filter((_, i) => i !== index));
  };

  return (
    <TaskContext.Provider value={{tasks, updateTask, deleteTask}}>
      {props.children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext);
