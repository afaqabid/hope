import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Provider as PaperProvider } from 'react-native-paper'

export default function ChatTab() {
  return (
    <PaperProvider>
        <SafeAreaView>
            <Text>ChatTab</Text>
        </SafeAreaView>
    </PaperProvider>
  )
}

const styles = StyleSheet.create({})