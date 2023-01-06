import { StyleSheet, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Avatar, Divider, Text, Provider as PaperProvider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

class NotificationUser {
    constructor(username, userImg) {
    this.userImg = userImg;
    this.username = username;
    }
}


export default function NotificationHead() {

    var usersList=[]
    var i=0;
    var size=10;
    for(i=0; i<size; i++)
    {
        var x = new NotificationUser('User'+(i+1), '../assets/user.png');
        usersList.push(x);
    }
    
}