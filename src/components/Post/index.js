import React from 'react'
import styled from 'styled-components/native'
import { useTranslation } from 'react-i18next'

const Post = ({ title, upvotes, downvotes, comments }) => {
  const { t } = useTranslation()

  return (
    <PostContainer>
      <PostTitle>{title}</PostTitle>
      <PostVotes>
        <PostUpvotes>+{upvotes}</PostUpvotes>
        <PostDownvotes>-{downvotes}</PostDownvotes>
      </PostVotes>
      <PostComments>
        {comments.length} {t('comments')}
      </PostComments>
    </PostContainer>
  )
}

const PostContainer = styled.View`
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #e6e6e6;
`

const PostTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
`

const PostVotes = styled.View`
  flex-direction: row;
  gap: 8px;
  margin-bottom: 4px;
`

const PostUpvotes = styled.Text`
  font-size: 14px;
  color: #3a3;
`

const PostDownvotes = styled.Text`
  font-size: 14px;
  color: #a33;
`

const PostComments = styled.Text`
  font-size: 12px;
  color: #999;
`

export default Post
