import React, {createContext, useContext, useEffect} from 'react';
import {DEFAULT_TASKS, generateUUID, Task} from '../utils/task';
import {
  defaultTaskContextValue,
  TaskContextValueProps,
} from '../constants/taskContext';
import {getTask, storeTask} from '../utils/asyncStorage';

interface TaskContextProviderProps {
  children: React.ReactNode;
}

export const TaskContext = createContext<TaskContextValueProps>(
  defaultTaskContextValue,
);

export const TaskContextProvider = (props: TaskContextProviderProps) => {
  const [tasks, setTasks] = React.useState<Task[]>(DEFAULT_TASKS);

  useEffect(() => {
    const loadTasks = async () => {
      const storedTask = await getTask();
      console.log('stored task', storedTask);
      if (!storedTask) {
        await storeTask(DEFAULT_TASKS);
      } else {
        setTasks(storedTask);
      }
    };

    loadTasks();
  }, []);

  const updateTask = (updatedTask: Task) => {
    setTasks(prevTasks => {
      if (updatedTask.id) {
        const newTasks = prevTasks.map(task =>
          task.id === updatedTask.id ? updatedTask : task,
        );
        storeTask(newTasks);
        return newTasks;
      }
      // add new task to the list
      const newTasks = [...prevTasks, {...updatedTask, id: generateUUID()}];
      storeTask(newTasks);
      return newTasks;
    });
  };

  const deleteTask = (index: number) => {
    const filteredTask = tasks.filter((_, i) => i !== index);
    storeTask(filteredTask);
    setTasks(filteredTask);
  };

  return (
    <TaskContext.Provider value={{tasks, updateTask, deleteTask}}>
      {props.children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext);
