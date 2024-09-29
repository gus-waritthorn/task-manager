import React, {useState} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import {RootStackParamList} from '../../App';

type StatusModalNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Status'
>;
type StatusModalRouteProp = RouteProp<RootStackParamList, 'Status'>;

type StatusModalProps = {
  navigation: StatusModalNavigationProp;
  route: StatusModalRouteProp;
};

const StatusModal: React.FC<StatusModalProps> = ({route, navigation}) => {
  const {status: initialStatus, updateStatus} = route.params;
  const [status, setStatus] = useState(initialStatus);

  const handleConfirm = () => {
    updateStatus(status);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={status}
        onValueChange={itemValue => setStatus(itemValue)}
        style={styles.picker}>
        <Picker.Item label="To Do" value="To Do" />
        <Picker.Item label="In Progress" value="In Progress" />
        <Picker.Item label="Done" value="Done" />
      </Picker>
      <Button title="Confirm" onPress={handleConfirm} />
    </View>
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
