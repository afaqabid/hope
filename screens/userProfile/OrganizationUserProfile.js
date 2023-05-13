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

const OrganizationUserProfile = () => {
  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.mainContainer}>
          <Text style={styles.heading} variant="displayMedium">
          Organization Details
          </Text>
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
            style={styles.updateOrganizationBtn}
            onPress={() => navigation.navigate("UpdateOrganizationProfile")}
          >
            <Text style={styles.btnTxtReg} variant="titleMedium">
            Update Organization Profile
            </Text>
          </TouchableOpacity>


      </SafeAreaView>
    </PaperProvider>
  );
  
  

};

export default OrganizationUserProfile;

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
  updateOrganizationBtn: {
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 5,
    paddingLeft: 16,
    paddingRight: 16,
    width: "100%",
    alignContent: "center",
    height: 50,
    borderColor: Colors.main,
    borderWidth: 2,
  },
});
