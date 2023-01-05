import { StyleSheet, Text, ScrollView } from 'react-native'
import React from 'react'
import { Card, Provider as PaperProvider } from 'react-native-paper'

class BlogPost {
    constructor(imgURI, heading, content) {
    this.imgURI = imgURI;
    this.heading = heading;
    this.content = content;
    }
}

export default function BlogTab() {
  var blogPostList=[]
  var blog1 = new BlogPost(
    'https://www.preventionweb.net/sites/default/files/styles/landscape_16_9/public/2022-09/Pakistan%20laborer%20carries%20vegetables%20flood.jpg?h=0f52b544&itok=Z-sVkbzV',
     "Flood",
     "From 14 June to October 2022, floods in Pakistan killed 1,739 people, and caused ₨ 3.2 trillion of damage and ₨ 3.3 trillion of economic losses. The immediate causes of the floods were heavier than usual monsoon rains and melting glaciers that followed a severe heat wave, both of which are linked to climate change."
  );

  var blog2 = new BlogPost(
    'https://propakistani.pk/wp-content/uploads/2022/03/Heatwave.jpg',
    "Heat Wave",
    "From March-May 2022, Pakistan recorded some of the highest temperatures in the country in the last 60 years. The heat waves from March to mid-June are now followed by the onset of the monsoon in parts of the country with flash flood warnings and torrential rains causing loss of life and damage to property."
  );

  var blog3 = new BlogPost(
    'https://floodlist.com/wp-content/uploads/2021/07/Khyber-Pakhtunkhwa-damage-house-File-Photo.jpg',
    "Land-Slide",
    "Disaster authorities in Pakistan report that heavy rain has caused damage to homes and triggered landslides in Khyber Pakhtunkhwa (KP) Province from 20 January 2022"
  );

  blogPostList.push(blog1);
  blogPostList.push(blog2);
  blogPostList.push(blog3);


  return (
    <PaperProvider>
      <ScrollView >
        {
          blogPostList.map( post =>
            <>
              <Card style={styles.container}>
                <Card.Cover source={{ uri: post.imgURI }} />
                  <Card.Content>
                    <Text style={styles.heading} variant="titleLarge">{post.heading}</Text>
                    <Text variant="bodyMedium">{post.content}</Text>
                </Card.Content>
              </Card>
            </>
          )
        }
      </ScrollView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container :{
    alignContent:'center',
    margin: 20,
   },
  heading :{
    fontWeight: 'bold',
    margin:10
  }
})