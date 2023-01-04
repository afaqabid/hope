import { View, SafeAreaView, TouchableOpacity, StyleSheet, KeyboardAvoidingView} from 'react-native'
import React from 'react'
import { Provider as PaperProvider, Avatar, Text, TextInput, Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { auth } from '../../firebase';

export default function OrganizatonLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation();
  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
        navigation.navigate("OrganizationPortal")
      })
      .catch(error => alert(error.message))
    }
    
  return (
    <PaperProvider>
        <SafeAreaView style={styles.container}>
          <View style={styles.mainContainer}>
            <Text style={styles.heading} variant="displayMedium">Login</Text>
            <TextInput style={styles.usernameInput} mode={'outlined'} label={'Username'} value={email} onChangeText={text=>setEmail(text)} ></TextInput>      
            <TextInput style={styles.passwordInput} secureTextEntry mode={'outlined'} label={'Password'} value={password} onChangeText={text=>setPassword(text)}></TextInput>      
            <TouchableOpacity onPress={()=>navigation.navigate('OrganizationRegistration')}>
              <Text style={styles.newUserBtn} variant="labelLarge">New User? Register Here!</Text>
            </TouchableOpacity>
            <Button style={styles.loginBtn} mode='contained' onPress={handleLogin()}>Login</Button>
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
    width:181,
    marginLeft:'40%',
    height:40,
    color:'blue'

  },
  loginBtn:{
    width:'75%',
    marginLeft:'12%',
    height:40,
  }
});
