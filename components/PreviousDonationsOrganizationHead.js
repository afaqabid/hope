import {
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React from "react";
import {
  Avatar,
  Divider,
  Text,
  Provider as PaperProvider,
  Button,
  Surface,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";

class PostHead {
  constructor(amount, time, date, donorName) {
    this.amount = amount;
    this.time = time;
    this.date = date;
    this.donorName = donorName;
  }
}

export default function PreviousDonationOrganizationHead() {
  let [fontLoaded] = useFonts({
    "Manrope-Bold": require("../assets/fonts/Manrope-Bold.ttf"),
    "Manrope-ExtraBold": require("../assets/fonts/Manrope-ExtraBold.ttf"),
    "Manrope-ExtraLight": require("../assets/fonts/Manrope-ExtraLight.ttf"),
    "Manrope-Light": require("../assets/fonts/Manrope-Light.ttf"),
    "Manrope-Medium": require("../assets/fonts/Manrope-Medium.ttf"),
    "Manrope-Regular": require("../assets/fonts/Manrope-Regular.ttf"),
    "Manrope-SemiBold": require("../assets/fonts/Manrope-SemiBold.ttf"),
  });

  var previousPostsList = [];
  var i = 0;
  var size = 10;
  for (i = 0; i < size; i++) {
    var x = new PostHead(
      "Amount: " + (i + 1),
      "Time: " + (i + 1),
      "Date: " + (i + 1),
      "Donor Name: " + (i + 1)
    );
    previousPostsList.push(x);
  }
  return (
    <PaperProvider>
      {previousPostsList.map((x) => (
        <>
          <View style={styles.previousPostCard}>
            <View style={styles.card}>
              <View style={styles.mainCard}>
                <View style={styles.rightCard}>
                  <View style={styles.timeAndDateCard}>
                    <Text style={styles.postTime}>{x.time}</Text>
                    <Text style={styles.postDate}>{x.date}</Text>
                  </View>
                  <Text style={styles.postAmount}>{x.amount}</Text>
                  <Text style={styles.postDonorName}>{x.donorName}</Text>
                </View>
              </View>
            </View>
          </View>
          <Divider
            style={{
              marginTop: 2,
              marginBottom: 2,
              alignItems: "center",
            }}
          />
        </>
      ))}

      {/* <View style={styles.previousPostCard}>
        <View style={styles.card}>
          <View style={styles.mainCard}>
            <View style={styles.leftCard}>
              <Image
                source={{
                  uri: "https://firebasestorage.googleapis.com/v0/b/hope-makeliveseasier.appspot.com/o/DonationPostImages%2F1677939646898?alt=media&token=aa0b3308-f242-4b2e-99d6-0ac40713e951",
                }}
                style={styles.postImg}
              />
            </View>
            <View style={styles.rightCard}>
              <Text style={styles.postTitle}>{"Donating a Wheelchair"}</Text>
              <Text style={styles.postAmount}>
                {"This wheelchair is only used for 10 Months...."}
              </Text>
              <View style={styles.timeAndDateCard}>
                <Text style={styles.postTime}>{"11:11 AM"}</Text>
                <Text style={styles.postDate}>{"March 24, 2023"}</Text>
              </View>
              <Text style={styles.postStatus}>{"Status: " + "previous"}</Text>
              <View style={styles.btnCard}>
                <Button style={styles.btnPost}>
                  <Text style={styles.btnTxtPost}>Mark as Done</Text>
                </Button>
                <Button style={styles.btnCancel}>
                  <Text style={styles.btnTxtCancel}>Cancel</Text>
                </Button>
              </View>
            </View>
          </View>
        </View>
      </View> */}
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Manrope-ExtraBold",
  },
  previousPostCard: {
    height: "9%",
    width: "95%",
    marginLeft: 10,
    padding: 10,
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    // backgroundColor: "rgba(253, 250, 246, 0.5)",
    alignItems: "center",
    // backgroundColor: "red",
  },
  card: {
    width: 220,
  },

  postAmount: {
    fontSize: 22,
    fontFamily: "Manrope-Bold",
  },
  postTime: {
    fontSize: 12,
    fontFamily: "Manrope-Light",
  },
  postDate: {
    fontSize: 12,
    fontFamily: "Manrope-Light",
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
    fontSize: 16,
    fontFamily: "Manrope-Regular",
  },
  mainCard: {
    display: "flex",
    flexDirection: "row",
  },
  rightCard: {
    width: "95%",
  },
  timeAndDateCard: {
    display: "flex",
    flexDirection: "row",
  },
});
