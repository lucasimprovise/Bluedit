import logo from './../../assets/bluedit-logo.png'
import React, { useEffect } from 'react'
import styled from 'styled-components/native'

const SplashScreen = ({ navigation, isSignedIn }) => {
  useEffect(() => {
    setTimeout(() => {
      if (isSignedIn) navigation.replace('HomePage')
      else navigation.replace('Login')
    }, 2000)
  }, [])

  return (
    <LogoContainer>
      <Logo source={logo} />
    </LogoContainer>
  )
}

const Logo = styled.Image`
  width: 100px;
  height: 100px;
  margin: auto;
`
const LogoContainer = styled.View`
  height: 100%;
`

export default SplashScreen
