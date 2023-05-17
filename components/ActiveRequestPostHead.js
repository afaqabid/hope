import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from "react-native";
import React, { Suspense, useCallback, useEffect, useState } from "react";
import { Button, Provider as PaperProvider } from "react-native-paper";
import { useFonts } from "expo-font";
import Colors from "../assets/constants/Colors";
import { useFocusEffect, useIsFocused, useNavigation } from "@react-navigation/native";
import { auth, db } from "../firebase";
import { onValue, ref, child, get } from "firebase/database";

class PostHead {
  constructor(imgUrl, title, desc, time, date, status, donorName) {
    this.imgUrl = imgUrl;
    this.title = title;
    this.desc = desc;
    this.time = time;
    this.date = date;
    this.status = status;
    this.doneeName = donorName;
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

  const navigation = useNavigation();

  const [check, setCheck] = useState(false);

  var requestsPostsList = [];
  const [list, setList] = useState([]);
  const [shown, setShown] = useState(false);

  var obj;

  const [loading, setLoading] = useState(false);

  const [test, setTest] = useState([]);

  async function loadData() {
    const dbRef = ref(db, "hope/requests/" + auth.currentUser.displayName);
    onValue(dbRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();

        obj = new PostHead(
          childData.imgUrl,
          childData.title,
          childData.description,
          "11:11",
          "Apr 03, 2023",
          "Active",
          childData.username
        );
        requestsPostsList.push(obj);
        setList(requestsPostsList);
        setTest(list);
        setCheck(true);
      });
    }, {
      onlyOnce: true
    })
    return true;
  }

  useEffect(() => {
    loadData();
  }, []);

    return (
      <PaperProvider>
        <View></View>
        <Text style={styles.heading}>Active Requests</Text>
        {test.map((request) => (
          <>
            <View style={styles.requestPostCard}>
              <View style={styles.card}>
                <View style={styles.mainCard}>
                  <View style={styles.leftCard}>
                    <Image
                      source={{
                        uri: request.imgUrl,
                      }}
                      style={styles.postImg}
                    />
                  </View>
                  <View style={styles.rightCard}>
                    <Text style={styles.postTitle}>{request.title}</Text>
                    <Text style={styles.postDesc}>{request.desc}</Text>
                    <Text style={styles.postDonorName}>{request.donorName}</Text>
                    <View style={styles.timeAndDateCard}>
                      <Text style={styles.postTime}>{request.time}</Text>
                      <Text style={styles.postDate}>{request.date}</Text>
                    </View>
                    <Text style={styles.postStatus}>
                      {"Status: " + request.status}
                    </Text>
                    <View style={styles.btnCard}>
                      <Button
                        style={styles.btnShowDetails}
                      >
                        <Text style={styles.btnShowDetailsTxt}>Mark As Done</Text>
                      </Button>
                      <Button
                        style={styles.btnMsg}
                      >
                        <Text style={styles.btnMsgTxt}>Cancel</Text>
                      </Button>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </>
        ))}
        <Button onPress={loadData}>
          Show
        </Button>
      </PaperProvider>
    );

  }
const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Manrope-ExtraBold",
  },
  requestPostCard: {
    height: 180,
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
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "Manrope-Bold",
  },
  postDesc: {
    fontSize: 12,
    fontFamily: "Manrope-Light",
  },
  postTime: {
    fontSize: 12,
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
