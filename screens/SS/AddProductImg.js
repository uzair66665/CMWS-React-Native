import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {
  launchCamera,
  launchImageLibrary
} from 'react-native-image-picker';

export default function AddProductImg({navigation}) {
    const [filePath, setFilePath] = useState({});
 
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };
 
  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };
 
  const captureImage = async (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, (response) => {

        console.log('Response = ', response);
 
        if (response.didCancel) {
          console.log('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }

        console.log('Response = ', response);
        setFilePath(response.assets[0]);
        console.log('base64 -> ', response.assets[0].base64);
        console.log('uri -> ', response.assets[0].uri);
        console.log('width -> ', response.width);
        console.log('height -> ', response.height);
        console.log('fileSize -> ', response.fileSize);
        console.log('type -> ', response.type);
        console.log('fileName -> ', response.assets[0].fileName);
      });
    }
  };
 
  const chooseFile = (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, (response) => {

      console.log('Response = ', response);
 
        if (response.didCancel) {
          console.log('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }

      console.log('Response = ', response);
      setFilePath(response.assets[0]);
      console.log('base64 -> ', response.assets[0].base64);
      console.log('uri -> ', response.assets[0].uri);
      console.log('width -> ', response.width);
      console.log('height -> ', response.height);
      console.log('fileSize -> ', response.fileSize);
      console.log('type -> ', response.type);
      console.log('fileName -> ', response.assets[0].fileName);
    });
  };
  const AddImage = async () => {
    try {
      const data = new FormData();
      data.append("image", {
        name: 'abc.jpg',
        type: 'image/jpg',
        uri:
          Platform.OS === "android" ? filePath.uri : filePath.uri.replace("file://", "")
      });
      console.log("image posting 1")
      await fetch(global.ip+'File/UploadFile',
        {
          method: 'POST',
          body: data,
          headers: {
            'Content-Type': 'multipart/form-data;',
          }
        }
      ).then(response => response.json())
        .then(data => {
          console.log("Printing filename...");
          console.log(data.Name);
          console.log("Calling  ...");
          var imageName=data.Name
          fetch(global.ip+"File/Add_Image", {
            method: 'POST',
            body: JSON.stringify({
              P_img:imageName,
              p_cid:global.p_cid
            }
            ),
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            }
          }).then(response => response.json())
            .then(data => {
              if (data == 'ok') {
                alert("Image Added Successfully");
                navigation.navigate('Vendor_p');
                
              }
              else alert("Plz Try Again!")
            });
        });
    }
    catch (error) {
      console.log("Post submission failed");
      console.log(error.message);
    }
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <Text style={styles.titleText}>
        PRODUCT IMAGE 
      </Text>
      <View style={styles.container}>
        <Image
          source={{uri: filePath.uri}}
          style={styles.imageStyle}
        />
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => captureImage('photo')}>
          <Text style={styles.textStyle}>
            Camera
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => chooseFile('photo')}>
          <Text style={styles.textStyle}>Choose Image</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => AddImage()}>
          <Text style={styles.textStyle}>Upload</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: '#fff',
      alignItems: 'center',
    },
    titleText: {
      fontSize: 22,
      fontWeight: 'bold',
      textAlign: 'center',
      color:'white',
      backgroundColor: '#06457b',
      paddingVertical: 20,
    },
    textStyle: {
        fontSize: 20,
        color: "white",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
    buttonStyle: {
      backgroundColor: '#06457b',
      elevation: 8,
      borderRadius: 10,
      alignSelf:'center',
      marginTop:'10%',
      marginLeft:'5%',
      width:'80%',
      paddingVertical: 10,
      paddingHorizontal: 12
    },
    imageStyle: {
      width: '70%',
      height: 200,
      margin: 5,
    },
  });



// import React, {useState} from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   Image,
//   Platform,
//   PermissionsAndroid,
// } from 'react-native';
// import {
//   launchCamera,
//   launchImageLibrary
// } from 'react-native-image-picker';

// export default function AddProductImg() {
//     const [filePath, setFilePath] = useState({});
 
//   const requestCameraPermission = async () => {
//     if (Platform.OS === 'android') {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.CAMERA,
//           {
//             title: 'Camera Permission',
//             message: 'App needs camera permission',
//           },
//         );
//         // If CAMERA Permission is granted
//         return granted === PermissionsAndroid.RESULTS.GRANTED;
//       } catch (err) {
//         console.warn(err);
//         return false;
//       }
//     } else return true;
//   };
 
//   const requestExternalWritePermission = async () => {
//     if (Platform.OS === 'android') {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//           {
//             title: 'External Storage Write Permission',
//             message: 'App needs write permission',
//           },
//         );
//         // If WRITE_EXTERNAL_STORAGE Permission is granted
//         return granted === PermissionsAndroid.RESULTS.GRANTED;
//       } catch (err) {
//         console.warn(err);
//         alert('Write permission err', err);
//       }
//       return false;
//     } else return true;
//   };
 
//   const captureImage = async (type) => {
//     let options = {
//       mediaType: type,
//       maxWidth: 300,
//       maxHeight: 550,
//       quality: 1,
//       videoQuality: 'low',
//       durationLimit: 30, //Video max duration in seconds
//       saveToPhotos: true,
//     };
//     let isCameraPermitted = await requestCameraPermission();
//     let isStoragePermitted = await requestExternalWritePermission();
//     if (isCameraPermitted && isStoragePermitted) {
//       launchCamera(options, (response) => {
//         console.log('Response = ', response);
 
//         if (response.didCancel) {
//           alert('User cancelled camera picker');
//           return;
//         } else if (response.errorCode == 'camera_unavailable') {
//           alert('Camera not available on device');
//           return;
//         } else if (response.errorCode == 'permission') {
//           alert('Permission not satisfied');
//           return;
//         } else if (response.errorCode == 'others') {
//           alert(response.errorMessage);
//           return;
//         }
//         setFilePath(response.assets[0]);
//         console.log('base64 -> ', response.assets[0].base64);
//         console.log('uri -> ', response.assets[0].uri);
//         console.log('width -> ', response.width);
//         console.log('height -> ', response.height);
//         console.log('fileSize -> ', response.fileSize);
//         console.log('type -> ', response.type);
//         console.log('fileName -> ', response.assets[0].fileName);
//       });
//     }
//   };
 
//   const chooseFile = (type) => {
//     let options = {
//       mediaType: type,
//       maxWidth: 300,
//       maxHeight: 550,
//       quality: 1,
//     };
//     launchImageLibrary(options, (response) => {
//       console.log('Response = ', response);
 
//       if (response.didCancel) {
//         alert('User cancelled camera picker');
//         return;
//       } else if (response.errorCode == 'camera_unavailable') {
//         alert('Camera not available on device');
//         return;
//       } else if (response.errorCode == 'permission') {
//         alert('Permission not satisfied');
//         return;
//       } else if (response.errorCode == 'others') {
//         alert(response.errorMessage);
//         return;
//       }
//       setFilePath(response.assets[0]);
//       console.log('base64 -> ', response.assets[0].base64);
//       console.log('uri -> ', response.assets[0].uri);
//       console.log('width -> ', response.width);
//       console.log('height -> ', response.height);
//       console.log('fileSize -> ', response.fileSize);
//       console.log('type -> ', response.type);
//       console.log('fileName -> ', response.assets[0].fileName);
//     });
//   };
//   const AddImage = async () => {
//     try {
//       console.log("video posting")
//       const data = new FormData();
//       data.append("image", {
//         name: 'abc.jpg',
//         type: 'image/jpg',
//         uri:
//           Platform.OS === "android" ? filePath.uri : filePath.uri.replace("file://", "")
//       });
//       console.log("image posting 1")
//       await fetch(global.ip+'File/UploadFile',
//         {
//           method: 'POST',
//           body: data,
//           headers: {
//             'Content-Type': 'multipart/form-data;',
//           }
//         }
//       ).then(response => response.json())
//         .then(data => {
//           console.log("Printing filename...");
//           console.log(data.Name);
//           console.log("Calling  ...");
//           imageName=data.Name
//           fetch(global.ip+"File/Add_Image", {
//             method: 'POST',
//             body: JSON.stringify({
//               p_img:imageName,
//               p_cid:global.p_cid
//             }
//             ),
//             headers: {
//               Accept: 'application/json',
//               'Content-Type': 'application/json'
//             }
//           }).then(response => response.json())
//             .then(data => {
//               if (data == 'ok') {
//                 alert("Image Added Successfully")
//               }
//               else alert("Plz Try Again!")
//             });
//         });
//     }
//     catch (error) {
//       console.log("Post submission failed");
//       console.log(error.message);
//     }
//   }
//   return (
//     <SafeAreaView style={{flex: 1}}>
//       <Text style={styles.titleText}>
//         Example of Image Picker in React Native
//       </Text>
//       <View style={styles.container}>
//         {/* <Image
//           source={{
//             uri: 'data:image/jpeg;base64,' + filePath.data,
//           }}
//           style={styles.imageStyle}
//         /> */}
//         <Image
//           source={{uri: filePath.uri}}
//           style={styles.imageStyle}
//         />
//         <Text style={styles.textStyle}>{filePath.uri}</Text>
//         <TouchableOpacity
//           activeOpacity={0.5}
//           style={styles.buttonStyle}
//           onPress={() => captureImage('photo')}>
//           <Text style={styles.textStyle}>
//             Launch Camera for Image
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           activeOpacity={0.5}
//           style={styles.buttonStyle}
//           onPress={() => captureImage('video')}>
//           <Text style={styles.textStyle}>
//             Launch Camera for Video
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           activeOpacity={0.5}
//           style={styles.buttonStyle}
//           onPress={() => chooseFile('photo')}>
//           <Text style={styles.textStyle}>Choose Image</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           activeOpacity={0.5}
//           style={styles.buttonStyle}
//           onPress={() => AddImage()}>
//           <Text style={styles.textStyle}>Add</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   )
// }

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       padding: 10,
//       backgroundColor: '#fff',
//       alignItems: 'center',
//     },
//     titleText: {
//       fontSize: 22,
//       fontWeight: 'bold',
//       textAlign: 'center',
//       paddingVertical: 20,
//     },
//     textStyle: {
//       padding: 10,
//       color: 'black',
//       textAlign: 'center',
//     },
//     buttonStyle: {
//       alignItems: 'center',
//       backgroundColor: '#DDDDDD',
//       padding: 5,
//       marginVertical: 10,
//       width: 250,
//     },
//     imageStyle: {
//       width: 200,
//       height: 200,
//       margin: 5,
//     },
//   });