import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Button, Provider as PaperProvider } from 'react-native-paper';
import { useFonts } from 'expo-font';


class donationPost {
    constructor(donationTitle, donorName, donorLocation) {
    this.donationTitle = donationTitle;
    this.donorName = donorName;
    this.donorLocation = donorLocation;
    }



export default function DonationHead() {
    
    let [fontLoaded]=useFonts({
    'Manrope-Bold': require('../assets/fonts/Manrope-Bold.ttf'),
    'Manrope-ExtraBold': require('../assets/fonts/Manrope-ExtraBold.ttf'),
    'Manrope-ExtraLight': require('../assets/fonts/Manrope-ExtraLight.ttf'),
    'Manrope-Light': require('../assets/fonts/Manrope-Light.ttf'),
    'Manrope-Medium': require('../assets/fonts/Manrope-Medium.ttf'),
    'Manrope-Regular': require('../assets/fonts/Manrope-Regular.ttf'),
    'Manrope-SemiBold': require('../assets/fonts/Manrope-SemiBold.ttf'),
  })

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
                            <Button style={styles.msgBtn} textColor='#1C702B' mode='contained' onPress={()=>{alert("Want to Send a message to " + x.donationTitle + "?")}}>Message</Button>
                        </View>
                    </View>
                </>
            )
        }

        <View style={{height:150}}></View>
    </PaperProvider>
)}

const styles = StyleSheet.create({
    donationCard:{
        height:'9%',
        width:'95%',
        backgroundColor:'rgba(28, 112, 43, 0.85)',
        marginTop:10,
        marginLeft:10,
        padding:10,
        borderRadius:5,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
    },
    leftCard:{
        width:220
    },
    msgBtn:{
        width:120,
        backgroundColor:'#FDFAF6',
    },
    donationTitle:{
        fontSize:18,
        color:'#FDFAF6',
        fontFamily:'Manrope-Bold',
        marginBottom:5
    },
    donorName:{
        color:'#FDFAF6',
        fontFamily:'Manrope-Bold'
    },
    donorLocation:{
        color:'#FDFAF6',
        fontFamily:'Manrope-Regular'
    }
})