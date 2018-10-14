import React from 'react';
import { Button, Image, View , Linking} from 'react-native';
import Camera from '../components/Camera.js';
import {ImagePicker, Permissions} from "expo";

export default class GalleryScreen extends React.Component {
    state = {
        image: null,
    };

    render() {
        let {image} = this.state;

        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                {/*<Camera isMedia={false} data={this.state.post} callback={this.getImage.bind(this)}/>*/}
                <Button
                    title="Take image from camera"
                    onPress={this._takeImage}/>
                <Button
                    title="Pick an image from camera roll"
                    onPress={this._pickImage}/>
                {image &&
                <Image source={{uri: image}} style={{width: 200, height: 200}}/>}
                </View>
        );
    }

    getImage(img) {
        this.setState({image: img});
    }

    _takeImage = async () => {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        if (status === 'granted') {
            let result = await ImagePicker.launchCameraAsync({});

            if (!result.cancelled) {
                // this.sendImage(result);
                // this.props.callback(result.uri);
                this.setState({image: result.uri});
            }
            else {
                throw new Error('Camera permission not granted')
            }
        }
    };

    _pickImage = async () => {
        const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status === 'granted') {
            let result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3],
            });

            if (!result.cancelled) {
                // this.sendImage(result);
                this.setState({image: result.uri});
                // this.props.callback(result.uri);
            }
        } else {
            throw new Error('Camera roll permission not granted');
        }
    };

}




// import React from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   Image,
//   FlatList,
// } from 'react-native';
// import Lightbox from 'react-native-lightbox';
//
// import { Fonts, Colors } from '../constants';
// import { GridRow } from '../components';
//
// export default function GalleryScreen(props) {
//   const _keyExtractor = item => item.id;
//
//   const _renderItem = ({ item, index }) => {
//     if (index === 0) {
//       return (
//         <Lightbox key={item[0].id}>
//           <Image
//             style={styles.topImage}
//             source={{ uri: item[0].link }}
//           />
//         </Lightbox>
//       );
//     }
//
//     return (
//       <View key={item[0].id} style={styles.imagesRow}>
//         {item.map(singleItem => (
//           <View key={singleItem.id} style={styles.imageContainer}>
//             <Lightbox>
//               <Image
//                 style={styles.image}
//                 source={{ uri: singleItem.link }}
//               />
//             </Lightbox>
//           </View>
//           ))}
//       </View>
//     );
//   };
//
//   let isFirstArticle = true;
//   const groupedData = GridRow.groupByRows(props.images, 3, () => {
//     if (isFirstArticle) {
//       isFirstArticle = false;
//       return 3;
//     }
//
//     return 1;
//   });
//
//   return (
//     <FlatList
//       style={styles.container}
//       onRefresh={props.refreshImages}
//       refreshing={props.images.length === 0 && props.isLoading}
//       data={groupedData}
//       keyExtractor={_keyExtractor}
//       renderItem={_renderItem}
//     />
//   );
// }
//
// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: Colors.white,
//   },
//   topImage: {
//     flex: 1,
//     height: 200,
//     margin: 5,
//     borderRadius: 5,
//   },
//   imagesRow: {
//     flex: 1,
//     flexDirection: 'row',
//   },
//   imageContainer: {
//     flex: 1,
//     padding: 5,
//   },
//   image: {
//     flex: 1,
//     height: 100,
//     borderRadius: 5,
//   },
// });
