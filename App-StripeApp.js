import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import StripeApp from "./StripeApp";
import { StripeProvider } from "@stripe/stripe-react-native";
export default function App() {
  return (
    <StripeProvider publishableKey="pk_test_51MYieUJyFWW0XhyN6ZLddGK5LcjcVneltxGF3WyqTQMKOXUaFJX8TYmX1GPWv8cahXhhkKYHUbF3XOnOuVnT9wpP00Z0QWaasG">
      <StripeApp />
    </StripeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
