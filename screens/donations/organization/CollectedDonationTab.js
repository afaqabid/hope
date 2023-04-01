import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider as PaperProvider, Button, Text } from "react-native-paper";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../../assets/constants/Colors";
import PreviousDonationOrganizationHead from "../../../components/PreviousDonationsOrganizationHead";

export default function CollectedDonationTab() {
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
      {/* <ScrollView> */}
      <View style={styles.mainContainer}>
        <View style={styles.upperContainer}>
          <View style={styles.collectionCard}>
            <Text style={styles.totalTxt}>Total Donations Collected</Text>
            <Text style={styles.amount}>Rs:642531/-</Text>
          </View>
        </View>
        <ScrollView style={styles.lowerContainer}>
          <View style={styles.lowerContainer}>
            <View style={styles.previousDonations}>
              <PreviousDonationOrganizationHead />
            </View>
          </View>
        </ScrollView>
      </View>
      {/* </ScrollView> */}
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },

  upperContainer: {
    backgroundColor: Colors.main,
    width: "95%",
    height: "40%",
    borderRadius: 10,
    marginBottom: "2%",
    textAlign: "center",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  },
  lowerContainer: {
    // backgroundColor: "red",
    width: "100%",
    height: "60%",
  },
  totalTxt: {
    fontFamily: "Manrope-ExtraLight",
    fontSize: 20,
    color: Colors.background,
    textAlign: "center",
  },
  amount: {
    fontFamily: "Manrope-Bold",
    fontSize: 37,
    color: Colors.background,
    textAlign: "center",
  },
});
