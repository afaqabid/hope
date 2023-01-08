import { StyleSheet, ScrollView, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Provider as PaperProvider } from 'react-native-paper'
import NotificationHead from '../../components/NotificationHead'

export default function NotificationsTab() {
  return (
    <PaperProvider>
        <View style={{backgroundColor:'#EFECEB'}} >
          <ScrollView>
            <NotificationHead></NotificationHead>
          </ScrollView>
        </View>
    </PaperProvider>
  )
}

const styles = StyleSheet.create({})