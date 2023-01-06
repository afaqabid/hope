import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Avatar, Divider, Text, Provider as PaperProvider } from 'react-native-paper';

class ChatUser {
    constructor(username, userImg) {
    this.userImg = username;
    this.username = userImg;
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

  return (
    <PaperProvider>
        <View style={styles.chatCard}>
            <Avatar.Image size={40} source={require('../assets/user.png')} style={{backgroundColor:'transparent'}} />    
            <Text style={styles.username} >Username</Text>
        </View>
        <View style={styles.chatCard}>
            <Avatar.Image size={40} source={require('../assets/user.png')} style={{backgroundColor:'transparent'}} />    
            <Text style={styles.username} >Username</Text>
        </View>
        <View style={styles.chatCard}>
            <Avatar.Image size={40} source={require('../assets/user.png')} style={{backgroundColor:'transparent'}} />    
            <Text style={styles.username} >Username</Text>
        </View>
        <View style={styles.chatCard}>
            <Avatar.Image size={40} source={require('../assets/user.png')} style={{backgroundColor:'transparent'}} />    
            <Text style={styles.username} >Username</Text>
        </View>
        <View style={styles.chatCard}>
            <Avatar.Image size={40} source={require('../assets/user.png')} style={{backgroundColor:'transparent'}} />    
            <Text style={styles.username} >Username</Text>
        </View>
    </PaperProvider>

  )
}

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