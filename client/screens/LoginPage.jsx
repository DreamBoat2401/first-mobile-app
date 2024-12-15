import React, { useEffect, useState } from "react";
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
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import { DO_LOGIN } from "../queries";
import { useMutation } from "@apollo/client";

export default function LoginPage() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState(SecureStore.getItem("token"));
  const [loginFn, { loading, error, data }] = useMutation(DO_LOGIN);

  const navigation = useNavigation();

  useEffect(() => {
    if (token) {
      navigation.replace("HomePage");
    }
  }, [token]);

  useEffect(() => {
    if (data) {
      SecureStore.setItemAsync("token", data.login.token);
      setToken(data.login.token);
    }
  }, [data]);

  const onPressLogin = () => {
    if (!input.email || !input.password) {
      console.error("Email atau password tidak boleh kosong");
      return;
    }

    loginFn({
      variables: {
        user: {
          email: input.email,
          password: input.password,
        },
      },
    });
  };

  const handleRegister = () => {
    navigation.navigate("RegisterPage");
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
          <View style={{ marginBottom: 40, alignItems: "center" }}>
            <Text style={{ fontSize: 32, fontWeight: "bold", color: "black" }}>
              Welcome Back
            </Text>
            <Text style={{ fontSize: 16, color: "gray", marginTop: 8 }}>
              Log in to your account
            </Text>
          </View>

          <View style={{ width: "100%", marginBottom: 20 }}>
            <TextInput
              value={input.email}
              onChangeText={(email) =>
                setInput({
                  ...input,
                  email: email,
                })
              }
              placeholder="Email or username"
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
                  setInput({
                    ...input,
                    password: password,
                  })
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

          <Pressable
            style={{
              backgroundColor: "#F72C5B",
              width: "100%",
              padding: 16,
              borderRadius: 8,
              alignItems: "center",
            }}
            onPress={onPressLogin}
          >
            <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
              Log In
            </Text>
          </Pressable>

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

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ color: "gray", fontSize: 14 }}>
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={handleRegister}>
              <Text
                style={{
                  color: "#F72C5B",
                  fontSize: 14,
                  fontWeight: "500",
                  marginLeft: 4,
                }}
              >
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
