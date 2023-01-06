import { StyleSheet, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Avatar, Divider, Text, Provider as PaperProvider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

class ChatUser {
    constructor(username, userImg) {
    this.userImg = userImg;
    this.username = username;
    }
}


export default function ChatHead() {

    var usersList=[]
    var i=0;
    var size=10;
    for(i=0; i<size; i++)
    {
        var x = new ChatUser('User'+(i+1), '../assets/user.png');
        usersList.push(x);
    }

    const navigation = useNavigation();

    function goToChatScreen()
    {

    }


  return (
    <PaperProvider>
        {
            usersList.map(user=>
                <TouchableOpacity onPress={()=>{
                    navigation.navigate('ChatScreen', {
                        selectedUsername:user.username,
                        selectedUserImg:user.userImg,
                    });
                }}>
                    <View style={styles.chatCard}>
                        <Avatar.Image size={40} source={require('../assets/user.png')} style={{backgroundColor:'transparent'}} />    
                        <Text style={styles.username}>{user.username}</Text>
                    </View>
                </TouchableOpacity>
            )
        }
    </PaperProvider>
)}

const styles = StyleSheet.create({
    chatCard:{
        display:'flex',
        flexDirection:'row',
        margin:10,
        padding:10,
        borderRadius:10,
        marginBottom:0,
        backgroundColor:'#dad7cd'


    },
    username:{
        marginLeft:10,
        marginTop:10,
        fontSize:18,
        fontWeight: 'bold',
    }
})