import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../pages/Login";
import { ROUTE_NAVIGATION } from "../type/navigation";

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={ROUTE_NAVIGATION.LOGIN} component={Login} />
    </Stack.Navigator>
  );
};

export default AuthStack;
