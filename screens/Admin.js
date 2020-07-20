import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert, Modal, TextInput, Button } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import * as ImagePicker from 'expo-image-picker';
import Card from './Components/CardAdmin';

export default class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imagesDeck: [
        require('../assets/ad1.jpg'),
        require('../assets/ad2.jpg'),
        require('../assets/ad3.jpg'),
        require('../assets/ad4.jpg'),
      ],
      cards: [
        {
          key: new Date().getTime().toString(),
          images: [
            {
              key: 1,
              image: require('../assets/images/headphones.jpeg'),
              textItem: 'Headphones',
              textOff: '20% Offer',
            },
            {
              key: 2,
              image: require('../assets/images/smartwatch.jpeg'),
              textItem: 'Smartwatch',
              textOff: '10% Offer'
            },
            {
              key: 3,
              image: require('../assets/images/shoes.jpeg'),
              textItem: 'Shoes',
              textOff: '30% Offer',
            },
            {
              key: 4,
              image: require('../assets/images/speaker.jpeg'),
              textItem: 'Speaker',
              textOff: '5% Offer'
            },
          ],
          header: 'Offers',
        },
        {
          key: new Date().getTime().toString(),
          images: [
            {
              key: 5,
              image: require('../assets/images/offerphone1.jpeg'),
              textItem: 'Realme Phone',
              textOff: '\u20B9 8999 only'
            },
            {
              key: 6,
              image: require('../assets/images/offerphone2.jpeg'),
              textItem: 'Oppo Phone',
              textOff: '\u20B9 9999 only'
            },
            {
              key: 7,
              image: require('../assets/images/offerphone3.jpeg'),
              textItem: 'Samsung Phone',
              textOff: '\u20B9 12395 only'
            }
          ],
          header: 'Mobile Phones'
        }
      ],
      imageIndex: 0,
      cardCount: 2,
      header: '',
      image: require('../assets/images/add.png'),
      smallText: '',
      bigText: '',
      showCardModal: false,
      showImageModal: false,
    };
  }

  AddImageHandler = async () => {
    const permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }
    this.setState({
      imagesDeck: [...this.state.imagesDeck, { uri: pickerResult.uri }],
    });

  };

  DeleteImageHandler = index => {
    const imageDeckArray = this.state.imagesDeck;
    imageDeckArray.splice(index, 1);
    this.setState({
      imagesDeck: imageDeckArray,
    });
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

  AddCardImage = async () => {
    const permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }
    this.setState({
      image: { uri: pickerResult.uri },
    });
  };

  AddCardContent = (header, image, smallText, bigText) => {
    const cardArray = this.state.cards;
    const cardIndex = cardArray.findIndex(card => card.header === header);
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
      image: require('../assets/images/add.png'),
      smallText: '',
      bigText: '',
    });
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
        cardArray[cardIndex].images.splice(index, 1);
        this.setState({
          cards: cardArray,
        });
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
        cardArray.splice(cardIndex, 1);
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

  render() {
    return (
      <ScrollView keyboardShouldPersistTaps='always' style={styles.screen}>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={this.AddImageHandler}>
            <Image source={require('../assets/images/add.png')} style={styles.image} />
          </TouchableOpacity>
          <Text style={{fontSize:18, fontWeight: 'bold'}}> Image Deck </Text>
          <TouchableOpacity onPress={this.DeleteImageHandler.bind(this, this.state.imageIndex)}>
            <Image source={require('../assets/images/delete.png')} style={styles.image} />
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
          {this.state.cards.map(card => <Card images={card.images} header={card.header} addImage={this.AddCardImageHandler} deleteImage={this.DeleteCardImageHandler} deleteCard={this.DeleteCardHandler} />)}
          <TouchableOpacity style={styles.imgContainer} onPress={this.AddCardHandler}>
            <Image source={require('../assets/images/add.png')} style={styles.addImage} />
          </TouchableOpacity>
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
              <TouchableOpacity onPress={this.AddCardImage} style={styles.cardImageContainer}>
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

  imgContainer: {
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