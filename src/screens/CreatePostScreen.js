import React, { useState } from 'react'
import { launchImageLibrary } from 'react-native-image-picker'

const CreatePostScreen = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState(null)

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
        console.log('Response = ', response.assets[0].base64)
        const uri = `data:image/jpeg;base64,${response.assets[0].base64}`
        setImage(uri)
      }
    })
  }

  const handlePublish = () => {
    console.log('Title:', title)
    console.log('Content:', content)
    console.log('Image:', image)
  }

  return (
    <Container>
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
      <Button onPress={handleImagePicker}>
        <ButtonText>Add Image</ButtonText>
      </Button>
      <Button title="Publish" onPress={handlePublish} />
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
  padding: 20px;
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

const LargeInput = styled.TextInput`
  border-width: 1px;
  border-color: #ccc;
  padding: 10px;
  margin-bottom: 20px;
  height: 200px;
  text-align-vertical: top;
`

const Button = styled.TouchableOpacity`
  background-color: #007aff;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
`

const ButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`

const ImagePreview = styled.Image`
  width: 100%;
  height: 200px;
  resize-mode: contain;
  margin-top: 20px;
`

export default CreatePostScreen
