import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Provider as PaperProvider, Button, Text } from 'react-native-paper'
import { useFonts } from 'expo-font'
import { useNavigation } from '@react-navigation/native'

export default function NewDonationPost() {
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
    <PaperProvider>
        <SafeAreaView style={styles.mainContainer}>
        <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('NewPhysicalItemRequestPost')}>
            <Text style={styles.btnTxt}>Physical Item</Text>
            <Text style={styles.btnDetails}>Donate any sort of physical goods, which may include food, old clothes, wheelchair, portable toilets e.t.c.</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('NewMonetaryItemPost')}>
            <Text style={styles.btnTxt}>Monetary Donation</Text>
            <Text style={styles.btnDetails}>Donate money to help people ease out their living.</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('NewScheduleRequestPost')}>
            <Text style={styles.btnTxt}>Schedule Donation</Text>
            <Text style={styles.btnDetails}>Post a donation on a specific time.</Text>
        </TouchableOpacity>

        </SafeAreaView>
    </PaperProvider>  )
}

const styles = StyleSheet.create({
    mainContainer:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#FDFAF6',
        flex:1,
        
    },
    btn:{
        height:'23.3%',
        width:'95%',
        backgroundColor:'#1C702B',
        color:'white',
        margin:5,
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
        padding:10,
    },

    btnTxt:{
        color:'white',
        fontSize:25,
        fontFamily:'Manrope-Bold'
    },

    btnDetails:{
          color:'white',
        fontSize:15,
        fontFamily:'Manrope-Regular'
    }    
})