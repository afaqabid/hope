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
  List,
  Menu,
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
import { StripeProvider } from "@stripe/stripe-react-native";
import StripeApp from "../../../src/StripeApp";

export default function DonateToOrganization() {
  let [fontLoaded] = useFonts({
    "Manrope-Bold": require("../../../assets/fonts/Manrope-Bold.ttf"),
    "Manrope-ExtraBold": require("../../../assets/fonts/Manrope-ExtraBold.ttf"),
    "Manrope-ExtraLight": require("../../../assets/fonts/Manrope-ExtraLight.ttf"),
    "Manrope-Light": require("../../../assets/fonts/Manrope-Light.ttf"),
    "Manrope-Medium": require("../../../assets/fonts/Manrope-Medium.ttf"),
    "Manrope-Regular": require("../../../assets/fonts/Manrope-Regular.ttf"),
    "Manrope-SemiBold": require("../../../assets/fonts/Manrope-SemiBold.ttf"),
  });

  const navigation = useNavigation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function uploadPost() {
    if (
      image == null ||
      title.trim() == "" ||
      description.trim() == "" ||
      segBtnValue.trim() == ""
    ) {
      alert("Please fill all fields");
    } else {
      console.log("Here!");
      var tempRef = dbRef(db, "hope/donations/" + auth.currentUser.displayName);
      var newPostRef = push(tempRef);
      set(newPostRef, {
        imgUrl: imgUrl,
        title: title,
        username: auth.currentUser.displayName,
        category: segBtnValue,
        description: description,
        longitude: longitude,
        latitude: latitude,
      })
        .then()
        .catch((error) => {
          alert(error);
        });
      alert("Post Uploaded Successfully!");
      navigation.navigate("DonorPortal");
    }
  }

  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleMenuItemPress = (item) => {
    setSelectedItem(item);
    closeMenu();
  };

  return (
    <PaperProvider>
          {/* <Text style={styles.titleTxt}>Donate to Organization</Text> */}
              <StripeProvider publishableKey="pk_test_51MYieUJyFWW0XhyN6ZLddGK5LcjcVneltxGF3WyqTQMKOXUaFJX8TYmX1GPWv8cahXhhkKYHUbF3XOnOuVnT9wpP00Z0QWaasG">
                <StripeApp />
              </StripeProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  buttonDrop: {
    width: 200,
    height: 50,
    justifyContent: "center",
  },

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
    marginTop: "20%",
  },

  titleTxt: {
    fontSize: 20,
    color: "#1C702B",
    fontFamily: "Manrope-ExtraBold",
    marginLeft: 5,
    marginBottom: 0,
  },

  donationTitle: {
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
