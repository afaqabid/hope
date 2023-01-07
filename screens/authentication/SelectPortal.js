import { SafeAreaView, TouchableOpacity, StyleSheet, Image, Button, View } from 'react-native'
import { Appbar, Avatar, IconButton, Provider as PaperProvider, TouchableRipple, Text } from 'react-native-paper'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useFonts } from 'expo-font'

export default function SelectPortal() {

  let [fontLoaded]=useFonts({
    'Chesnagro': require('../../assets/fonts/chesnagrotesk-black.otf'),
  })
  
  const navigation=useNavigation();
  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.mainContainer}>
          <Text style={styles.heading} variant="displayMedium">Select Portal</Text>
          <IconButton style={styles.avatar} mode='contained' containerColor='#293241' icon={'account-outline'} size={100} iconColor={'white'} backgroundColor={'#293241'} onPress={()=>navigation.navigate('DonorLogin')} ></IconButton>      
          <Text style={styles.btnTxt} variant="titleLarge">Donor</Text>      
          <IconButton style={styles.avatar} mode='contained' containerColor='#293241' icon={'account'} size={100} iconColor={'white'} backgroundColor={'#293241'} onPress={()=>navigation.navigate('DoneeLogin')} ></IconButton>      
          <Text style={styles.btnTxt} variant="titleLarge">Donee</Text>      
          <IconButton style={styles.avatar} mode='contained' containerColor='#293241' icon={'bank'} size={100} iconColor={'white'} backgroundColor={'#293241'} onPress={()=>navigation.navigate('OrganizationLogin')} ></IconButton>      
          <Text style={styles.btnTxt} variant="titleLarge">Organization</Text>      
        </View>
      </SafeAreaView>
    </PaperProvider>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#E0FBFC'
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
    fontFamily:'Chesnagro',
  },
  heading:{
    textAlign:'center',
    marginTop:'15%',
    marginBottom:'15%',
    fontFamily:'Chesnagro',
    color:'#293241'
  }
});
