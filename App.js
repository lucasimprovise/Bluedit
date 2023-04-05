import MyProfile from './src/screens/MyProfile';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import HomePage from './src/screens/HomePage';
import { store } from './src/store/store';
import CreatePostScreen from './src/screens/Post/CreatePostScreen';
import PostDetailScreen from './src/screens/Post/PostDetailScreen';

const Stack = createStackNavigator();

const screenOptions = {
  headerShown: false,
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='HomePage'
            component={HomePage}
            options={screenOptions}
          />
          <Stack.Screen
            name='MyProfile'
            component={MyProfile}
            options={screenOptions}
          />
          <Stack.Screen
            name='Register'
            component={Register}
            options={screenOptions}
          />
          <Stack.Screen
            name='Login'
            component={Login}
            options={screenOptions}
          />
          <Stack.Screen
            name='CreatePost'
            component={CreatePostScreen}
            options={screenOptions}
          />
          <Stack.Screen
            name='PostDetail'
            component={PostDetailScreen}
            options={screenOptions}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
