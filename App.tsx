import './gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import TaskListScreen from './src/screens/TaskListScreen';
import TaskDetailScreen from './src/screens/TaskDetailScreen';
import {Task} from './src/utils/task';

export type RootStackParamList = {
  TaskList: undefined;
  TaskDetail: {task: Task; updateTask: (task: Task) => void};
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TaskList">
        <Stack.Screen name="TaskList" component={TaskListScreen} />
        <Stack.Screen name="TaskDetail" component={TaskDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
