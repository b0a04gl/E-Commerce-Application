import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Card = props =>{
    return(
        <View style={styles.cardContainer}>
            <View style={styles.card}>
              <Text>{props.text}</Text>
              <View style={styles.Container}>
                <Image source={props.image1} style={styles.image}/>
                <Image source={props.image2} style={styles.image}/>
              </View>
              <View style={styles.Container}>
                <Text style={styles.crossedText}>{props.offer1}</Text>
                <Text style={styles.crossedText}>{props.offer2}</Text>
              </View>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    
    cardContainer:{
        alignItems: 'center',
        marginVertical: 20,
    },

    card:{
        height: 200,
        width: '90%',
        padding: 10,
        elevation: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'black',
        backgroundColor: 'white',
    },

    Container:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingTop: 20,
    },

    image:{
        height: 80,
        width: 50,
        resizeMode: 'contain',
    },

    crossedText:{
        color: 'red',
        textDecorationStyle: 'solid'
    },

});

export default Card;