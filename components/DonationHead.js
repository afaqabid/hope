import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Provider as PaperProvider } from "react-native-paper";
import { useFonts } from "expo-font";
import Colors from "../assets/constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../firebase";
import { onValue, child, get, set, push, ref } from "firebase/database";

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
  const sendMessage = (donation) => {
    Alert.alert(
      "Send Message",
      " Do you want to send message to " + donation.donorName,
      [
        {
          text: "Yes",
          onPress: () => {



            var tempRef = ref(db, "hope/chats/donors/" + donation.donorName); 
            var newChat = push(tempRef);
            set(newChat, {
              doneeName: auth.currentUser.displayName,
            })
              .then()
              .catch((error) => {
                alert(error);
              });


              tempRef = ref(db, "hope/chats/donees/" + auth.currentUser.displayName); 
              newChat = push(tempRef);
              set(newChat, {
                donorName: donation.donorName,
              })
                .then()
                .catch((error) => {
                  alert(error);
                });

            navigation.navigate("ChatScreen", {
              donationTitle: donation.title,
              donationDesc: donation.desc,
              donationDonorName: donation.donorName,
              donationTime: donation.time,
              donationDate: donation.date,
              donationStatus: donation.status,
              donationImgUrl: donation.imgUrl,
            });
          },
        },
        { text: "No" },
      ]
    );
  };

  var donationsPostsList = [];
  const [list, setList] = useState([]);
  var obj;

  const [test, setTest] = useState([]);
  async function loadData() {
    const dbRef = ref(db);
    await get(child(dbRef, "hope/donations/"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          snapshot.forEach(function (childSnapshot) {
            var key = childSnapshot.key;
            var childData = childSnapshot.val();
            // console.log(childData);
            console.log(childData);
            for (let key in childData)
            {
              obj = new PostHead(
                childData[key].imgUrl,
                childData[key].title,
                childData[key].description,
                "11:11",
                "Apr 03, 2023",
                "Active",
                childData[key].username
              );
              donationsPostsList.push(obj);
              setList(donationsPostsList);
              setTest(list);
              setCheck(true);
                console.log(childData[key]);
            }
          });
        } else {
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  useEffect(() => {
    console.log("hello");
    loadData();
  }, []);
  return (
    <PaperProvider>
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
                  <View style={styles.btnCard}>
                    <Button
                      style={styles.btnShowDetails}
                      onPress={() => showDetails(donation)}
                    >
                      <Text style={styles.btnShowDetailsTxt}>Show Details</Text>
                    </Button>
                    <Button
                      style={styles.btnMsg}
                      onPress={() => sendMessage(donation)}
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
