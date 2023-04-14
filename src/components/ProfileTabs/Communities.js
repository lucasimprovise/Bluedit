import React, { useState } from 'react'
import styled from 'styled-components/native'
import TranslateAnimation from '../TranslateAnimation'

const CommunitiesScreen = (props) => {
  const [userCommunities, setUserCommunities] = useState([
    { id: '1', name: 'r/ReactNative', description: 'A subreddit for React Native' },
    { id: '2', name: 'r/JavaScript', description: 'A subreddit for JavaScript' },
    { id: '3', name: 'r/Python', description: 'A subreddit for Python' }
  ])

  return (
    <Container>
      {props.navigation?.isFocused() && (
        <CommunitiesList
          data={userCommunities}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <TranslateAnimation delay={200 * index} duration={500}>
              <CommunityContainer>
                <CommunityName>{item.name}</CommunityName>
                <CommunityDescription>{item.description}</CommunityDescription>
              </CommunityContainer>
            </TranslateAnimation>
          )}
        />
      )}
    </Container>
  )
}

const Container = styled.View``

const CommunitiesList = styled.FlatList`
  padding-top: 16px;
  background-color: #ffffff;
`

const CommunityContainer = styled.View`
  background-color: #fff;
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 8px;
  border: 1px solid #e6e6e6;
`

const CommunityName = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
`

const CommunityDescription = styled.Text`
  font-size: 14px;
  color: #999;
  margin-bottom: 8px;
`

export default CommunitiesScreen
