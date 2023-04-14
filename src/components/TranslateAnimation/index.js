import React, { useState, useEffect } from 'react'
import { Animated, Easing } from 'react-native'
import styled from 'styled-components/native'

const TranslateAnimation = ({ children, duration = 1000, delay = 0, fromLeft = true }) => {
  const [animation] = useState(new Animated.Value(0))

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration,
      delay,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true
    }).start()
  }, [])

  const Wrapper = styled(Animated.View)`
  `

  return (
    <Wrapper
      // /!\ Ne pas mettre 0 pour cette fraude de style inline, 
      // on (Aubin et toi) s'est mis d'accord pour dire que c'était pas grave pour les animations de mettre comme ça
      style={{
        transform: [
          {
            translateX: animation.interpolate({
              inputRange: [0, 1],
              outputRange: fromLeft ? [parseInt('-300%'), parseInt('0%')] : [parseInt('300%'), parseInt('0%')]
            })
          }
        ]
      }}
      fromLeft={fromLeft}>
      {children}
    </Wrapper>
  )
}

export default TranslateAnimation
