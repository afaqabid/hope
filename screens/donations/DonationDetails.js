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
  constructor(imgUrl, title, desc, time, date, status, donorName) {
    this.imgUrl = imgUrl;
    this.title = title;
    this.desc = desc;
    this.time = time;
    this.date = date;
    this.status = status;
    this.donorName = donorName;
  }
}

const DonationDetails = ({ route }) => {
  const donation = new PostHead(
    route.params.donationImgUrl,
    route.params.donationTitle,
    route.params.donationDesc,
    route.params.donationTime,
    route.params.donationDate,
    route.params.donationStatus,
    route.params.donationDonorName
  );

  console.log(donation);

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
        <Text style={styles.heading}>Donation Details</Text>
        <ScrollView style={{ width: "95%" }}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: donation.imgUrl }}
              //   style={{ width: "50%", height: "30%" }}
              style={styles.donationImg}
            />
          </View>
          <View style={styles.details}>
            <Text style={styles.title}>{donation.title}</Text>
            <Text style={styles.desc}>{donation.desc}</Text>
            <View style={styles.dateAndTime}>
              <Text style={styles.time}>{donation.time}</Text>
              <Text style={styles.date}>{donation.date}</Text>
            </View>
            <Text style={styles.donorName}>{donation.donorName}</Text>
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

export default DonationDetails;

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
  donorName: {
    fontFamily: "Manrope-Bold",
    fontSize: 18,
  },
  imageContainer: {
    height: 400,
    marginTop: "5%",
  },
  donationImg: {
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
