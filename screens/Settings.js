// import React from 'react';
// import {View,Text,StyleSheet} from 'react-native';

// export default class Dealer extends React.Component
// {
//  render()
//  {
//     return(
//         <View style={{flex:1,justifyContent: "center",alignItems: "center"}}>
//         <Text>Settings Section</Text>
//    </View>
//     );
//  }
// }

import React from 'react';
import { Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import firebase from 'firebase';
import ApiKeys from '../database/RealtimeDb';
import { Text } from "react-native-elements";

console.disableYellowBox = true;

class Dealer extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = {
        user:[],
            isLoading: false,
            
          };
        if (!firebase.apps.length) {
            firebase.initializeApp(ApiKeys.firebaseConfig);
        }


       
       
    }



    
      inputValueUpdate = (val, prop) => {
    
        this.state.user[prop] = val;

      }
    



    //   storeUser() {
    //     if(this.state.name === ''){
    //      alert('Fill at least your name!')
    //     } else {
    //       this.setState({
    //         isLoading: true,
    //       });      
    //       firebase.database().ref('/inventory').push({
    //         productName: this.state.productName,
    //         productPrice: this.state.productPrice,
    //         stocks: this.state.stocks,
    //       }).then((res) => {
    //         this.setState({
    //           productName: '',
    //           productPrice: '',
    //           stocks: '',
    //           isLoading: false,
    //         });
    //         this.props.navigation.navigate('DealerProducts')
    //       })
    //       .catch((err) => {
    //         console.error("Error found: ", err);
    //         this.setState({
    //           isLoading: false,
    //         });
    //       });
    //     }
    //   }
    

    componentDidMount() {
        let dbRef = firebase.database().ref('currentUser');
        if (dbRef) {
          dbRef.on('value', (data) => {
            
            var temp = data.val();

            this.setState({
              fname : temp.fname,
              lname : temp.lname,
              phone : temp.phone,
              city : temp.city,
              token : temp.token,
              email : temp.email,
              password : temp.password,
              type : temp.type,
          });
            
        })
        }

        console.log(this.state.email+":"+this.state.pwd);

    }

    updateEmail = () =>{
       
        var currUser = {

          fname : this.state.fname,
          lname : this.state.lname,
          phone : this.state.phone,
          city : this.state.city,
          token : this.state.token,
          email : this.state.email,
          password : this.state.password,
          type : this.state.type,
        };
         firebase.database().ref('currentUser').set(currUser).then(() => {
                }).catch((error) => {
                  console.log(error);
                });

    }

    updatePwd = () =>
    {
      var currUser = {

        fname : this.state.fname,
        lname : this.state.lname,
        phone : this.state.phone,
        city : this.state.city,
        token : this.state.token,
        email : this.state.email,
        password : this.state.password,
        type : this.state.type,
      };
       firebase.database().ref('currentUser').set(currUser).then(() => {
              }).catch((error) => {    
                console.log(error);
              });
    }

   

    render() {

        const {navigation} = this.props;

        if(this.state.isLoading){
            return(
              <View style={styles.preloader}>
                <ActivityIndicator size="large" color="#9E9E9E"/>
              </View>
            )
          }

        return (


            
            <ScrollView style={styles.container}>
                <View style={styles.titleView}>
        <Text h2> Settings</Text>
        </View>
              <View style={styles.inputGroup}>
                <TextInput
                multiline={true}
                    placeholder={'Email'}
                    numberOfLines={2}
                    value={this.state.email}
                    onChangeText={(val) => this.setState({email:val})}
                />
              </View>
              
              <View style={styles.button}>
                <Button
                  title='Update email'
                  onPress={() => this.updateEmail()} 
                  color="#19AC52"
                />
              </View>

              <View style={styles.inputGroup}>
                <TextInput
                multiline={true}
                    placeholder={'Password'}
                    numberOfLines={2}
                    value={this.state.password}
                    onChangeText={(val) => this.setState({password:val})}
                />
              </View>
              
              <View style={styles.button}>
                <Button
                  title='Update Password'
                  onPress={() => this.updatePwd()} 
                  color="#19AC52"
                />
              </View>

              

            </ScrollView>
          );
      
    }
}

// <View style={styles.inputGroup}>
//                 <TextInput
//                     multiline={true}
//                     numberOfLines={2}
//                     placeholder={'Product Price'}
//                     value={this.state.productPrice}
//                     onChangeText={(val) => this.inputValueUpdate(val, 'productPrice')}
//                 />
//               </View>
//               <View style={styles.inputGroup}>
//                 <TextInput
//                 multiline={true}
//                     placeholder={'Stocks'}
//                     numberOfLines={2}
//                     value={this.state.stocks}
//                     onChangeText={(val) => this.inputValueUpdate(val, 'stocks')}
//                 />
//               </View>

export default Dealer;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 35,
      marginTop:100
    },
    inputGroup: {
      flex: 1,
      padding: 0,
      marginBottom: 15,
      marginTop:30,
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
    },
    titleView: {
      flex: 1,
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row",
      paddingLeft: 70,
      paddingRight: 20,
      
    },
  })
  
