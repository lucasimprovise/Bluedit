import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useSelector } from "react-redux";

const UserRedirect = ({ navigation }) => {
  // Utilisez useSelector pour accéder à l'état d'authentification
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate("MyProfile");
    } else {
      navigation.navigate("Authentication");
    }
  }, [isAuthenticated, navigation]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

export default UserRedirect;
