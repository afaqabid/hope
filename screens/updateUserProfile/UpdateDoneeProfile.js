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
import { auth, firebaseConfig } from "../../firebase";
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
import { db } from "../../firebase";
import { ref, set, update } from "firebase/database";
import { useFonts } from "expo-font";
import Colors from "../../assets/constants/Colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function UpdateDoneeProfile() {
  let [fontLoaded] = useFonts({
    "Manrope-Bold": require("../../assets/fonts/Manrope-Bold.ttf"),
    "Manrope-ExtraBold": require("../../assets/fonts/Manrope-ExtraBold.ttf"),
    "Manrope-ExtraLight": require("../../assets/fonts/Manrope-ExtraLight.ttf"),
    "Manrope-Light": require("../../assets/fonts/Manrope-Light.ttf"),
    "Manrope-Medium": require("../../assets/fonts/Manrope-Medium.ttf"),
    "Manrope-Regular": require("../../assets/fonts/Manrope-Regular.ttf"),
    "Manrope-SemiBold": require("../../assets/fonts/Manrope-SemiBold.ttf"),
  });

  const HideKeyboard = ({ children }) => (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      {children}
    </TouchableWithoutFeedback>
  );

  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [address, setAddress] = useState("");
  const [cnic, setCNIC] = useState("");
  const [cnicIssueDate, setCNICIssueDate] = useState("");

  const navigation = useNavigation();

  const saveDetailsToDatabase = () => {
    set(ref(db, "hope/usertype/donee/" + username), {
      email: auth.currentUser.email,
    })
      .then()
      .catch((error) => {
        alert(error);
      });
    
    set(ref(db, "hope/users/donee/" + username), {
      username: auth.currentUser.username,
      email: auth.currentUser.email,
      password: password,
      address: address,
      dob: dob,
      name: name,
      phone: phoneNum,
    })
      .then()
      .catch((error) => {
        alert(error);
      });

    set(ref(db, "hope/users/donee/" + username + "/location"), {
      latitude: "",
      longitude: "",
    })
      .then()
      .catch((error) => {
        alert(error);
      });

    set(ref(db, "hope/users/donee/" + username + "/cnicDetails"), {
      cnicNo: cnic,
      cnicIssueDate: cnicIssueDate,
    })
      .then()
      .catch((error) => {
        alert(error);
      });

    set(ref(db, "hope/users/donee/" + username + "/bankDetails"), {
      accountHolderName: "",
      accountNumber: "",
    })
      .then()
      .catch((error) => {
        alert(error);
      });
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
      })
      .catch((error) => alert(error.message));
  };

  const handleSignUp = () => {
    var check = true;
    var check1 = true;
    var str = "";
    if (
      name.trim() == "" ||
      dob.trim() == "" ||
      password.trim() == "" ||
      confirmPassword.trim() == "" ||
      phoneNum.trim() == "" ||
      address.trim() == "" ||
      cnic.trim() == ""
    ) {
      check = true;
      check1 = false;
    } else {
      if (!validateDate(dob) || !validateDate(cnicIssueDate)) {
        str = str + "Invalid Date Format!\n";
        check = false;
        check1 = true;
      }
      if (password != confirmPassword) {
        str = str + "Password & ConfirmPassword Doesn't Match!\n";
        check = false;
        check1 = true;
      }
      if (cnic.length != 13) {
        str = str + "CNIC Length Doesn't Match!\n";
        check = false;
        check1 = true;
      }
      if (phoneNum.length != 11) {
        console.log(phoneNum.length);
        str = str + "Phone Length Doesn't Match!\n";
        check = false;
        check1 = true;
      }

    }
    if (!check1) {
      alert("Please Enter All Fields!");
    } else if (!check) {
      alert(str);
    } else {
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
              Update Donee Profile
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
                  Date Of Birth
                  <Text style={{ color: "red", backgroundColor: "white" }}>
                    *
                  </Text>
                </Text>
              }
              value={dob}
              onChangeText={(text) => setDob(text)}
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
            value={auth.currentUser.email}
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
              label={
                <Text style={{ backgroundColor: Colors.background }}>
                  Phone
                  <Text style={{ color: "red", backgroundColor: "white" }}>
                    *
                  </Text>
                </Text>
              }
              maxLength={11}
              value={phoneNum}
              onChangeText={(text) => setPhoneNum(text)}
              keyboardType="numeric"
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
              mode={"outlined"}
              label={
                <Text style={{ backgroundColor: Colors.background }}>
                  CNIC
                  <Text style={{ color: "red", backgroundColor: "white" }}>
                    *
                  </Text>
                </Text>
              }
              maxLength={13}
              value={cnic}
              onChangeText={(text) => setCNIC(text)}
              keyboardType="numeric"
            ></TextInput>
            <TextInput
              style={styles.inputFields}
              outlineColor={Colors.main}
              activeOutlineColor={Colors.main}
              maxLength={8}
              mode={"outlined"}
              label={
                <Text style={{ backgroundColor: Colors.background }}>
                  CNIC Issue Date
                  <Text style={{ color: "red", backgroundColor: "white" }}>
                    *
                  </Text>
                </Text>
              }
              value={cnicIssueDate}
              onChangeText={(text) => setCNICIssueDate(text)}
              placeholder={"DDMMYYYY"}
              keyboardType="numeric"
            ></TextInput>
            <TouchableOpacity style={styles.registerBtn} onPress={handleSignUp}>
              <Text style={styles.btnTxt} variant="titleMedium">
                Update
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
