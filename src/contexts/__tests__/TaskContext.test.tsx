import React from 'react';
import {Button, Text} from 'react-native';
import {render, waitFor} from '@testing-library/react-native';
import {TaskContextProvider, useTaskContext} from '../TaskContext';
import {getTask, storeTask} from '../../utils/asyncStorage';
import {DEFAULT_TASKS, Task, TaskStatus} from '../../utils/task';

jest.mock('../../utils/asyncStorage', () => ({
  getTask: jest.fn(),
  storeTask: jest.fn(),
}));

const TestComponent = () => {
  const {tasks, updateTask, deleteTask} = useTaskContext();

  return (
    <>
      <Text testID="task-count">{tasks.length}</Text>
      <Button
        testID="add-task"
        onPress={() =>
          updateTask({
            title: 'New Task',
            description: 'Test Description',
            status: TaskStatus.ToDo,
          })
        }
        title="Add Task"
      />
      <Button
        testID="delete-task"
        onPress={() => deleteTask(0)}
        title="Delete Task"
      />
    </>
  );
};

describe('TaskContextProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('loads tasks from async storage on mount', async () => {
    const mockStoredTasks: Task[] = [
      {
        id: '1',
        title: 'Stored Task',
        description: 'Task from storage',
        status: TaskStatus.ToDo,
      },
    ];

    (getTask as jest.Mock).mockResolvedValue(mockStoredTasks);

    const {getByTestId} = render(
      <TaskContextProvider>
        <TestComponent />
      </TaskContextProvider>,
    );

    await waitFor(() =>
      expect(getByTestId('task-count').children[0]).toBe('1'),
    );

    expect(getTask).toHaveBeenCalled();
    expect(storeTask).not.toHaveBeenCalled();
  });

  it('stores default tasks if none are found in async storage', async () => {
    (getTask as jest.Mock).mockResolvedValue(null);

    const {getByTestId} = render(
      <TaskContextProvider>
        <TestComponent />
      </TaskContextProvider>,
    );

    await waitFor(() =>
      expect(getByTestId('task-count').children[0]).toBe('3'),
    ); // Assuming DEFAULT_TASKS has 3 tasks

    expect(getTask).toHaveBeenCalled();
    expect(storeTask).toHaveBeenCalledWith(DEFAULT_TASKS);
  });
});
