import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Provider as PaperProvider } from 'react-native-paper'
import MapView, {Marker} from 'react-native-maps'
import DonationHead from '../../components/DonationHead'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import Colors from '../../assets/constants/Colors';

export default function DonationsTab() {
  const [mapRegion, setMapRegion] = useState({
    latitude: 31.4504,
    longitude:73.1350,
  })
  return (
    <PaperProvider>
        <SafeAreaView style={styles.mainContainer}>
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
  mainContainer:{
    flex:1,
    backgroundColor: Colors.background,
  },
  upperView:{
    backgroundColor:'black',
    height:300,
    marginTop:-40,
    width:'100%',

  },
  lowerView:{
    height:'56%',
    backgroundColor:'#EFECEB'
  },
})