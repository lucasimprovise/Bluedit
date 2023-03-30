import React, { useState } from 'react'
import styled from 'styled-components/native'

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState({
    mail: 'aubin@gmail.com',
    pseudo: 'AubinLeThug',
    avatar: 'https://i.imgur.com/8Km9tLL.png',
    bio: 'Je suis un thug'
  })
  const [lastActivity, setLastActivity] = useState({
    title: 'Dernière activité',
    content: 'Contenu de la dernière activité',
    upvotes: 23,
    comments: 5
  })
  const [forumCreated, setForumCreated] = useState('Forum créé: MonForum')

  const handleEditProfile = () => {
    navigation.navigate('EditProfile')
  }

  return (
    <Container>
      <ProfileHeader>
        <User>
          <ProfileImage source={{ uri: user.avatar }} />
          <Pseudo>{user.pseudo}</Pseudo>
          <UserDescription>{user.bio}</UserDescription>
        </User>
        <EditProfileButton onPress={handleEditProfile}>
          <EditProfileButtonText>Modifier</EditProfileButtonText>
        </EditProfileButton>
      </ProfileHeader>
      <LastActivity>
        <LastActivityTitle>{lastActivity.title}</LastActivityTitle>
        <LastActivityDetails>
          Contenu: {lastActivity.content} | Upvotes: {lastActivity.upvotes} | Commentaires: {lastActivity.comments}
        </LastActivityDetails>
      </LastActivity>
      <ForumCreated>{forumCreated}</ForumCreated>
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
  padding: 16px;
  background-color: #ffffff;
`

const ProfileHeader = styled.View`
  margin-bottom: 24px;
  background-color: #2f6de7;
  margin-top: -16px;
  margin-left: -16px;
  margin-right: -16px;
  padding: 16px;
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

const LastActivity = styled.View`
  margin-bottom: 16px;
`

const LastActivityTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
`

const LastActivityDetails = styled.Text`
  font-size: 16px;
`

const ForumCreated = styled.Text`
  font-size: 16px;
  margin-bottom: 16px;
`

const EditProfileButton = styled.TouchableOpacity`
  background-color: transparent;
  padding: 10px 20px;
  border-radius: 50px;
  border: 1px solid #ffffff;
  align-self: flex-start;
  margin-top: auto;
  margin-bottom: auto;
`

const EditProfileButtonText = styled.Text`
  color: #ffffff;
  font-size: 16px;
`

const User = styled.View`
  color: #000;
`

const UserDescription = styled.Text`
  color: #fff;
`

export default ProfileScreen
