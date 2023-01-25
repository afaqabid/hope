import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Provider as PaperProvider, Button, Text } from 'react-native-paper'
import { useFonts } from 'expo-font'
import { useNavigation } from '@react-navigation/native'
 
export default function CollectedDonationTab() {
    let [fontLoaded]=useFonts({
        'Manrope-Bold': require('../../../assets/fonts/Manrope-Bold.ttf'),
        'Manrope-ExtraBold': require('../../../assets/fonts/Manrope-ExtraBold.ttf'),
        'Manrope-ExtraLight': require('../../../assets/fonts/Manrope-ExtraLight.ttf'),
        'Manrope-Light': require('../../../assets/fonts/Manrope-Light.ttf'),
        'Manrope-Medium': require('../../../assets/fonts/Manrope-Medium.ttf'),
        'Manrope-Regular': require('../../../assets/fonts/Manrope-Regular.ttf'),
        'Manrope-SemiBold': require('../../../assets/fonts/Manrope-SemiBold.ttf'),
    });

    const navigation = useNavigation();

    return (
    <PaperProvider >
        <View style={styles.mainContainer}>
        <Text style={styles.Txt} variant="displayMedium">Total Donation is 00000/rs</Text>
        </View>
    </PaperProvider>
  )
}

const styles = StyleSheet.create({
    Txt:{
        textAlign:'center',
        marginTop:'15%',
        marginBottom:'15%',
        fontFamily:'Manrope-ExtraBold',
        fontWeight:'bold',
        color:'#1C702B'},
        
    mainContainer:{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            backgroundColor:'#FDFAF6'
        },
})