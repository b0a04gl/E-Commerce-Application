// import React from 'react';
// import {View,Text,StyleSheet} from 'react-native';

// export default class Dealer extends React.Component
// {
//  render()
//  {
//     return(
//         <View style={{flex:1,justifyContent: "center",alignItems: "center"}}>
//         <Text>Dealer Section</Text>
//    </View>
//     );
//  }
// }




import React from 'react';
import { Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import firebase from 'firebase';
import ApiKeys from '../database/RealtimeDb';
console.disableYellowBox = true;
class Dealer extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = {
            productName: '',
            productPrice: '',
            stocks: '',
            isLoading: false,
            
          };
        if (!firebase.apps.length) {
            firebase.initializeApp(ApiKeys.firebaseConfig);
        }

       
    }



    
      inputValueUpdate = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
      }
    
      storeUser() {
        if(this.state.name === ''){
         alert('Fill at least your name!')
        } else {
          this.setState({
            isLoading: true,
          });      
          firebase.database().ref('/inventory').push({
            productName: this.state.productName,
            productPrice: this.state.productPrice,
            stocks: this.state.stocks,
          }).then((res) => {
            this.setState({
              productName: '',
              productPrice: '',
              stocks: '',
              isLoading: false,
            });
            this.props.navigation.navigate('DealerProducts')
          })
          .catch((err) => {
            console.error("Error found: ", err);
            this.setState({
              isLoading: false,
            });
          });
        }
      }
    

    componentDidMount() {


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
              <View style={styles.inputGroup}>
                <TextInput
                multiline={true}
                    placeholder={'Product Name'}
                    numberOfLines={2}
                    value={this.state.productName}
                    onChangeText={(val) => this.inputValueUpdate(val, 'productName')}
                />
              </View>
              <View style={styles.inputGroup}>
                <TextInput
                    multiline={true}
                    numberOfLines={2}
                    placeholder={'Product Price'}
                    value={this.state.productPrice}
                    onChangeText={(val) => this.inputValueUpdate(val, 'productPrice')}
                />
              </View>
              <View style={styles.inputGroup}>
                <TextInput
                multiline={true}
                    placeholder={'Stocks'}
                    numberOfLines={2}
                    value={this.state.stocks}
                    onChangeText={(val) => this.inputValueUpdate(val, 'stocks')}
                />
              </View>
              <View style={styles.button}>
                <Button
                  title='Add Product'
                  onPress={() => this.storeUser()} 
                  color="#19AC52"
                />
              </View>
            </ScrollView>
          );
      
    }
}

export default Dealer;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 35
    },
    inputGroup: {
      flex: 1,
      padding: 0,
      marginBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#cccccc',
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
  
