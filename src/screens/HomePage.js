import React, { useEffect } from 'react'
import { View, Text, FlatList } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MyProfile from './MyProfile'
import UserRedirect from './../components/UserRedirect'
import Authentication from './Authentication'
import styled from 'styled-components/native'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import AuthOrProfile from './../components/AuthOrProfile'
import { useTranslation } from 'react-i18next'
import logo from './../assets/bluedit-logo.png'

const fakeCommunities = [
  { id: '1', name: 'r/ReactNative' },
  { id: '2', name: 'r/JavaScript' },
  { id: '3', name: 'r/Python' }
]

const fakePosts = [
  {
    id: '1',
    title: 'React Native is amazing!',
    author: 'JohnDoe',
    community: 'r/ReactNative',
    upvotes: 340
  },
  {
    id: '2',
    title: 'JavaScript vs TypeScript',
    author: 'JaneDoe',
    community: 'r/JavaScript',
    upvotes: 275
  },
  {
    id: '3',
    title: 'Python for Data Science',
    author: 'DataMaster',
    community: 'r/Python',
    upvotes: 420
  }
]

const TopTab = createMaterialTopTabNavigator()

const CommunitiesScreen = () => {
  return (
    <View>
      <FlatList
        data={fakeCommunities}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CommunityContainer>
            <CommunityName>{item.name}</CommunityName>
          </CommunityContainer>
        )}
      />
    </View>
  )
}

const PopularScreen = () => {
  const { t } = useTranslation()

  return (
    <View>
      <FlatList
        data={fakePosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostContainer>
            <PostTitle>{item.title}</PostTitle>
            <PostDetails>
              {item.community} - {t('posted_by')} u/{item.author}
            </PostDetails>
            <PostUpvotes>Upvotes: {item.upvotes}</PostUpvotes>
          </PostContainer>
        )}
      />
    </View>
  )
}

const HomeTabs = () => {
  const { t } = useTranslation()

  return (
    <TopTab.Navigator
      tabBarOptions={{
        activeTintColor: '#ffffff',
        inactiveTintColor: '#aaaaaa',
        style: { backgroundColor: '#0047b3' }
      }}>
      <TopTab.Screen name={t('communities')} component={CommunitiesScreen} />
      <TopTab.Screen name={t('popular')} component={PopularScreen} />
    </TopTab.Navigator>
  )
}

const BottomTab = createBottomTabNavigator()

const HomePage = () => {
  const currentUser = useSelector((state) => state.currentUser)
  const navigation = useNavigation()

  useEffect(() => {
    // Cette fonction sera exécutée lorsque currentUser change
    navigation.navigate('MyProfile')
  }, [currentUser, navigation])

  const RedirectToProfileOrAuth = () => {
    if (currentUser) {
      return MyProfile
    } else {
      return Authentication
    }
  }

  const screenOptions = {
    headerShown: false
  }

  const { user } = useSelector((state) => state.auth)

  console.log(user)

  const handleCreate = () => {
    navigation.navigate('CreatePostScreen')
    // alert('Créer une nouvelle communauté ou un nouveau post');
  }

  return (
    <Container>
      <Logo source={logo} />
      <BottomTab.Navigator initialRouteName="Home">
        <BottomTab.Screen name="Home" options={screenOptions} component={HomeTabs} />
        <BottomTab.Screen name="User" options={screenOptions} component={AuthOrProfile} />
      </BottomTab.Navigator>
      <CreateButton onPress={handleCreate}>
        <CreateButtonText>+</CreateButtonText>
      </CreateButton>
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
`

const Logo = styled.Image`
  width: 150px;
  height: 50px;
  resize-mode: contain;
  margin: 10px auto;
`

const CommunityContainer = styled.View`
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: #d3d3d3;
`

const CommunityName = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`

const PostContainer = styled.View`
  padding: 15px;
  border-bottom-width: 1px;
  border-bottom-color: #d3d3d3;
`

const PostTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #333;
`

const PostDetails = styled.Text`
  font-size: 14px;
  color: #888;
  margin-top: 5px;
`

const PostUpvotes = styled.Text`
  font-size: 16px;
  color: #333;
  margin-top: 10px;
`

const CreateButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 60px;
  right: 20px;
  background-color: #007bff;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  elevation: 5;
  shadow-color: #000;
  shadow-offset: {width: 0, height: 2};
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
`

const CreateButtonText = styled.Text`
  color: #ffffff;
  font-size: 32px;
  font-weight: bold;
`

export default HomePage
