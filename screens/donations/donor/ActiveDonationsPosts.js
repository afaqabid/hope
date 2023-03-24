import { StyleSheet, ScrollView, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider as PaperProvider } from "react-native-paper";
import NotificationHead from "../../../components/NotificationHead";
import ActiveDonationPostHead from "../../../components/ActiveDonationPostHead";

export default function ActiveDonationsPosts() {
  return (
    <PaperProvider>
      <SafeAreaView>
        <ScrollView>
          <ActiveDonationPostHead></ActiveDonationPostHead>
        </ScrollView>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({});
