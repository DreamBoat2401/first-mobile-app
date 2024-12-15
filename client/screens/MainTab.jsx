import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, TouchableOpacity, Text } from "react-native";
import HomePage from "./HomePage";
import ProfilePage from "./ProfilePage";
import { FontAwesome5 } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const TabCard = (props) => {
  const {
    state: { routes, index },
    navigation,
  } = props;

  const renderTabs = () => {
    return (
      <View style={styles.tabBar}>
        {routes.map((item, idx) => {
          const {
            params: { icon },
            name,
          } = item;
          const isActive = index === idx;

          if (name === "Post") {
            return (
              <TouchableOpacity
                key={`tab-item-${idx.toString()}`}
                onPress={() => navigation.navigate(item.name)}
                style={styles.postButtonContainer}
              >
                <View style={styles.postButton}>
                  <FontAwesome5 name="plus" style={styles.postIcon} />
                </View>
              </TouchableOpacity>
            );
          }

          return (
            <TouchableOpacity
              key={`tab-item-${idx.toString()}`}
              onPress={() => navigation.navigate(item.name)}
              style={styles.tabItem}
            >
              <View style={styles.iconContainer}>
                <FontAwesome5
                  name={icon}
                  style={[
                    styles.icon,
                    { color: isActive ? "#F72C5B" : "#888888" },
                  ]}
                />
                <Text
                  style={[
                    styles.tabLabel,
                    { color: isActive ? "#F72C5B" : "#888888" },
                  ]}
                >
                  {name}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return <View style={styles.bottomTabWrapper}>{renderTabs()}</View>;
};

const MainTab = () => {
  return (
    <>
      <Tab.Navigator
        tabBar={(props) => <TabCard {...props} />}
        screenOptions={{ headerShown: false }}
      >
        <Tab.Screen
          name="Home"
          component={HomePage}
          initialParams={{
            icon: "home",
          }}
        />
        <Tab.Screen
          name="Post"
          component={() => null} // Ganti dengan komponen layar Post atau Modal
          initialParams={{
            icon: "plus",
          }}
          options={{ tabBarButton: () => null }} // Menghilangkan tab bar default
        />
        <Tab.Screen
          name="Profile"
          component={ProfilePage}
          initialParams={{
            icon: "user",
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default MainTab;

const styles = {
  bottomTabWrapper: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    height: 60,
    backgroundColor: "#fafafa",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  tabBar: {
    flexDirection: "row",
    height: 50,
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    alignItems: "center",
  },
  icon: {
    fontSize: 18,
    marginTop: 10,
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 2,
    fontWeight: "500",
  },
  postButtonContainer: {
    position: "relative",
    top: -20,
    justifyContent: "center",
    alignItems: "center",
  },
  postButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#F72C5B",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  postIcon: {
    color: "white",
    fontSize: 24,
  },
};
