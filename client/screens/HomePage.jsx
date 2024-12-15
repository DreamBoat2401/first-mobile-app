import {
  View,
  Text,
  FlatList,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { Video } from "expo-av";
import { useState, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useKeepAwake } from "expo-keep-awake";
import { ResizeMode } from "expo-av";
import { useIsFocused } from "@react-navigation/native";

const { width, height: screenHeight } = Dimensions.get("window");
const TAB_BAR_HEIGHT = 49;

// Data dummy untuk reels
const reelsData = [
  {
    id: "1",
    uri: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4",
    caption: "Test Video 🎥",
    likes: "105.2k",
    comments: "2.3k",
  },
];

export default function ExploreScreen() {
  useKeepAwake();
  const [activeIndex, setActiveIndex] = useState(0);
  const [likes, setLikes] = useState(Array(reelsData.length).fill(false)); // State for Like
  const [isCommentVisible, setIsCommentVisible] = useState(false); // State for Comment Modal
  const [newComment, setNewComment] = useState(""); // State for new comment input
  const [comments, setComments] = useState({}); // State for comments per video
  const flatListRef = useRef(null);
  const insets = useSafeAreaInsets();
  const isFocused = useIsFocused();

  const videoHeight = screenHeight - TAB_BAR_HEIGHT - insets.bottom;

  const handleLike = (index) => {
    const updatedLikes = [...likes];
    updatedLikes[index] = !updatedLikes[index];
    setLikes(updatedLikes);
  };

  const handleCommentPress = (index) => {
    setActiveIndex(index);
    setIsCommentVisible(true);
  };

  const handleAddComment = () => {
    const updatedComments = { ...comments };
    if (!updatedComments[activeIndex]) {
      updatedComments[activeIndex] = [];
    }
    if (newComment.trim()) {
      updatedComments[activeIndex].push(newComment);
      setComments(updatedComments);
      setNewComment("");
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={[styles.videoContainer, { height: videoHeight }]}>
        <Video
          source={{ uri: item.uri }}
          style={styles.video}
          resizeMode={ResizeMode.COVER}
          shouldPlay={index === activeIndex && isFocused}
          isLooping
          isMuted={false}
          onError={(error) => {
            console.log("Error loading video:", error);
          }}
          onLoadStart={() => {
            console.log("Video mulai loading");
          }}
          onLoad={() => {
            console.log("Video berhasil load");
          }}
        />

        <View style={styles.overlay}>
          <View style={styles.captionSection}>
            <Text style={styles.caption}>{item.caption}</Text>
          </View>

          <View style={styles.actionsSection}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleLike(index)}
            >
              <Ionicons
                name="heart"
                size={28}
                color={likes[index] ? "red" : "white"}
              />
              <Text style={styles.actionText}>
                {likes[index]
                  ? parseInt(item.likes.replace("k", "")) + 1
                  : item.likes}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleCommentPress(index)}
            >
              <Ionicons name="chatbubble" size={26} color="white" />
              <Text style={styles.actionText}>{item.comments}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="share-social" size={26} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems[0] != null) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  return (
    <View style={styles.mainContainer}>
      <FlatList
        ref={flatListRef}
        data={reelsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
        snapToInterval={videoHeight}
        decelerationRate="fast"
      />

      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={20} color="#fff" />
        </TouchableOpacity>
      </SafeAreaView>

      {/* Comment */}
      <Modal
        visible={isCommentVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setIsCommentVisible(false)}
      >
        <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                textAlign: "center",
                fontSize: 18,
                fontWeight: "600",
                color: "white",
                marginVertical: 16,
              }}
            >
              Comments
            </Text>
            <View style={{ flex: 1, paddingHorizontal: 16 }}>
              {comments[activeIndex]?.map((comment, idx) => (
                <Text key={idx} style={{ color: "white", marginBottom: 10 }}>
                  {comment}
                </Text>
              ))}
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderTopWidth: 1,
              borderTopColor: "#333",
              padding: 8,
            }}
          >
            <TextInput
              value={newComment}
              onChangeText={setNewComment}
              placeholder="Add a comment..."
              placeholderTextColor="#888"
              style={{
                flex: 1,
                padding: 8,
                backgroundColor: "#222",
                color: "white",
                borderRadius: 8,
                marginRight: 8,
              }}
            />
            <TouchableOpacity
              onPress={handleAddComment}
              style={{
                backgroundColor: "#0a7ea4",
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 8,
              }}
            >
              <Text style={{ color: "white", fontWeight: "600" }}>Post</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "black",
  },
  safeArea: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 999,
    backgroundColor: "transparent",
  },
  searchButton: {
    alignSelf: "flex-end",
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: 10,
    borderRadius: 50,
    marginTop: 10,
    marginRight: 15,
  },
  videoContainer: {
    width: width,
  },
  video: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  captionSection: {
    flex: 1,
    justifyContent: "flex-end",
    paddingRight: 80,
    marginBottom: 20,
  },
  actionsSection: {
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 15,
    marginBottom: 20,
  },
  caption: {
    color: "white",
    fontSize: 16,
  },
  actionButton: {
    alignItems: "center",
    gap: 5,
  },
  actionText: {
    color: "white",
    fontSize: 14,
  },
});
