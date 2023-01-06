import { KeyboardAvoidingView, ScrollView, StyleSheet, View } from 'react-native'
import { Avatar, Provider as PaperProvider, Text, Appbar, TextInput, IconButton } from 'react-native-paper'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';

export default function ChatScreen({route}){
    const username = route.params.selectedUsername;
    const userImg = route.params.userImg;
  return (
      <PaperProvider>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "position" : "height"}>
            <View style={styles.mainContainer}>
            <Appbar.Header style={styles.header} >
                <Avatar.Image size={40} source={require('../../assets/user.png')} style={{backgroundColor:'transparent'}} />    
                <Text variant='titleLarge' style={{marginLeft:10, fontWeight:'bold'}} >{username}</Text>
            </Appbar.Header>

            <View style={styles.mainScreen}>
                <ScrollView>
                </ScrollView>
            </View>
            <View style={styles.inputScreen}>
                <TextInput underlineColor='transparent' activeUnderlineColor='grey' underlineStyle='outlined' style={styles.userInput} placeholder={"Write your message here ..."} ></TextInput>      
                <IconButton
                    icon="send"
                    size={30}
                    iconColor={'green'}
                    onPress={() => console.log('Pressed')}
                    />
            </View>
</View>
        </KeyboardAvoidingView>
    </PaperProvider>
  )
}


const styles = StyleSheet.create({
    header:{
        paddingLeft:15,
        backgroundColor:'grey'
    },
    mainContainer:{
        height:"100%",
    },
    mainScreen:{
        height:'78%',
        display:'flex',
        flexDirection:'row'

    },
    inputScreen:{
        backgroundColor:'grey',
        display:'flex',
        flexDirection:'row',
        height:100
    },
    userInput:{
        width:'80%',
        height:30,
        marginLeft:15,
        padding:5,
        marginTop:10,
        maxHeight:40,
        borderRadius:70,
        borderTopLeftRadius:70,
        borderTopRightRadius:70,
    }
})