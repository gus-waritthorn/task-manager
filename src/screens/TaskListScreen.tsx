import React, {useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {DEFAULT_TASKS, EMPTY_TASK, generateUUID, Task} from '../utils/task';

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
  const [tasks, setTasks] = React.useState<Task[]>(DEFAULT_TASKS);

  const updateTask = useCallback((updatedTask: Task) => {
    setTasks(prevTasks => {
      if (updatedTask.id) {
        return prevTasks.map(task =>
          task.id === updatedTask.id ? updatedTask : task,
        );
      }
      // add new task to the list
      return [...prevTasks, {...updatedTask, id: generateUUID()}];
    });
  }, []);

  React.useEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => (
        <Button
          onPress={() =>
            navigation.navigate('TaskDetail', {
              task: EMPTY_TASK,
              updateTask,
            })
          }
          title="Create"
        />
      ),
    });
  }, [navigation, updateTask]);

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
    <View style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  taskContainer: {
    padding: 20,
    borderBottomWidth: 1,
  },
  taskTitle: {
    fontSize: 18,
  },
});

export default TaskListScreen;
