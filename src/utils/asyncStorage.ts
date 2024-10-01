import AsyncStorage from '@react-native-async-storage/async-storage';
import {Task} from './task';

export const storeTask = async (value: Task[]) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('tasks', jsonValue);
  } catch (e) {
    if (__DEV__) {
      console.log('store task failed', e);
    }
  }
};

export const getTask = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('tasks');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    if (__DEV__) {
      console.log('get task failed', e);
    }
  }
};
