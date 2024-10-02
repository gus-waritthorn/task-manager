import React from 'react';
import {Modal, View, Button, StyleSheet} from 'react-native';
import {Control, Controller} from 'react-hook-form';
import {Picker} from '@react-native-picker/picker';
import {Task, TaskStatus} from '../utils/task';

const StatusModal = ({
  control,
  visible,
  setVisible,
}: {
  control: Control<Task>;
  visible: boolean;
  setVisible: (value: boolean) => void;
}) => {
  const handleConfirm = () => {
    setVisible(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={() => setVisible(!visible)}>
      <View style={styles.container}>
        <Controller
          control={control}
          name="status"
          render={({field: {onChange, onBlur, value}}) => (
            <Picker
              testID="picker-status"
              selectedValue={value}
              onBlur={onBlur}
              onValueChange={onChange}
              style={styles.picker}>
              <Picker.Item label={TaskStatus.ToDo} value={TaskStatus.ToDo} />
              <Picker.Item
                label={TaskStatus.InProgress}
                value={TaskStatus.InProgress}
              />
              <Picker.Item label={TaskStatus.Done} value={TaskStatus.Done} />
            </Picker>
          )}
        />
        <Button title="Confirm" onPress={handleConfirm} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  picker: {
    marginBottom: 20,
  },
});

export default StatusModal;
