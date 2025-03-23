import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./AuthStack";
import AppNavigator from "./AppStack";
import { useSelector } from "react-redux";
import { RootState } from "../store";
// import { RootState } from "../store";

const AppNavigation = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigation;
