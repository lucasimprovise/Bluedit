// Import statements
import React, {useState} from 'react';
import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {loginUser} from './store/actions/auth';

// Component
const Authentication = () => {
  // State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const {user} = useSelector(state => state.auth);

  // Navigation
  const navigation = useNavigation();

  // Functions
  const signUp = async () => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      Alert.alert('Success', 'Your account has been created successfully');
      // Naviguer vers la page d'accueil
      navigation.navigate('HomePage');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = auth().onAuthStateChanged(userAuth => {
        if (userAuth) {
          dispatch(loginUser(userAuth));
          navigation.navigate('HomePage');
        }
      });
      return () => unsubscribe();
    }, [navigation, dispatch]),
  );

  const signIn = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      dispatch(loginUser(auth().currentUser));
      Alert.alert(' Success', 'You have successfully signed in');
      navigation.navigate('HomePage');
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
