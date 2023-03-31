import React from 'react'
import styled from 'styled-components/native'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import { BsArrowLeft } from 'react-icons/bs'

const Settings = () => {
  const { t, i18n } = useTranslation()
  const navigation = useNavigation()

  return (
    <SettingsContainer>
      <GoBackButton onPress={() => navigation.goBack()}>
        <TextButton>&#8592; {t('go_back')}</TextButton>
      </GoBackButton>
      <SettingsTitle>{t('settings')}</SettingsTitle>
      <SettingsButton
        onPress={() => {
          i18n.changeLanguage(i18n.language === 'en' ? 'fr' : 'en')
        }}>
        <TextButton>{t('change_language')}</TextButton>
      </SettingsButton>
    </SettingsContainer>
  )
}

const SettingsContainer = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 16px;
`

const SettingsTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #000;
`

const SettingsButton = styled.TouchableOpacity`
  background-color: #fff;
  padding: 10px 20px;
  border-radius: 50px;
  border: 1px solid #000;
  align-self: flex-start;
  margin-top: 16px;
`

const GoBackButton = styled.TouchableOpacity`
  background-color: #fff;
  margin-bottom: 16px;
`

const TextButton = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #000;
`

export default Settings
