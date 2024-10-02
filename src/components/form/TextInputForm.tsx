import React from 'react';
import {StyleSheet, Text, TextInput} from 'react-native';
import {Controller, Control} from 'react-hook-form';
import {Task} from '../../utils/task';

const TextInputForm = ({
  testID,
  name,
  control,
}: {
  testID: string;
  name: 'title' | 'description';
  control: Control<Task>;
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({field: {onChange, onBlur, value}, fieldState}) => (
        <>
          <TextInput
            testID={testID}
            style={[styles.input, fieldState.error && styles.errorInput]}
            onBlur={onBlur}
            onChangeText={text => onChange(text)}
            value={value}
            placeholder="Enter title"
          />
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

export default TextInputForm;
