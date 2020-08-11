import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Button, Modal, TextInput, Alert } from 'react-native';
import * as firebase from 'firebase';
import ApiKeys from '../database/RealtimeDb';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import * as ImagePicker from 'expo-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';

export default class DealerProducts extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      dealerProducts: [],
      categories: [],
      dropDown: [],
      productName: '',
      productPrice: '',
      stocks: '',
      category: '',
      description: '',
      showModal: false,
      buttonTitle: 'Add Product',
      index: -1,
      userToken: null,
      image: require('../assets/images/add.png'),
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.firebaseConfig);
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('userToken').then((userToken) => {
      if (userToken) {
        this.setState({
          userToken: userToken,
        });
        this._isMounted = true;
        firebase.database().ref('/dealers/' + this.state.userToken).on('value', data => {
          if (this._isMounted) {
            if (data.val()) {
              this.setState({
                dealerProducts: data.val(),
              });
            }
          }
        });
        firebase.database().ref('/drawerMenu').on('value', data => {
          if (this._isMounted) {
            if (data.val()) {
              data.val().map(category => {
              this.setState({
                categories: [...this.state.categories, {label:category, value:category}],
              });
            });
            }
          }
        });
      }
    });

   

  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  showInput = () => {
    this.setState({
      buttonTitle: 'Add Product',
      showModal: true,
    });
  };

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
          this.setState({
            image: { uri: url },
          });
        });
      })
      .catch((e) => console.log('uploading image error => ', e));
  };

  addProduct = () => {
    if (this.state.image.uri) {
      const product = {
        productName: this.state.productName,
        productPrice: this.state.productPrice,
        stocks: this.state.stocks,
        category: this.state.category,
        description: this.state.description,
        status: 'Pending',
        image: this.state.image,
      };
      let products;
      if (this.state.buttonTitle === 'Add Product') {
        products = [...this.state.dealerProducts, product];
      }
      else {
        products = this.state.dealerProducts;
        products.splice(this.state.index, 1);
        products.push(product);
      }
      this.setState({
        dealerProducts: products,
        productName: '',
        productPrice: '',
        stocks: '',
        description: '',
        category: '',
        showModal: false,
        image: require('../assets/images/add.png'),
      });
    }
    else {
      Alert.alert('Image Not Found', 'Pick an Image from the gallery');
    }
  };

  updateProduct = (index) => {
    const product = this.state.dealerProducts[index];
    console.log(product);
    this.setState({
      buttonTitle: 'Update Product',
      index: index,
      productName: product.productName,
      productPrice: product.productPrice,
      stocks: product.stocks,
      description: product.description,
      category: product.category,
      showModal: true,
    })
  };

  deleteProduct = (index) => {
    const products = this.state.dealerProducts;
    products.splice(index, 1);
    this.setState({
      dealerProducts: products,
    });
  };

  saveToDB = () => {
    if (this.state.dealerProducts.length > 0) {
      firebase.database().ref('/dealers/' + this.state.userToken).set(this.state.dealerProducts).then(() => {
        console.log('Inserted');
      }).catch((error) => {
        console.log(error);
      });
    }
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  closeModal = () => {
    this.setState({
      showModal: false,
    });
  };

  render() {
    return (
      <View style={styles.screen}>
        <ScrollView>
        <View style={styles.row}>
          <Text style={styles.text}>Products List</Text>
          <TouchableOpacity onPress={this.showInput}>
            <Image source={require('../assets/images/plus.png')} style={styles.image} />
          </TouchableOpacity>
        </View>
        <FlatList data={this.state.dealerProducts}
          renderItem={data => (
            <View style={styles.listContainer}>
              <Image source={data.item.image} style={styles.listimage} />
              <View style={styles.list}>
                <Text style={styles.name}>{data.item.productName}</Text>
                <Text style={styles.price}>{data.item.productPrice}</Text>
                <Text style={styles.price}>{data.item.status}</Text>
              </View>
              <TouchableOpacity onPress={this.updateProduct.bind(this, data.index)}>
                <Image source={require('../assets/edit.png')} style={styles.Optionsimage} />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.deleteProduct.bind(this, data.index)}>
                <Image source={require('../assets/delete.png')} style={styles.Optionsimage} />
              </TouchableOpacity>
            </View>
          )} />
          </ScrollView>
        <View>
          <TouchableOpacity style={styles.footer} onPress={this.saveToDB}>
            <Text style={styles.footerText}>SAVE CHANGES</Text>
          </TouchableOpacity>
        </View>
        <Modal
          visible={this.state.showModal}
          position='center'
          onRequestClose={this.closeModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalScreen}>
              <TouchableOpacity onPress={this.AddImageHandler} style={styles.imageContainer}>
                <Image source={this.state.image} style={styles.previewImage} />
              </TouchableOpacity>
              <TextInput
                placeholder='Enter your product name'
                placeholderTextColor='black'
                style={styles.textInput}
                value={this.state.productName}
                onChangeText={(val) => this.inputValueUpdate(val, 'productName')} />
              <TextInput
                placeholder='Enter your product price'
                placeholderTextColor='black'
                style={styles.textInput}
                value={this.state.productPrice}
                onChangeText={(val) => this.inputValueUpdate(val, 'productPrice')} />
              <TextInput
                placeholder='Enter your product stock'
                placeholderTextColor='black'
                style={styles.textInput}
                value={this.state.stocks}
                onChangeText={(val) => this.inputValueUpdate(val, 'stocks')} />
                <TextInput
                placeholder='Enter your product description'
                multiline={true}
                placeholderTextColor='black'
                style={styles.textInput}
                value={this.state.description}
                onChangeText={(val) => this.inputValueUpdate(val, 'description')} />
                <DropDownPicker
                    items={this.state.categories}
                    defaultNull
                    placeholder="Select the product category"
                    containerStyle={{height: 40, marginVertical: 10,}}
                    dropDownStyle={{backgroundColor: 'white'}}
                    style={{backgroundColor: 'white'}}
                    activeLabelStyle={{color: '#009387'}}
                    onChangeItem={item => 
                      this.setState({
                        category: item.value,
                }) }
                />
              <TouchableOpacity style={styles.button}>
                <Button title={this.state.buttonTitle} color='green' onPress={this.addProduct} />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingHorizontal: 20,
  },

  text: {
    color: 'blue',
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },

  image: {
    height: 10,
    width: 10,
    padding: 20,
  },

  listContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: 'black',
    paddingHorizontal: 20,
  },

  list: {
    width: '70%',
    marginVertical: 10,
    padding: 10,
  },

  listimage: {
    height: 10,
    width: 10,
    padding: 20,
    marginHorizontal: 20,
  },

  name: {
    fontSize: 16,
  },

  price: {
    color: 'red',
  },

  Optionsimage: {
    height: 10,
    width: 10,
    padding: 15,
    marginRight: 10,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalScreen: {
    width: '90%',
  },

  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },

  previewImage: {
    height: 80,
    width: 80,
  },

  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginVertical: 10,
    padding: 10,
  },

  button: {
    marginVertical: 20,
  },

  footer: {
    backgroundColor: '#ec2F4B',
    padding: 15,
    elevation: 10,
    borderRadius: 10,
    margin: 5,
    alignItems: 'center',
  },

  footerText: {
    color: 'white',
  }

});