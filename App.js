import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Authentication from './src/Authentication';
import HomePage from './src/HomePage';
import MyProfile from './src/MyProfile';
import Authentication from './src/screens/Authentication';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Authentication" component={Authentication} />
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="MyProfile" component={MyProfile} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
