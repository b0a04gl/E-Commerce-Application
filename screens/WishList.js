import React from 'react';
import { View, StyleSheet, ScrollView,Text } from 'react-native';
import ButtonAddRemove from '../components/Buttons/AddRemoveButton';
import Product from './Product';
import * as firebase from 'firebase';
import ApiKeys from '../database/RealtimeDb';
import { Card, Button } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AppButton from "../components/Buttons/AppButton";
import AsyncStorage from '@react-native-community/async-storage';

console.disableYellowBox = true;

export default class WishList extends React.Component {


  constructor(props)
  {
    super(props);
    

    const {index, routes} = this.props.navigation.dangerouslyGetState();
    const currentRoute = routes[index].name;
    console.log('current screen : ', routes[index].name);
    this.state = {
      products:[],
      keys: [],
      category : routes[index].name,
     userToken: ''
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.firebaseConfig);
    }

  }

  componentDidMount()
  {


    AsyncStorage.getItem('userToken').then((token) => {
        firebase.database().ref('/wishlist/' + token).on('value', (data) => {
            console.log(data.val());

            if (data.val()) {
                       var temp = data.val();
                       var keys = Object.keys(temp);
                       var x = [];
                       for(var index=0;index<keys.length;index++)
                       {
                         var key = keys[index];
                        
                        x.push(temp[key]);
                      //   x[index]['id']=key;
                      //   x[index]['qty']=0;
                        // console.log(x[index].image);
                       }
                      
                       this.setState(
                         {
                           products:x,
                           keys: keys,
                         }
                       );   
                    }
                    else {
                      this.setState({
                        products: []
                      });
                    }
          });
    });
    console.log("token : " + this.state.userToken);

  //'/inventory/'+this.state.category  
    

   
  }

  store = (product,navigation, index) =>{
    console.log("Current Product : "+product);
    firebase.database().ref('/current').set(product).then(() => {
    }).catch((error) => {
        console.log(error);
    });
    var key = {
      key: this.state.keys[index],
      category: this.state.category,
    };
    firebase.database().ref('/key').set(key).then(() => {
    }).catch((error) => {
        console.log(error);
    });
    navigation.navigate('Details');

  }


    render() {

      const {navigation} = this.props;

      return (
        <ScrollView
          style={{
            flexGrow: 0,
            width: "100%",
            height: "100%",
          }}>

            {/* <View>
            <Button
            type="clear"
            title='Add to Cart'
            onPress={() =>navigation.navigate('Home',{num:12})} />
              </View> */}
          {
            this.state.products.map((product, index) => {


                

              return(
                <View style={styles.row} key={index}>
                    <View style={styles.col}>
                      
                      <Product product={product} />
                      <TouchableOpacity style={styles.options} >
<AppButton
            height={30}
            width = {100}
            title="Details >>>"
            onTap={() =>this.store(product,navigation,index)   }
          />
</TouchableOpacity>
                     
                    </View>
                </View>
              
              )

              
            })
          }
        </ScrollView>
      );
    }
}



const styles = StyleSheet.create({
  row: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
  },
  col: {
      flex: 1,
  },
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
      options: {
        // display: "flex",
        // height: 80,
        // justifyContent: "space-between",
        // alignItems: "center",
        // flexDirection: "row",
        // paddingLeft: 50,
        // paddingRight: 20,
        // borderTopColor: "#DFDFDF",
        // borderTopWidth: 0.5,
        // borderBottomColor: "#DFDFDF",
        // borderBottomWidth: 0.5,

        marginTop:10

      },
});
