import {
  View,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from "react-native";
import React from "react";
import {
  Provider as PaperProvider,
  Avatar,
  Text,
  TextInput,
  Button,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../../firebase";
import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { useFonts } from "expo-font";
import Colors from "../../assets/constants/Colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { onValue, ref, child, get, set } from "firebase/database";

export default function OrganizationRegistration() {
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
  const [buildIn, setBuildIn] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [certificateIssuanceDate, setCertificateIssuanceDate] = useState("");
  const [certificateNumber, setCertificateNumber] = useState("");

  const navigation = useNavigation();

  const saveDetailsToDatabase = () => {
    set(ref(db, "hope/usertype/organization/" + username), {
      email: email,
    })
      .then()
      .catch((error) => {
        alert(error);
      });

    set(ref(db, "hope/users/organization/" + username), {
      username: username,
      email: email,
      password: password,
      address: address,
      buildIn: buildIn,
      name: name,
      certificateNumber: certificateNumber,
      certificateIssuanceDate: certificateIssuanceDate,
    })
      .then()
      .catch((error) => {
        alert(error);
      });

    set(ref(db, "hope/users/organization/" + username + "/location"), {
      latitude: "",
      longitude: "",
    })
      .then()
      .catch((error) => {
        alert(error);
      });

    set(
      ref(db, "hope/users/organization/" + username + "/certificateDetails"),
      {
        certificateNumber: certificateNumber,
        certificateIssuanceDate: certificateIssuanceDate,
      }
    )
      .then()
      .catch((error) => {
        alert(error);
      });

    set(ref(db, "hope/users/organization/" + username + "/bankDetails"), {
      accountHolderName: "",
      accountNumber: "",
    })
      .then()
      .catch((error) => {
        alert(error);
      });

    // set(ref(db, 'hope/users/donor/' + username + '/donations'), {
    //   accountHolderName: "",
    //   accountNumber: "",
    // })
    // .then()
    // .catch((error)=>{
    //   alert(error)
    // })
  };

  const saveAuthenticationDetails = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        saveDetailsToDatabase();
        updateProfile(auth.currentUser, {
          displayName: username,
        })
          .then()
          .catch((error) => {
            // An error occurred
            // ...
          });

        sendEmailVerification(auth.currentUser)
          .then()
          .catch((error) => {
            alert(error.message);
          });
        const user = userCredentials.user;
        console.log("Registered with:", user.email);
        Alert.alert(
          "Congratulations!",
          "You've been registered as an Organization, Please verify through the link sent to your registered email!",
          [
            {
              text: "Okay!",
              onPress: () => navigation.navigate("OrganizationLogin"),
            },
          ]
        );
      })
      .catch((error) => alert(error.message));
  };

  const handleSignUp = () => {
    var check = true;
    if (
      name.trim() == "" ||
      buildIn.trim() == "" ||
      email.trim() == "" ||
      username.trim() == "" ||
      password.trim() == "" ||
      confirmPassword.trim() == "" ||
      address.trim() == "" ||
      certificateNumber.trim() == "" ||
      certificateIssuanceDate.trim == ""
    ) {
      alert("Please Enter All Fields!");
      check = false;
    }
    if (!validateDate(buildIn) || !validateDate(certificateIssuanceDate)) {
      alert("Invalid Date Format!");
      check = false;
    }
    if (password != confirmPassword) {
      alert("Password & ConfirmPassword doesn't match!");
      check = false;
    }
    if (check) {
      saveAuthenticationDetails();
    }
  };

  function validateNumber(input) {
    const regExp = /^\d+$/; // Regular expression to match only digits
    return regExp.test(input); // Return true if input matches the regular expression
  }

  const validateName = (text) => {
    const result = text.replace(/[^a-zA-Z\s-]/g, "");
    return result;
  };

  function validateDate(text) {
    // Check if the dob is a string
    if (typeof text !== "string") {
      return false;
    }

    // Check if the dob is in the format "DDMMYYYY"
    const regex = /^\d{8}$/;
    if (!regex.test(text)) {
      return false;
    }

    // Extract the year, month, and day from the string
    const day = parseInt(text.substr(0, 2));
    const month = parseInt(text.substr(2, 2));
    const year = parseInt(text.substr(4, 4));

    // Check if the year, month, and day are valid
    if (
      isNaN(year) ||
      year < 1900 ||
      year > new Date().getFullYear() ||
      isNaN(month) ||
      month < 1 ||
      month > 12 ||
      isNaN(day) ||
      day < 1 ||
      day > new Date(year, month, 0).getDate()
    ) {
      return false;
    }

    // Check if the dob is in the past
    const tempDate = new Date(year, month - 1, day);
    const now = new Date();
    if (tempDate > now) {
      return false;
    }

    // Check if the year is a leap year
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

    // Check if the month and day are valid for the given year
    if (isLeapYear && month === 2 && day > 29) {
      return false;
    } else if (!isLeapYear && month === 2 && day > 28) {
      return false;
    } else if ([4, 6, 9, 11].includes(month) && day > 30) {
      return false;
    }

    // All checks passed, the dob is valid
    return true;
  }

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.mainContainer}>
          <KeyboardAwareScrollView scrollEnabled={false}>
            <Text style={styles.heading} variant="displayMedium">
              Registration
            </Text>
            <TextInput
              style={styles.inputFields}
              outlineColor={Colors.main}
              activeOutlineColor={Colors.main}
              mode={"outlined"}
              maxLength={20}
              label={
                <Text style={{ backgroundColor: Colors.background }}>
                  Name
                  <Text style={{ color: "red", backgroundColor: "white" }}>
                    *
                  </Text>
                </Text>
              }
              value={name}
              onChangeText={(text) => {
                setName(validateName(text));
              }}
            ></TextInput>
            <TextInput
              style={styles.inputFields}
              outlineColor={Colors.main}
              activeOutlineColor={Colors.main}
              mode={"outlined"}
              maxLength={8}
              keyboardType="numeric"
              label={
                <Text style={{ backgroundColor: Colors.background }}>
                  Registration Date
                  <Text style={{ color: "red", backgroundColor: "white" }}>
                    *
                  </Text>
                </Text>
              }
              value={buildIn}
              onChangeText={(text) => setBuildIn(text)}
              placeholder={"DDMMYYYY"}
            ></TextInput>
            <TextInput
              style={styles.inputFields}
              outlineColor={Colors.main}
              activeOutlineColor={Colors.main}
              mode={"outlined"}
              maxLength={25}
              label={
                <Text style={{ backgroundColor: Colors.background }}>
                  Email
                  <Text style={{ color: "red", backgroundColor: "white" }}>
                    *
                  </Text>
                </Text>
              }
              value={email}
              onChangeText={(text) => setEmail(text)}
              keyboardType="email-address"
            ></TextInput>
            <TextInput
              style={styles.inputFields}
              outlineColor={Colors.main}
              activeOutlineColor={Colors.main}
              mode={"outlined"}
              maxLength={10}
              label={
                <Text style={{ backgroundColor: Colors.background }}>
                  Username
                  <Text style={{ color: "red", backgroundColor: "white" }}>
                    *
                  </Text>
                </Text>
              }
              value={username}
              onChangeText={(text) => setUsername(text)}
            ></TextInput>
            <TextInput
              style={styles.inputFields}
              outlineColor={Colors.main}
              activeOutlineColor={Colors.main}
              mode={"outlined"}
              maxLength={16}
              label={
                <Text style={{ backgroundColor: Colors.background }}>
                  Password
                  <Text style={{ color: "red", backgroundColor: "white" }}>
                    *
                  </Text>
                </Text>
              }
              value={password}
              secureTextEntry
              onChangeText={(text) => setPassword(text)}
            ></TextInput>
            <TextInput
              style={styles.inputFields}
              outlineColor={Colors.main}
              activeOutlineColor={Colors.main}
              mode={"outlined"}
              maxLength={16}
              label={
                <Text style={{ backgroundColor: Colors.background }}>
                  Confirm Password
                  <Text style={{ color: "red", backgroundColor: "white" }}>
                    *
                  </Text>
                </Text>
              }
              value={confirmPassword}
              secureTextEntry
              onChangeText={(text) => setConfirmPassword(text)}
            ></TextInput>
            <TextInput
              style={styles.inputFields}
              outlineColor={Colors.main}
              activeOutlineColor={Colors.main}
              mode={"outlined"}
              maxLength={11}
              keyboardType="numeric"
              label={
                <Text style={{ backgroundColor: Colors.background }}>
                  Phone
                  <Text style={{ color: "red", backgroundColor: "white" }}>
                    *
                  </Text>
                </Text>
              }
              value={phone}
              onChangeText={(text) => setPhone(text)}
            ></TextInput>
            <TextInput
              style={styles.inputFields}
              outlineColor={Colors.main}
              activeOutlineColor={Colors.main}
              mode={"outlined"}
              label={
                <Text style={{ backgroundColor: Colors.background }}>
                  Address
                  <Text style={{ color: "red", backgroundColor: "white" }}>
                    *
                  </Text>
                </Text>
              }
              value={address}
              onChangeText={(text) => setAddress(text)}
            ></TextInput>
            <TextInput
              style={styles.inputFields}
              outlineColor={Colors.main}
              activeOutlineColor={Colors.main}
              keyboardType="numeric"
              mode={"outlined"}
              label={
                <Text style={{ backgroundColor: Colors.background }}>
                  Certificate
                  <Text style={{ color: "red", backgroundColor: "white" }}>
                    *
                  </Text>
                </Text>
              }
              value={certificateNumber}
              onChangeText={(text) => setCertificateNumber(text)}
              placeholder={"xxxxxxxx"}
            ></TextInput>
            <TextInput
              style={styles.inputFields}
              outlineColor={Colors.main}
              activeOutlineColor={Colors.main}
              maxLength={8}
              mode={"outlined"}
              label={
                <Text style={{ backgroundColor: Colors.background }}>
                  Certificate Issuance Date
                  <Text style={{ color: "red", backgroundColor: "white" }}>
                    *
                  </Text>
                </Text>
              }
              keyboardType="numeric"
              value={certificateIssuanceDate}
              onChangeText={(text) => setCertificateIssuanceDate(text)}
              placeholder={"DDMMYYYY"}
            ></TextInput>
            <TouchableOpacity style={styles.registerBtn} onPress={handleSignUp}>
              <Text style={styles.btnTxt} variant="titleMedium">
                Register
              </Text>
            </TouchableOpacity>
          </KeyboardAwareScrollView>
        </View>
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
  inputFields: {
    height: 40,
    fontFamily: "Manrope-Regular",
    backgroundColor: Colors.background,
  },
  registerBtn: {
    backgroundColor: Colors.main,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    paddingLeft: 16,
    paddingRight: 16,
    width: "70%",
    height: 40,
    marginTop: 10,
    marginLeft: "15%",
  },
  btnTxt: {
    color: Colors.white,
    fontSize: 18,
  },
});
