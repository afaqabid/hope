import { SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import {
  Provider as PaperProvider,
  Avatar,
  Text,
  TextInput,
  Divider,
  Button,
} from "react-native-paper";
import Colors from "../../assets/constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../firebase";
import { sendPasswordResetEmail } from "firebase/auth";

const ResetPassword = () => {
  const [email, setEmail] = useState();
  const navigation = useNavigation();

  const sendResetPasswordMail = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Password reset email sent!");
        navigation.navigate("SelectPortal");
      })
      .catch((error) => {
        alert("User Not Found!");
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.mainContainer}>
          <Text style={styles.heading} variant="displayMedium">
            Reset Password
          </Text>
          <TextInput
            style={styles.usernameInput}
            mode={"outlined"}
            outlineColor={Colors.main}
            activeOutlineColor={Colors.main}
            label={"Email"}
            value={email}
            onChangeText={(text) => setEmail(text)}
          ></TextInput>
          {/* <TouchableOpacity style={styles.loginBtn} onPress={handleLogin} > */}
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={sendResetPasswordMail}
          >
            <Text style={styles.btnTxt} variant="titleMedium">
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
};

export default ResetPassword;

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
  usernameInput: {
    width: "75%",
    height: 40,
    fontFamily: "Manrope-Regular",
    marginTop: 100,
  },
  passwordInput: {
    width: "75%",
    height: 40,
  },
  loginBtn: {
    backgroundColor: Colors.main,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 5,
    paddingLeft: 16,
    paddingRight: 16,
    width: "50%",
    height: 40,
    marginTop: 10,
  },
  registerBtn: {
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 5,
    paddingLeft: 16,
    paddingRight: 16,
    width: "50%",
    height: 40,
    borderColor: Colors.main,
    borderWidth: 2,
  },
  btnTxt: {
    color: Colors.white,
    fontSize: 18,
  },
  btnTxtReg: {
    color: Colors.main,
    fontSize: 18,
  },
});
