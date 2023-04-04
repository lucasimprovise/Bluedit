import React, { createContext, useMemo, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Provider } from 'react-redux'
import HomePage from './src/screens/HomePage'
import { store } from './src/store/store'
import CreatePostScreen from './src/screens/CreatePostScreen'
import MyProfile from './src/screens/MyProfile'
import Login from './src/screens/Login'
import Register from './src/screens/Register'
import Settings from './src/screens/Settings'
import './src/config/translation'

const Stack = createStackNavigator()

const screenOptions = {
  headerShown: false
}

export const AppContext = createContext()

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const appContextValue = useMemo(
    () => ({
      isSignedIn,
      setIsSignedIn
    }),
    [isSignedIn]
  )

  return (
    <AppContext.Provider value={appContextValue}>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} options={screenOptions} />
            <Stack.Screen name="Register" component={Register} options={screenOptions} />

            {isSignedIn && (
              <>
                <Stack.Screen name="HomePage" component={HomePage} options={screenOptions} />
                <Stack.Screen name="Settings" component={Settings} options={screenOptions} />
                <Stack.Screen name="CreatePostScreen" component={CreatePostScreen} options={screenOptions} />
                <Stack.Screen name="MyProfile" component={MyProfile} options={screenOptions} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </AppContext.Provider>
  )
}

export default App
