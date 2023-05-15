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
    update(ref(db, `hope/users/donee/${auth.currentUser.username}`), {
      email: auth.currentUser.email,
    })
      .then()
      .catch((error) => {
        alert(error);
      });
    
      update(ref(db, `hope/users/donor/${auth.currentUser.username}`), {
      // username: auth.currentUser.username,
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

    
    update(ref(db, "hope/users/donee/" + username + "/cnicDetails"), {
      cnicNo: cnic,
      cnicIssueDate: cnicIssueDate,
    })
      .then()
      .catch((error) => {
        alert(error);
      });

    update(ref(db, "hope/users/donee/" + username + "/bankDetails"), {
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
      })
      .catch((error) => alert(error.message));
  };

  const handleUpdate = () => {
    if (!name || !dob || !phoneNum || !password || confirmPassword || !address || !cnic || !cnicIssueDate) {
      // Display an error message
      alert('Please enter all fields');
      return;
    }}

    saveAuthenticationDetails();
    
  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
                    <Avatar.Icon
                      style={styles.avatar}
                      size={100}
                      icon="account"
                    />
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
            <TouchableOpacity style={styles.registerBtn} onPress={handleUpdate}>
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
