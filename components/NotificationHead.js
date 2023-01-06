import { StyleSheet, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Avatar, Divider, Text, Provider as PaperProvider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

class NotificationUser {
        constructor(notificationTitle, notificationName) {
        this.notificationTitle = notificationTitle;
        this.notificationName = notificationName;
        }
}


export default function NotificationHead() {
    var notificationPostList=[]
    var i=0;
    var size=10;
    for(i=0; i<size; i++)
    {
        var x = new notificationPost('NotificationTitle'+(i+1), 'NotificationName'+(i+1));
        notificationPostList.push(x);
    }
    return (
        <PaperProvider>
            {
                notificationPostList.map(x=>
                    <>
                        <View style={styles.donationCard}>
                            <View style={styles.leftCard}>
                                <TouchableOpacity onPress={()=>{alert(x.donationTitle + " is Toggled!")}} >
                                    <Text style={styles.donationTitle}>{x.notificationTitle}</Text>
                                    <Text style={styles.donorName}>{x.notificationName}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </>
                )
            }
        </PaperProvider>
    )}
