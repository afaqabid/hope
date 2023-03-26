import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider as PaperProvider, Button, Text } from "react-native-paper";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";

export default function DoneeRequestsTab() {
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

  return (
    <PaperProvider>
      <View style={styles.mainContainer}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            navigation.navigate("NewRequestPost");
          }}
        >
          <Text style={styles.btnTxt}>Post a Requests</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            navigation.navigate("ActiveRequestsPosts");
          }}
        >
          <Text style={styles.btnTxt}>Active Requests</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            navigation.navigate("PreviousRequestsPosts");
          }}
        >
          <Text style={styles.btnTxt}>Previous Requests</Text>
        </TouchableOpacity>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FDFAF6",
    flex: 1,
  },
  btn: {
    height: "27%",
    width: "95%",
    backgroundColor: "#1C702B",
    color: "white",
    margin: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },

  btnTxt: {
    color: "white",
    fontSize: 25,
    fontFamily: "Manrope-Bold",
  },
});
