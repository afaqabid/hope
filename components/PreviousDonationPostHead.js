import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
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
    this.donorName = donorName;
  }
}

export default function PreviousDonationPostHead() {
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

  const showDetails = (donation) => {
    navigation.navigate("DonationDetails", {
      donationTitle: donation.title,
      donationDesc: donation.desc,
      donationDonorName: donation.donorName,
      donationTime: donation.time,
      donationDate: donation.date,
      donationStatus: donation.status,
      donationImgUrl: donation.imgUrl,
    });
  };
  var donationsPostsList = [];
  const [list, setList] = useState([]);
  var obj;

  const [test, setTest] = useState([]);

  async function loadData() {
    const dbRef = ref(db, "hope/donations/" + auth.currentUser.displayName);

    await onValue(dbRef, (snapshot) => {
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
          donationsPostsList.push(obj);
          setList(donationsPostsList);
          setTest(list);
          setCheck(true);
  });
    }, {
      onlyOnce: true
    });
  
  }
  useEffect(() => {
    console.log("Hello");
    loadData();
  }, []);
  return (
    <PaperProvider>
      <Text style={styles.heading}>Previous Donations</Text>
      {test.map((donation) => (
        <>
          <View style={styles.donationPostCard}>
            <View style={styles.card}>
              <View style={styles.mainCard}>
                <View style={styles.leftCard}>
                  <Image
                    source={{
                      uri: donation.imgUrl,
                    }}
                    style={styles.postImg}
                  />
                </View>
                <View style={styles.rightCard}>
                  <Text style={styles.postTitle}>{donation.title}</Text>
                  <Text style={styles.postDesc}>{donation.desc}</Text>
                  <Text style={styles.postDonorName}>{donation.donorName}</Text>
                  <View style={styles.timeAndDateCard}>
                    <Text style={styles.postTime}>{donation.time}</Text>
                    <Text style={styles.postDate}>{donation.date}</Text>
                  </View>
                  <Text style={styles.postStatus}>
                    {"Status: " + donation.status}
                  </Text>
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
  donationPostCard: {
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
