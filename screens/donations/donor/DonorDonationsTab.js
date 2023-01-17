import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Provider as PaperProvider, Button, Text } from 'react-native-paper'
import { useFonts } from 'expo-font'
import { useNavigation } from '@react-navigation/native'
 
export default function DonorDonationsTab() {
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
        <View style={styles.mainContainer}>
        <TouchableOpacity style={styles.btn} onPress={()=>{navigation.navigate('NewDonationPost')}}>
            <Text style={styles.btnTxt}>Post a Donation</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnTxt}>Active Donations</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnTxt}>Donate to Organization</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnTxt}>Previous Donations</Text>
        </TouchableOpacity>
        </View>
    </PaperProvider>
  )
}

const styles = StyleSheet.create({
    mainContainer:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#FDFAF6'
    
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
    },

    btnTxt:{
        color:'white',
        fontSize:25,
        fontFamily:'Manrope-Bold'
    }
})