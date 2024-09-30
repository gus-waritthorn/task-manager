import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Controller, Control} from 'react-hook-form';
import {Task} from '../../utils/task';

const TouchableOpacityForm = ({
  name,
  control,
  onPress,
}: {
  name: 'status';
  control: Control<Task>;
  onPress: () => void;
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({field: {value}, fieldState}) => (
        <>
          <TouchableOpacity
            style={[styles.input, fieldState.error && styles.errorInput]}
            onPress={onPress}>
            <Text>{value || 'Select status'}</Text>
          </TouchableOpacity>
          {fieldState.error && (
            <Text style={styles.errorText}>{fieldState.error.message}</Text>
          )}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
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
});

export default TouchableOpacityForm;
