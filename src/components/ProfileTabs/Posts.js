import React, { useState } from 'react'
import styled from 'styled-components/native'
import Post from '../Post'

const PostsScreen = () => {
  const [userPosts, setUserPosts] = useState([
    {
      title: 'Quelle est votre canne à pêche favorite ?',
      content:
        'Salut les gars je suis un amateur de pêche en eau douce et je voudrais vraiment savoir quelle est selon vous la CAPOAT (canne à pêche of all time) ?',
      upvotes: 23,
      downvotes: 12,
      id: '1',
      date: '2020-12-12',
      comments: ['je dis pas', "c'est la mienne", 'ferme là']
    },
    {
      title: 'Les différents types de pêches en eau douce',
      content:
        'Salut les gars je suis un amateur de pêche en eau douce et je voudrais vraiment savoir quelle est selon vous la CAPOAT (canne à pêche of all time) ?',
      upvotes: 23,
      downvotes: 12,
      id: '2',
      date: '2020-12-12',
      comments: ['je dis pas', "c'est la mienne", 'ferme là']
    },
    {
      title: 'Les différents types de pêches en eau douce',
      content:
        'Salut les gars je suis un amateur de pêche en eau douce et je voudrais vraiment savoir quelle est selon vous la CAPOAT (canne à pêche of all time) ?',
      upvotes: 23,
      downvotes: 12,
      id: '3',
      date: '2020-12-12',
      comments: ['je dis pas', "c'est la mienne", 'ferme là']
    },
    {
      title: 'Les différents types de pêches en eau douce',
      content:
        'Salut les gars je suis un amateur de pêche en eau douce et je voudrais vraiment savoir quelle est selon vous la CAPOAT (canne à pêche of all time) ?',
      upvotes: 23,
      downvotes: 12,
      id: '4',
      date: '2020-12-12',
      comments: ['je dis pas', "c'est la mienne", 'ferme là']
    },
    {
      title: 'Les différents types de pêches en eau douce',
      content:
        'Salut les gars je suis un amateur de pêche en eau douce et je voudrais vraiment savoir quelle est selon vous la CAPOAT (canne à pêche of all time) ?',
      upvotes: 23,
      downvotes: 12,
      id: '5',
      date: '2020-12-12',
      comments: ['je dis pas', "c'est la mienne", 'ferme là']
    }
  ])

  return (
    <PostsList
      data={userPosts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <PostContainer>
          <Post {...item}></Post>
        </PostContainer>
      )}
    />
  )
}

const PostsList = styled.FlatList`
  padding-top: 16px;
  background-color: #ffffff;
`

const PostContainer = styled.View`
  margin-bottom: 16px;
`

export default PostsScreen
