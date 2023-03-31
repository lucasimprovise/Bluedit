import React, { useState } from 'react'
import styled from 'styled-components/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import PostsScreen from '../components/ProfileTabs/Posts'
import CommunitiesScreen from '../components/ProfileTabs/Communities'
import HistoryScreen from '../components/ProfileTabs/History'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'

const ProfileScreen = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()

  const [user, setUser] = useState({
    mail: 'aubin@gmail.com',
    pseudo: 'AubinLeThug',
    avatar: 'https://i.imgur.com/8Km9tLL.png',
    bio: 'Je suis un thug'
  })

  const [forumsCreated, setForumsCreated] = useState([
    {
      name: 'Pêche en eau douce',
      description: 'Tout sur la pêche en eau douce'
    }
  ])

  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  const handleEditProfile = () => {
    navigation.navigate('EditProfile')
  }

  const handleGoSettings = () => {
    navigation.navigate('Settings')
  }

  const TopTab = createBottomTabNavigator()

  return (
    <Container>
      <ProfileHeader>
        <User>
          <ProfileImage source={{ uri: user.avatar }} />
          <Pseudo>{user.pseudo}</Pseudo>
          <UserDescription>{user.bio}</UserDescription>
        </User>
        <ProfileButtons>
          <ProfileButton onPress={handleGoSettings}>
            <ProfileButtonText>{t('settings')}</ProfileButtonText>
          </ProfileButton>
          <ProfileButton onPress={handleEditProfile}>
            <ProfileButtonText>{t('edit')}</ProfileButtonText>
          </ProfileButton>
        </ProfileButtons>
      </ProfileHeader>

      <TopTab.Navigator
        initialRouteName="Posts"
        screenOptions={{
          tabBarActiveTintColor: '#2f6de7',
          tabBarInactiveTintColor: '#000',
          tabBarStyle: {
            elevation: 0,
            width: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0
          }
        }}>
        <TopTab.Screen name={t('posts')} component={PostsScreen} />
        <TopTab.Screen name={t('communities')} component={CommunitiesScreen} />
        <TopTab.Screen name={t('history')} component={HistoryScreen} />
      </TopTab.Navigator>
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
  padding: 10px;
  background-color: #ffffff;
`

const ProfileHeader = styled.View`
  background-color: #2f6de7;
  margin-top: -16px;
  margin-left: -16px;
  margin-right: -16px;
  padding: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const ProfileImage = styled.Image`
  width: 64px;
  height: 64px;
  border-radius: 32px;
  margin-right: 16px;
`

const Pseudo = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #fff;
`

const User = styled.View`
  color: #000;
`

const UserDescription = styled.Text`
  color: #fff;
`

const ProfileButton = styled.TouchableOpacity`
  background-color: transparent;
  padding: 10px 20px;
  border-radius: 50px;
  width: 150px;
  flex-direction: row;
  justify-content: center;
  border: 1px solid #ffffff;
  align-self: flex-start;
  margin-top: auto;
  margin-bottom: auto;
`

const ProfileButtonText = styled.Text`
  color: #ffffff;
  font-size: 16px;
`

const ProfileButtons = styled.View`
  flex-direction: column;
  justify-content: center;
  gap: 16px;
`

export default ProfileScreen
