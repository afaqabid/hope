import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Button, Provider as PaperProvider } from 'react-native-paper';


class donationPost {
    constructor(donationTitle, donorName, donorLocation) {
    this.donationTitle = donationTitle;
    this.donorName = donorName;
    this.donorLocation = donorLocation;
    }
}


export default function DonationHead() {
    var donationPostList=[]
    var i=0;
    var size=10;
    for(i=0; i<size; i++)
    {
        var x = new donationPost('DonationTitle'+(i+1), 'Donor'+(i+1), 'Location'+(i+1));
        donationPostList.push(x);
    }

    return (
    <PaperProvider>
        {
            donationPostList.map(x=>
                <>
                    <View style={styles.donationCard}>
                        <View style={styles.leftCard}>
                            <TouchableOpacity onPress={()=>{alert(x.donationTitle + " is Toggled!")}} >
                                <Text style={styles.donationTitle}>{x.donationTitle}</Text>
                                <Text style={styles.donorName}>{x.donorName}</Text>
                                <Text style={styles.donorLocation}>{x.donorLocation}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.rightCard}>
                            <Button style={styles.msgBtn} mode='contained' onPress={()=>{alert("Want to Send a message to " + x.donationTitle + "?")}}>Message</Button>
                        </View>

                    </View>
                </>
            )
        }
    </PaperProvider>
)}

const styles = StyleSheet.create({
    donationCard:{
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
    donationTitle:{
        fontSize:18
    }
})