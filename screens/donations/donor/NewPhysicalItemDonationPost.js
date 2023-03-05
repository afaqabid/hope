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
                <Text style={styles.titleTxt}>Donation Title</Text>
                <TextInput
                  style={styles.donationTitle}
                  placeholder="Write Donation Title Here."
                ></TextInput>
                <Text style={styles.titleTxt}>Description</Text>
                <TextInput
                  multiline={true}
                  style={styles.description}
                  placeholder="Write Donation Description Here."
                ></TextInput>
                <View style={styles.btnContainer}>
                  <Button style={styles.btnPost} onPress={uploadPost}>
                    <Text style={styles.btnTxtPost}>Post</Text>
                  </Button>
                  <Button style={styles.btnCancel}>
                    <Text
                      style={styles.btnTxtCancel}
                      onPress={() => {
                        navigation.navigate("NewDonationPost");
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
