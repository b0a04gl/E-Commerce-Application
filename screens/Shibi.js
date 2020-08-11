import React,{ useState } from 'react';
import { View, StyleSheet, ScrollView, TextInput, Image, TouchableOpacity, Modal, TouchableWithoutFeedback, FlatList } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import Card from './Components/Card'
import SearchBar from './Components/SearchBar';

export default function Shibi()
{
  const [imageDeckArray, setImageDeckArray] = useState([
    require('../assets/ad1.jpg'),
    require('../assets/ad2.jpg'),
    require('../assets/ad3.jpg'),
    require('../assets/ad4.jpg')
  ]);

  const [imageCardArray1, setImageCardArray1] = useState([{
    id: 1,
    image: require('../assets/images/headphones.jpeg'),
    textItem: 'Headphones',
    textOff: '20% Offer',
  },
  {
    id: 2,
    image:require('../assets/images/smartwatch.jpeg'),
    textItem: 'Smartwatch',
    textOff: '10% Offer'
  },
  {
    id: 3,
    image: require('../assets/images/shoes.jpeg'),
    textItem: 'Shoes',
    textOff: '30% Offer',
  },
  {
    id: 4,
    image:require('../assets/images/speaker.jpeg'),
    textItem: 'Speaker',
    textOff: '5% Offer'
  }
  ]);
  const [imageCardArray2, setImageCardArray2] = useState([{
    id: 1,
    image: require('../assets/images/offerphone1.jpeg'),
    textItem: 'Realme Phone',
    textOff: '\u20B9 8999 only'
  },
  {
    id: 2,
    image: require('../assets/images/offerphone2.jpeg'),
    textItem: 'Oppo Phone',
    textOff: '\u20B9 9999 only'
  },
  {
    id: 3,
    image: require('../assets/images/offerphone3.jpeg'),
    textItem: 'Samsung Phone',
    textOff: '\u20B9 12395 only'
  }
  ]);

  return(
      <View style={styles.screen}>
        <SearchBar />
        <ScrollView>
          <View>
            <View style={styles.imageDeck}>
              <SliderBox
                images={imageDeckArray}
                autoplay={true}
                sliderBoxHeight={175}
                circleLoop={true}
                resizeMode={'contain'}
                onCurrentImagePressed={index =>
                  console.warn(`image ${index} pressed`)}/>
            </View>
          </View>
          <View style={styles.offerCards}>
            <Card images={imageCardArray1} header='Offers' image1={require('../assets/images/headphones.jpeg')} image2={require('../assets/images/smartwatch.jpeg')}/>
            <Card images={imageCardArray2} header='Mobile Phones' image1={require('../assets/images/offerphone1.jpeg')} image2={require('../assets/images/offerphone2.jpeg')}/>
          </View>
        </ScrollView>
      </View>
  );  
}

const styles = StyleSheet.create({
    screen:{
      paddingTop: 0,
      flex: 1,
    },

    imageDeck:{     
      elevation: 5,
      height: 175,
      borderColor: 'black',
      borderWidth: 1,
    },

    offerCards:{
      backgroundColor: 'white'
    }

  });