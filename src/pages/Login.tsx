import React, { useEffect, useState } from "react";
import { View, Text, Alert, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Checkbox from "expo-checkbox";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";

import CommonInput from "../components/common/CommonInput";
import CommotButton from "../components/common/CommonButton";

import { login } from "../feature/authSlice";
import { authInitialForm, authValidationSchema } from "../form/formik";

const Login = () => {
  const [isRememberMe, setIsRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: authInitialForm,
    validationSchema: authValidationSchema,
    onSubmit: (values) => {
      setIsLoading(true);
      if (values.phone === "12345678" && values.password === "1234") {
        if (isRememberMe)
          AsyncStorage.setItem(
            "rememberMe",
            JSON.stringify({
              phone: values.phone,
              password: values.password,
              countryCode: values.countryCode,
            })
          );

        setTimeout(() => {
          dispatch(login({ phone: values.phone }));
          setIsLoading(false);
        }, 3000);
      } else {
        setTimeout(() => {
          Alert.alert(
            "Error",
            "Invalid phone number or password, phone number is 12345678 and password is 1234"
          );
          setIsLoading(false);
        }, 3000);
      }
    },
  });

  const getUserRememberMe = async () => {
    const user = await AsyncStorage.getItem("rememberMe");
    if (user) formik.setValues(JSON.parse(user));
  };

  useEffect(() => {
    getUserRememberMe();
  }, []);

  return (
    <View style={styles.container}>
      <CommonInput
        placeholder="Country Code"
        value={formik.values.countryCode}
        error={
          formik.errors.countryCode !== undefined && formik.touched.countryCode
        }
        onChangeText={formik.handleChange("countryCode")}
      />
      <CommonInput
        placeholder="Phone"
        value={formik.values.phone}
        error={formik.errors.phone !== undefined && formik.touched.phone}
        onChangeText={formik.handleChange("phone")}
      />
      <CommonInput
        placeholder="Password"
        value={formik.values.password}
        error={formik.errors.password !== undefined && formik.touched.password}
        onChangeText={formik.handleChange("password")}
        secureTextEntry
      />
      <View>
        <View style={styles.section}>
          <Checkbox
            style={styles.checkbox}
            value={isRememberMe}
            onValueChange={setIsRememberMe}
          />
          <Text style={styles.paragraph}>Remember me</Text>
        </View>
      </View>
      <CommotButton
        onPress={formik.handleSubmit}
        title="Login"
        isLoading={isLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center", gap: 20 },
  label: { fontSize: 16, fontWeight: "bold", marginTop: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  error: { color: "red", fontSize: 12, marginBottom: 5 },
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
  },
});

export default Login;
