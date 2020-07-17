import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export function DrawerContent(props) {

    const paperTheme = useTheme();

    // const [ isDarkTheme, setIsDarkTheme ] = React.useContext(false);

    // const toggleTheme = () =>{
    //     setIsDarkTheme(!isDarkTheme);
    // }

    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15}}>
                            <Avatar.Image 
                                source={{
                                    uri: 'https://api.adorable.io/avatars/50/abott@adorable.png'
                                }}
                                size={50}
                            />
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Title style={styles.title}>John Doe</Title>
                                <Caption style={styles.caption}>+91 9876543210</Caption>
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>8</Paragraph>
                                <Caption style={styles.caption}>Orders Pending</Caption>
                            </View>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>100</Paragraph>
                                <Caption style={styles.caption}>Orders Delivered</Caption>
                            </View>
                        </View>
                    </View>


                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="home-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Home"
                           onPress={() => {props.navigation.navigate('Home')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="account-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Profile"
                            onPress={() => {props.navigation.navigate('Profile')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="cellphone-link" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Electronics"
                            onPress={() => {props.navigation.navigate('BrowseElectronics')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="tshirt-v-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Fashion"
                            onPress={() => {props.navigation.navigate('BrowseFashion')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="home-city-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="HomeFurniture"
                            onPress={() => {props.navigation.navigate('BrowseHomeFurniture')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="transit-transfer" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="RefurbishedProducts"
                            onPress={() => {props.navigation.navigate('RefurbishedProducts')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="tennis" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="SportsBooks"
                            onPress={() => {props.navigation.navigate('BrowseSportsBooks')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="mother-nurse" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="ToysBaby"
                            onPress={() => {props.navigation.navigate('BrowseToysBaby')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="remote-desktop" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="TVsAppliances"
                            onPress={() => {props.navigation.navigate('BrowseTVsAppliances')}}
                        /><DrawerItem 
                        icon={({color, size}) => (
                            <Icon 
                            name="odnoklassniki" 
                            color={color}
                            size={size}
                            />
                        )}
                        label="BeautyPersonalcare"
                        onPress={() => {props.navigation.navigate('BrowseBeautyPersonalcare')}}
                    />
                    </Drawer.Section>
                    <Drawer.Section title="Preferences">
                        
                        <TouchableRipple onPress={() => {}}>
                            <View style={styles.preference}>
                                <Text>Dark Theme</Text>
                                <View pointerEvents="none">
                                    <Switch value={paperTheme.dark}/>
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="exit-to-app" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={() => {}}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });