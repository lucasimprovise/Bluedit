import React from 'react';
import { View, Text, Image } from 'react-native';
import styled from 'styled-components/native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const PostDetailScreen = ({ route }) => {
  const { postId } = route.params;
  const navigation = useNavigation();

  const { title, community, imageURL, upVotes, downVotes, content } =
    useSelector(state => state.post.posts.find(post => post.id === postId));

  if (!title) return <Text>Loading...</Text>;

  return (
    <Container>
      <BackButton onPress={() => navigation.goBack()}>
        <BackButtonText>{'< Retour'}</BackButtonText>
      </BackButton>
      {imageURL && <PostImage source={{ uri: imageURL }} />}
      <Title>{title}</Title>
      <Community>b/{community}</Community>
      <Content>{content}</Content>
      <VotesContainer>
        <UpVotes>Up : {upVotes}</UpVotes>
        <DownVotes>Down : {downVotes}</DownVotes>
      </VotesContainer>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 16px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-top: 16px;
`;

const BackButton = styled.TouchableOpacity`
  margin-top: 16px;
`;

const BackButtonText = styled.Text`
  font-size: 18px;
  color: #333;
`;

const Community = styled.Text`
  font-size: 18px;
  color: #888;
  margin-top: 8px;
`;

const PostImage = styled.Image`
  height: 200px;
  width: 100%;
  margin-top: 16px;
`;

const Content = styled.Text`
  font-size: 16px;
  margin-top: 16px;
`;

const VotesContainer = styled.View`
  flex-direction: row;
  margin-top: 16px;
`;

const UpVotes = styled.Text`
  font-size: 18px;
  color: green;
  margin-right: 8px;
`;

const DownVotes = styled.Text`
  font-size: 18px;
  color: red;
`;

export default PostDetailScreen;
