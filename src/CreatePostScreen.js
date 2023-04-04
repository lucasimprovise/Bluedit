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

const CreatePostScreen = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

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
        console.log('Response = ', response.assets[0].base64);
        const uri = `data:image/jpeg;base64,${response.assets[0].base64}`;
        setImage(uri);
      }
    });
  };

  const handlePublish = () => {
    console.log('Title:', title);
    console.log('Content:', content);
    console.log('Image:', image);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />
      <Text style={styles.label}>Content</Text>
      <TextInput
        style={{
          ...styles.input,
          height: 200,
          textAlignVertical: 'top',
        }}
        value={content}
        onChangeText={setContent}
        multiline={true}
        numberOfLines={10}
      />
      {image ? (
        <Image style={styles.imagePreview} source={{uri: image}} />
      ) : null}
      <TouchableOpacity style={styles.button} onPress={handleImagePicker}>
        <Text style={styles.buttonText}>Add Image</Text>
      </TouchableOpacity>
      <Button title="Publish" onPress={handlePublish} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007aff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginTop: 20,
  },
});

export default CreatePostScreen;
