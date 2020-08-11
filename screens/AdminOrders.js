import React from 'react';
import { View, ScrollView, StyleSheet, FlatList, Image, TouchableOpacity, Text, Alert, TextInput } from 'react-native';
import * as firebase from 'firebase';
import ApiKeys from '../database/RealtimeDb';

export default class AdminOrders extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            text: '',
            display: 'Enter the orderID inorder to display the details',
        };
        if (!firebase.apps.length) {
            firebase.initializeApp(ApiKeys.firebaseConfig);
        }
    }

    textHandler = (text) => {
        const orders = [];
        if (text.length > 0) {
            firebase.database().ref('recentOrders').orderByChild('orderID').startAt(text).endAt(text + '\uf8ff').on('child_added', (data) => {
                orders.push(data.val());
            });
        }
        console.log(orders);
        this.setState({
            text: text,
            orders: orders,
        });
        if (text.length > 0) {
            this.setState({
                display: 'No Results matched with your entry',
            });
        }
        else {
            this.setState({
                display: 'Enter the order ID inorder to display the details',
            });
        }
    };


    render() {
        return (
            <ScrollView keyboardShouldPersistTaps='always' style={styles.screen}>
                <View style={styles.Container}>
                    <TextInput placeholder='Search your order' style={styles.textInput} value={this.state.text} onChangeText={this.textHandler} />
                </View>
                {this.state.orders.length > 0 ?
                    <View style={styles.display}>
                        <FlatList data={this.state.orders}
                            renderItem={data => (
                                <View style={styles.listContainer}>
                                    <Image source={require('../assets/images/orders.png')} style={styles.listimage} />
                                    <View style={styles.list}>
                                        <Text style={styles.text}>{data.item.orderID}</Text>
                                        <Text style={styles.name}>{data.item.orderDate}</Text>
                                        <Text style={styles.price}>{data.item.totalAmount}</Text>
                                        <Text style={styles.name}>User ID: {data.item.user}</Text>
                                    </View>
                                </View>
                            )} />
                    </View>
                    :
                    <View style={styles.Container}>
                        <Text style={styles.displayText}>{this.state.display}</Text>
                    </View>
                }
            </ScrollView>
        );
    }
};

const styles = StyleSheet.create({

    screen: {
        flex: 1,
        marginTop: 20,
    },

    display: {
        marginVertical: 10,
    },

    Container: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    displayText: {
        color: '#898989',
        fontStyle: 'italic'
    },

    textInput: {
        width: '90%',
        padding: 10,
        marginVertical: 10,
        borderColor: 'black',
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: '#F0F0F0'
    },

    text: {
        color: 'blue',
        fontSize: 16,
    },

    listContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderColor: 'black',
    },

    list: {
        width: '70%',
        marginVertical: 10,
        padding: 10,
    },

    listimage: {
        height: 10,
        width: 10,
        padding: 25,
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
    }

});
