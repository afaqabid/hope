import { View, SafeAreaView, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ScrollView, Alert} from 'react-native'
import React from 'react'
import { Provider as PaperProvider, Avatar, Text, TextInput, Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../firebase';
import { useState, useEffect } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from '../../firebase';
import { ref, set, update } from "firebase/database";
import { useFonts } from 'expo-font';


export default function DonorRegistration() {
  let [fontLoaded]=useFonts({
    'Manrope-Bold': require('../../assets/fonts/Manrope-Bold.ttf'),
    'Manrope-ExtraBold': require('../../assets/fonts/Manrope-ExtraBold.ttf'),
    'Manrope-ExtraLight': require('../../assets/fonts/Manrope-ExtraLight.ttf'),
    'Manrope-Light': require('../../assets/fonts/Manrope-Light.ttf'),
    'Manrope-Medium': require('../../assets/fonts/Manrope-Medium.ttf'),
    'Manrope-Regular': require('../../assets/fonts/Manrope-Regular.ttf'),
    'Manrope-SemiBold': require('../../assets/fonts/Manrope-SemiBold.ttf'),
  })

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('');

  const navigation = useNavigation();

  const handleSignUp = () => {
    set(ref(db, 'email/' + username), {
    username: username,
    email: email,
    password:password,
    accountType:'Donor'
  })
  .then(()=>{
    alert("Account Added!")
  })
  .catch((error)=>{
    alert(error)
  })







      createUserWithEmailAndPassword(auth,email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Registered with:', user.email);
        Alert.alert(
          'Congratulations!', 
          "You've been registered as a Donor!",
          [ 
          {text: 'Okay!', onPress: () => navigation.navigate("DonorLogin")},          
          ])

      })
      .catch(error => alert(error.message))
  }
  return (
    <PaperProvider>
        <SafeAreaView style={styles.container}>
          <View style={styles.mainContainer}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "position" : "height"}>
              <ScrollView>
                <Text style={styles.heading} variant="displayMedium">Registration</Text>
                <TextInput style={styles.usernameInput} outlineColor='#293241' activeOutlineColor='#293241' mode={'outlined'}  label={'Name'} ></TextInput>      
                <TextInput style={styles.usernameInput} outlineColor='#293241' activeOutlineColor='#293241' mode={'outlined'}  label={'Date Of Birth'} ></TextInput>      
                <TextInput style={styles.passwordInput} outlineColor='#293241' activeOutlineColor='#293241' mode={'outlined'} label={'Email'} value={email} onChangeText={text => setEmail(text)}></TextInput>      
                <TextInput style={styles.usernameInput} outlineColor='#293241' activeOutlineColor='#293241' mode={'outlined'} label={'Username'} value={username} onChangeText={text=>setUsername(text)} ></TextInput>      
                <TextInput style={styles.passwordInput} outlineColor='#293241' activeOutlineColor='#293241' secureTextEntry mode={'outlined'} label={'Password'} value={password} onChangeText={text => setPassword(text)}></TextInput>      
                <TextInput style={styles.passwordInput} outlineColor='#293241' activeOutlineColor='#293241' secureTextEntry mode={'outlined'} label={'Password'} ></TextInput>      
                <TextInput style={styles.usernameInput} outlineColor='#293241' activeOutlineColor='#293241' mode={'outlined'} label={'Confirm Password'} ></TextInput>      
                <TextInput style={styles.usernameInput} outlineColor='#293241' activeOutlineColor='#293241' mode={'outlined'} label={'Phone #'} ></TextInput>      
                <TextInput style={styles.passwordInput} outlineColor='#293241' activeOutlineColor='#293241' secureTextEntry mode={'outlined'} label={'Address'} ></TextInput>      
                <TextInput style={styles.usernameInput} outlineColor='#293241' activeOutlineColor='#293241' mode={'outlined'} label={'CNIC'} ></TextInput>      
                <TextInput style={styles.passwordInput} outlineColor='#293241' activeOutlineColor='#293241' secureTextEntry mode={'outlined'} label={'CNIC Issue Date'} ></TextInput>      
                <TouchableOpacity style={styles.registerBtn} onPress={handleSignUp} >
                  <Text style={styles.btnTxt} variant='titleMedium'>Register</Text>
                </TouchableOpacity>
              </ScrollView>
            </KeyboardAvoidingView>
          </View>
        </SafeAreaView>
    </PaperProvider>
  )
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#FFFFFF',
  },
  mainContainer:{
    flex:1,
    alignItems:'center',    
  },
  heading:{
    textAlign:'center',
    marginTop:'15%',
    marginBottom:'15%',
    fontFamily:'Manrope-ExtraBold',
    color:'#293241'
  },
  usernameInput:{
    height:40,
    fontFamily:'Manrope-Regular',

  },
  passwordInput:{
    height:40,
  },
  registerBtn:{
    backgroundColor: "#3F51B5",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    paddingLeft: 16,
    paddingRight: 16,
    width:'70%',
    height:40,
    marginTop:10,
    marginLeft:'15%'
  },
  btnTxt: {
    color: "#fff",
    fontSize: 18
  }});
