import {Keyboard,  KeyboardAvoidingView, ScrollView, StyleSheet, TouchableOpacity, View, TextInput, TouchableWithoutFeedback} from 'react-native'
import React from 'react'
import { Provider as PaperProvider, Text, Button} from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFonts } from 'expo-font'
import { useNavigation } from '@react-navigation/native'

export default function NewMonetaryRequestPost() {
  let [fontLoaded]=useFonts({
        'Manrope-Bold': require('../../../assets/fonts/Manrope-Bold.ttf'),
        'Manrope-ExtraBold': require('../../../assets/fonts/Manrope-ExtraBold.ttf'),
        'Manrope-ExtraLight': require('../../../assets/fonts/Manrope-ExtraLight.ttf'),
        'Manrope-Light': require('../../../assets/fonts/Manrope-Light.ttf'),
        'Manrope-Medium': require('../../../assets/fonts/Manrope-Medium.ttf'),
        'Manrope-Regular': require('../../../assets/fonts/Manrope-Regular.ttf'),
        'Manrope-SemiBold': require('../../../assets/fonts/Manrope-SemiBold.ttf'),
    });

    const HideKeyboard = ({ children }) => (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
      </TouchableWithoutFeedback>
      );

      const navigation = useNavigation();

      const postRequest = () => {
        if (title.trim() == "" || description.trim() == "" || amount < 0) {
          alert("Please Insert All Fields!\nMinimum amount is 100 Rupees.");
        } else {
          alert("Posted Donation Request Successfully!");
          navigation.navigate("DoneePortal");
        }
      };

      return (
        <PaperProvider>
          <SafeAreaView style={styles.mainContainer}>
            <KeyboardAwareScrollView>
              <ScrollView>
                <View style={styles.detailsContainer}>
                  <Text style={styles.titleTxt}>Request Amount</Text>
                  <TextInput
                    style={styles.donationTitle}
                    placeholder="Enter Amount"
                    keyboardType="numeric"
                    onChangeText={(text) => {
                      setAmount(text);
                    }}
                  ></TextInput>
                  <Text style={styles.titleTxt}>Request Title</Text>
                  <TextInput
                    style={styles.donationTitle}
                    placeholder="Write Request Title Here."
                    onChangeText={(text) => {
                      setTitle(text);
                    }}
                  ></TextInput>
                  <Text style={styles.titleTxt}>Description</Text>
                  <TextInput
                    multiline={true}
                    style={styles.description}
                    placeholder="Write Donation Description Here."
                    onChangeText={(text) => {
                      setDescription(text);
                    }}
                  ></TextInput>
                  <View style={styles.btnContainer}>
                    <Button style={styles.btnPost} onPress={postDonation}>
                      <Text style={styles.btnTxtPost}>Post</Text>
                    </Button>
                    <Button style={styles.btnCancel}>
                      <Text
                        style={styles.btnTxtCancel}
                        onPress={() => {
                          navigation.navigate("NewRequestPost");
                        }}
                      >
                        Cancel
                      </Text>
                    </Button>
                  </View>
                </View>
              </ScrollView>
            </KeyboardAwareScrollView>
          </SafeAreaView>
        </PaperProvider>
      );
    }

const styles = StyleSheet.create({
  mainContainer:{
    flex:1,
    display:'flex',
    alignItems:'center',
    backgroundColor:'#FDFAF6',
  },
  imageContainer:{
    height:'80%',
    backgroundColor:'white',
    width:'100%',
    margin:0,
    borderRadius:10,
    padding:10
  },

  detailsContainer:{
    marginTop:'40%',
    height:'60%',
    backgroundColor:'transparent',
    width:'100%',
    margin:10,
    borderRadius:10,
    display:'flex',
  },

  titleTxt:{
    fontSize:20,
    color:'#1C702B',
    fontFamily:'Manrope-ExtraBold',
    marginLeft:5,
    marginBottom:0

  },

  donationTitle:{
    height:45,
    fontFamily:'Manrope-Regular',
    width:'95%',
    fontSize:18,
    backgroundColor:'white',
    padding:10,
    borderRadius:5,
    
  },
  
  description:{
    height:45,
    fontFamily:'Manrope-Regular',
    width:'95%',
    fontSize:18,
    backgroundColor:'white',
    padding:10,
    height:200,
    borderRadius:5,
  },

  btnContainer:{
    display:'flex',
    flexDirection:'row',
    marginTop:5,
  },
  btnPost:{
    backgroundColor: "#1C702B",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    height:55,
    minWidth:'45%',
    marginTop:10,
  },
  btnCancel:{
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    height:55,
    minWidth:'45%',
    borderWidth:2,
    borderColor:'#1C702B',
    marginTop:10,
    marginLeft:10,

  },
  btnTxtPost:{
    color:'white', 
    fontSize:18, 
    fontFamily:'Manrope-Bold', 
    justifyContent:'center',
    alignItems:'center',
  },
  btnTxtCancel:{
    color: "#1C702B",
    fontSize:18,
    fontFamily:'Manrope-Bold', 
    justifyContent:'center',
    alignItems:'center'
  }
  
})