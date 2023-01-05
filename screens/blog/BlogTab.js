import { StyleSheet, Text, ScrollView } from 'react-native'
import React from 'react'
import { Card, Provider as PaperProvider } from 'react-native-paper'

export default function BlogTab() {
  return (
    <>
    <ScrollView >
      <Card style={styles.container}>
        <Card.Cover source={{ uri: 'https://www.preventionweb.net/sites/default/files/styles/landscape_16_9/public/2022-09/Pakistan%20laborer%20carries%20vegetables%20flood.jpg?h=0f52b544&itok=Z-sVkbzV' }} />
          <Card.Content>
            <Text style={styles.heading} variant="titleLarge">Flood </Text>
            <Text variant="bodyMedium">From 14 June to October 2022, floods in Pakistan killed 1,739 people, and caused ₨ 3.2 trillion of damage and ₨ 3.3 trillion of economic losses. The immediate causes of the floods were heavier than usual monsoon rains and melting glaciers that followed a severe heat wave, both of which are linked to climate change. </Text>
        </Card.Content>
     </Card>
     <Card style={styles.container}>
        <Card.Cover source={{ uri: 'https://propakistani.pk/wp-content/uploads/2022/03/Heatwave.jpg' }} />
          <Card.Content>
            <Text style={styles.heading} variant="titleLarge">Heat Wave</Text>
            <Text variant="bodyMedium">From March-May 2022, Pakistan recorded some of the highest temperatures in the country in the last 60 years. The heat waves from March to mid-June are now followed by the onset of the monsoon in parts of the country with flash flood warnings and torrential rains causing loss of life and damage to property. </Text>
        </Card.Content>
     </Card>
     <Card style={styles.container}>
        <Card.Cover source={{ uri: 'https://floodlist.com/wp-content/uploads/2021/07/Khyber-Pakhtunkhwa-damage-house-File-Photo.jpg' }} />
          <Card.Content>
            <Text style={styles.heading} variant="titleLarge">Land-Slide</Text>
            <Text variant="bodyMedium">Disaster authorities in Pakistan report that heavy rain has caused damage to homes and triggered landslides in Khyber Pakhtunkhwa (KP) Province from 20 January 2022</Text>
        </Card.Content>
     </Card>
   </ScrollView>
   </>
  );
};

const styles = StyleSheet.create({
  container :{
    alignContent:'center',
    margin: 20,
   },
  heading :{
    fontWeight: 'bold',
  }
})