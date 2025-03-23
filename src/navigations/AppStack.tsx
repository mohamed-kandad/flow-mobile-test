import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Map from "../pages/Map";
import { ROUTE_NAVIGATION } from "../type/navigation";

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={ROUTE_NAVIGATION.MAP} component={Map} />
    </Stack.Navigator>
  );
};

export default AppStack;
