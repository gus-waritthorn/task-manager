import React, {useEffect, useState} from 'react';
import {useForm, Control} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {View, Text, Button, StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../App';
import {schema} from '../constants/schemas';
import {EMPTY_TASK, Task} from '../utils/task';
import StatusModal from '../components/StatusModal';
import TextInputForm from '../components/form/TextInputForm';
import {ObjectSchema} from 'yup';
import TouchableOpacityForm from '../components/form/TouchableOpacityForm';

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
  const [showModal, setShowModal] = useState<boolean>(false);
  const {task, updateTask} = route.params;

  useEffect(() => {
    task.id ? reset(task) : reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [task]);

  const {control, handleSubmit, reset} = useForm<Task>({
    resolver: yupResolver(schema as ObjectSchema<Task>),
    defaultValues: EMPTY_TASK,
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
  });

  const handleSave = (formValue: Task) => {
    updateTask(formValue);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text>Title</Text>
      <TextInputForm name="title" control={control} />

      <Text>Description</Text>
      <TextInputForm name="description" control={control} />

      <Text>Status:</Text>
      <TouchableOpacityForm
        name="status"
        control={control}
        onPress={() => setShowModal(true)}
      />

      <StatusModal
        control={control as Control<Task>}
        visible={showModal}
        setVisible={setShowModal}
      />

      <Button
        title="Save Task"
        onPress={handleSubmit(data => handleSave(data as Task))}
      />
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
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  picker: {
    marginBottom: 20,
  },
});

export default TaskDetailScreen;
