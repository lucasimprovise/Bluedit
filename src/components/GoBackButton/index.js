import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import React from 'react';
import { View } from 'react-native';

const GoBackButton = () => {
  const navigation = useNavigation();

  return (
    <View>
      <BackButton onPress={() => navigation.goBack()}>
        <BackButtonText>{`< Retour`}</BackButtonText>
      </BackButton>
    </View>
  );
};

const BackButton = styled.TouchableOpacity`
  margin-top: 16px;
  margin-bottom: 24px;
`;

const BackButtonText = styled.Text`
  font-size: 18px;
  color: #333;
`;

export default GoBackButton;
