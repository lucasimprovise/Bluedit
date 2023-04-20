import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, TextInput } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import styled from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import ProfileScreen from './MyProfile'
import Login from './Login'
import { useSelector, useDispatch } from 'react-redux'
import AuthOrProfile from './../components/AuthOrProfile'
import logo from './../assets/bluedit-logo.png'
import { getPostsRequest } from '../store/actions/post'
import Post from '../components/Post'
import TranslateAnimation from '../components/TranslateAnimation'

const fakeCommunities = [
  { id: '1', name: 'r/ReactNative' },
  { id: '2', name: 'r/JavaScript' },
  { id: '3', name: 'r/Python' }
]

const communities = [
  { id: '1', name: 'b/React' },
  {
    id: '2',
    name: 'b/React Native',
  },

  {
    id: '3',
    name: 'b/Svelte',
  },
  { id: '4', name: 'b/Football' },
  { id: '5', name: 'b/Sports' },
  { id: '6', name: 'b/LeagueOfLegends' },
  { id: '7', name: 'b/History' },
  { id: '8', name: 'b/Car' },
];

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

const CommunitiesScreen = (props) => {
  const { t } = useTranslation()
  const [searchValue, setSearchValue] = useState('')
  const handleSearch = (value) => {
    setSearchValue(value)
  }

  const filteredCommunities = fakeCommunities.filter((community) => {
    return community.name.toLowerCase().includes(searchValue.toLowerCase())
  })

const CommunitiesScreen = () => {
  const navigation = useNavigation();
  return (
    <View>
      <FlatList
        data={communities}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <CommunityContainer
            onPress={() => {
              navigation.navigate('CommunityDetail', {
                communityName: item.name.substring(2),
              });
            }}
          >
            <CommunityName>{item.name}</CommunityName>
          </CommunityContainer>
        )}
      />
    </View>
  )
}

const PopularScreen = (props) => {
  const { t } = useTranslation()
  const { posts } = useSelector((state) => state.post)
  const navigation = useNavigation()
  const [searchValue, setSearchValue] = useState('')
  const dispatch = useDispatch()

  const handleSearch = (value) => {
    setSearchValue(value)
  }

  const filteredPosts = posts.filter((post) => {
    return post.title.toLowerCase().includes(searchValue.toLowerCase())
  })

  useEffect(() => {
    dispatch(getPostsRequest())
  }, [dispatch])

  return (
    <View>
      <SearchBar onChangeText={handleSearch} value={searchValue} placeholder={t('search_posts')} />
      {props.navigation?.isFocused() && (
        <FlatList
          data={filteredPosts}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <TranslateAnimation delay={200 * index} duration={500}>
              <PostContainer
                onPress={() => {
                  navigation.navigate('PostDetail', { postId: item.id })
                }}>
                <Post {...item}></Post>
              </PostContainer>
            </TranslateAnimation>
          )}
        />
      )}
    </View>
  )
}

const HomeTabs = () => {
  const { t } = useTranslation()
  const topTabStyles = {
    activeTintColor: '#ffffff',
    inactiveTintColor: '#aaaaaa',
    style: {
      backgroundColor: '#1e90ff'
    }
  }

  return (
    <TopTab.Navigator screenOptions={topTabStyles}>
      <TopTab.Screen children={(props) => <CommunitiesScreen {...props} />} name={t('communities')} />
      <TopTab.Screen children={(props) => <PopularScreen {...props} />} name={t('popular')} />
    </TopTab.Navigator>
  )
}

export const BottomTab = createBottomTabNavigator()

const HomePage = () => {
  const currentUser = useSelector((state) => state.currentUser)
  const navigation = useNavigation()

  // useEffect(() => {
  //   // Cette fonction sera exécutée lorsque currentUser change
  //   // navigation.navigate('MyProfile')
  // }, [currentUser, navigation])

  const handleCreate = () => {
    navigation.navigate('CreatePost')
  }

  const RedirectToProfileOrAuth = () => {
    if (currentUser) {
      return MyProfile
    } else {
      return Login
    }
  }

  const screenOptions = {
    headerShown: false
  }

  return (
    <Container>
      <Logo source={logo} />
      <BottomTab.Navigator initialRouteName="Home">
        <BottomTab.Screen name="Home" options={screenOptions} component={HomeTabs} />
        <BottomTab.Screen name="User" options={screenOptions} component={ProfileScreen} />
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

const CommunityContainer = styled.TouchableOpacity`
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: #d3d3d3;
`

const CommunityName = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`

const PostContainer = styled.TouchableOpacity`
  padding: 15px;
  border-bottom-width: 1px;
  border-bottom-color: #d3d3d3;
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
  shadow-offset: {
    width: 0;
    height: 2;
  }
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
`

const CreateButtonText = styled.Text`
  color: #ffffff;
  font-size: 32px;
  font-weight: bold;
`

const SearchBar = styled.TextInput`
  height: 40px;
  border-color: gray;
  border-width: 1px;
`

export default HomePage
