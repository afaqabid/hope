import { StyleSheet, ScrollView, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider as PaperProvider } from "react-native-paper";
import PreviousRequestPostHead from "../../../components/PreviousRequestPostHead";

export default function PreviousRequestsPosts() {
  return (
    <PaperProvider>
      <SafeAreaView>
        <ScrollView>
          <PreviousRequestPostHead></PreviousRequestPostHead>
        </ScrollView>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({});
