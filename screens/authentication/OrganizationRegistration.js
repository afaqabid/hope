import { View, SafeAreaView, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ScrollView, Alert} from 'react-native'
import React from 'react'
import { Provider as PaperProvider, Avatar, Text, TextInput, Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../firebase';
import { useState, useEffect } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useFonts } from 'expo-font';
import Colors from '../../assets/constants/Colors';

export default function OrganizationRegistration() {
  let [fontLoaded]=useFonts({
    'Manrope-Bold': require('../../assets/fonts/Manrope-Bold.ttf'),
    'Manrope-ExtraBold': require('../../assets/fonts/Manrope-ExtraBold.ttf'),
    'Manrope-ExtraLight': require('../../assets/fonts/Manrope-ExtraLight.ttf'),
    'Manrope-Light': require('../../assets/fonts/Manrope-Light.ttf'),
    'Manrope-Medium': require('../../assets/fonts/Manrope-Medium.ttf'),
    'Manrope-Regular': require('../../assets/fonts/Manrope-Regular.ttf'),
    'Manrope-SemiBold': require('../../assets/fonts/Manrope-SemiBold.ttf'),
  });

  const [name, setName] = useState("")
  const [buildIn, setBuildIn] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [cnic, setCNIC] = useState('')
  const [cnicIssueDate, setCNICIssueDate] = useState('')
  const [certificateNumber, setCertificateNumber] = useState('')

  const navigation = useNavigation();

  const saveDetailsToDatabase = () => {
    set(ref(db, 'email/' + username), {
      username: username,
      email: email,
      password:password,
      accountType:'Organization'
    })
    .then()
    .catch((error)=>{
      alert(error)
    })

    set(ref(db, 'hope/users/organization/' + username), {
      username: username,
      email: email,
      password:password,
      address:address,
      buildIn:buildIn,
      name:name,
      certificateNumber:certificateNumber
    })
    .then()
    .catch((error)=>{
      alert(error)
    })

    set(ref(db, 'hope/users/organization/' + username + '/location'), {
      latitude: "",
      longitude: "",
    })
    .then()
    .catch((error)=>{
      alert(error)
    })

    set(ref(db, 'hope/users/organization/' + username + '/cnicDetails'), {
      cnicNo: cnic,
      cnicIssueDate: cnicIssueDate,
    })
    .then()
    .catch((error)=>{
      alert(error)
    })

    set(ref(db, 'hope/users/organization/' + username + '/bankDetails'), {
      accountHolderName: "",
      accountNumber: "",
    })
    .then()
    .catch((error)=>{
      alert(error)
    })

    // set(ref(db, 'hope/users/donor/' + username + '/donations'), {
    //   accountHolderName: "",
    //   accountNumber: "",
    // })
    // .then()
    // .catch((error)=>{
    //   alert(error)
    // })



  }

  const saveAuthenticationDetails = () =>{
    createUserWithEmailAndPassword(auth,email, password)
      .then(userCredentials => {
        sendEmailVerification(auth.currentUser)
        .then(
        )
        .catch((error)=>{
          alert(error.message)
        })
        const user = userCredentials.user;
        console.log('Registered with:', user.email);
        Alert.alert(
          'Congratulations!', 
          "You've been registered as an Organization, Please verify through the link sent to your registered email!",
          [ 
          {text: 'Okay!', onPress: () => navigation.navigate("OrganizationLogin")},          
          ])

      })
      .catch(error => alert(error.message))
  }

  const handleSignUp = () => {
    if(name.trim() == "" || buildIn.trim()=="" || email.trim() == "" || username.trim()=="" || password.trim() == "" || confirmPassword.trim()=="" || phone.trim() == "" || address.trim()=="" || cnic.trim() == "" || cnicIssueDate.trim()=="")
    {
      alert("Please Enter All Fields!")
    }
    else
    {
      if(password==confirmPassword)
      {
        saveDetailsToDatabase();
        saveAuthenticationDetails();
      }
      else
      {
        alert("Password & ConfirmPassword doesn't match!");
      }
    }
  }

  const validateName = (text) => {
    const result = text.replace(/[^a-z]/gi, '');
    return result;
  };

  return (
    <PaperProvider>
        <SafeAreaView style={styles.container}>
          <View style={styles.mainContainer}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "position" : "height"}>
              <ScrollView>
                <Text style={styles.heading} variant="displayMedium">Registration</Text>
                <TextInput style={styles.inputFields} outlineColor={Colors.main} activeOutlineColor={Colors.main} mode={'outlined'} maxLength={20}  label={'Name'} value={name} onChangeText={(text) => {setName(validateName(text))}} ></TextInput>      
                <TextInput style={styles.inputFields} outlineColor={Colors.main} activeOutlineColor={Colors.main} mode={'outlined'} maxLength={8} keyboardType='numeric' label={'Date Of Birth'} value={buildIn} onChangeText={text => setBuildIn(text)} placeholder={"DDMMYYYY"}></TextInput>      
                <TextInput style={styles.inputFields} outlineColor={Colors.main} activeOutlineColor={Colors.main} mode={'outlined'} maxLength={25} label={'Email'} value={email} onChangeText={text => setEmail(text)} keyboardType='email-address' ></TextInput>      
                <TextInput style={styles.inputFields} outlineColor={Colors.main} activeOutlineColor={Colors.main} mode={'outlined'} maxLength={10} label={'Username'} value={username} onChangeText={text=>setUsername(text)} ></TextInput>      
                <TextInput style={styles.inputFields} outlineColor={Colors.main} activeOutlineColor={Colors.main} mode={'outlined'} maxLength={16} label={'Password'} value={password} secureTextEntry onChangeText={text => setPassword(text)}></TextInput>      
                <TextInput style={styles.inputFields} outlineColor={Colors.main} activeOutlineColor={Colors.main} mode={'outlined'} maxLength={16} label={'Confirm Password'} value={confirmPassword} secureTextEntry onChangeText={text => setConfirmPassword(text)} ></TextInput>
                <TextInput style={styles.inputFields} outlineColor={Colors.main} activeOutlineColor={Colors.main} mode={'outlined'} maxLength={11} label={'Phone #'} value={phone} onChangeText={text => setPhone(text)} keyboardType = 'numeric' ></TextInput>      
                <TextInput style={styles.inputFields} outlineColor={Colors.main} activeOutlineColor={Colors.main} mode={'outlined'} maxLength={50} multiline label={'Address'} value={address} onChangeText={text => setAddress(text)}></TextInput>      
                <TextInput style={styles.inputFields} outlineColor={Colors.main} activeOutlineColor={Colors.main} mode={'outlined'} label={'CNIC'} maxLength={13} value={cnic} onChangeText={text => setCNIC(text)} keyboardType = 'numeric' ></TextInput>      
                <TextInput style={styles.inputFields} outlineColor={Colors.main} activeOutlineColor={Colors.main} mode={'outlined'} label={'CNIC Issue Date'} value={cnicIssueDate} onChangeText={text => setCNICIssueDate(text)} placeholder={"DDMMYYYY"}></TextInput>      
                <TextInput style={styles.inputFields} outlineColor={Colors.main} activeOutlineColor={Colors.main} mode={'outlined'} label={'Certificate Number'} value={certificateNumber} onChangeText={text => setCertificateNumber(text)} placeholder={"DDMMYYYY"}></TextInput>      
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
    backgroundColor:Colors.background,
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
    color:Colors.main
  },
  inputFields:{
    height:40,
    fontFamily:'Manrope-Regular',
  },
  registerBtn:{
    backgroundColor: Colors.main,
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
    color: Colors.white,
    fontSize: 18
  }});
