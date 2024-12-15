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

const { width } = Dimensions.get("window");

const videos = [
  {
    id: "1",
    thumbnail: "https://via.placeholder.com/150",
  },
  {
    id: "2",
    thumbnail: "https://via.placeholder.com/150",
  },
  {
    id: "3",
    thumbnail: "https://via.placeholder.com/150",
  },
  {
    id: "4",
    thumbnail: "https://via.placeholder.com/150",
  },
  {
    id: "5",
    thumbnail: "https://via.placeholder.com/150",
  },
];

export default function ProfilePage() {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = () => setIsFollowing(!isFollowing);

  const renderVideoItem = ({ item }) => (
    <TouchableOpacity style={styles.videoItem}>
      <Image source={{ uri: item.thumbnail }} style={styles.videoThumbnail} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={28} color="black" />
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500",
          }}
          style={styles.avatar}
        />
        <Text style={styles.username}>Boediono Siregar</Text>
        <Text style={styles.bio}>I Hate Code</Text>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>120</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>5.4K</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>15.2K</Text>
            <Text style={styles.statLabel}>Likes</Text>
          </View>
        </View>

        {/* Follow/Message Button */}
        <TouchableOpacity
          style={[
            styles.followButton,
            { backgroundColor: isFollowing ? "white" : "#F72C5B" },
          ]}
          onPress={handleFollow}
        >
          <Text
            style={{
              color: isFollowing ? "black" : "white",
              fontWeight: "600",
            }}
          >
            {isFollowing ? "Following" : "Follow"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Video Grid Section */}
      <FlatList
        data={videos}
        renderItem={renderVideoItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
        style={styles.videoGrid}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  profileSection: {
    alignItems: "center",
    padding: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#e6e6e6",
  },
  username: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 12,
  },
  bio: {
    fontSize: 14,
    color: "gray",
    textAlign: "center",
    marginTop: 8,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 16,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 16,
    fontWeight: "700",
  },
  statLabel: {
    fontSize: 14,
    color: "gray",
  },
  followButton: {
    marginTop: 16,
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "black",
  },
  videoGrid: {
    flex: 1,
    marginHorizontal: 2,
  },
  videoItem: {
    flex: 1,
    margin: 2,
    height: width / 3, // 1:1 aspect ratio
  },
  videoThumbnail: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
});
