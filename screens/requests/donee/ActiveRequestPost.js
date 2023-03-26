import { StyleSheet, ScrollView, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider as PaperProvider } from "react-native-paper";
import ActiveRequestPostHead from "../../../components/ActiveRequestPostHead";

export default function ActiveRequestsPosts() {
  return (
    <PaperProvider>
      <SafeAreaView>
        <ScrollView>
          <ActiveRequestPostHead></ActiveRequestPostHead>
        </ScrollView>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({});
