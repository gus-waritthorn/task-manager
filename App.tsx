import 'react-native-gesture-handler';
import React from 'react';
import {Control} from 'react-hook-form';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// screen import
import TaskListScreen from './src/screens/TaskListScreen';
import TaskDetailScreen from './src/screens/TaskDetailScreen';

import {Task, TaskStatus} from './src/utils/task';
import {TaskContextProvider} from './src/contexts/TaskContext';

export type RootStackParamList = {
  TaskList: undefined;
  TaskDetail: {task: Task; updateTask: (task: Task) => void};
  Status: {
    control: Control<Task>;
    setValue: (status: TaskStatus) => void;
  };
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <TaskContextProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="TaskList">
          <Stack.Screen name="TaskList" component={TaskListScreen} />
          <Stack.Screen name="TaskDetail" component={TaskDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </TaskContextProvider>
  );
};

export default App;
