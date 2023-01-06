import { View, SafeAreaView, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ScrollView, Alert} from 'react-native'
import React from 'react'
import { Provider as PaperProvider, Avatar, Text, TextInput, Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../firebase';
import { useState, useEffect } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function OrganizationRegistration() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("DonorLogin")
      }
    })

    return unsubscribe
  }, [])

  const handleSignUp = () => {
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
                <TextInput style={styles.usernameInput} mode={'outlined'}  label={'Name of Organization'} ></TextInput>      
                <TextInput style={styles.usernameInput} mode={'outlined'}  label={'Build in'} ></TextInput>      
                <TextInput style={styles.passwordInput}  mode={'outlined'} label={'Email'} value={email} onChangeText={text => setEmail(text)}></TextInput>      
                <TextInput style={styles.usernameInput} mode={'outlined'} label={'Username'} ></TextInput>      
                <TextInput style={styles.passwordInput} secureTextEntry mode={'outlined'} label={'Password'} value={password} onChangeText={text => setPassword(text)}></TextInput>      
                <TextInput style={styles.usernameInput} mode={'outlined'} label={'Confirm Password'} ></TextInput>      
                <TextInput style={styles.passwordInput} secureTextEntry mode={'outlined'} label={'Password'} ></TextInput>      
                <TextInput style={styles.usernameInput} mode={'outlined'} label={'Phone #'} ></TextInput>      
                <TextInput style={styles.passwordInput} secureTextEntry mode={'outlined'} label={'Address'} ></TextInput>      
                <TextInput style={styles.usernameInput} mode={'outlined'} label={'CNIC'} ></TextInput>      
                <TextInput style={styles.passwordInput} secureTextEntry mode={'outlined'} label={'Certificate Number of Organization'} ></TextInput>      
                <Button style={styles.loginBtn} mode='contained' onPress={()=>handleSignUp()}>Register</Button>
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
    marginTop:10
  }
});
