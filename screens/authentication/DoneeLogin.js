import {
  Keyboard,
  View,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
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
import { useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import {
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useFonts } from "expo-font";
import Colors from "../../assets/constants/Colors";
import { child, get, ref } from "firebase/database";

export default function DoneeLogin() {
  let [fontLoaded] = useFonts({
    "Manrope-Bold": require("../../assets/fonts/Manrope-Bold.ttf"),
    "Manrope-ExtraBold": require("../../assets/fonts/Manrope-ExtraBold.ttf"),
    "Manrope-ExtraLight": require("../../assets/fonts/Manrope-ExtraLight.ttf"),
    "Manrope-Light": require("../../assets/fonts/Manrope-Light.ttf"),
    "Manrope-Medium": require("../../assets/fonts/Manrope-Medium.ttf"),
    "Manrope-Regular": require("../../assets/fonts/Manrope-Regular.ttf"),
    "Manrope-SemiBold": require("../../assets/fonts/Manrope-SemiBold.ttf"),
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const [check, setCheck] = useState(false);

  async function isDonee() {
    const dbRef = ref(db);
    await get(child(dbRef, "hope/usertype/donee/"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          snapshot.forEach(function (childSnapshot) {
            var key = childSnapshot.key;
            var childData = childSnapshot.val();
            console.log(childData.email, email);
            if (childData.email == email) {
              setCheck(true);
            }
          });
        } else {
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        if (!auth.currentUser.emailVerified) {
          Alert.alert(
            "Email Verification Required",
            "Kindly verify by the email sent to your registered email!",
            [
              {
                text: "Send Email Again",
                onPress: () => {
                  sendEmailVerification(auth.currentUser)
                    .then()
                    .catch((error) => {
                      alert(error.message);
                    });
                },
              },
              { text: "Okay" },
            ]
          );
        } else {
          isDonee();
          if (check) {
            console.log("Logged in with:", user.email);
            navigation.navigate("DoneePortal");
          } else {
            Alert.alert("This email is not registered for Donee Account Type!");
          }
          setEmail("");
          setPassword("");
        }
      })
      .catch((error) => alert(error.message));
  };
  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.mainContainer}>
          <Text style={styles.heading} variant="displayMedium">
            Login
          </Text>
          <TextInput
            style={styles.usernameInput}
            mode={"outlined"}
            outlineColor="#293241"
            activeOutlineColor="#293241"
            label={"Email"}
            value={email}
            onBlur={isDonee}
            onChangeText={(text) => setEmail(text)}
          ></TextInput>
          <TextInput
            style={styles.passwordInput}
            secureTextEntry
            mode={"outlined"}
            outlineColor="#293241"
            activeOutlineColor="#1C702B"
            label={"Password"}
            value={password}
            onChangeText={(text) => setPassword(text)}
          ></TextInput>
          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
            {/* <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => navigation.navigate("DoneePortal")}
          > */}
            <Text style={styles.btnTxt} variant="titleMedium">
              Login
            </Text>
          </TouchableOpacity>
          <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: 1,
              width: "80%",
              marginTop: 10,
              marginBottom: 10,
            }}
          ></View>
          <TouchableOpacity
            style={styles.registerBtn}
            onPress={() => navigation.navigate("DoneeRegistration")}
          >
            <Text style={styles.btnTxtReg} variant="titleMedium">
              Register
            </Text>
          </TouchableOpacity>
          <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: 0,
              width: "80%",
              marginTop: "60%",
              marginBottom: 10,
            }}
          ></View>
          <TouchableOpacity
            onPress={() => navigation.navigate("ResetPassword")}
          >
            <Text style={styles.btnTxtReg} variant="titleMedium">
              Reset Password
            </Text>
          </TouchableOpacity>
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
  usernameInput: {
    width: "75%",
    height: 40,
    fontFamily: "Manrope-Regular",
    backgroundColor: Colors.background,
    marginTop: 100,
  },
  passwordInput: {
    width: "75%",
    backgroundColor: Colors.background,
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
