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
import React, { useRef, useState, useEffect } from "react";
import {
  Provider as PaperProvider,
  Avatar,
  Text,
  TextInput,
  Button,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { auth, firebaseConfig } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  updateEmail,
} from "firebase/auth";
import { db } from "../../firebase";
import { ref, set, update } from "firebase/database";
import { useFonts } from "expo-font";
import Colors from "../../assets/constants/Colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function UpdateDonorProfile() {
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
  const [phoneNum, setPhoneNum] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [cnic, setCNIC] = useState("");
  const [cnicIssueDate, setCNICIssueDate] = useState("");

  const navigation = useNavigation();

  const saveDetailsToDatabase = () => {
    update(ref(db, `hope/users/donor/${auth.currentUser.username}`), {
      name: name,
      dob: dob,
      password: password,
      confirmPassword,
      phone: phoneNum,
      address: address,
    })
      .then(() => {
        // Update successful
      })
      .catch((error) => {
        alert(error);
      });

    update(ref(db, `hope/users/donor/${auth.currentUser.uid}/cnicDetails`), {
      cnicNo: cnic,
      cnicIssueDate: cnicIssueDate,
    })
      .then(() => {
        // Update successful
      })
      .catch((error) => {
        alert(error);
      });
  };

  const saveAuthenticationDetails = () => {
    saveDetailsToDatabase();
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(() => {
        // Update successful
      })
      .catch((error) => {
        // An error occurred
        // ...
      });
    sendEmailVerification(auth.currentUser)
      .then(() => {
        // Email verification sent
      })
      .catch((error) => {
        alert(error.message);
      });
  };


  const handleUpdate = () => {
    if (!name || !dob || !phoneNum || !password || confirmPassword || !address || !cnic || !cnicIssueDate) {
      // Display an error message
      alert('Please enter all fields');
      return;
    }}

    saveAuthenticationDetails();
      
      if (!fontLoaded) {
      return null;
      } else {
        return (
          <PaperProvider>
            <KeyboardAvoidingView style={{ flex: 1 }}>
              <ScrollView>
                <SafeAreaView>
                  <View style={styles.container}>
                    <Avatar.Icon
                      style={styles.avatar}
                      size={100}
                      icon="account"
                    />
                    <Text style={styles.title}>Update Donor Profile</Text>
                    <View style={styles.formContainer}>
                      <TextInput
                        label="Name"
                        mode="outlined"
                        value={name}
                        onChangeText={(text) => setName(text)}
                        style={styles.textInput}
                      />
                      <TextInput
                        label="Date of Birth"
                        mode="outlined"
                        value={dob}
                        onChangeText={(text) => setDob(text)}
                        style={styles.textInput}
                      />
                     
                      <TextInput
                        label="Phone Number"
                        mode="outlined"
                        value={phoneNum}
                        onChangeText={(text) => setPhoneNum(text)}
                        style={styles.textInput}
                      />
                      <TextInput
                        label="Address"
                        mode="outlined"
                        value={address}
                        onChangeText={(text) => setAddress(text)}
                        style={styles.textInput}
                      />
                      <TextInput
                        label="Password"
                        mode="outlined"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        style={styles.textInput}
                      />
                      <TextInput
                        label="Confirm Password"
                        mode="outlined"
                        value={confirmPassword}
                        onChangeText={(text) => setConfirmPassword(text)}
                        style={styles.textInput}
                      />
                      <TextInput
                        label="CNIC"
                        mode="outlined"
                        value={cnic}
                        onChangeText={(text) => setCNIC(text)}
                        style={styles.textInput}
                      />
                      <TextInput
                        label="CNIC Issue Date"
                        mode="outlined"
                        value={cnicIssueDate}
                        onChangeText={(text) => setCNICIssueDate(text)}
                        style={styles.textInput}
                      />
                      <Button
                        mode="contained"
                        onPress={handleUpdate}
                        style={styles.button}
                      >
                        Update
                      </Button>
                    </View>
                  </View>
                </SafeAreaView>
              </ScrollView>
            </KeyboardAvoidingView>
          </PaperProvider>
        );
      }}
      
      const styles = StyleSheet.create({
      container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: 50,
      backgroundColor: Colors.main,
      },
      avatar: {
      backgroundColor: Colors.background,
      marginBottom: 16,
      },
      title: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 16,
      },
      formContainer: {
      width: "100%",
      },
      textInput: {
      marginBottom: 16,
      },
      button: {
        backgroundColor: Colors.main,
      marginTop: 16,
      marginBottom: 32,
      },
      });        