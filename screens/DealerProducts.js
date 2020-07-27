

import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from 'firebase';
import ApiKeys from '../database/RealtimeDb';
import {Card } from 'react-native-elements';

class Display extends Component
{
    constructor(props)
    {
        super(props);
        this.setState={
            product : null
        };
        if (!firebase.apps.length) {
            firebase.initializeApp(ApiKeys.firebaseConfig);
        }
    }
    
    componentDidMount() {

        firebase.database().ref('/inventory/'+this.props.key).on('value', (data) => {
                // console.log(data.toJSON());
                
                if (data.val()) {
                    this.setState({
                        product: data.val(),
                        isLoading : false
                    });
                }
        
    });
}

    render()
    {
        return(
            <Card
            featuredTitle = {this.state.product.productName}
            // image = {require('./carsImages/Roadster.jpg')}
         >
            <Text style={{margin: 10}}>
            {this.state.product.productPrice}
            </Text>
         </Card>
        );
    
    }    

}

class DealerProducts extends Component {

  constructor() {
    super();
    
    this.state = {
      isLoading: true,
      productArr: []
    };
    if (!firebase.apps.length) {
        firebase.initializeApp(ApiKeys.firebaseConfig);
    }
  }



  componentDidMount() {

    firebase.database().ref('/inventory').on('value', (data) => {
            // console.log(data.toJSON());
            var items = [];
            data.forEach((child) => {
          items.push({
            productName: child.val().productName,
            productPrice: child.val().productPrice,
            stocks :  child.val().stocks,
            key: child.key
          });
        });
  
        this.setState({
          productArr : items,
          isLoading : false
        });
        });
    
}

render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }    
    return (
      <ScrollView style={styles.container}>
          {
            this.state.productArr.map((item, i) => {
              return (
                <ListItem
                  key={i}
                  chevron
                  bottomDivider
                  title={item.productName}
                  subtitle={item.key}
                  onPress={<Drawer key={item.key} />}/>
              );
            })
          }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingBottom: 22
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default DealerProducts;