import { View, SafeAreaView, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ScrollView, Alert} from 'react-native'
import React from 'react'
import { Provider as PaperProvider, Avatar, Text, TextInput, Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native';

export default function DonorRegistration() {
  const navigation=useNavigation();
  const check=()=>{
    Alert.alert(
      'Congratulations!', 
      "You've been registered as a Donor!",
      [ 
      {text: 'Okay!', onPress: () => navigation.navigate("DonorLogin")},          
    ])
  }

  return (
    <PaperProvider>
        <SafeAreaView style={styles.container}>
          <View style={styles.mainContainer}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "position" : "height"}>
              <ScrollView>
                <Text style={styles.heading} variant="displayMedium">Registration</Text>
                <TextInput style={styles.usernameInput} mode={'outlined'}  label={'Name'} ></TextInput>      
                <TextInput style={styles.usernameInput} mode={'outlined'}  label={'Date Of Birth'} ></TextInput>      
                <TextInput style={styles.passwordInput} secureTextEntry mode={'outlined'} label={'Email'} ></TextInput>      
                <TextInput style={styles.usernameInput} mode={'outlined'} label={'Username'} ></TextInput>      
                <TextInput style={styles.passwordInput} secureTextEntry mode={'outlined'} label={'Password'} ></TextInput>      
                <TextInput style={styles.usernameInput} mode={'outlined'} label={'Confirm Password'} ></TextInput>      
                <TextInput style={styles.passwordInput} secureTextEntry mode={'outlined'} label={'Password'} ></TextInput>      
                <TextInput style={styles.usernameInput} mode={'outlined'} label={'Phone #'} ></TextInput>      
                <TextInput style={styles.passwordInput} secureTextEntry mode={'outlined'} label={'Address'} ></TextInput>      
                <TextInput style={styles.usernameInput} mode={'outlined'} label={'CNIC'} ></TextInput>      
                <TextInput style={styles.passwordInput} secureTextEntry mode={'outlined'} label={'CNIC Issue Date'} ></TextInput>      
                <Button style={styles.loginBtn} mode='contained' onPress={()=>check()}>Login</Button>
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
