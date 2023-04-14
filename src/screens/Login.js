// Import statements
import React, { useState, useContext } from 'react'
import { Alert, Text, TouchableOpacity } from 'react-native'
import auth from '@react-native-firebase/auth'
import styled from 'styled-components'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { AppContext } from '../../App'
import { loginUser } from '../store/actions/auth'
import Logo from '../components/Logo'
import TranslateAnimation from '../components/TranslateAnimation'

// Component
const Login = () => {
  const { t } = useTranslation()
  const { setIsSignedIn } = useContext(AppContext)

  const [email, setEmail] = useState('aubin@gmail.com')
  const [password, setPassword] = useState('aubin77')

  // Navigation
  const navigation = useNavigation()
  // Redux
  const dispatch = useDispatch()

  // Functions
  const signIn = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, password)

      const user = auth().currentUser

      // Mettre à jour l'état d'authentification dans Redux
      dispatch(loginUser(user))
      setIsSignedIn(true)
      Alert.alert('Success', 'You have successfully signed in')

      navigation.navigate('HomePage')
    } catch (error) {
      Alert.alert('Error', error.message)
    }
  }

  const handleGoRegister = () => {
    navigation.navigate('Register')
  }

  // Return statement
  return (
    <Container>
      <LogoContainer>
        <TranslateAnimation duration={1500}>
          <Logo />
        </TranslateAnimation>
      </LogoContainer>
      <TranslateAnimation fromLeft={false} duration={2000}>
        <TitleContainer>
          <LoginTitle>{t('auth.sign_in')}</LoginTitle>
          <TouchableOpacity onPress={handleGoRegister}>
            <RegisterTitle>{t('auth.sign_up')}</RegisterTitle>
          </TouchableOpacity>
        </TitleContainer>
      </TranslateAnimation>
      <TextInput placeholder={t('auth.email')} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <TextInput placeholder={t('auth.password')} value={password} onChangeText={setPassword} secureTextEntry />
      <Button onPress={signIn}>
        <ButtonText>{t('auth.sign_in')}</ButtonText>
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
  margin-left: auto;
  margin-right: auto;
`

const LoginTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  text-decoration-line: underline;
  margin-right: 10px;
`

const RegisterTitle = styled.Text`
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

const LogoContainer = styled.View`
  position: absolute;
  top: 50px;
  margin: 10px auto;
`

export default Login
