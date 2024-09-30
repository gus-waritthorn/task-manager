import React from 'react';
import {Modal, View, Button, StyleSheet} from 'react-native';
import {Control, Controller} from 'react-hook-form';
import {Picker} from '@react-native-picker/picker';
import {Task} from '../utils/task';

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
              selectedValue={value}
              onBlur={onBlur}
              onValueChange={onChange}
              style={styles.picker}>
              <Picker.Item label="To Do" value="To Do" />
              <Picker.Item label="In Progress" value="In Progress" />
              <Picker.Item label="Done" value="Done" />
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
