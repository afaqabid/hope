import { StyleSheet, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Avatar, Divider, Text, Provider as PaperProvider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

class notificationPost {
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
                        <View style={styles. notificationCard}>
                            <View style={styles.card}>
                                <TouchableOpacity onPress={()=>{alert(x. notificationTitle + " is Toggled!")}} >
                                    <Text style={styles. notificationTitle}>{x.notificationTitle}</Text>
                                    <Text style={styles. notificationName}>{x.notificationName}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </>
                )
            }
        </PaperProvider>
    )}

    const styles = StyleSheet.create({
        notificationCard:{
            height:70,
            width:'95%',
            backgroundColor:'white',
            marginTop:10,
            marginLeft:10,
            padding:10,
            borderRadius:5,
            display:'flex',
            flexDirection:'row',
            backgroundColor:'#EFECEB',
        },
        card:{
            width:220
        },
        notificationTitle:{
            fontSize:18,
            fontWeight: 'bold',
        }
    })