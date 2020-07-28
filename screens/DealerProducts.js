import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Button, Modal, TextInput, Alert } from 'react-native';
import * as firebase from 'firebase';
import ApiKeys from '../database/RealtimeDb';
import { FlatList } from 'react-native-gesture-handler';

export default class DealerProducts extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      dealerID: '002',
      dealerProducts: [],
      productName: '',
      productPrice: '',
      stocks: '',
      showModal: false,
      buttonTitle: 'Add Product',
      index: -1,
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.firebaseConfig);
    }
  }

  componentDidMount() {
    this._isMounted = true;
    firebase.database().ref('/dealers/' + this.state.dealerID).on('value', data => {
      if (this._isMounted) {
        if (data.val()) {
          this.setState({
            dealerProducts: data.val(),
          });
        }
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

  addProduct = () => {
    const product = {
      productName: this.state.productName,
      productPrice: this.state.productPrice,
      stocks: this.state.stocks,
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
      showModal: false,
    });
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
    if(this.state.dealerProducts.length > 0) {
      firebase.database().ref('/dealers/'+this.state.dealerID).set(this.state.dealerProducts).then(() => {
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
        <View style={styles.row}>
          <Text style={styles.text}>Products List</Text>
          <TouchableOpacity onPress={this.showInput}>
            <Image source={require('../assets/images/plus.png')} style={styles.image} />
          </TouchableOpacity>
        </View>
        <FlatList data={this.state.dealerProducts}
          renderItem={data => (
            <View style={styles.listContainer}>
              <Image source={require('../assets/images/add.png')} style={styles.listimage} />
              <View style={styles.list}>
                <Text style={styles.name}>{data.item.productName}</Text>
                <Text style={styles.price}>{data.item.productPrice}</Text>
              </View>
              <TouchableOpacity onPress={this.updateProduct.bind(this, data.index)}>
                <Image source={require('../assets/edit.png')} style={styles.Optionsimage} />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.deleteProduct.bind(this, data.index)}>
                <Image source={require('../assets/delete.png')} style={styles.Optionsimage} />
              </TouchableOpacity>
            </View>
          )} />
        <View>
          <TouchableOpacity>
            <Button title='Save Changes' onPress={this.saveToDB} />
          </TouchableOpacity>
        </View>
        <Modal
          visible={this.state.showModal}
          position='center'
          onRequestClose={this.closeModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalScreen}>
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
              <View style={styles.button}>
                <Button title={this.state.buttonTitle} color='green' onPress={this.addProduct} />
              </View>
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
    height: 400,
    width: '90%',
  },

  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginVertical: 10,
    padding: 10,
  },

  button: {
    marginVertical: 20,
  }
});