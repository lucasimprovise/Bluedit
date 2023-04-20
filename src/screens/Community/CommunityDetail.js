import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import GoBackButton from '../../components/GoBackButton';

const CommunityDetailScreen = ({ route }) => {
  const { communityName } = route.params;
  const navigation = useNavigation();

  const posts = useSelector(state =>
    state.post.posts.filter(post => {
      if (post.community === communityName) {
        return post;
      }
    })
  );

  return (
    <Container>
      <GoBackButton />
      <Title>
        {posts.length} posts in b/{communityName}
      </Title>
      <View>
        {posts.length > 0 ? (
          <FlatList
            data={posts}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <PostContainer
                onPress={() => {
                  navigation.navigate('PostDetail', { postId: item.id });
                }}
              >
                <PostTitle>{item.title}</PostTitle>
                <PostDetails>
                  b/{item.community} - Posted by u/{item?.author}
                </PostDetails>
                <PostUpvotes>Upvotes: {item.upVotes}</PostUpvotes>
              </PostContainer>
            )}
          />
        ) : (
          <Text>Aucun post disponible pour cette communauté</Text>
        )}
      </View>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 32px 16px;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const PostContainer = styled.TouchableOpacity`
  padding: 15px;
  border-bottom-width: 1px;
  border-bottom-color: #d3d3d3;
`;

const PostTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #333;
`;

const PostDetails = styled.Text`
  font-size: 14px;
  color: #888;
  margin-top: 5px;
`;

const PostUpvotes = styled.Text`
  font-size: 16px;
  color: #333;
  margin-top: 10px;
`;

export default CommunityDetailScreen;
