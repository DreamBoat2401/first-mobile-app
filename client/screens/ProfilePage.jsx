import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { useQuery } from "@apollo/client";
import { GET_PROFILE } from "../queries";

const { width } = Dimensions.get("window");

export default function ProfilePage() {
  const navigation = useNavigation(); // Hook untuk navigasi

  const { loading, error, data } = useQuery(GET_PROFILE);
  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("token");
    navigation.navigate("LoginPage");
  };

  const renderProfileCard = () => {
    return (
      <>
        <View style={styles.profileCard}>
          <Text>Username: </Text>
          <Text>{data.getProfile.username}</Text>
        </View>
        <View style={styles.profileCard}>
          <Text>Name: </Text>
          <Text>{data.getProfile.name}</Text>
        </View>
        <View style={styles.profileCard}>
          <Text>Followers: </Text>
          <Text>{data.getProfile.Followers?.length}</Text>
        </View>
        <View style={styles.profileCard}>
          <Text>Following: </Text>
          <Text>{data.getProfile.Followings?.length}</Text>
        </View>
      </>
    );
  };

  if (loading) return;
  <View style={styles}>
    <Text>Loading ...</Text>
  </View>;
  if (error) console.log(error);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={28} color="black" />
      </View>

      <View style={styles.profileSection}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500",
          }}
          style={styles.avatar}
        />
        <Text style={styles.username}>{data.getProfile.username}</Text>
        <Text style={styles.name}>{data.getProfile.name}</Text>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {data.getProfile.Followings?.length}
            </Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {data.getProfile.Followers?.length}
            </Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {data.getProfile.Likes?.length}
            </Text>
            <Text style={styles.statLabel}>Likes</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={data.getProfile}
        renderItem={renderProfileCard}
        keyExtractor={(item) => item.id}
        numColumns={3}
        style={styles.videoGrid}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  header: { flexDirection: "row", alignItems: "center", padding: 16 },
  profileSection: { alignItems: "center", padding: 16 },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#e6e6e6",
  },
  username: { fontSize: 18, fontWeight: "700", marginTop: 12 },
  bio: { fontSize: 14, color: "gray", textAlign: "center", marginTop: 8 },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 16,
  },
  statItem: { alignItems: "center" },
  statNumber: { fontSize: 16, fontWeight: "700" },
  statLabel: { fontSize: 14, color: "gray" },
  logoutButton: {
    marginTop: 16,
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 24,
    backgroundColor: "#f2f2f2",
  },
  logoutText: { color: "#333", fontWeight: "600" },
  videoGrid: { flex: 1, marginHorizontal: 2 },
  videoItem: { flex: 1, margin: 2, height: width / 3 },
  videoThumbnail: { width: "100%", height: "100%", borderRadius: 8 },
});
