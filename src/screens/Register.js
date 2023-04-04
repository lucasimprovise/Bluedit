// Import statements
import React, { useState } from 'react'
import { Alert, Text, TouchableOpacity } from 'react-native'
import auth from '@react-native-firebase/auth'
import styled from 'styled-components'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { User } from '../models/User'
import { useTranslation } from 'react-i18next'

// Component
const Register = ({ navigation }) => {
  const { t } = useTranslation()

  // State
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  // Functions
  const signUp = async () => {
    try {
      const newUser = new User().createUserObj(email, username, password)
      newUser.addUser()
      Alert.alert('Success', 'Your account has been created successfully')
      // Naviguer vers la page d'accueil
      navigation.navigate('HomePage')
    } catch (error) {
      Alert.alert('Error', error.message)
    }
  }

  const handleGoLogin = () => {
    navigation.navigate('Login')
  }

  // Return statement
  return (
    <Container>
      <TitleContainer>
        <TouchableOpacity onPress={handleGoLogin}>
          <LoginTitle>{t('auth.sign_in')}</LoginTitle>
        </TouchableOpacity>
        <RegisterTitle>{t('auth.sign_up')}</RegisterTitle>
      </TitleContainer>
      <TextInput placeholder={t('auth.email')} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <TextInput placeholder={t('auth.password')} value={password} onChangeText={setPassword} secureTextEntry />
      <TextInput placeholder={t('auth.username')} value={username} onChangeText={setUsername} />
      <Button onPress={signUp}>
        <ButtonText>{t('auth.sign_up')}</ButtonText>
      </Button>
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
`

const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`

const RegisterTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  text-decoration-line: underline;
  margin-right: 10px;
`

const LoginTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-right: 10px;
  color: #007bff;
`

const TextInput = styled.TextInput`
  width: 80%;
  border: 1px solid #d3d3d3;
  padding: 10px;
  margin-bottom: 10px;
`

const Button = styled.TouchableOpacity`
  width: 80%;
  background-color: #007bff;
  padding: 10px;
  margin-bottom: 10px;
  align-items: center;
`

const ButtonText = styled.Text`
  color: #ffffff;
`

export default Register
