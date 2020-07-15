import Init from './initScreen';
import * as React from 'react';
import { TouchableOpacity,StyleSheet, Text, View ,Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './HomeScreen';
import DrawerNavigator from './Drawer';
import { Ionicons } from '@expo/vector-icons';


// class HeaderLeft extends React.Component {
//     //Top Navigation Header with Donute Button

//     constructor(props)
//     {
//         super(props);
//     }

//     toggleDrawer = () => {
//       //Props to open/close the drawer
//       this.props.navigationProps.toggleDrawer();
//     };
//     render() {
//       return (
//         <View style={{ flexDirection: 'row' }}>
//           <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
//             {/*Donute Button Image */}
//             <Image
//               source={require('../assets/drawer.png')}
//               style={{ width: 25, height: 25, marginLeft: 5 }}
//             />
//           </TouchableOpacity>
//         </View>
//       );
//     }
//   }



const Stack = createStackNavigator()
export default class StackNavigator extends React.Component{

    constructor(props)
    {
        super(props);
    }
    // const { navigate } = this.props.navigation;    
    render()
    {
        return (

        
            <NavigationContainer>
       
             <Stack.Navigator initialRouteName="Init" 
              
             >
              
               <Stack.Screen
                   name='Init'
                   component={Init}
                   options={{
                       title: 'Users',
                       
                       headerStyle: {
                         backgroundColor: '#ec2F4B',
                       },
                       headerTintColor: '#fff',
                       headerTitleStyle: {
                         fontWeight: 'bold',
                         alignSelf: 'center'
                       },
                     }}
             
               
                 />
               <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} 
               
                    options={{
                       title: 'Home',
                       headerLeft: null,
                     
                       headerStyle: {
                         backgroundColor: '#ec2F4B',
                       },
                       headerTintColor: '#fff',
                       headerTitleStyle: {
                         fontWeight: 'bold',
                         alignSelf: 'center'
                       },
                      
       
                     }}
                     
               />
             </Stack.Navigator>
           </NavigationContainer>
           )
    }
  }