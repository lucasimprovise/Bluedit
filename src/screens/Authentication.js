// Import statements
import React, { useState } from 'react'
import { Alert } from 'react-native'
import auth from '@react-native-firebase/auth'
import styled from 'styled-components'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

// Component
const Authentication = () => {
  // Translation
  const { t } = useTranslation()

  // State
  const [email, setEmail] = useState('aubin@gmail.com')
  const [password, setPassword] = useState('aubin77')

  // Navigation
  const navigation = useNavigation()

  // Redux
  const dispatch = useDispatch()

  // Functions
  const signUp = async () => {
    try {
      await auth().createUserWithEmailAndPassword(email, password)
      Alert.alert(t('success'), t('auth.success_register'))
      // Naviguer vers la page d'accueil
      navigation.navigate('HomePage')
    } catch (error) {
      Alert.alert('Error', error.message)
    }
  }

  const signIn = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, password)
      Alert.alert(t('success'), t('auth.success_login'))

      // Mettre à jour l'état d'authentification dans Redux
      dispatch({ type: 'LOGIN' })

      navigation.navigate('HomePage')
    } catch (error) {
      Alert.alert('Error', error.message)
    }
  }

  // Return statement
  return (
    <Container>
      <TextInput placeholder={t('auth.email')} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <TextInput placeholder={t('auth.password')} value={password} onChangeText={setPassword} secureTextEntry />
      <Button onPress={signUp}>
        <ButtonText>{t('auth.sign_up')}</ButtonText>
      </Button>
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

export default Authentication
