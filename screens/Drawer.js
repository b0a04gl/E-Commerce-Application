import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons'; 
import Home from './HomeScreen';
import {DrawerContent} from './DrawerContent';
import BeautyPersonalcare from './Category/BeautyPersonalcareCategory';
import Electronics from './Category/ElectronicsCategory';
import Fashion from './Category/FashsionCategory';
import HomeFurniture from './Category/HomeFurnitureCategory';
import RefurbishedProducts from './Category/RefurbishedProductsCategory';
import SportsBooks from './Category/SportsBooksCategory';
import ToysBaby from './Category/ToysBabyCategory';
import TVsAppliances from './Category/TVsAppliancesCategory';
import ProfileScreen from './ProfileScreen';
import Init from './initScreen';
import BrowseElectronics from './Category/BrowseElectronics';
import BrowseFashion from './Category/BrowseFashion';
import BrowseBeautyPersonalcare from './Category/BrowseBeautyPersonalcare';
import BrowseHomeFurniture from './Category/BrowseHomeFurniture';
import BrowseSportsBooks from './Category/BrowseSportsBooks';
import BrowseToysBaby from './Category/BrowseToysBaby';
import BrowseTVsAppliances from './Category/BrowseTVsAppliances';
import OTPAuth from './OTPAuth';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const HomeStack = createStackNavigator();
const InitStack = createStackNavigator();

const InitStackScreen =({navigation}) =>(
    <Stack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#ec2F4B',
          },

          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            alignSelf: 'center'
          },
    }}>
        <Stack.Screen name="Init" component={Init} options={{
            title:'E-Commerce App',
            
        }}/>

    </Stack.Navigator>
);

const OTPAuthStackScreen =({navigation}) =>(
    <Stack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#ec2F4B',
          },

          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            alignSelf: 'center'
          },
    }}>
        <Stack.Screen name="OTPAuth" component={OTPAuth} options={{
            title:'OTPAuth',
            
        }}/>

    </Stack.Navigator>
);

const HomeStackScreen =({navigation}) =>(
    <Stack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#ec2F4B',
          },

          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            // alignSelf: 'center'
           
          },
    }}>
        <Stack.Screen name="Home" component={Home} options={{
            title:'Home',
            headerStyle: {
                backgroundColor: '#ec2F4B',
              },
            headerTitleAlign: 'center',
            headerLeft : () => (
                <Icon.Button  name = 'ios-menu' size={30}
                backgroundColor = '#ec2F4B' onPress={() => navigation.openDrawer()}></Icon.Button>
            ),
            
            headerRight : () => (
                <Icon.Button  name = 'ios-cart' size={30}
                backgroundColor = '#ec2F4B' onPress={() => navigation.openDrawer()}></Icon.Button>
            ),

        }}/>

    </Stack.Navigator>
);


const ProfileScreenStackScreen =({navigation}) =>(
    <Stack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#ec2F4B',
          },

          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            // alignSelf: 'center'
           
          },
    }}>
        <Stack.Screen name="Profile" component={ProfileScreen} options={{
            title:'Profile',
            headerStyle: {
                backgroundColor: '#ec2F4B',
              },
            headerTitleAlign: 'center',
            headerLeft : () => (
                <Icon.Button  name = 'ios-menu' size={30}
                backgroundColor = '#ec2F4B' onPress={() => navigation.openDrawer()}></Icon.Button>
            ),

              

        }}/>

    </Stack.Navigator>
);


const BeautyPersonalcareStackScreen =({navigation}) =>(
    <Stack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#ec2F4B',
          },

          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            // alignSelf: 'center'
           
          },
    }}>
        <Stack.Screen name="BeautyPersonalcare" component={BeautyPersonalcare} options={{
            title:'BeautyPersonalcare',
            headerStyle: {
                backgroundColor: '#ec2F4B',
              },
            headerTitleAlign: 'center',
            headerLeft : () => (
                <Icon.Button  name = 'ios-menu' size={30}
                backgroundColor = '#ec2F4B' onPress={() => navigation.openDrawer()}></Icon.Button>
            ),

              

        }}/>

    </Stack.Navigator>
);

const ElectronicsStackScreen =({navigation}) =>(
    <Stack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#ec2F4B',
          },

          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            // alignSelf: 'center'
           
          },
    }}>
        <Stack.Screen name="Electronics" component={Electronics} options={{
            title:'Electronics',
            headerShown: false,
            headerStyle: {
                backgroundColor: '#ec2F4B',
              },
            headerTitleAlign: 'center',
            headerLeft : () => (
                <Icon.Button  name = 'ios-menu' size={30}
                backgroundColor = '#ec2F4B' onPress={() => navigation.openDrawer()}></Icon.Button>
            ),

              

        }}/>

    </Stack.Navigator>
);

const FashionStackScreen =({navigation}) =>(
    <Stack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#ec2F4B',
          },

          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            // alignSelf: 'center'
           
          },
    }}>
        <Stack.Screen name="Fashion" component={Fashion} options={{
            title:'Fashion',
            headerStyle: {
                backgroundColor: '#ec2F4B',
              },
            headerTitleAlign: 'center',
            headerLeft : () => (
                <Icon.Button  name = 'ios-menu' size={30}
                backgroundColor = '#ec2F4B' onPress={() => navigation.openDrawer()}></Icon.Button>
            ),

              

        }}/>

    </Stack.Navigator>
);

const HomeFurnitureStackScreen =({navigation}) =>(
    <Stack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#ec2F4B',
          },

          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            // alignSelf: 'center'
           
          },
    }}>
        <Stack.Screen name="HomeFurniture" component={HomeFurniture} options={{
            title:'HomeFurniture',
            headerStyle: {
                backgroundColor: '#ec2F4B',
              },
            headerTitleAlign: 'center',
            headerLeft : () => (
                <Icon.Button  name = 'ios-menu' size={30}
                backgroundColor = '#ec2F4B' onPress={() => navigation.openDrawer()}></Icon.Button>
            ),

              

        }}/>

    </Stack.Navigator>
);


const RefurbishedProductsStackScreen =({navigation}) =>(
    <Stack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#ec2F4B',
          },

          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            // alignSelf: 'center'
           
          },
    }}>
        <Stack.Screen name="RefurbishedProducts" component={RefurbishedProducts} options={{
            title:'RefurbishedProducts',
            headerStyle: {
                backgroundColor: '#ec2F4B',
              },
            headerTitleAlign: 'center',
            headerLeft : () => (
                <Icon.Button  name = 'ios-menu' size={30}
                backgroundColor = '#ec2F4B' onPress={() => navigation.openDrawer()}></Icon.Button>
            ),

              

        }}/>

    </Stack.Navigator>
);

const SportsBooksStackScreen =({navigation}) =>(
    <Stack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#ec2F4B',
          },

          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            // alignSelf: 'center'
           
          },
    }}>
        <Stack.Screen name="SportsBooks" component={SportsBooks} options={{
            title:'SportsBooks',
            headerStyle: {
                backgroundColor: '#ec2F4B',
              },
            headerTitleAlign: 'center',
            headerLeft : () => (
                <Icon.Button  name = 'ios-menu' size={30}
                backgroundColor = '#ec2F4B' onPress={() => navigation.openDrawer()}></Icon.Button>
            ),

              

        }}/>

    </Stack.Navigator>
);


const ToysBabyStackScreen =({navigation}) =>(
    <Stack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#ec2F4B',
          },

          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            // alignSelf: 'center'
           
          },
    }}>
        <Stack.Screen name="ToysBaby" component={ToysBaby} options={{
            title:'ToysBaby',
            headerStyle: {
                backgroundColor: '#ec2F4B',
              },
            headerTitleAlign: 'center',
            headerLeft : () => (
                <Icon.Button  name = 'ios-menu' size={30}
                backgroundColor = '#ec2F4B' onPress={() => navigation.openDrawer()}></Icon.Button>
            ),

              

        }}/>

    </Stack.Navigator>
);

const TVsAppliancesStackScreen =({navigation}) =>(
    <Stack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#ec2F4B',
          },

          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            // alignSelf: 'center'
           
          },
    }}>
        <Stack.Screen name="TVsAppliances" component={TVsAppliances} options={{
            title:'TVsAppliances',
            headerStyle: {
                backgroundColor: '#ec2F4B',
              },
            headerTitleAlign: 'center',
            headerLeft : () => (
                <Icon.Button  name = 'ios-menu' size={30}
                backgroundColor = '#ec2F4B' onPress={() => navigation.openDrawer()}></Icon.Button>
            ),

              

        }}/>

    </Stack.Navigator>
);

const BrowseElectronicsStackScreen =({navigation}) =>(
    <Stack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#ec2F4B',
          },

          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            // alignSelf: 'center'
           
          },
    }}>
        <Stack.Screen name="BrowseElectronics" component={BrowseElectronics} options={{
            title:'BrowseElectronics',
            headerShown: false,
            headerStyle: {
                backgroundColor: '#ec2F4B',
              },
            headerTitleAlign: 'center',
            headerLeft : () => (
                <Icon.Button  name = 'ios-menu' size={30}
                backgroundColor = '#ec2F4B' onPress={() => navigation.openDrawer()}></Icon.Button>
            ),

              

        }}/>

    </Stack.Navigator>
);

const BrowseFashionStackScreen =({navigation}) =>(
    <Stack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#ec2F4B',
          },

          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            // alignSelf: 'center'
           
          },
    }}>
        <Stack.Screen name="BrowseFashion" component={BrowseFashion} options={{
            title:'BrowseFashion',
            headerShown: false,
            headerStyle: {
                backgroundColor: '#ec2F4B',
              },
            headerTitleAlign: 'center',
            headerLeft : () => (
                <Icon.Button  name = 'ios-menu' size={30}
                backgroundColor = '#ec2F4B' onPress={() => navigation.openDrawer()}></Icon.Button>
            ),

              

        }}/>

    </Stack.Navigator>
);
// BrowseBeautyPersonalcare

const BrowseBeautyPersonalcareStackScreen =({navigation}) =>(
    <Stack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#ec2F4B',
          },

          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            // alignSelf: 'center'
           
          },
    }}>
        <Stack.Screen name="BrowseBeautyPersonalcare" component={BrowseBeautyPersonalcare} options={{
            title:'BrowseBeautyPersonalcare',
            headerShown: false,
            headerStyle: {
                backgroundColor: '#ec2F4B',
              },
            headerTitleAlign: 'center',
            headerLeft : () => (
                <Icon.Button  name = 'ios-menu' size={30}
                backgroundColor = '#ec2F4B' onPress={() => navigation.openDrawer()}></Icon.Button>
            ),

              

        }}/>

    </Stack.Navigator>
);
// BrowseHomeFurniture


const BrowseHomeFurnitureStackScreen =({navigation}) =>(
    <Stack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#ec2F4B',
          },

          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            // alignSelf: 'center'
           
          },
    }}>
        <Stack.Screen name="BrowseHomeFurniture" component={BrowseHomeFurniture} options={{
            title:'BrowseHomeFurniture',
            headerShown: false,
            headerStyle: {
                backgroundColor: '#ec2F4B',
              },
            headerTitleAlign: 'center',
            headerLeft : () => (
                <Icon.Button  name = 'ios-menu' size={30}
                backgroundColor = '#ec2F4B' onPress={() => navigation.openDrawer()}></Icon.Button>
            ),

              

        }}/>

    </Stack.Navigator>
);

// BrowseSportsBooks
const BrowseSportsBooksStackScreen =({navigation}) =>(
    <Stack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#ec2F4B',
          },

          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            // alignSelf: 'center'
           
          },
    }}>
        <Stack.Screen name="BrowseSportsBooks" component={BrowseSportsBooks} options={{
            title:'BrowseSportsBooks',
            headerShown: false,
            headerStyle: {
                backgroundColor: '#ec2F4B',
              },
            headerTitleAlign: 'center',
            headerLeft : () => (
                <Icon.Button  name = 'ios-menu' size={30}
                backgroundColor = '#ec2F4B' onPress={() => navigation.openDrawer()}></Icon.Button>
            ),

              

        }}/>

    </Stack.Navigator>
);

// BrowseToysBaby

const BrowseToysBabyStackScreen =({navigation}) =>(
    <Stack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#ec2F4B',
          },

          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            // alignSelf: 'center'
           
          },
    }}>
        <Stack.Screen name="BrowseToysBaby" component={BrowseToysBaby} options={{
            title:'BrowseToysBaby',
            headerShown: false,
            headerStyle: {
                backgroundColor: '#ec2F4B',
              },
            headerTitleAlign: 'center',
            headerLeft : () => (
                <Icon.Button  name = 'ios-menu' size={30}
                backgroundColor = '#ec2F4B' onPress={() => navigation.openDrawer()}></Icon.Button>
            ),

              

        }}/>

    </Stack.Navigator>
);
BrowseTVsAppliances

const BrowseTVsAppliancesStackScreen =({navigation}) =>(
    <Stack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#ec2F4B',
          },

          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            // alignSelf: 'center'
           
          },
    }}>
        <Stack.Screen name="BrowseTVsAppliances" component={BrowseTVsAppliances} options={{
            title:'BrowseTVsAppliances',
            headerShown: false,
            headerStyle: {
                backgroundColor: '#ec2F4B',
              },
            headerTitleAlign: 'center',
            headerLeft : () => (
                <Icon.Button  name = 'ios-menu' size={30}
                backgroundColor = '#ec2F4B' onPress={() => navigation.openDrawer()}></Icon.Button>
            ),

              

        }}/>

    </Stack.Navigator>
);

export default function DrawerNavigator () {

    
    return(
        <NavigationContainer>
        <Drawer.Navigator initialRouteName="Users" drawerContent={props => <DrawerContent {...props}/>}>
        
        <Drawer.Screen name="Users" component={InitStackScreen} options={{drawerLabel: () => null,drawerIcon: () => null  }} />
        <Drawer.Screen name="Home" component={HomeStackScreen} />
        <Drawer.Screen name="OTPAuth" component={OTPAuthStackScreen} />
        <Drawer.Screen name="Profile" component={ProfileScreenStackScreen} />
        <Drawer.Screen name="BeautyPersonalcare" component={BeautyPersonalcareStackScreen} />
        <Drawer.Screen name="Electronics" component={ElectronicsStackScreen} />
        <Drawer.Screen name="Fashion" component={FashionStackScreen} />
        <Drawer.Screen name="HomeFurniture" component={HomeFurnitureStackScreen} />
        <Drawer.Screen name="RefurbishedProducts" component={RefurbishedProductsStackScreen} />
        <Drawer.Screen name="SportsBooks" component={SportsBooksStackScreen} />
        <Drawer.Screen name="ToysBaby" component={ToysBabyStackScreen} />
        <Drawer.Screen name="TVsAppliances" component={TVsAppliancesStackScreen} />
        <Drawer.Screen name="BrowseElectronics" component={BrowseElectronicsStackScreen} />
        <Drawer.Screen name="BrowseFashion" component={BrowseFashionStackScreen} />
        <Drawer.Screen name="BrowseBeautyPersonalcare" component={BrowseBeautyPersonalcareStackScreen} />
        <Drawer.Screen name="BrowseHomeFurniture" component={BrowseHomeFurnitureStackScreen} />
        <Drawer.Screen name="BrowseSportsBooks" component={BrowseSportsBooksStackScreen} />
        <Drawer.Screen name="BrowseToysBaby" component={BrowseToysBabyStackScreen} />
        <Drawer.Screen name="BrowseTVsAppliances" component={BrowseTVsAppliancesStackScreen} />
        </Drawer.Navigator>
        </NavigationContainer>
    );
};