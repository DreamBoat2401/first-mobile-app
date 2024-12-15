import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // React Navigation
import { useMutation } from "@apollo/client";
import { Ionicons } from "@expo/vector-icons";
import { DO_REGISTER } from "../queries"; // Replace with your registration query

export default function RegisterPage() {
  const [input, setInput] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [registerFn, { loading, error }] = useMutation(DO_REGISTER);

  const navigation = useNavigation(); // React Navigation Hook

  const handleRegister = async () => {
    if (input.password !== input.confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    try {
      const response = await registerFn({
        variables: {
          newUser: {
            name: input.name,
            email: input.email,
            username: input.username,
            password: input.password,
          },
        },
      });

      if (response?.data?.register) {
        Alert.alert("Success", "Account created successfully!", [
          { text: "OK", onPress: () => navigation.navigate("LoginPage") },
        ]);
      }
    } catch (err) {
      console.error("Registration error:", err);
      Alert.alert("Error", "Failed to register. Please try again.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View
          style={{
            flex: 1,
            paddingHorizontal: 24,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Header */}
          <View style={{ marginBottom: 40, alignItems: "center" }}>
            <Text style={{ fontSize: 32, fontWeight: "bold", color: "black" }}>
              Create Account
            </Text>
            <Text style={{ fontSize: 16, color: "gray", marginTop: 8 }}>
              Sign up to get started
            </Text>
          </View>

          {/* Email Input */}
          <View style={{ width: "100%", marginBottom: 20 }}>
            <TextInput
              value={input.name}
              onChangeText={(name) =>
                setInput((prev) => ({ ...prev, name: name }))
              }
              placeholder="Name"
              placeholderTextColor="gray"
              style={{
                width: "100%",
                padding: 16,
                borderRadius: 8,
                borderColor: "#ddd",
                borderWidth: 1,
                backgroundColor: "#f9f9f9",
                fontSize: 16,
                color: "black",
              }}
              autoCapitalize="none"
            />
          </View>

          {/* Email Input */}
          <View style={{ width: "100%", marginBottom: 20 }}>
            <TextInput
              value={input.username}
              onChangeText={(username) =>
                setInput((prev) => ({ ...prev, username: username }))
              }
              placeholder="Username"
              placeholderTextColor="gray"
              style={{
                width: "100%",
                padding: 16,
                borderRadius: 8,
                borderColor: "#ddd",
                borderWidth: 1,
                backgroundColor: "#f9f9f9",
                fontSize: 16,
                color: "black",
              }}
              autoCapitalize="none"
            />
          </View>

          {/* Email Input */}
          <View style={{ width: "100%", marginBottom: 20 }}>
            <TextInput
              value={input.email}
              onChangeText={(email) =>
                setInput((prev) => ({ ...prev, email: email }))
              }
              placeholder="Email"
              placeholderTextColor="gray"
              style={{
                width: "100%",
                padding: 16,
                borderRadius: 8,
                borderColor: "#ddd",
                borderWidth: 1,
                backgroundColor: "#f9f9f9",
                fontSize: 16,
                color: "black",
              }}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          {/* Password Input */}
          <View style={{ width: "100%", marginBottom: 20 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#ddd",
                borderRadius: 8,
                backgroundColor: "#f9f9f9",
              }}
            >
              <TextInput
                value={input.password}
                onChangeText={(password) =>
                  setInput((prev) => ({ ...prev, password: password }))
                }
                placeholder="Password"
                placeholderTextColor="gray"
                secureTextEntry={!showPassword}
                style={{
                  flex: 1,
                  padding: 16,
                  fontSize: 16,
                  color: "black",
                }}
              />
              <Pressable
                onPress={() => setShowPassword(!showPassword)}
                style={{ paddingHorizontal: 16 }}
              >
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="gray"
                />
              </Pressable>
            </View>
          </View>

          {/* Confirm Password Input */}
          <View style={{ width: "100%", marginBottom: 20 }}>
            <TextInput
              value={input.confirmPassword}
              onChangeText={(confirmPassword) =>
                setInput((prev) => ({
                  ...prev,
                  confirmPassword: confirmPassword,
                }))
              }
              placeholder="Confirm Password"
              placeholderTextColor="gray"
              secureTextEntry={!showPassword}
              style={{
                width: "100%",
                padding: 16,
                borderRadius: 8,
                borderColor: "#ddd",
                borderWidth: 1,
                backgroundColor: "#f9f9f9",
                fontSize: 16,
                color: "black",
              }}
            />
          </View>

          {/* Register Button */}
          <Pressable
            style={{
              backgroundColor: "#F72C5B",
              width: "100%",
              padding: 16,
              borderRadius: 8,
              alignItems: "center",
            }}
            onPress={handleRegister}
          >
            <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
              Sign Up
            </Text>
          </Pressable>

          {/* Separator */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 24,
            }}
          >
            <View
              style={{
                height: 1,
                backgroundColor: "#ddd",
                flex: 1,
              }}
            />
            <Text style={{ marginHorizontal: 8, color: "gray" }}>OR</Text>
            <View
              style={{
                height: 1,
                backgroundColor: "#ddd",
                flex: 1,
              }}
            />
          </View>

          {/* Login Link */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ color: "gray", fontSize: 14 }}>
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("LoginPage")}>
              <Text
                style={{
                  color: "#F72C5B",
                  fontSize: 14,
                  fontWeight: "500",
                  marginLeft: 4,
                }}
              >
                Log in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
