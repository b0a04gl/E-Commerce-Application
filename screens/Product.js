// src/components/Product.js
import React from 'react';
import { Text, StyleSheet,View,Alert } from 'react-native';
import { Card, Button } from 'react-native-elements';
import ButtonAddRemove from '../components/Buttons/AddRemoveButton';
import AsyncStorage from '@react-native-community/async-storage';
import * as firebase from 'firebase';
import ApiKeys from '../database/RealtimeDb';


class Product extends React.Component {

    constructor(props)
    {
        super(props);

        console.log("reached.............");
        
        this.state = {
            item : this.props.product,
            userToken: '',
        }
        if (!firebase.apps.length) {
            firebase.initializeApp(ApiKeys.firebaseConfig);
        }

        var temp = this.state.item;
        if(temp!=null)
          temp.qty= 0;
    
        this.setState({
            item:temp,
        });

    }

    componentDidMount() {
      AsyncStorage.getItem('userToken').then((userToken) => {
        if (userToken) {
          this.setState({
            userToken: userToken,
          });
        }
      });
    }



     onAddItem = () => {
        // onAddToCart(item, qty);
        // Alert.alert("Clicked Add Item...");
    var temp = this.state.item;
    temp.qty= temp.qty+1;

    this.setState({
        item:temp,
    });



      };
    
       onRemoveItem = () => {
        // onAddToCart(item, qty);
        // Alert.alert("Clicked Remove Item...");

        var temp = this.state.item;
        temp.qty= temp.qty-1;
    
        this.setState({
            item:temp,
        });

      } 

      addToDB = () => {

        

        firebase.database().ref('/cart/'+this.state.userToken).push(this.state.item).then(() => {
        }).catch((error) => {
            console.log(error);
        });

        

      }

      store = () =>{
        firebase.database().ref('/current').set(this.state.item).then(() => {
        }).catch((error) => {
            console.log(error);
        });
      }

    render() {


      const {navigation,p} = this.props;

      return (
        <Card
          onPress = {this.store()}
            image={this.state.item.image}>
                
            <Text style={{marginBottom: 10, marginTop: 20 }} h2>
                {this.state.item.productName}
            </Text>
            <Text style={styles.price} h4>
            ₹{this.state.item.productPrice}
            </Text>
            
          

            <Text h6 style={styles.description}>
                added 2h ago
            </Text>

            <View style={styles.countView}>  
          <ButtonAddRemove
            title="-"
            // width={0}
            onTap={() =>this.onRemoveItem()}
          />

          <Text
            h1
            style={{ alignSelf: "center", margin: 5, fontWeight: "bold" }}
          >
           {this.state.item.qty}
          </Text>
          <ButtonAddRemove
            title="+"
            onTap={() =>this.onAddItem()}
          />
        </View>

            <Button
            type="clear"
            title='Add to Cart'
            onPress={() =>this.addToDB()} />



            
        </Card>
      );
    }
}

const styles = StyleSheet.create({
    name: {
        color: '#5a647d',
        fontWeight: 'bold',
        fontSize: 30
    },
    price: {
        fontWeight: 'bold',
        marginBottom: 10
    },
    description: {
        fontSize: 10,
        color: '#c1c4cd'
    },
    countView: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        flex: 8,
      },
     
});

export default Product;
