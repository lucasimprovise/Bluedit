// Import statements
import React, { useState } from 'react';
import { Alert, Text, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { User } from '../models/User';
import { loginUser } from '../store/actions/auth';

// Component
const Login = () => {
  // State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Redux
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const signIn = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, password);

      //Get user data from Firebase
      const user = auth().currentUser;

      // Mettre à jour l'état d'authentification dans Redux
      dispatch(loginUser(user));

      Alert.alert('Success', 'You have successfully signed in');

      navigation.navigate('HomePage');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleGoRegister = () => {
    navigation.navigate('Register');
  };

  // Return statement
  return (
    <Container>
      <TitleContainer>
        <LoginTitle>Login</LoginTitle>
        <TouchableOpacity onPress={handleGoRegister}>
          <RegisterTitle>Register</RegisterTitle>
        </TouchableOpacity>
      </TitleContainer>
      <TextInput
        placeholder='Email'
        value={email}
        onChangeText={setEmail}
        keyboardType='email-address'
        autoCapitalize='none'
      />
      <TextInput
        placeholder='Password'
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
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

const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const LoginTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  text-decoration-line: underline;
  margin-right: 10px;
`;

const RegisterTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-right: 10px;
  color: #007bff;
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

export default Login;
