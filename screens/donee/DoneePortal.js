import * as React from "react";
import {
  BottomNavigation,
  Text,
  Provider as PaperProvider,
  Appbar,
  Surface,
} from "react-native-paper";
import { Alert, StyleSheet } from "react-native";
import BlogTab from "../blog/BlogTab";
import ChatTab from "../chat/ChatTab";
import DonationsTab from "../donations/DonationsTab";
import DoneeRequestsTab from "../requests/donee/DoneeRequestTab";
import NotificationsTab from "../notifications/NotificationsTab";
import RequestsTab from "../requests/RequestsTab";
import { auth } from "../../firebase";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import Colors from "../../assets/constants/Colors";

const TabOne = () => <DonationsTab />;
const TabTwo = () => <DoneeRequestsTab />;
const TabThree = () => <ChatTab />;
const TabFour = () => <BlogTab />;
const TabFive = () => <NotificationsTab />;

export default function DoneePortal() {
  let [fontLoaded] = useFonts({
    "Manrope-Bold": require("../../assets/fonts/Manrope-Bold.ttf"),
    "Manrope-ExtraBold": require("../../assets/fonts/Manrope-ExtraBold.ttf"),
    "Manrope-ExtraLight": require("../../assets/fonts/Manrope-ExtraLight.ttf"),
    "Manrope-Light": require("../../assets/fonts/Manrope-Light.ttf"),
    "Manrope-Medium": require("../../assets/fonts/Manrope-Medium.ttf"),
    "Manrope-Regular": require("../../assets/fonts/Manrope-Regular.ttf"),
    "Manrope-SemiBold": require("../../assets/fonts/Manrope-SemiBold.ttf"),
  });

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "tabOne", title: "Donations", focusedIcon: "charity" },
    { key: "tabTwo", title: "Requests", focusedIcon: "note-edit" },
    { key: "tabThree", title: "Chat", focusedIcon: "chat" },
    { key: "tabFour", title: "Blog", focusedIcon: "book" },
    {
      key: "tabFive",
      title: "Notifications",
      focusedIcon: "bell",
      unfocusedIcon: "bell-outline",
    },
  ]);

  const appbarTitle = [
    "Donations",
    "Requests",
    "Chat",
    "Blog",
    "Notifications",
  ];

  const renderScene = BottomNavigation.SceneMap({
    tabOne: TabOne,
    tabTwo: TabTwo,
    tabThree: TabThree,
    tabFour: TabFour,
    tabFive: TabFive,
  });

  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert("Are You Sure?", "You'll be logged out!", [
      {
        text: "Yes",
        onPress: () => {
          auth
            .signOut()
            .then(() => {
              console.log("User Signed Out Successfully!");
              navigation.navigate("SelectPortal");
            })
            .catch((error) => alert(error.message));
        },
      },
      { text: "No" },
    ]);
  };

  const handleProfile = () => {
    navigation.navigate("DoneeUserProfile");
  };

  return (
    <PaperProvider>
      <Surface style={styles.surface} elevation={4}>
        <Appbar.Header style={styles.topBar}>
          <Appbar.Action
            iconColor="#1C702B"
            icon="account"
            size={40}
            onPress={handleProfile}
          />
          <Text style={styles.appbarTitle}>{appbarTitle[index]}</Text>
          <Appbar.Action
            iconColor="#1C702B"
            style={styles.appbarLogout}
            size={30}
            icon="logout"
            onPress={handleLogout}
          />
        </Appbar.Header>
      </Surface>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        barStyle={{
          backgroundColor: Colors.background,
          width: "100%",
          elevation: "none",
          color: Colors.background,
          borderTopWidth: 0.2,
          borderTopColor: "grey",
        }}
        style={styles.bottomBar}
        theme={{
          colors: {
            secondaryContainer: "transparent",
            onSecondaryContainer: Colors.main,
            onSurface: Colors.main,
            onSurfaceVariant: "grey",
          },
          fonts: {
            labelMedium: {
              fontFamily: "Manrope-Bold",
              fontSize: 11,
            },
          },
        }}
        sceneAnimationType="opacity"
      />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  topBar: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: Colors.background,
    justifyContent: "space-between",
  },
  bottomBar: {},
  appbarTitle: {
    color: Colors.main,
    fontFamily: "Manrope-ExtraBold",
    fontSize: 18,
  },
  surface: {
    width: "100%",
  },
});
