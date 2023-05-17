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

export default function RequestHead() {
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

  const showDetails = (request) => {
    navigation.navigate("RequestDetails", {
      requestTitle: request.title,
      requestDesc: request.desc,
      requestDoneeName: request.doneeName,
      requestTime: request.time,
      requestDate: request.date,
      requestStatus: request.status,
      requestImgUrl: request.imgUrl,
    });
  };
  const sendMessage = (request) => {
    Alert.alert(
      "Send Message",
      " Do you want to send message to " + request.doneeName,
      [
        {
          text: "Yes",
          onPress: () => {
            var tempRef = ref(db, "hope/chats/" + request.doneeName); 
            var newChat = push(tempRef);
            set(newChat, {
              username: auth.currentUser.displayName,
            })
              .then()
              .catch((error) => {
                alert(error);
              });


              tempRef = ref(db, "hope/chats/" + auth.currentUser.displayName); 
              newChat = push(tempRef);
              set(newChat, {
                username: request.doneeName,
              })
                .then()
                .catch((error) => {
                  alert(error);
                });


            navigation.navigate("ChatScreen", {
              requestTitle: request.title,
              requestDesc: request.desc,
              selectedUsername: request.doneeName,
              requestTime: request.time,
              requestDate: request.date,
              requestStatus: request.status,
              requestImgUrl: request.imgUrl,
            });
          },
        },
        { text: "No" },
      ]
    );
  };

  var requestsPostsList = [];
  const [list, setList] = useState([]);
  var obj;

  const [test, setTest] = useState([]);
  async function loadData() {
    const dbRef = ref(db);
    await get(child(dbRef, "hope/requests/"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          snapshot.forEach(function (childSnapshot) {
            var key = childSnapshot.key;
            var childData = childSnapshot.val();
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
              requestsPostsList.push(obj);
              setList(requestsPostsList);
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
                  <Text style={styles.postDoneeName}>{request.doneeName}</Text>
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
                      onPress={() => showDetails(request)}
                    >
                      <Text style={styles.btnShowDetailsTxt}>Show Details</Text>
                    </Button>
                    <Button
                      style={styles.btnMsg}
                      onPress={() => sendMessage(request)}
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
              <Button onPress={loadData}>
          Show
        </Button>

    </PaperProvider>
  );
}

const styles = StyleSheet.create({
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
  postDoneeName: {
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
