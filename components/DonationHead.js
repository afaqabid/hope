import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React from "react";
import { Button, Provider as PaperProvider } from "react-native-paper";
import { useFonts } from "expo-font";
import Colors from "../assets/constants/Colors";

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

export default function DonationHead() {
  let [fontLoaded] = useFonts({
    "Manrope-Bold": require("../assets/fonts/Manrope-Bold.ttf"),
    "Manrope-ExtraBold": require("../assets/fonts/Manrope-ExtraBold.ttf"),
    "Manrope-ExtraLight": require("../assets/fonts/Manrope-ExtraLight.ttf"),
    "Manrope-Light": require("../assets/fonts/Manrope-Light.ttf"),
    "Manrope-Medium": require("../assets/fonts/Manrope-Medium.ttf"),
    "Manrope-Regular": require("../assets/fonts/Manrope-Regular.ttf"),
    "Manrope-SemiBold": require("../assets/fonts/Manrope-SemiBold.ttf"),
  });

  var donationsPostsList = [];
  var i = 0;
  var size = 10;
  for (i = 0; i < size; i++) {
    var x = new PostHead(
      "https://firebasestorage.googleapis.com/v0/b/hope-makeliveseasier.appspot.com/o/DonationPostImages%2F1677939646898?alt=media&token=aa0b3308-f242-4b2e-99d6-0ac40713e951",
      "Name: " + (i + 1),
      "Description: " + (i + 1),
      "Time: " + (i + 1),
      "Date: " + (i + 1),
      "Active",
      "Donor Name: " + (i + 1)
    );
    donationsPostsList.push(x);
  }
  return (
    <PaperProvider>
      {donationsPostsList.map((c) => (
        <>
          <View style={styles.donationPostCard}>
            <View style={styles.card}>
              <View style={styles.mainCard}>
                <View style={styles.leftCard}>
                  <Image
                    source={{
                      uri: c.imgUrl,
                    }}
                    style={styles.postImg}
                  />
                </View>
                <View style={styles.rightCard}>
                  <Text style={styles.postTitle}>{c.title}</Text>
                  <Text style={styles.postDesc}>{c.desc}</Text>
                  <Text style={styles.postDonorName}>{x.donorName}</Text>
                  <View style={styles.timeAndDateCard}>
                    <Text style={styles.postTime}>{c.time}</Text>
                    <Text style={styles.postDate}>{c.date}</Text>
                  </View>
                  <Text style={styles.postStatus}>{"Status: " + c.status}</Text>
                  <View style={styles.btnCard}>
                    <Button style={styles.btnShowDetails}>
                      <Text style={styles.btnShowDetailsTxt}>Show Details</Text>
                    </Button>
                    <Button
                      style={styles.btnMsg}
                      onPress={() => alert("Send Message for " + c.donorName)}
                    >
                      <Text style={styles.btnMsgTxt}>Send Message</Text>
                    </Button>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </>
      ))}
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  donationPostCard: {
    height: "9.2%",
    width: "95%",
    marginTop: 8,
    marginLeft: 10,
    padding: 10,
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    backgroundColor: "rgba(253, 250, 246, 0.5)",
  },
  card: {
    width: 220,
  },

  postTitle: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Manrope-Bold",
  },
  postDesc: {
    fontSize: 16,
    fontFamily: "Manrope-Light",
  },
  postTime: {
    fontSize: 14,
    fontFamily: "Manrope-Regular",
  },
  postDate: {
    fontSize: 14,
    fontFamily: "Manrope-Regular",
    marginLeft: 15,
  },
  postImg: {
    height: "90%",
    width: "90%",
  },
  postStatus: {
    fontSize: 12,
    fontFamily: "Manrope-Regular",
  },
  postDonorName: {
    fontSize: 14,
    fontFamily: "Manrope-ExtraBold",
  },

  mainCard: {
    display: "flex",
    flexDirection: "row",
  },
  leftCard: {
    width: "60%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "-2%",
  },
  rightCard: {
    width: "95%",
    marginLeft: 5,
  },
  timeAndDateCard: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
  },
  btnCard: {
    display: "flex",
    flexDirection: "row",
  },
  btnMsg: {
    // backgroundColor: "#1C702B",
    backgroundColor: Colors.main,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    height: 35,
    minWidth: "45%",
    marginTop: 10,
    marginLeft: 5,
  },
  btnMsgTxt: {
    color: Colors.background,
    fontSize: 13,
    fontFamily: "Manrope-Bold",
    justifyContent: "center",
    alignItems: "center",
  },
  btnShowDetails: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    height: 35,
    minWidth: "45%",
    marginTop: 10,
    borderWidth: 0.5,
    borderColor: Colors.main,
  },
  btnShowDetailsTxt: {
    color: Colors.main,
    fontSize: 13,
    fontFamily: "Manrope-Bold",
    justifyContent: "center",
    alignItems: "center",
  },
});
