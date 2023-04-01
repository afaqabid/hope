import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import React from "react";
import {
  Button,
  Provider as PaperProvider,
  TextInput,
} from "react-native-paper";
import { useFonts } from "expo-font";
import Colors from "../../assets/constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import KeyboardAvoidingView from "react-native/Libraries/Components/Keyboard/KeyboardAvoidingView";

class PostHead {
  constructor(imgUrl, title, desc, time, date, status, doneeName) {
    this.imgUrl = imgUrl;
    this.title = title;
    this.desc = desc;
    this.time = time;
    this.date = date;
    this.status = status;
    this.doneeName = doneeName;
  }
}

const RequestDetails = ({ route }) => {
  const request = new PostHead(
    route.params.requestImgUrl,
    route.params.requestTitle,
    route.params.requestDesc,
    route.params.requestTime,
    route.params.requestDate,
    route.params.requestStatus,
    route.params.requestDoneeName
  );

  console.log(request);

  let [fontLoaded] = useFonts({
    "Manrope-Bold": require("../../assets/fonts/Manrope-Bold.ttf"),
    "Manrope-ExtraBold": require("../../assets/fonts/Manrope-ExtraBold.ttf"),
    "Manrope-ExtraLight": require("../../assets/fonts/Manrope-ExtraLight.ttf"),
    "Manrope-Light": require("../../assets/fonts/Manrope-Light.ttf"),
    "Manrope-Medium": require("../../assets/fonts/Manrope-Medium.ttf"),
    "Manrope-Regular": require("../../assets/fonts/Manrope-Regular.ttf"),
    "Manrope-SemiBold": require("../../assets/fonts/Manrope-SemiBold.ttf"),
  });

  return (
    <PaperProvider>
      <SafeAreaView style={styles.mainContainer}>
        <Text style={styles.heading}>Request Details</Text>
        <ScrollView style={{ width: "95%" }}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: request.imgUrl }}
              //   style={{ width: "50%", height: "30%" }}
              style={styles.requestImg}
            />
          </View>
          <View style={styles.details}>
            <Text style={styles.title}>{request.title}</Text>
            <Text style={styles.desc}>{request.desc}</Text>
            <View style={styles.dateAndTime}>
              <Text style={styles.time}>{request.time}</Text>
              <Text style={styles.date}>{request.date}</Text>
            </View>
            <Text style={styles.doneeName}>{request.doneeName}</Text>
          </View>
          <View style={styles.btnContainer}>
            <Button style={styles.btnSendMsg}>
              <Text style={styles.btnTxtSendMsg}>Send Message</Text>
            </Button>
          </View>
        </ScrollView>
      </SafeAreaView>
    </PaperProvider>
  );
};

export default RequestDetails;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.background,
    flex: 1,
    alignItems: "center",
  },
  heading: {
    fontFamily: "Manrope-Bold",
    fontSize: 20,
  },
  doneeName: {
    fontFamily: "Manrope-Bold",
    fontSize: 18,
  },
  imageContainer: {
    height: 400,
    marginTop: "5%",
  },
  requestImg: {
    height: "100%",
    width: "100%",
  },
  details: {
    height: "auto",
    width: "90%",
    display: "flex",
  },
  title: {
    fontFamily: "Manrope-Bold",
    fontSize: 20,
  },
  desc: {
    fontFamily: "Manrope-Regular",
    fontSize: 17,
    marginBottom: "5%",
  },
  dateAndTime: {
    display: "flex",
    flexDirection: "row",
    marginBottom: "5%",
  },
  date: {
    fontFamily: "Manrope-Regular",
    fontSize: 16,
  },
  time: {
    fontFamily: "Manrope-Regular",
    fontSize: 16,
    marginRight: "5%",
  },
  btnSendMsg: {
    backgroundColor: Colors.main,
    borderRadius: 5,
    width: "100%",
  },
  btnTxtSendMsg: {
    color: Colors.background,
  },
  btnContainer: {
    height: "auto",
    width: "100%",
    alignItems: "center",
  },
});
