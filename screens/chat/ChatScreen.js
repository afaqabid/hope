import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
  TextInput,
} from "react-native";
import {
  Avatar,
  Provider as PaperProvider,
  Text,
  Appbar,
  IconButton,
} from "react-native-paper";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

export default function ChatScreen({ route }) {
  console.log(route);
  const username = route.params.donationDonorName;
  const donationTitle = route.params.donationTitle
  const userImg = route.params.donationImgUrl;
  console.log(userImg);

  return (
    <PaperProvider>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "position" : "height"}
      >
        <View style={styles.mainContainer}>
          <Appbar.Header style={styles.header}>
            <Avatar.Image
              size={55}
              source={userImg}
              style={{ backgroundColor: "transparent" }}
            />
            <View>
            <Text
              variant="titleLarge"
              style={{ marginLeft: 10, fontWeight: "bold", color: "#1C702B" }}
            >
              {donationTitle}
            </Text>
            <Text
              variant="titleMedium"
              style={{ marginLeft: 10, fontWeight: "bold", color: "#1C702B" }}
            >
              {username}
            </Text>

            </View>

          </Appbar.Header>

          <View style={styles.mainScreen}>
            <ScrollView></ScrollView>
          </View>
          <View style={styles.inputScreen}>
            <TextInput
              style={styles.userInput}
              placeholder="Write your message here ..."
            ></TextInput>
            <IconButton
              icon="send"
              size={30}
              iconColor={"#1C702B"}
              onPress={() => console.log("Pressed")}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingLeft: 15,
    backgroundColor: "#FDFAF6",
  },
  mainContainer: {
    height: "100%",
  },
  mainScreen: {
    height: "78%",
    display: "flex",
    flexDirection: "row",
  },
  inputScreen: {
    backgroundColor: "#FDFAF6",
    display: "flex",
    flexDirection: "row",
    height: 100,
  },
  userInput: {
    width: "80%",
    height: 40,
    marginLeft: 15,
    padding: 10,
    marginTop: 10,
    maxHeight: 40,
    borderRadius: 70,
    borderTopLeftRadius: 70,
    borderTopRightRadius: 70,
    backgroundColor: "#F0F1F4",
    fontFamily: "Manrope-Bold",
    fontSize: 15,
  },
});
