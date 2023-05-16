import { StyleSheet, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Avatar, Divider, Text, Provider as PaperProvider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';

class ChatUser {
    constructor(username, userImg, lastMsg) {
    this.userImg = userImg;
    this.username = username;
    this.lastMsg = lastMsg;
    }
}


export default function ChatHead() {
    
    let [fontLoaded]=useFonts({
    'Manrope-Bold': require('../assets/fonts/Manrope-Bold.ttf'),
    'Manrope-ExtraBold': require('../assets/fonts/Manrope-ExtraBold.ttf'),
    'Manrope-ExtraLight': require('../assets/fonts/Manrope-ExtraLight.ttf'),
    'Manrope-Light': require('../assets/fonts/Manrope-Light.ttf'),
    'Manrope-Medium': require('../assets/fonts/Manrope-Medium.ttf'),
    'Manrope-Regular': require('../assets/fonts/Manrope-Regular.ttf'),
    'Manrope-SemiBold': require('../assets/fonts/Manrope-SemiBold.ttf'),
  })


    var usersList=[]
    var i=0;
    var size=10;
    for(i=0; i<size; i++)
    {
        var x = new ChatUser('User'+(i+1), '../assets/user.png', 'Hello World!');
        usersList.push(x);
    }

    const navigation = useNavigation();

    function goToChatScreen()
    {

    }


  return (
    <PaperProvider>
        <View>
        {
            usersList.map(user=>
                <TouchableOpacity onPress={()=>{
                    navigation.navigate('ChatScreen', {
                        selectedUsername:user.username,
                        selectedUserImg:user.userImg,
                        selectedUserId:'rehmozahmadrana007@gmail.com'
                    });
                }}>
                    <View style={styles.chatCard}>
                        <Avatar.Image size={60} source={require('../assets/person.png')}  style={{backgroundColor:'transparent'}} />    
                        <View>
                            <Text style={styles.username}>{user.username}</Text>
                            <Text style={styles.lastMsg}>{user.lastMsg}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }
        </View>
    </PaperProvider>
)}

const styles = StyleSheet.create({
    chatCard:{
        display:'flex',
        flexDirection:'row',
        margin:10,
        padding:10,
        borderRadius:5,
        marginBottom:0,
        backgroundColor:'transparent',
        alignItems:'center',
    },
    username:{
        marginLeft:10,
        fontSize:18,
        fontFamily:'Manrope-ExtraBold',
        color:'#1C702B'
    },
    lastMsg:{
        marginLeft:10,
        fontSize:15,
        fontFamily:'Manrope-Regular',
        color:'black'
    }
})