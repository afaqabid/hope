import { SafeAreaView, TouchableOpacity, StyleSheet, Image, Button, View } from 'react-native'
import { Appbar, Avatar, IconButton, Provider as PaperProvider, TouchableRipple, Text } from 'react-native-paper'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function SelectPortal() {
  const navigation=useNavigation();
  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.mainContainer}>
          <Text style={styles.heading} variant="displayMedium">Select Portal</Text>      
          <TouchableOpacity onPress={()=>navigation.navigate('DonorLogin')} >
            <Avatar.Image style={styles.avatar} size={100} source={require('../../assets/user.png')} />
            <Text style={styles.btnTxt} variant="titleMedium">Donor</Text>      
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate('DoneeLogin')}>
            <Avatar.Image style={styles.avatar} size={100} source={require('../../assets/user.png')} />      
            <Text style={styles.btnTxt} variant="titleMedium">Donee</Text>      
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate('OrganizationLogin')}>
            <Avatar.Image style={styles.avatar} size={100} source={require('../../assets/organization.png')} />      
            <Text style={styles.btnTxt} variant="titleMedium">Organization</Text>      
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </PaperProvider>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    // backgroundColor:'#F5F5DC'
  },
  mainContainer:{
    flex:1,
    // backgroundColor:'#F5F5DC'

  },
  avatar:{
    size:50,
    height: 100,
    marginLeft:'38%',
    marginTop:'10%',
    color: 'transparent',
    backgroundColor: 'transparent',
  },
  btnTxt:{
    textAlign:'center',
    marginLeft:'3%'
  },
  heading:{
    textAlign:'center',
    marginTop:'15%',
    marginBottom:'15%'
  }
});
