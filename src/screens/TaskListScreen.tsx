import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  TouchableHighlight,
  ListRenderItemInfo,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
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
  }, [navigation]);

  const renderHiddenItem = (data: ListRenderItemInfo<Task>, _: any) => {
    const index = data.index;
    return (
      <View style={styles.hiddenContainer}>
        <TouchableOpacity
          style={styles.hiddenButton}
          onPress={() => deleteTask(index)}>
          <Text style={styles.backTextWhite}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderTask = ({item}: {item: Task}) => (
    <TouchableHighlight
      underlayColor="white"
      style={styles.taskContainer}
      onPress={() =>
        navigation.navigate('TaskDetail', {task: item, updateTask})
      }>
      <View style={styles.taskViewContainer}>
        <Text style={styles.taskTitle}>{item.title}</Text>
        <Text>Description: {item.description}</Text>
        <Text>Status: {item.status}</Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <View style={styles.container}>
      <SwipeListView
        data={tasks}
        renderItem={renderTask}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-75}
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
    backgroundColor: 'white',
  },
  taskViewContainer: {
    padding: 20,
    borderBottomWidth: 1,
  },
  taskTitle: {
    fontSize: 18,
  },
  // style for the hidden component
  hiddenContainer: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  hiddenButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 75,
    height: '100%',
    backgroundColor: 'red',
  },
  backTextWhite: {
    color: '#FFF',
  },
});

export default TaskListScreen;
