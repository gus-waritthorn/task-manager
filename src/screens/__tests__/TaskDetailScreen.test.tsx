// TaskDetailScreen.test.js
import React from 'react';
import {render, fireEvent, waitFor, act} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import TaskDetailScreen from '../TaskDetailScreen';
import {EMPTY_TASK, generateUUID, Task, TaskStatus} from '../../utils/task';

interface MockNavigatorProps {
  task: Task;
  updateTask: () => void;
}

const Stack = createStackNavigator();

const MockedNavigator: React.FC<MockNavigatorProps> = ({task, updateTask}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="TaskDetail">
          {({navigation}) => (
            <TaskDetailScreen
              navigation={navigation}
              route={{
                key: 'someKey',
                name: 'TaskDetail',
                params: {task, updateTask: updateTask},
              }}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

describe('TaskDetailScreen', () => {
  const mockUpdateTask = jest.fn();

  it('renders correctly with empty task', () => {
    const {getByText} = render(
      <MockedNavigator task={EMPTY_TASK} updateTask={mockUpdateTask} />,
    );

    expect(getByText('Title')).toBeTruthy();
    expect(getByText('Description')).toBeTruthy();
    expect(getByText('Status:')).toBeTruthy();
  });

  it('updates task when the form is submitted', async () => {
    const mockId = generateUUID();
    const task = {
      id: mockId,
      title: 'Test Task',
      description: 'Test Description',
      status: TaskStatus.InProgress,
    };

    const {getByTestId} = render(
      <MockedNavigator task={task} updateTask={mockUpdateTask} />,
    );

    fireEvent.changeText(getByTestId('title-input'), 'Updated Task Title');
    fireEvent.changeText(
      getByTestId('description-input'),
      'Updated Task Description',
    );
    fireEvent.press(getByTestId('save-task-button'));

    await waitFor(() => {
      expect(mockUpdateTask).toHaveBeenCalledWith({
        id: mockId,
        title: 'Updated Task Title',
        description: 'Updated Task Description',
        status: TaskStatus.InProgress,
      });
    });
  });

  it('shows the status modal when the status button is pressed', async () => {
    const {getByTestId} = render(
      <MockedNavigator task={EMPTY_TASK} updateTask={mockUpdateTask} />,
    );

    fireEvent.press(getByTestId('status-button'));

    await act(() => {
      expect(getByTestId('picker-status')).toBeTruthy();
    });
  });
});
