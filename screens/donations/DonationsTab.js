import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Provider as PaperProvider } from 'react-native-paper'
import MapView from 'react-native-maps'
import DonationHead from '../../components/DonationHead'

export default function DonationsTab() {
  return (
    <PaperProvider>
        <SafeAreaView style={styles.temp}>
          <View>
            <MapView style={styles.upperView}>

            </MapView>
          </View>
          <View style={styles.lowerView}>
            <ScrollView>
              <DonationHead></DonationHead>

            </ScrollView>


          </View>
        </SafeAreaView>
    </PaperProvider>
  )
}

const styles = StyleSheet.create({
  temp:{
  },
  upperView:{
    backgroundColor:'black',
    height:300,
    marginTop:-45,
    width:'95%',
    marginLeft:10,
    borderRadius:5,
    marginBottom:10

  },
  lowerView:{
    height:'55%',
  },
})