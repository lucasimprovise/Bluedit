import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useSelector } from 'react-redux';
import { $CombinedState } from 'redux';

const UserRedirect = ({ navigation }) => {
  // Utilisez useSelector pour accéder à l'état d'authentification
  const isAuthenticated = useSelector(state => state.auth.user?.uid);

  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate('MyProfile');
    } else {
      navigation.navigate('Login');
    }
  }, [isAuthenticated, navigation]);

  return (
    <SpinnerContainer>
      <ActivityIndicator size='large' color='#0000ff' />
    </SpinnerContainer>
  );
};

const SpinnerContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default UserRedirect;
