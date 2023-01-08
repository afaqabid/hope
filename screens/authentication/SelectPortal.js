import { SafeAreaView, TouchableOpacity, StyleSheet, Image, Button, View } from 'react-native'
import { Appbar, Avatar, IconButton, Provider as PaperProvider, TouchableRipple, Text } from 'react-native-paper'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useFonts } from 'expo-font'

export default function SelectPortal() {
    let [fontLoaded]=useFonts({
    'Manrope-Bold': require('../../assets/fonts/Manrope-Bold.ttf'),
    'Manrope-ExtraBold': require('../../assets/fonts/Manrope-ExtraBold.ttf'),
    'Manrope-ExtraLight': require('../../assets/fonts/Manrope-ExtraLight.ttf'),
    'Manrope-Light': require('../../assets/fonts/Manrope-Light.ttf'),
    'Manrope-Medium': require('../../assets/fonts/Manrope-Medium.ttf'),
    'Manrope-Regular': require('../../assets/fonts/Manrope-Regular.ttf'),
    'Manrope-SemiBold': require('../../assets/fonts/Manrope-SemiBold.ttf'),
  })
  
  const navigation=useNavigation();
  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.mainContainer}>
          <Text style={styles.heading} variant="displayMedium">Select Portal</Text>
          <IconButton style={styles.avatar} mode='contained' containerColor='#1C702B' icon={'account-outline'} size={100} iconColor={'#FDFAF6'} backgroundColor={'#1C702B'} onPress={()=>navigation.navigate('DonorLogin')} ></IconButton>      
          <Text style={styles.btnTxt} variant="titleLarge">Donor</Text>      
          <IconButton style={styles.avatar} mode='contained' containerColor='#1C702B' icon={'account'} size={100} iconColor={'#FDFAF6'} backgroundColor={'#1C702B'} onPress={()=>navigation.navigate('DoneeLogin')} ></IconButton>      
          <Text style={styles.btnTxt} variant="titleLarge">Donee</Text>      
          <IconButton style={styles.avatar} mode='contained' containerColor='#1C702B' icon={'bank'} size={100} iconColor={'#FDFAF6'} backgroundColor={'#1C702B'} onPress={()=>navigation.navigate('OrganizationLogin')} ></IconButton>      
          <Text style={styles.btnTxt} variant="titleLarge">Organization</Text>      
        </View>
      </SafeAreaView>
    </PaperProvider>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#FDFAF6'
  },
  mainContainer:{
    flex:1,
    alignItems:'center',

  },
  avatar:{
  },
  btnTxt:{
    textAlign:'center',
    marginBottom:10,
    fontFamily:'Manrope-Bold',
    color:'#1C702B'
  },
  heading:{
    textAlign:'center',
    marginTop:'15%',
    marginBottom:'15%',
    fontFamily:'Manrope-ExtraBold',
    fontWeight:'bold',
    color:'#1C702B'
  }
});
