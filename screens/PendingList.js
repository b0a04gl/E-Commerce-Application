// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// export default class PendingList extends React.Component {
//    _isMounted = false;
//    constructor(props) {
//       super(props);
//       this.state = {
//          dealerProducts: [],
//       };
//    }

//    componentDidMount() {
//       this._isMounted = true;
//       firebase.database().ref('/dealers').on('value', data => {
//          if (this._isMounted) {
//             if (data.val()) {
//                this.setState({
//                   dealerProducts: data.val(),
//                });
//             }
//          }
//       });
//    }

//    componentWillUnmount() {
//       this._isMounted = false;
//    }
//    render() {
//       return (
//          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//             <Text>{this.state.dealerProducts}</Text>
//          </View>
//       );
//    }
// }

import React from 'react';
import {View,Text,StyleSheet} from 'react-native';

export default class PendingList extends React.Component
{
 render()
 {
    return(
        <View style={{flex:1,justifyContent: "center",alignItems: "center"}}>
        <Text>Pending List</Text>
   </View>
    );
 }
}