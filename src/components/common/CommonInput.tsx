// src/components/common/Input.tsx
import React from "react";
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TextInputProps,
} from "react-native";

interface InputProps extends TextInputProps {
  label?: string;
  error?: boolean;
  touched?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const CommonInput: React.FC<InputProps> = ({
  label,
  error,
  touched,
  leftIcon,
  rightIcon,
  style,
  ...props
}) => {
  return (
    <View style={[styles.container]}>
      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: "transparent",
            borderColor: "gray",
          },
          error && styles.errorInput,
        ]}
      >
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        <TextInput
          style={[
            styles.input,
            // leftIcon && styles.inputWithLeftIcon,
            // rightIcon && styles.inputWithRightIcon,
            style,
          ]}
          placeholderTextColor={"black"}
          {...props}
        />
        {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#484848",
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    // alignItems: 'center',
    borderWidth: 1,

    borderRadius: 10,
    minHeight: 56,
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  inputWithLeftIcon: {
    paddingLeft: 8,
  },
  inputWithRightIcon: {
    paddingRight: 8,
  },
  leftIcon: {
    paddingLeft: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  rightIcon: {
    paddingRight: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  errorInput: {
    borderColor: "#FF5A5F",
    borderWidth: 1,
  },
  errorText: {
    color: "#FF5A5F",
    fontSize: 12,
    marginTop: 4,
  },
});

export default CommonInput;
