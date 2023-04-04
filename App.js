import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Authentication from './src/Authentication'
import { Provider } from 'react-redux'
import HomePage from './src/HomePage'
import { store } from './src/store/store'
import CreatePostScreen from './src/CreatePostScreen'
import MyProfile from './src/screens/MyProfile'
import Login from './src/screens/Login'
import Register from './src/screens/Register'

const Stack = createStackNavigator()

const screenOptions = {
  headerShown: false
}

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Authentication" component={Authentication} options={screenOptions} />
          <Stack.Screen name="HomePage" component={HomePage} options={screenOptions} />
          <Stack.Screen name="Settings" component={Settings} options={screenOptions} />
          <Stack.Screen name="CreatePostScreen" component={CreatePostScreen} options={screenOptions} />
          <Stack.Screen name="MyProfile" component={MyProfile} options={screenOptions} />
          <Stack.Screen name="Register" component={Register} options={screenOptions} />
          <Stack.Screen name="Login" component={Login} options={screenOptions} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App
