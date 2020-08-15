import React from 'react';
import { View, ScrollView, Modal, StyleSheet, Button,TextInput, FlatList, Image, TouchableOpacity, Text, Alert } from 'react-native';
import * as firebase from 'firebase';
import ApiKeys from '../database/RealtimeDb';

export default class PendingList extends React.Component {
   _isMounted = false;
   constructor(props) {
      super(props);
      this.state = {
         dealers: [],
         showModal: false,
         price: '',
         discount: '',
         key: '',
         productIndex: 0,
      };
      if (!firebase.apps.length) {
         firebase.initializeApp(ApiKeys.firebaseConfig);
      }
   }

   componentDidMount() {
      this._isMounted = true;
      var dealer = null;
      var dealers = {};
      firebase.database().ref('/dealers').on('value', data => {
         if (this._isMounted) {
            if (data.val()) {
               this.setState({
                  dealers: data.val(),
               });
            }
         }
      });

   }

   componentWillUnmount() {
      this._isMounted = false;
   }

   AddProduct = () => {
      const key = this.state.key;
      const productIndex = this.state.productIndex;
      const product = this.state.dealers[key][productIndex];
      product.productPrice = (this.state.price - (this.state.price)*this.state.discount/100).toString();
      firebase.database().ref('/inventory/' + product.category).push(product).then(() => {
         firebase.database().ref('dealers/' + key + '/' + productIndex.toString()).update({ status: 'Accepted' });
      }).catch((error) => {
         console.log(error);
      });
      firebase.database().ref('/recentProducts').push(product).then(() => {
      }).catch((error) => console.log(error));
      this.setState({
         showModal: false,
      });
   };

   addToProduct = (key, productIndex) => {
      Alert.alert('Accept Product', 'Are you sure you want to add this product to the inventory list?', [{
         text: 'Cancel',
         style: 'cancel',
      }, {
         text: 'OK',
         onPress: () => {
            this.setState({
               key: key,
               productIndex: productIndex,
               price: this.state.dealers[key][productIndex].productPrice,
               showModal: true,
            });
            
         }
      }]);
   };

   deleteProduct = (key, productIndex) => {
      Alert.alert('Delete Product', 'Are you sure you want to reject this product?', [{
         text: 'Cancel',
         style: 'cancel',
      }, {
         text: 'OK',
         onPress: () => {
            firebase.database().ref('dealers/' + key + '/' + productIndex.toString()).update({ status: 'Rejected' });
         }
      }]);
   };

   closeModal = () => {
      this.setState({
          showModal: false,
      });
  };

   render() {

      return (
         <ScrollView keyboardShouldPersistTaps='always' style={styles.screen}>
            {Object.keys(this.state.dealers).map((key, index) => (
               <View style={styles.display}>
                  <Text style={styles.text}>Dealer ID: {key}</Text>
                  <FlatList data={this.state.dealers[key]}
                     renderItem={data => {
                        if (data.item.status === 'Pending') {
                           return (
                              <View style={styles.listContainer}>
                                 <Image source={data.item.image} style={styles.listimage} />
                                 <View style={styles.list}>
                                    <Text style={styles.name}>{data.item.productName}</Text>
                                    <Text style={styles.price}>{data.item.productPrice}</Text>
                                 </View>
                                    <View style={styles.img}>
                                       <TouchableOpacity onPress={this.addToProduct.bind(this, key, data.index)}>
                                          <Image source={require('../assets/tick.png')} style={styles.Optionsimage} />
                                       </TouchableOpacity>
                                       <TouchableOpacity onPress={this.deleteProduct.bind(this, key, data.index)}>
                                          <Image source={require('../assets/delete.png')} style={styles.Optionsimage} />
                                       </TouchableOpacity>
                                    </View> 
                              </View>
                           )
                        }
                     }} />
               </View>
            ))
            }
            <Modal
                    visible={this.state.showModal}
                    position='center'
                    transparent={true}
                    onRequestClose={this.closeModal}>
                    <View style={styles.modalContainer}>
                        <View style={styles.cardModalScreen}>
                            <Text style={styles.modalText}>Enter Product Price:</Text>
                            <View style={styles.modalTextInputContainer}>
                                <TextInput style={styles.modalTextInput} onChangeText={(price) => this.setState({ price: price })} value={this.state.price} />
                            </View>
                            <Text style={styles.modalText}>Enter Product Discount Percentage:</Text>
                            <View style={styles.modalTextInputContainer}>
                                 <TextInput style={styles.modalTextInput} onChangeText={(discount) => this.setState({ discount: discount })} value={this.state.discount} />
                            </View>
                            <View style={styles.modalButtonContainer}>
                                <View style={styles.modalButton}>
                                    <Button title='OK' onPress={this.AddProduct} />
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
};

const styles = StyleSheet.create({

   screen: {
      flex: 1,
   },

   display: {
      marginVertical: 10,
   },

   text: {
      color: 'blue',
      fontSize: 16,
      paddingLeft: 10,
   },

   listContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomWidth: 0.5,
      borderColor: 'black',
      paddingLeft: 20,
      paddingRight: 30,
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

   img: {
      flexDirection: 'row',
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

   status: {
      fontSize: 15,
      marginRight: 20,
      fontWeight: 'bold',
   },

   modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },

  cardModalScreen: {
      height: 300,
      width: '85%',
      borderRadius: 15,
      justifyContent: 'center',
      elevation: 20,
      borderWidth: 1,
      borderColor: 'black',
      backgroundColor: 'white'
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
