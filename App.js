import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import HomePage from './src/screens/HomePage'
import MyProfile from './src/screens/MyProfile'
import Authentication from './src/screens/Authentication'

const Stack = createStackNavigator()

const screenOptions = {
  headerShown: false
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomePage" component={HomePage} options={screenOptions} />
        <Stack.Screen name="MyProfile" component={MyProfile} options={screenOptions} />
        <Stack.Screen name="Authentication" component={Authentication} options={screenOptions} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
