// Import statements
import React, {useState} from 'react';
import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import styled from 'styled-components';
// Component
const Authentication = () => {
  // State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Functions
  const signUp = async () => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      Alert.alert('Success', 'Your account has been created successfully');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const signIn = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      Alert.alert(' Success', 'You have successfully signed in');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  // Return statement
  return (
    <Container>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button onPress={signUp}>
        <ButtonText>Sign Up</ButtonText>
      </Button>
      <Button onPress={signIn}>
        <ButtonText>Sign In</ButtonText>
      </Button>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
`;

const TextInput = styled.TextInput`
  width: 80%;
  border: 1px solid #d3d3d3;
  padding: 10px;
  margin-bottom: 10px;
`;

const Button = styled.TouchableOpacity`
  width: 80%;
  background-color: #007bff;
  padding: 10px;
  margin-bottom: 10px;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: #ffffff;
`;

export default Authentication;
