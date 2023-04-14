import React, { useState } from 'react'
import { launchImageLibrary } from 'react-native-image-picker'
import styled from 'styled-components/native'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'

import storage from '@react-native-firebase/storage'
import { createPostRequest } from '../../store/actions/post'
import { User } from '../../models/User'
import { Post } from '../../models/Post'

const Container = styled.ScrollView`
  flex: 1;
  padding: 20px;
  padding-bottom: 50px;
`

const BackButton = styled.TouchableOpacity`
  margin-top: 16px;
  margin-bottom: 24px;
`

const BackButtonText = styled.Text`
  font-size: 18px;
  color: #333;
`

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`

const Label = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`

const Input = styled.TextInput`
  border-width: 1px;
  border-color: #ccc;
  padding: 10px;
  margin-bottom: 20px;
`

const ImagePreview = styled.Image`
  width: 100%;
  height: 200px;
  resize-mode: contain;
  margin-top: 20px;
  margin-bottom: 20px;
`

const AddImageButton = styled.TouchableOpacity`
  background-color: #fff;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
`

const AddImageButtonText = styled.Text`
  color: #007aff;
  font-size: 18px;
  text-align: center;
`

const PublishButton = styled.TouchableOpacity`
  background-color: #007aff;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 48px;
`

const PublishButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`

const LargeInput = styled.TextInput`
  height: 200px;
  text-align-vertical: top;
`

const CreatePostScreen = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState(null)
  const [community, setCommunity] = useState('')

  const dispatch = useDispatch()
  const navigation = useNavigation()

  const auth = useSelector((state) => state.auth)

  const handleImagePicker = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 500,
      quality: 1,
      includeBase64: true
    }

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else {
        const uri = `data:image/jpeg;base64,${response.assets[0].base64}`
        setImage(uri)
      }
    })
  }

  const handlePublish = async () => {
    const fileName = `post-images/${Date.now()}.jpg`
    const reference = storage().ref(fileName)

    const task = reference.putString(image, 'data_url')
    const snapshot = await task

    try {
      const url = await storage().ref(fileName).getDownloadURL()

      dispatch(
        createPostRequest({
          title,
          content,
          imageURL: url,
          upVotes: 0,
          downVotes: 0,
          date: new Date(),
          community: community.substring(2)
        })
      )

      navigation.navigate('HomePage')
    } catch (e) {
      console.log(e)
    }

    //clear the form

    setTitle('')
    setContent('')
    setCommunity('')
    setImage(null)
  }

  return (
    <Container>
      <BackButton onPress={() => navigation.goBack()}>
        <BackButtonText>{`< Retour`}</BackButtonText>
      </BackButton>

      <Title>Create Post</Title>
      <Label>Community</Label>
      <Input
        //value community
        //if no community, then b/
        value={community.startsWith('b/') ? community : 'b/'}
        onChangeText={(e) => {
          // make a reddit community name like b/CommunityName
          // so that we can search for it in the future
          // remove the b/ if exists
          if (e.startsWith('b/')) {
            e = e.substring(2)
          }

          setCommunity('b/' + e)
        }}
      />
      <Label>Title</Label>
      <Input value={title} onChangeText={setTitle} />
      <Label>Content</Label>
      <LargeInput
        value={content}
        onChangeText={setContent}
        multiline={true}
        numberOfLines={10}
      />
      {image ? <ImagePreview source={{ uri: image }} /> : null}
      <AddImageButton onPress={handleImagePicker}>
        <AddImageButtonText>{image ? 'Change Image' : 'Add Image'}</AddImageButtonText>
      </AddImageButton>
      <PublishButton onPress={handlePublish}>
        <PublishButtonText>Publish</PublishButtonText>
      </PublishButton>
    </Container>
  )
}

export default CreatePostScreen
