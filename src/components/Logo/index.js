import React from 'react'
import styled from 'styled-components/native'

const Logo = ({ size = 100 }) => {
  return <LogoContainer size={size} source={require('../../assets/bluedit-logo.png')} />
}

const LogoContainer = styled.Image`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`

export default Logo
