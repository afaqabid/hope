import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Provider as PaperProvider } from 'react-native-paper'
import MapView, {Marker} from 'react-native-maps'
import DonationHead from '../../components/DonationHead'

export default function DonationsTab() {

  const [mapRegion, setMapRegion] = useState({
    latitude: 31.4504,
    longitude:73.1350,
  })
  return (
    <PaperProvider>
        <SafeAreaView style={styles.temp}>
          <View>
            <MapView style={styles.upperView}>
              <Marker coordinate={mapRegion} title='Home' />
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
    marginTop:-40,
    width:'95%',
    marginLeft:10,
    borderRadius:5,
    marginBottom:10

  },
  lowerView:{
    height:'52%',
  },
})