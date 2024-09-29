import React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
}

type RootStackParamList = {
  TaskList: undefined;
  TaskDetail: {task: Task; updateTask: (updatedTask: Task) => void};
};

type TaskListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'TaskList'
>;

interface TaskListScreenProps {
  navigation: TaskListScreenNavigationProp;
}

const TaskListScreen: React.FC<TaskListScreenProps> = ({navigation}) => {
  const [tasks, setTasks] = React.useState<Task[]>([
    {id: 1, title: 'Task 1', description: 'Description 1', status: 'Pending'},
    {id: 2, title: 'Task 2', description: 'Description 2', status: 'Completed'},
    {id: 3, title: 'Task 3', description: 'Description 3', status: 'To Do'},
  ]);

  const updateTask = (updatedTask: Task) => {
    setTasks(
      tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)),
    );
  };

  const renderTask = ({item}: {item: Task}) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('TaskDetail', {task: item, updateTask})
      }>
      <View style={styles.taskContainer}>
        <Text style={styles.taskTitle}>{item.title}</Text>
        <Text>Description: {item.description}</Text>
        <Text>Status: {item.status}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    padding: 20,
    borderBottomWidth: 1,
  },
  taskTitle: {
    fontSize: 18,
  },
});

export default TaskListScreen;
