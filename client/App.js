import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { client } from "./config/apollo.js";
import HomePage from "./screens/HomePage.jsx";
import LoginPage from "./screens/LoginPage.jsx";
import MainTab from "./screens/MainTab.jsx";
import { isSignIn } from "./hooks/isSignIn.js";
import { isSignOut } from "./hooks/isSignOut.js";
import RegisterPage from "./screens/RegisterPage.jsx";

const Stack = createNativeStackNavigator({
  screens: {
    LoginPage: {
      if: isSignOut,
      screen: LoginPage,
    },
    HomePage: {
      if: isSignIn,
      screen: HomePage,
    },
  },
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="LoginPage"
            component={LoginPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HomePage"
            component={MainTab}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RegisterPage"
            component={RegisterPage}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
