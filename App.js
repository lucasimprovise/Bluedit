import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Authentication from './src/Authentication';
import {Provider} from 'react-redux';
import HomePage from './src/HomePage';
import {store} from './src/store/store';
import CreatePostScreen from './src/CreatePostScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Authentication" component={Authentication} />
          <Stack.Screen name="HomePage" component={HomePage} />
          <Stack.Screen name="CreatePostScreen" component={CreatePostScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
