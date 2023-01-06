import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Button, Provider as PaperProvider } from 'react-native-paper';


class requestPost {
    constructor(requestTitle, requestName, requestLocation) {
    this.requestTitle = requestTitle;
    this.requestName = requestName;
    this.requestLocation = requestLocation;
    }
}


export default function RequestHead() {
    var requestPostList=[]
    var i=0;
    var size=10;
    for(i=0; i<size; i++)
    {
        var x = new requestPost('RequestTitle'+(i+1), 'Request'+(i+1), 'Location'+(i+1));
        requestPostList.push(x);
    }

    return (
    <PaperProvider>
        {
            requestPostList.map(x=>
                <>
                    <View style={styles.requestCard}>
                        <View style={styles.leftCard}>
                            <TouchableOpacity onPress={()=>{alert(x.requestTitle + " is Toggled!")}} >
                                <Text style={styles.requestTitle}>{x.requestTitle}</Text>
                                <Text style={styles.requestName}>{x.requestName}</Text>
                                <Text style={styles.requestLocation}>{x.requestLocation}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.rightCard}>
                            <Button style={styles.msgBtn} mode='contained' onPress={()=>{alert("Want to Send a message to " + x.requestTitle + "?")}}>Message</Button>
                        </View>

                    </View>
                </>
            )
        }
    </PaperProvider>
)}

const styles = StyleSheet.create({
    requestCard:{
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
    leftCard:{
        width:220
    },
    msgBtn:{
        width:120,
        marginTop:6,
        backgroundColor:'green'
    },
    requestTitle:{
        fontSize:18
    }
})