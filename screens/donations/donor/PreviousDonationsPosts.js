import { StyleSheet, ScrollView, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider as PaperProvider } from "react-native-paper";
import PreviousDonationPostHead from "../../../components/PreviousDonationPostHead";

export default function PreviousDonationsPosts() {
  return (
    <PaperProvider>
      <SafeAreaView>
        <ScrollView>
          <PreviousDonationPostHead></PreviousDonationPostHead>
        </ScrollView>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({});
