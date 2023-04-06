import React from 'react'
import styled from 'styled-components/native'
import { useTranslation } from 'react-i18next'
import { Share } from 'react-native'

const Post = ({ title, upvotes, upVotes, downvotes, downVotes, comments, id }) => {
  const { t } = useTranslation()

  const sharePost = async () => {
    try {
      const result = await Share.share({
        message: `${title}\n\nhttps://www.bluedit.com/posts/${id}`,
        url: `https://www.bluedit.com/posts/${id}`,
        title: 'Partager le post'
      })
      if (result.action === Share.sharedAction) {
        console.log('Content shared successfully')
      } else if (result.action === Share.dismissedAction) {
        console.log('Sharing was dismissed')
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <PostContainer>
      <PostTitle>{title}</PostTitle>
      <PostVotes>
        <PostUpvotes>+{upvotes || upVotes}</PostUpvotes>
        <PostDownvotes>-{downvotes || downVotes}</PostDownvotes>
      </PostVotes>
      <PostComments>
        {comments?.length || 0} {t('comments')}
      </PostComments>
      <ShareButton onPress={sharePost}>
        <ShareText>{t('share')}</ShareText>
      </ShareButton>
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

const ShareButton = styled.TouchableOpacity`
  width: 50px;
  background-color: #2f6de7;
  border-radius: 50px;
  position: absolute;
  right: 16px;
  bottom: 16px;
`

const ShareText = styled.Text`
  color: #fff;
  font-size: 12px;
  padding: 4px;
  text-align: center;
`

export default Post
