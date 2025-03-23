import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./AuthStack";
import AppNavigator from "./AppStack";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { ROUTE_NAVIGATION } from "../type/navigation";
import Login from "../pages/Login";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login } from "../feature/authSlice";
// import { RootState } from "../store";

const Stack = createStackNavigator();

const AppNavigation = () => {
  const authData = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const getUser = async () => {
    const user = await AsyncStorage.getItem("user");
    if (user) dispatch(login({ phone: user }));
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <NavigationContainer>
      {authData.isAuth ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigation;
