import React, { useState } from 'react'
import styled from 'styled-components/native'
import Post from '../Post'
import { useTranslation } from 'react-i18next'

const HistoryScreen = () => {
  const { t } = useTranslation()

  const [userHistory, setUserHistory] = useState([
    {
      id: '1',
      action: 'comment',
      commentId: '1',
      postId: '1',
      communityId: '1'
    },
    {
      id: '2',
      action: 'upvote',
      postId: '1',
      commentId: null,
      communityId: '1'
    },
    {
      id: '3',
      action: 'downvote',
      postId: '1',
      commentId: '1',
      communityId: '1'
    }
  ])
  const [posts, setPosts] = useState([
    {
      id: '1',
      title: 'React Native vs Flutter',
      communityId: '1',
      comments: [
        {
          id: '1',
          content: 'React Native est plus simple à apprendre',
          userId: '1',
          postId: '1',
          date: '2020-12-12'
        }
      ],
      upvotes: 23,
      downvotes: 12
    }
  ])

  const actions = {
    comment: t('actions.comment'),
    post: t('actions.post'),
    upvote: t('actions.upvote'),
    downvote: t('actions.downvote'),
    create: t('actions.create'),
    join: t('actions.join')
  }

  return (
    <HistoryList
      data={userHistory}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        const post = posts.find((post) => post.id === item.postId)
        const comment = post.comments.find((comment) => comment.id === item.commentId)
        const isSubjectPost = ['comment', 'upvote', 'downvote'].includes(item.action)

        return (
          <HistoryItemContainer>
            <HistoryItemAction>
              {actions[item.action]}
              {(item.action == 'upvote' || item.action == 'downvote') && item.commentId && ` ${t('the_comment')} "${post.title}"`}
            </HistoryItemAction>

            {comment && <HistoryItemDetails>"{comment?.content}"</HistoryItemDetails>}
            {isSubjectPost && <Post {...post}></Post>}
          </HistoryItemContainer>
        )
      }}
    />
  )
}

const HistoryList = styled.FlatList`
  padding-top: 16px;
  background-color: #ffffff;
`

const HistoryItemContainer = styled.View`
  background-color: #fff;
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 8px;
  border: 1px solid #e6e6e6;
`

const HistoryItemAction = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
`

const HistoryItemDetails = styled.Text`
  font-size: 14px;
  color: #999;
  margin-bottom: 8px;
`

export default HistoryScreen
