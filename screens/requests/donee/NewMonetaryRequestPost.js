import {
  Keyboard,
  Button as ButtonNative,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  Provider as PaperProvider,
  Text,
  Button,
  SegmentedButtons,
  Banner,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import { auth, db, storage } from "../../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import Colors from "../../../assets/constants/Colors";
import * as Location from "expo-location";
import { ref as dbRef, push, set } from "firebase/database";

export default function NewMonetaryRequestPost() {
  let [fontLoaded] = useFonts({
    "Manrope-Bold": require("../../../assets/fonts/Manrope-Bold.ttf"),
    "Manrope-ExtraBold": require("../../../assets/fonts/Manrope-ExtraBold.ttf"),
    "Manrope-ExtraLight": require("../../../assets/fonts/Manrope-ExtraLight.ttf"),
    "Manrope-Light": require("../../../assets/fonts/Manrope-Light.ttf"),
    "Manrope-Medium": require("../../../assets/fonts/Manrope-Medium.ttf"),
    "Manrope-Regular": require("../../../assets/fonts/Manrope-Regular.ttf"),
    "Manrope-SemiBold": require("../../../assets/fonts/Manrope-SemiBold.ttf"),
  });

  const [segBtnValue, setSegBtnValue] = useState("");

  const HideKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );

  const navigation = useNavigation();

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let postLoc = "Waiting..";
  let longitude = 0;
  let latitude = 0;
  if (errorMsg) {
    postLoc = errorMsg;
  } else if (location) {
    postLoc = `Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`;
    longitude = location.coords.longitude;
    latitude = location.coords.latitude;
  }


  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);

  async function uploadPost() {
    if (
      title.trim() == "" ||
      description.trim() == ""
    ) {
      alert("Please fill all fields");
    } else {
        var tempRef = dbRef(db, "hope/requests/" + auth.currentUser.displayName); 
        var newPostRef = push(tempRef);
        set(newPostRef, {
          imgUrl:"https://img.freepik.com/free-vector/stack-money-gold-coins-3d-cartoon-style-icon-coins-with-dollar-sign-wad-cash-currency-flat-vector-illustration-wealth-investment-success-savings-economy-profit-concept_74855-26108.jpg",
          title: title,
          username: auth.currentUser.displayName,
          description: description,
          category: "money",
          longitude: longitude,
          latitude: latitude,
        })
          .then()
          .catch((error) => {
            alert(error);
          });
        alert("Post Uploaded Successfully!");
        navigation.navigate("DoneePortal");

    }
  }
  return (
    <PaperProvider>
      <SafeAreaView style={styles.mainContainer}>
      <Text style={styles.titleTxt}>Monetary Request</Text>
          <ScrollView>
            <View style={styles.detailsContainer}>
              <Text style={styles.titleTxt}>Title</Text>
              <TextInput
                value={title}
                onChangeText={(title) => setTitle(title)}
                style={styles.requestTitle}
                placeholder="Write Request Title Here."
              ></TextInput>
              <Text style={styles.titleTxt}>Enter Amount</Text>
              <TextInput
                value={amount}
                onChangeText={(amount) => setAmount(amount)}
                style={styles.requestTitle}
                keyboardType="numeric"
                placeholder="Enter Request Amount Here."
              ></TextInput>

              <Text style={styles.titleTxt}>Description</Text>
              <TextInput
                value={description}
                multiline={true}
                style={styles.description}
                placeholder="Write Request Description Here."
                onChangeText={(text) => setDescription(text)}
              ></TextInput>
              <View style={styles.btnContainer}>
                <Button style={styles.btnPost} onPress={uploadPost}>
                  <Text style={styles.btnTxtPost}>Post</Text>
                </Button>
                <Button style={styles.btnCancel}>
                  <Text
                    style={styles.btnTxtCancel}
                    onPress={() => {
                      navigation.navigate("NewRequestPost");
                    }}
                  >
                    Cancel
                  </Text>
                </Button>
              </View>
            </View>
          </ScrollView>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    backgroundColor: "#FDFAF6",
  },
  detailsContainer: {
    height: "55%",
    backgroundColor: "transparent",
    width: "100%",
    margin: 10,
    borderRadius: 10,
    display: "flex",
    marginTop:"20%"
  },

  titleTxt: {
    fontSize: 20,
    color: "#1C702B",
    fontFamily: "Manrope-ExtraBold",
    marginLeft: 5,
    marginBottom: 0,
  },

  requestTitle: {
    height: 45,
    fontFamily: "Manrope-Regular",
    width: "95%",
    fontSize: 18,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
  },

  description: {
    height: 45,
    fontFamily: "Manrope-Regular",
    width: "95%",
    fontSize: 18,
    backgroundColor: "white",
    padding: 10,
    height: 150,
    borderRadius: 5,
  },

  btnContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 5,
  },
  btnPost: {
    backgroundColor: "#1C702B",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    height: 55,
    minWidth: "45%",
    marginTop: 10,
  },
  btnCancel: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    height: 55,
    minWidth: "45%",
    borderWidth: 2,
    borderColor: "#1C702B",
    marginTop: 10,
    marginLeft: 10,
  },
  btnTxtPost: {
    color: "white",
    fontSize: 18,
    fontFamily: "Manrope-Bold",
    justifyContent: "center",
    alignItems: "center",
  },
  btnTxtCancel: {
    color: "#1C702B",
    fontSize: 18,
    fontFamily: "Manrope-Bold",
    justifyContent: "center",
    alignItems: "center",
  },
});
