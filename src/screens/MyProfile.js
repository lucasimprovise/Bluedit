import React, { useState } from "react";
import styled from "styled-components/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PostsScreen from "../components/ProfileTabs/Posts";
import CommunitiesScreen from "../components/ProfileTabs/Communities";
import HistoryScreen from "../components/ProfileTabs/History";
import { useDispatch } from "react-redux";

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState({
    mail: "aubin@gmail.com",
    pseudo: "AubinLeThug",
    avatar: "https://i.imgur.com/8Km9tLL.png",
    bio: "Je suis un thug",
  });

  const [forumsCreated, setForumsCreated] = useState([
    {
      name: "Pêche en eau douce",
      description: "Tout sur la pêche en eau douce",
    },
  ]);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleEditProfile = () => {
    navigation.navigate("EditProfile");
  };

  const handleGoHome = () => {
    navigation.navigate("HomePage");
  };

  const TopTab = createBottomTabNavigator();

  return (
    <Container>
      <ProfileHeader>
        <User>
          <ProfileImage source={{ uri: user.avatar }} />
          <Pseudo>{user.pseudo}</Pseudo>
          <UserDescription>{user.bio}</UserDescription>
        </User>
        <ButtonContainer>
          <HomeButton onPress={handleGoHome}>
            <HomeButtonText>Accueil</HomeButtonText>
          </HomeButton>
          <EditProfileButton onPress={handleEditProfile}>
            <EditProfileButtonText>Modifier</EditProfileButtonText>
          </EditProfileButton>
        </ButtonContainer>
      </ProfileHeader>

      <TopTab.Navigator
        initialRouteName="Posts"
        screenOptions={{
          tabBarActiveTintColor: "#2f6de7",
          tabBarInactiveTintColor: "#000",
          tabBarStyle: {
            elevation: 0,
            width: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
          },
        }}
      >
        <TopTab.Screen name="Posts" component={PostsScreen} />
        <TopTab.Screen name="Communautés" component={CommunitiesScreen} />
        <TopTab.Screen name="Historique" component={HistoryScreen} />
      </TopTab.Navigator>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 10px;
  background-color: #ffffff;
`;

const ProfileHeader = styled.View`
  background-color: #2f6de7;
  margin-top: -16px;
  margin-left: -16px;
  margin-right: -16px;
  padding: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ProfileImage = styled.Image`
  width: 64px;
  height: 64px;
  border-radius: 32px;
  margin-right: 16px;
`;

const Pseudo = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #fff;
`;

const EditProfileButton = styled.TouchableOpacity`
  background-color: transparent;
  padding: 10px 20px;
  border-radius: 50px;
  border: 1px solid #ffffff;
  align-self: flex-start;
  margin-top: auto;
  margin-bottom: auto;
`;

const EditProfileButtonText = styled.Text`
  color: #ffffff;
  font-size: 16px;
`;

const User = styled.View`
  color: #000;
`;

const UserDescription = styled.Text`
  color: #fff;
`;

const HomeButton = styled.TouchableOpacity`
  background-color: transparent;
  padding: 10px 20px;
  border-radius: 50px;
  border: 1px solid #ffffff;
  align-self: flex-start;
  margin-top: auto;
  margin-bottom: auto;
`;

const HomeButtonText = styled.Text`
  color: #ffffff;
  font-size: 16px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 50%;
`;

export default ProfileScreen;
