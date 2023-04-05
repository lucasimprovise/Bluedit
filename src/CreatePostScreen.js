import React, {useState} from 'react';
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
import {launchImageLibrary} from 'react-native-image-picker';
import styled from 'styled-components/native';
import {useDispatch} from 'react-redux';

import storage from '@react-native-firebase/storage';

const Container = styled.ScrollView`
  flex: 1;
  padding: 20px;
`;

const Label = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Input = styled.TextInput`
  border-width: 1px;
  border-color: #ccc;
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
  background-color: #007aff;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const AddImageButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;

const CreatePostScreen = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const dispatch = useDispatch();

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
    console.log('Title:', title);
    console.log('Content:', content);
    // console.log('Image:', image);

    const fileName = `post-images/${Date.now()}.jpg`;
    const reference = storage().ref(fileName);

    const task = reference.putString(image, 'data_url');
    const snapshot = await task;

    try {
      const url = await storage().ref(fileName).getDownloadURL();

      dispatch({
        type: 'CREATE_POST',
        post: {
          title,
          content,
          image: url,
        },
      });
    } catch (e) {
      console.log(e);
    }

    //clear the form

    setTitle('');
    setContent('');
    setImage(null);
  };

  return (
    <Container>
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
      {image ? <ImagePreview source={{uri: image}} /> : null}
      <AddImageButton onPress={handleImagePicker}>
        <AddImageButtonText>Add Image</AddImageButtonText>
      </AddImageButton>
      <Button title="Publish" onPress={handlePublish} />
    </Container>
  );
};

export default CreatePostScreen;
