import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Provider as PaperProvider } from 'react-native-paper'
import ChatHead from '../../components/ChatHead'

export default function ChatTab() {
  return (
    <PaperProvider>
        <SafeAreaView>
          <ScrollView>
            <ChatHead></ChatHead>
          </ScrollView>
        </SafeAreaView>
    </PaperProvider>
  )
}

const styles = StyleSheet.create({})