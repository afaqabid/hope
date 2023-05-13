import {
  Keyboard,
  TouchableWithoutFeedback,
  View,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from "react-native";
import React, { useRef } from "react";

import {
  Provider as PaperProvider,
  Avatar,
  Text,
  TextInput,
  Button,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import {
  PhoneAuthProvider,
  RecaptchaVerifier,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithCredential,
  updateCurrentUser,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase";
import { db } from "../../firebase";
import { onValue, ref, child, get } from "firebase/database";
import { useFonts } from "expo-font";
import Colors from "../../assets/constants/Colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function DonorRegistration() {
  let [fontLoaded] = useFonts({
    "Manrope-Bold": require("../../assets/fonts/Manrope-Bold.ttf"),
    "Manrope-ExtraBold": require("../../assets/fonts/Manrope-ExtraBold.ttf"),
    "Manrope-ExtraLight": require("../../assets/fonts/Manrope-ExtraLight.ttf"),
    "Manrope-Light": require("../../assets/fonts/Manrope-Light.ttf"),
    "Manrope-Medium": require("../../assets/fonts/Manrope-Medium.ttf"),
    "Manrope-Regular": require("../../assets/fonts/Manrope-Regular.ttf"),
    "Manrope-SemiBold": require("../../assets/fonts/Manrope-SemiBold.ttf"),
  });

  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [address, setAddress] = useState("");
  const [cnic, setCNIC] = useState("");
  const [cnicIssueDate, setCNICIssueDate] = useState("");

  const navigation = useNavigation();

  async function loadData() {
    const dbRef = ref(db);

    get(child(dbRef, "hope/users/donor/" + "afaqabid"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          setName(snapshot.val().name);
          setDob(snapshot.val().dob);
          setEmail(snapshot.val().email);
          setUsername(snapshot.val().username);
          setPhoneNum(snapshot.val().phone);
          setAddress(snapshot.val().address);
          setCNIC(snapshot.val().cnicDetails.cnicNo);
          setCNICIssueDate(snapshot.val().cnicDetails.cnicIssueDate);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.mainContainer}>
          <Text style={styles.heading} variant="displayMedium">
            Donor Details
          </Text>
          <View style={styles.userDetailRow}>
            <Text style={styles.userDetails} variant="displayMedium">
              Name:
            </Text>
            <Text style={styles.userDetails1} variant="displayMedium">
              {name}
            </Text>
          </View>

          <View style={styles.userDetailRow}>
            <Text style={styles.userDetails} variant="displayMedium">
              Date Of Birth:
            </Text>
            <Text style={styles.userDetails1} variant="displayMedium">
              {dob}
            </Text>
          </View>

          <View style={styles.userDetailRow}>
            <Text style={styles.userDetails} variant="displayMedium">
              Email:
            </Text>
            <Text style={styles.userDetails1} variant="displayMedium">
              {email}
            </Text>
          </View>

          <View style={styles.userDetailRow}>
            <Text style={styles.userDetails} variant="displayMedium">
              Address:
            </Text>
            <Text style={styles.userDetails1} variant="displayMedium">
              {address}
            </Text>
          </View>

          <View style={styles.userDetailRow}>
            <Text style={styles.userDetails} variant="displayMedium">
              CNIC:
            </Text>
            <Text style={styles.userDetails1} variant="displayMedium">
              {cnic}
            </Text>
          </View>

          <View style={styles.userDetailRow}>
            <Text style={styles.userDetails} variant="displayMedium">
              CNIC Issue Date:
            </Text>
            <Text style={styles.userDetails1} variant="displayMedium">
              {cnicIssueDate}
            </Text>
          </View>
        </View>

        <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: 1,
              width: "800%",
              marginTop: 10,
              marginBottom: 10,
            }}
          ></View>
          <TouchableOpacity
            style={styles.updateDonorBtn}
            onPress={() => navigation.navigate("UpdateDonorProfile")}
          >
            <Text style={styles.btnTxtReg} variant="titleMedium">
            Update Donor Profile
            </Text>
          </TouchableOpacity>

      </SafeAreaView>
    </PaperProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  mainContainer: {
    flex: 1,
    alignItems: "center",
  },
  heading: {
    textAlign: "center",
    marginTop: "15%",
    marginBottom: "15%",
    fontFamily: "Manrope-ExtraBold",
    color: Colors.main,
  },
  userDetailRow: {
    display: "flex",
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-between",
  },
  userDetails: {
    fontSize: 22,
    fontFamily: "Manrope-Bold",
    color: Colors.main,
  },
  userDetails1: {
    fontSize: 20,
    fontFamily: "Manrope-Light",
    color: Colors.main,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  updateButton: {
    marginVertical: 20,
    backgroundColor: Colors.primary,
  },
  
  updateDonorBtn: {
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 5,
    paddingLeft: 16,
    paddingRight: 16,
    width: "100%",
    height: 50,
    borderColor: Colors.main,
    borderWidth: 2,
  },

});
