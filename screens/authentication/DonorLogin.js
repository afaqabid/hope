import { View, SafeAreaView, TouchableOpacity, StyleSheet, KeyboardAvoidingView} from 'react-native'
import React from 'react'
import { Provider as PaperProvider, Avatar, Text, TextInput, Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native';

export default function DonorLogin() {
    const navigation=useNavigation();
  return (
    <PaperProvider>
        <SafeAreaView style={styles.container}>
          <View style={styles.mainContainer}>
            <Text style={styles.heading} variant="displayMedium">Login</Text>
            <TextInput style={styles.usernameInput} mode={'outlined'} label={'Username'} ></TextInput>      
            <TextInput style={styles.passwordInput} secureTextEntry mode={'outlined'} label={'Password'} ></TextInput>      
            <TouchableOpacity onPress={()=>navigation.navigate('DonorRegistration')}>
              <Text style={styles.newUserBtn} variant="labelLarge">New User? Register Here!</Text>
            </TouchableOpacity>
            <Button style={styles.loginBtn} mode='contained' onPress={()=>navigation.navigate('DonorPortal')}>Login</Button>
          </View>
        </SafeAreaView>
    </PaperProvider>
  )
}


const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  mainContainer:{
    flex:1,
  },
  heading:{
    textAlign:'center',
    marginTop:'15%',
    marginBottom:'15%'
  },
  usernameInput:{
    width:'75%',
    marginLeft:'12%',
    height:40
  },
  passwordInput:{
    width:'75%',
    marginLeft:'12%',
    height:40,
  },
  newUserBtn:{
    width:180,
    marginLeft:'45%',
    height:40,
    color:'blue'

  },
  loginBtn:{
    width:'75%',
    marginLeft:'12%',
    height:40,
  }
});
