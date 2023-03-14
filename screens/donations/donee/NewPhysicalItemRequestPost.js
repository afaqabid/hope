import {
    Keyboard,
    Button as ButtonNative,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Image,
    TouchableOpacity,
    View,
    TextInput,
    TouchableWithoutFeedback,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import { Provider as PaperProvider, Text, Button } from "react-native-paper";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { useFonts } from "expo-font";
  import { useNavigation } from "@react-navigation/native";
  import { auth, db, storage } from "../../../firebase";
  import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
  import * as ImagePicker from "expo-image-picker";
  
  export default function NewPhysicalItemDonationPost() {
    let [fontLoaded] = useFonts({
      "Manrope-Bold": require("../../../assets/fonts/Manrope-Bold.ttf"),
      "Manrope-ExtraBold": require("../../../assets/fonts/Manrope-ExtraBold.ttf"),
      "Manrope-ExtraLight": require("../../../assets/fonts/Manrope-ExtraLight.ttf"),
      "Manrope-Light": require("../../../assets/fonts/Manrope-Light.ttf"),
      "Manrope-Medium": require("../../../assets/fonts/Manrope-Medium.ttf"),
      "Manrope-Regular": require("../../../assets/fonts/Manrope-Regular.ttf"),
      "Manrope-SemiBold": require("../../../assets/fonts/Manrope-SemiBold.ttf"),
    });
  
    const HideKeyboard = ({ children }) => (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
      </TouchableWithoutFeedback>
    );
  
    const navigation = useNavigation();
  
    const [image, setImage] = useState(null);
  
    // useEffect(  async()=>{
    //   if(Platform.OS !==web){
    //     const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    //     if(status !== 'granted'){
    //       alert("Permission Denied!");
    //     }
    //   }
    // }, [])
  
  const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      console.log(result);
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    };
  
      const uploadImage = async () => {
        // convert image into blob image
        const blobImage = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function () {
            resolve(xhr.response);
          };
          xhr.onerror = function () {
            reject(new TypeError("Network request failed"));
          };
          xhr.responseType = "blob";
          xhr.open("GET", image, true);
          xhr.send(null);
        });
        // set metadata of image
        // Create the file metadata
        /** @type {any} */
        const metadata = {
          contentType: "image/jpeg",
        };
        // upload image on storage
        // Upload file and metadata to the object 'images/mountains.jpg'
        const storageRef = ref(storage, "DonationPostImages/" + Date.now());
        const uploadTask = uploadBytesResumable(storageRef, blobImage, metadata);
  
        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
              case "storage/unauthorized":
                // User doesn't have permission to access the object
                break;
              case "storage/canceled":
                // User canceled the upload
                break;
  
              // ...
  
              case "storage/unknown": 
                // Unknown error occurred, inspect error.serverResponse
                break;
            }
          },
          () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log("File available at", downloadURL);
            });
          }
        );
      };
  
  
    const uploadPost = () => {
      if (image != null) {
        uploadImage();
        // setImage(null);
      }
    };
  
    return (
      <PaperProvider>
        <HideKeyboard>
          <SafeAreaView style={styles.mainContainer}>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "position" : "height"}
              style={{ flex: 1 }}
            >
              <ScrollView>
                <View style={styles.imageContainer}>
                  <Text style={styles.titleTxt}>Images</Text>
                  {image && (
                    <Image
                      source={{ uri: image }}
                      style={{ width: "100%", height: "100%" }}
                    />
                  )}
                </View>
                {/* <Button style={styles.btnCancel}>
                <Text style={styles.btnTxtCancel} onPress={Pickimage}>Upload Image</Text>
              </Button> */}
                <ButtonNative title="Upload Image" onPress={pickImage} />
                <View style={styles.detailsContainer}>
                  <Text style={styles.titleTxt}>Request Title</Text>
                  <TextInput
                    style={styles.donationTitle}
                    placeholder="Write Request Title Here."
                  ></TextInput>
                  <Text style={styles.titleTxt}>Description</Text>
                  <TextInput
                    multiline={true}
                    style={styles.description}
                    placeholder="Write Request Description Here."
                  ></TextInput>
                  <View style={styles.btnContainer}>
                    <Button style={styles.btnPost} onPress={uploadPost}>
                      <Text style={styles.btnTxtPost}>Post</Text>
                    </Button>
                    <Button style={styles.btnCancel}>
                      <Text
                        style={styles.btnTxtCancel}
                        onPress={() => {
                          navigation.navigate("NewRequestPost");
                        }}
                      >
                        Cancel
                      </Text>
                    </Button>
                  </View>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </SafeAreaView>
        </HideKeyboard>
      </PaperProvider>
    );
  }
  
  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      backgroundColor: "#FDFAF6",
    },
    imageContainer: {
      height: "60%",
      backgroundColor: "white",
      width: "100%",
      margin: 0,
      borderRadius: 10,
      padding: 10,
      marginBottom: 5,
    },
  
    detailsContainer: {
      height: "55%",
      backgroundColor: "transparent",
      width: "100%",
      margin: 10,
      borderRadius: 10,
      display: "flex",
    },
  
    titleTxt: {
      fontSize: 20,
      color: "#1C702B",
      fontFamily: "Manrope-ExtraBold",
      marginLeft: 5,
      marginBottom: 0,
    },
  
    donationTitle: {
      height: 45,
      fontFamily: "Manrope-Regular",
      width: "95%",
      fontSize: 18,
      backgroundColor: "white",
      padding: 10,
      borderRadius: 5,
    },
  
    description: {
      height: 45,
      fontFamily: "Manrope-Regular",
      width: "95%",
      fontSize: 18,
      backgroundColor: "white",
      padding: 10,
      height: 200,
      borderRadius: 5,
    },
  
    btnContainer: {
      display: "flex",
      flexDirection: "row",
      marginTop: 5,
    },
    btnPost: {
      backgroundColor: "#1C702B",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 5,
      height: 55,
      minWidth: "45%",
      marginTop: 10,
    },
    btnCancel: {
      backgroundColor: "white",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 5,
      height: 55,
      minWidth: "45%",
      borderWidth: 2,
      borderColor: "#1C702B",
      marginTop: 10,
      marginLeft: 10,
    },
    btnTxtPost: {
      color: "white",
      fontSize: 18,
      fontFamily: "Manrope-Bold",
      justifyContent: "center",
      alignItems: "center",
    },
    btnTxtCancel: {
      color: "#1C702B",
      fontSize: 18,
      fontFamily: "Manrope-Bold",
      justifyContent: "center",
      alignItems: "center",
    },
  });
  