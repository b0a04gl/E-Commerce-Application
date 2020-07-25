import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert, Modal, TextInput, Button } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import * as ImagePicker from 'expo-image-picker';
import Card from './Components/CardAdmin';
import * as firebase from 'firebase';
import ApiKeys from '../database/RealtimeDb';
import Toast from 'react-native-simple-toast';

export default class Admin extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            imagesDeck: [],
            cards: [],
            imageIndex: 0,
            header: '',
            image: require('./assets/images/add.png'),
            smallText: '',
            bigText: '',
            showCardModal: false,
            showImageModal: false,
            deleteImageNames: [],
            flag: false,
            alertflag: false,
        };
        if (!firebase.apps.length) {
            firebase.initializeApp(ApiKeys.firebaseConfig);
        }
    }

    componentDidMount() {
        this._isMounted = true;
        firebase.database().ref('/imagesDeck').on('value', (data) => {
            if (this._isMounted) {
                if (data.val()) {
                    this.setState({
                        imagesDeck: data.val(),
                    });
                }
            }
        }
        );
        firebase.database().ref('/cards').on('value', (data) => {
            if (this._isMounted) {
                if (data.val()) {
                    this.setState({
                        cards: data.val(),
                    });
                }
            }
        }
        );
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    AddImageHandler = async (key) => {
        const permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync();
        if (pickerResult.cancelled === true) {
            return;
        }
        let URI = pickerResult.uri;
        const imageName = URI.substring(URI.lastIndexOf('/') + 1);
        const response = await fetch(URI);
        const blob = await response.blob();
        firebase
            .storage()
            .ref(imageName)
            .put(blob)
            .then((snapshot) => {
                console.log(`${imageName} has been successfully uploaded.`);
                snapshot.ref.getDownloadURL().then((url) => {
                    if (key == 'deck') {
                        this.setState({
                            imagesDeck: [...this.state.imagesDeck, {
                                imgName: imageName,
                                uri: url,
                            }],
                        });
                    }
                    else if (key == 'cardImage') {
                        this.setState({
                            image: {
                                imgName: imageName,
                                uri: url,
                            },
                        });
                    }
                });
            })
            .catch((e) => console.log('uploading image error => ', e));
        console.log(this.state.imagesDeck);
    };

    DeleteImageHandler = index => {
        if (this.state.imagesDeck.length > 0) {
            const imageDeckArray = this.state.imagesDeck;
            const imageRef = imageDeckArray.splice(index, 1);
            if (imageRef[0]) {
                const imageName = imageRef[0].imgName;
                this.setState({
                    deleteImageNames: [...this.state.deleteImageNames, imageName],
                    imagesDeck: imageDeckArray,
                });
            }
        }
    };

    AddCardHandler = () => {
        this.setState({
            showCardModal: true,
        });
    };

    AddCard = (header) => {
        this.setState({
            cards: [...this.state.cards, {
                key: new Date().getTime(),
                images: [],
                header: header
            },
            ],
            showCardModal: false,
            header: '',
        });
    };

    AddCardImageHandler = (header) => {
        this.setState({
            showImageModal: true,
            header: header,
        });
    };

    AddCardContent = (header, image, smallText, bigText) => {
        const cardArray = this.state.cards;
        const cardIndex = cardArray.findIndex(card => card.header === header);
        if (this.state.image.uri) {
            cardArray[cardIndex].images = [...cardArray[cardIndex].images, {
                key: new Date().getTime(),
                image: image,
                textItem: smallText,
                textOff: bigText,
            }];
            this.setState({
                cards: cardArray,
                showImageModal: false,
                header: '',
                image: require('./assets/images/add.png'),
                smallText: '',
                bigText: '',
            });
        }
        else {
            Alert.alert('Image Not Found', 'Please pick an image from the gallery');
        }
    }

    DeleteCardImageHandler = (index, header) => {
        Alert.alert('Confirm Delete', 'Do you want to delete this item?', [{
            text: 'Cancel',
            style: 'cancel',
        }, {
            text: 'OK',
            onPress: () => {
                const cardArray = this.state.cards;
                const cardIndex = cardArray.findIndex(card => card.header === header);
                const imageRef = cardArray[cardIndex].images.splice(index, 1);
                console.log(imageRef);
                if (imageRef) {
                    const imageName = imageRef[0].image.imgName;
                    this.setState({
                        deleteImageNames: [...this.state.deleteImageNames, imageName],
                        cards: cardArray,
                    });
                }
            }
        }]);
    }

    DeleteCardHandler = (header) => {
        Alert.alert('Confirm Delete', 'Do you want to delete this card?', [{
            text: 'Cancel',
            style: 'cancel',
        }, {
            text: 'OK',
            onPress: () => {
                const cardArray = this.state.cards;
                const cardIndex = cardArray.findIndex(card => card.header === header);
                const card = cardArray.splice(cardIndex, 1);
                const Images = card[0].images;
                if (Images) {
                    Images.map(Image => this.setState({
                        deleteImageNames: [...this.state.deleteImageNames, Image.image.imgName],
                    }));
                }
                this.setState({
                    cards: cardArray,
                });
            }
        }]);
    }

    closeModal = () => {
        this.setState({
            showImageModal: false,
            showCardModal: false,
            header: '',
        });
    };

    SaveToDatabase = () => {
        if (this.state.imagesDeck.length > 0) {
            firebase.database().ref('/imagesDeck').set(this.state.imagesDeck).then(() => {
                this.setState({ alertflag: true, });
            }).catch((error) => {
                console.log(error);
            });
        }
        else {
            Alert.alert('Slider Deck Error', 'Choose atleast one image for image Slider');
            this.setState({ alertflag: false, });
        }
        let flag = true;
        if (this.state.cards.length > 0) {
            this.state.cards.map(card => {
                if (card.images.length == 0) {
                    Alert.alert('Card Image Error', `The card with the header ${card.header} does not contain any images. Please add an image to the card`)
                    flag = false;
                    this.setState({
                        flag: false,
                    });
                    this.setState({ alertflag: false, });
                }
                else {
                    this.setState({
                        flag: true,
                    });
                    this.setState({
                        alertflag: true,
                    });
                }
            });
            if (flag) {
                firebase.database().ref('/cards').set(this.state.cards).then(() => {
                    this.setState({ alertflag: true, });
                    this.setState({
                        flag: true,
                    });
                }).catch((error) => {
                    console.log(error);
                });
            }
        }
        else {
            Alert.alert('Cards Error', 'Please create atleast one card for View');
            this.setState({
                flag: false,
            });
            this.setState({ alertflag: false });
        }
        if (this.state.flag) {
            if (this.state.deleteImageNames.length > 0) {
                this.state.deleteImageNames.map(imageName =>
                    firebase.storage().ref(imageName).delete().then(() => {
                        console.log(`${imageName} has been deleted successfully.`);
                    })
                        .catch((e) => console.log('error on image deletion => ', e)));
                this.setState({
                    deleteImageNames: [],
                })
            }
        }
        if (this.state.alertflag) {
            Toast.show('Contents updated', Toast.LONG);
        }
    };


    render() {
        return (
            <ScrollView keyboardShouldPersistTaps='always' style={styles.screen}>
                <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={this.AddImageHandler.bind(this, 'deck')}>
                        <Image source={require('./assets/images/add.png')} style={styles.image} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}> Image Deck </Text>
                    <TouchableOpacity onPress={this.DeleteImageHandler.bind(this, this.state.imageIndex)}>
                        <Image source={require('./assets/images/delete.png')} style={styles.image} />
                    </TouchableOpacity>
                </View>
                <View style={styles.imageDeck}>
                    <SliderBox
                        images={this.state.imagesDeck}
                        sliderBoxHeight={175}
                        circleLoop={true}
                        resizeMode={'contain'}
                        currentImageEmitter={index => {
                            this.setState({
                                imageIndex: index,
                            });
                        }
                        } />
                </View>
                <View>
                    {this.state.cards.map(card => <Card key={card.key} images={card.images} header={card.header} addImage={this.AddCardImageHandler} deleteImage={this.DeleteCardImageHandler} deleteCard={this.DeleteCardHandler} />)}
                    <TouchableOpacity style={styles.bottomContainer} onPress={this.AddCardHandler}>
                        <Image source={require('./assets/images/add.png')} style={styles.addImage} />
                    </TouchableOpacity>
                    <View style={styles.bottomContainer}>
                        <Button title='Save Changes' color='red' onPress={this.SaveToDatabase} />
                    </View>
                </View>
                <Modal
                    visible={this.state.showCardModal}
                    position='center'
                    transparent={true}
                    onRequestClose={this.closeModal}>
                    <View style={styles.modalContainer}>
                        <View style={styles.cardModalScreen}>
                            <Text style={styles.modalText}>Enter Card Header Name:</Text>
                            <View style={styles.modalTextInputContainer}>
                                <TextInput style={styles.modalTextInput} onChangeText={(header) => this.setState({ header: header })} value={this.state.header} />
                            </View>
                            <View style={styles.modalButtonContainer}>
                                <View style={styles.modalButton}>
                                    <Button title='OK' onPress={this.AddCard.bind(this, this.state.header)} />
                                </View>
                                <View style={styles.modalButton}>
                                    <Button title='Cancel' style={styles.modalButton} onPress={this.closeModal} />
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal
                    visible={this.state.showImageModal}
                    position='center'
                    transparent={true}
                    onRequestClose={this.closeModal}>
                    <View style={styles.modalContainer}>
                        <View style={styles.imageModalScreen}>
                            <TouchableOpacity onPress={this.AddImageHandler.bind(this, 'cardImage')} style={styles.cardImageContainer}>
                                <Image source={this.state.image} style={styles.cardImage} />
                            </TouchableOpacity>
                            <Text style={styles.modalText}>Enter SmallText:</Text>
                            <View style={styles.modalTextInputContainer}>
                                <TextInput style={styles.modalTextInput} onChangeText={(smallText) => this.setState({ smallText: smallText })} value={this.state.smallText} />
                            </View>
                            <Text style={styles.modalText}>Enter BigText:</Text>
                            <View style={styles.modalTextInputContainer}>
                                <TextInput style={styles.modalTextInput} onChangeText={(bigText) => this.setState({ bigText: bigText })} value={this.state.bigText} />
                            </View>
                            <View style={styles.modalButtonContainer}>
                                <View style={styles.modalButton}>
                                    <Button title='OK' onPress={this.AddCardContent.bind(this, this.state.header, this.state.image, this.state.smallText, this.state.bigText)} />
                                </View>
                                <View style={styles.modalButton}>
                                    <Button title='Cancel' style={styles.modalButton} onPress={this.closeModal} />
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({

    screen: {
        paddingTop: 0,
        flex: 1,
    },

    iconContainer: {
        flexDirection: 'row',
        padding: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: 'black',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    image: {
        height: 30,
        width: 30,
        paddingHorizontal: 10
    },

    imageDeck: {
        elevation: 5,
        height: 175,
        borderColor: 'black',
        borderWidth: 1,
    },

    bottomContainer: {
        alignItems: 'center',
        marginVertical: 40,
        marginBottom: 60,
    },

    addImage: {
        height: 50,
        width: 50,
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    cardModalScreen: {
        height: 200,
        width: '85%',
        borderRadius: 15,
        justifyContent: 'center',
        elevation: 20,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'white'
    },

    imageModalScreen: {
        height: 400,
        width: '85%',
        borderRadius: 20,
        justifyContent: 'center',
        elevation: 20,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'white'
    },

    cardImageContainer: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

    cardImage: {
        height: 80,
        width: 80,
        marginVertical: 20,
        resizeMode: 'contain',
        justifyContent: 'center',
    },

    modalText: {
        paddingLeft: 15,
        marginTop: 10,
    },

    modalTextInput: {
        width: '90%',
        marginVertical: 10,
        padding: 5,
        paddingLeft: 15,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        backgroundColor: 'white'
    },

    modalTextInputContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 15,
    },

    modalButton: {
        padding: 10,
        width: '30%',
    },

});