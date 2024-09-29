import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../App';

type TaskDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'TaskDetail'
>;
type TaskDetailScreenRouteProp = RouteProp<RootStackParamList, 'TaskDetail'>;

type TaskDetailScreenProps = {
  navigation: TaskDetailScreenNavigationProp;
  route: TaskDetailScreenRouteProp;
};

const TaskDetailScreen: React.FC<TaskDetailScreenProps> = ({
  route,
  navigation,
}) => {
  const {task, updateTask} = route.params;
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);

  const handleSave = () => {
    const updatedTask = {...task, title, description, status};
    updateTask(updatedTask);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text>Title:</Text>
      <TextInput value={title} onChangeText={setTitle} style={styles.input} />

      <Text>Description:</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />

      <Text>Status:</Text>
      <TouchableOpacity
        style={styles.input}
        onPress={() =>
          navigation.navigate('Status', {
            status,
            updateStatus: (value: string) => setStatus(value),
          })
        }>
        <Text>{status}</Text>
      </TouchableOpacity>

      <Button title="Save Task" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  picker: {
    marginBottom: 20,
  },
});

export default TaskDetailScreen;
