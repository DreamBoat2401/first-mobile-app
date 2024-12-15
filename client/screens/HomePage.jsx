import React, { useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../queries";
import moment from "moment";

const { width, height: screenHeight } = Dimensions.get("window");

export default function HomePage() {
  const { loading, error, data } = useQuery(GET_POSTS);
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems[0] != null) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    console.error(error);
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Error loading posts.</Text>
      </View>
    );
  }

  const posts = data?.getPosts || [];

  const renderItem = ({ item }) => {
    const { content, imgUrl, comments, likes, createdAt } = item;

    return (
      <View style={styles.postContainer}>
        {imgUrl && (
          <Image
            source={{ uri: imgUrl }}
            style={styles.postMedia}
            resizeMode="cover"
          />
        )}

        <View style={styles.overlay}>
          {/* Post Details */}
          <View style={styles.captionContainer}>
            <Text style={styles.caption}>{content}</Text>
            <Text style={styles.postedDate}>
              Posted on {moment(createdAt).format("DD MMM 'YY")}
            </Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => console.log("Like Pressed")}
            >
              <FontAwesome name="heart" size={24} color="white" />
              <Text style={styles.actionText}>{likes?.length}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => console.log("Comment Pressed")}
            >
              <FontAwesome5 name="comment" size={22} color="white" />
              <Text style={styles.actionText}>{comments?.length}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
        snapToAlignment="start"
        decelerationRate="fast"
        contentContainerStyle={{
          paddingBottom: 80, // Tambahkan padding agar konten tidak tertutup tab bar
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  postContainer: {
    width,
    height: screenHeight,
    position: "relative",
  },
  postMedia: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    bottom: 20,
    left: 10,
    right: 10,
  },
  captionContainer: {
    marginBottom: 15,
  },
  caption: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  postedDate: {
    color: "white",
    fontSize: 14,
    opacity: 0.8,
  },
  actionButtons: {
    position: "absolute",
    right: 10,
    bottom: 50,
    alignItems: "center",
  },
  actionButton: {
    marginBottom: 20,
    alignItems: "center",
  },
  actionText: {
    color: "white",
    fontSize: 12,
    marginTop: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "white",
    fontSize: 18,
  },
});
