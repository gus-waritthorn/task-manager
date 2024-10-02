import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import TaskListScreen from '../TaskListScreen';
import {useTaskContext} from '../../contexts/TaskContext';

jest.mock('../../contexts/TaskContext');

const Stack = createStackNavigator();

const mockUpdateTask = jest.fn();
const mockDeleteTask = jest.fn();
const mockTasks = [
  {title: 'Test Task 1', description: 'Description 1', status: 'Pending'},
  {title: 'Test Task 2', description: 'Description 2', status: 'Completed'},
];

const MockedNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="TaskList">
          {props => <TaskListScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="TaskDetail" component={() => <></>} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

describe('TaskListScreen', () => {
  beforeEach(() => {
    (useTaskContext as jest.Mock).mockReturnValue({
      tasks: mockTasks,
      updateTask: mockUpdateTask,
      deleteTask: mockDeleteTask,
    });
  });

  it('renders correctly with tasks', () => {
    const {getByText} = render(<MockedNavigator />);

    expect(getByText('Test Task 1')).toBeTruthy();
    expect(getByText('Test Task 2')).toBeTruthy();
  });

  it('navigates to TaskDetail on Create button press', () => {
    const {getByText} = render(<MockedNavigator />);

    fireEvent.press(getByText('Create'));

    expect(getByText('TaskDetail')).toBeTruthy();
  });

  it('deletes a task when delete button is pressed', () => {
    const {getAllByText} = render(<MockedNavigator />);

    const deleteButtons = getAllByText('Delete');

    expect(deleteButtons.length).toBeGreaterThan(0);

    fireEvent.press(deleteButtons[0]);

    expect(mockDeleteTask).toHaveBeenCalledWith(0); // Index of the first task
  });
});
