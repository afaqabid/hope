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
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";

class PostHead {
  constructor(imgUrl, title, desc, time, date, status) {
    this.imgUrl = imgUrl;
    this.title = title;
    this.desc = desc;
    this.time = time;
    this.date = date;
    this.status = status;
  }
}

export default function ActiveRequestPostHead() {
  let [fontLoaded] = useFonts({
    "Manrope-Bold": require("../assets/fonts/Manrope-Bold.ttf"),
    "Manrope-ExtraBold": require("../assets/fonts/Manrope-ExtraBold.ttf"),
    "Manrope-ExtraLight": require("../assets/fonts/Manrope-ExtraLight.ttf"),
    "Manrope-Light": require("../assets/fonts/Manrope-Light.ttf"),
    "Manrope-Medium": require("../assets/fonts/Manrope-Medium.ttf"),
    "Manrope-Regular": require("../assets/fonts/Manrope-Regular.ttf"),
    "Manrope-SemiBold": require("../assets/fonts/Manrope-SemiBold.ttf"),
  });

  var activePostsList = [];
  var i = 0;
  var size = 10;
  for (i = 0; i < size; i++) {
    var x = new PostHead(
      "https://firebasestorage.googleapis.com/v0/b/hope-makeliveseasier.appspot.com/o/DonationPostImages%2F1677939646898?alt=media&token=aa0b3308-f242-4b2e-99d6-0ac40713e951",
      "Name: " + (i + 1),
      "Description: " + (i + 1),
      "Time: " + (i + 1),
      "Date: " + (i + 1),
      "Active"
    );
    activePostsList.push(x);
  }
  return (
    <PaperProvider>
      <Text style={styles.heading}>Active Requests</Text>
      {activePostsList.map((x) => (
        <>
          <View style={styles.activePostCard}>
            <View style={styles.card}>
              <View style={styles.mainCard}>
                <View style={styles.leftCard}>
                  <Image
                    source={{
                      uri: x.imgUrl,
                    }}
                    style={styles.postImg}
                  />
                </View>
                <View style={styles.rightCard}>
                  <Text style={styles.postTitle}>{x.title}</Text>
                  <Text style={styles.postDesc}>{x.desc}</Text>
                  <View style={styles.timeAndDateCard}>
                    <Text style={styles.postTime}>{x.time}</Text>
                    <Text style={styles.postDate}>{x.date}</Text>
                  </View>
                  <Text style={styles.postStatus}>{"Status: " + x.status}</Text>
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
          </View>
        </>
      ))}
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Manrope-ExtraBold",
  },
  activePostCard: {
    height: "10%",
    width: "95%",
    marginTop: 10,
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
    height: "100%",
    width: "100%",
  },
  postStatus: {
    fontSize: 12,
    fontFamily: "Manrope-Regular",
  },
  mainCard: {
    display: "flex",
    flexDirection: "row",
  },
  leftCard: {
    width: "60%",
    height: "100%",
    // backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
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
  btnPost: {
    backgroundColor: "#1C702B",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    height: 35,
    minWidth: "45%",
    marginTop: 10,
  },
  btnTxtPost: {
    color: "white",
    fontSize: 12,
    fontFamily: "Manrope-Bold",
    justifyContent: "center",
    alignItems: "center",
  },
  btnCancel: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    height: 35,
    minWidth: "45%",
    marginTop: 10,
    marginLeft: 10,
  },
  btnTxtCancel: {
    color: "white",
    fontSize: 12,
    fontFamily: "Manrope-Bold",
    justifyContent: "center",
    alignItems: "center",
  },
});
