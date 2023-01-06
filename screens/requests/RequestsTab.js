import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Provider as PaperProvider } from 'react-native-paper'
import RequestHead from '../../components/RequestHead'


export default function RequestsTab() {
  return (
    <PaperProvider>
        <SafeAreaView style={styles.temp}>
          
          <View style={styles.lowerView}>
            <ScrollView>
              <RequestHead></RequestHead>

            </ScrollView>


          </View>
        </SafeAreaView>
    </PaperProvider>
  )
}

const styles = StyleSheet.create({})