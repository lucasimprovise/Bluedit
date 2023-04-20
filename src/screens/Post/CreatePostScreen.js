import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { LogBox } from 'react-native';

import { launchImageLibrary } from 'react-native-image-picker';
import styled from 'styled-components/native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Autocomplete from 'react-native-autocomplete-input';

import storage from '@react-native-firebase/storage';
import { createPostRequest } from '../../store/actions/post';
import { User } from '../../models/User';
import { Post } from '../../models/Post';

const Container = styled.SafeAreaView``;

const ScrollContainer = styled.ScrollView`
  flex: 1;
  padding: 20px;
  padding-bottom: 50px;
`;

const BackButton = styled.TouchableOpacity`
  margin-top: 16px;
  margin-bottom: 24px;
`;

const BackButtonText = styled.Text`
  font-size: 18px;
  color: #333;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Label = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Input = styled.TextInput`
  border-width: 1px;
  border-color: #ccc;
  background-color: white;
  padding: 10px;
  margin-bottom: 20px;
`;

const ImagePreview = styled.Image`
  width: 100%;
  height: 200px;
  resize-mode: contain;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const AddImageButton = styled.TouchableOpacity`
  background-color: #fff;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const AddImageButtonText = styled.Text`
  color: #007aff;
  font-size: 18px;
  text-align: center;
`;

const PublishButton = styled.TouchableOpacity`
  background-color: #007aff;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 48px;
`;

const PublishButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;

const communities = [
  'b/React',
  'b/React Native',
  'b/Svelte',
  'b/Football',
  'b/Sports',
  'b/LeagueOfLegends',
  'b/History',
  'b/Car',
];

const CreatePostScreen = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [community, setCommunity] = useState('');

  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  const auth = useSelector(state => state.auth);

  const handleImagePicker = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 500,
      quality: 1,
      includeBase64: true,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const uri = `data:image/jpeg;base64,${response.assets[0].base64}`;
        setImage(uri);
      }
    });
  };

  const handlePublish = async () => {
    let url = '';
    if (image) {
      const fileName = `post-images/${Date.now()}.jpg`;
      const reference = storage().ref(fileName);

      const task = reference.putString(image, 'data_url');
      const snapshot = await task;

      try {
        url = await storage().ref(fileName).getDownloadURL();
      } catch (e) {
        console.log(e);
      }
    }

    try {
      dispatch(
        createPostRequest({
          title,
          content,
          imageURL: url || '',
          upVotes: 0,
          downVotes: 0,
          date: new Date(),
          community: community.substring(2),
        })
      );

      navigation.navigate('HomePage');
    } catch (e) {
      console.log(e);
    }

    //clear the form

    setTitle('');
    setContent('');
    setCommunity('');
    setImage(null);
  };

  const suggestions = useMemo(() => {
    if (!community) {
      return communities;
    }

    return communities.filter(c => {
      if (c.includes(community)) {
        return c;
      }
    });
  }, [community]);

  const [selected, setSelected] = useState(false);

  return (
    <ScrollContainer>
      <Container>
        <BackButton onPress={() => navigation.goBack()}>
          <BackButtonText>{`< Retour`}</BackButtonText>
        </BackButton>

        <Title>Create Post</Title>
        <Label>Community</Label>
        <Autocomplete
          data={suggestions}
          value={community.startsWith('b/') ? community : 'b/'}
          hideResults={selected}
          placeholder='Community'
          onChangeText={e => {
            setCommunity(e);
            setSelected(false);
          }}
          flatListProps={{
            keyExtractor: (_, idx) => idx,
            renderItem: ({ item }) => (
              <ScrollView>
                <TouchableOpacity
                  onPress={e => {
                    setCommunity(item);
                    setSelected(true);
                  }}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              </ScrollView>
            ),
          }}
        />

        <Label>Title</Label>
        <Input value={title} onChangeText={setTitle} />
        <Label>Content</Label>
        <Input
          style={{
            height: 200,
            textAlignVertical: 'top',
          }}
          value={content}
          onChangeText={setContent}
          multiline={true}
          numberOfLines={10}
        />
        {image ? <ImagePreview source={{ uri: image }} /> : null}
        <AddImageButton onPress={handleImagePicker}>
          <AddImageButtonText>
            {image ? 'Change Image' : 'Add Image'}
          </AddImageButtonText>
        </AddImageButton>
        <PublishButton onPress={handlePublish}>
          <PublishButtonText>Publish</PublishButtonText>
        </PublishButton>
      </Container>
    </ScrollContainer>
  );
};

export default CreatePostScreen;
