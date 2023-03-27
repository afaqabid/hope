import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider as PaperProvider } from "react-native-paper";
import RequestHead from "../../components/RequestHead";
import Colors from "../../assets/constants/Colors";

export default function RequestsTab() {
  return (
    <PaperProvider>
      <View style={{ backgroundColor: Colors.background }}>
        <ScrollView>
          <RequestHead></RequestHead>
        </ScrollView>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({});
