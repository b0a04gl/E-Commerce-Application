import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import Card from './Components/Card'
import SearchBar from './Components/SearchBar';

export default class UserScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imagesDeck: [
        require('../assets/ad1.jpg'),
        require('../assets/ad2.jpg'),
        require('../assets/ad3.jpg'),
        require('../assets/ad4.jpg'),
      ],
      cards: [
        {
          key: new Date().getTime().toString(),
          images: [
            {
              key: 1,
              image: require('../assets/images/headphones.jpeg'),
              textItem: 'Headphones',
              textOff: '20% Offer',
            },
            {
              key: 2,
              image: require('../assets/images/smartwatch.jpeg'),
              textItem: 'Smartwatch',
              textOff: '10% Offer'
            },
            {
              key: 3,
              image: require('../assets/images/shoes.jpeg'),
              textItem: 'Shoes',
              textOff: '30% Offer',
            },
            {
              key: 4,
              image: require('../assets/images/speaker.jpeg'),
              textItem: 'Speaker',
              textOff: '5% Offer'
            },
          ],
          header: 'Offers',
        },
        {
          key: new Date().getTime().toString(),
          images: [
            {
              key: 5,
              image: require('../assets/images/offerphone1.jpeg'),
              textItem: 'Realme Phone',
              textOff: '\u20B9 8999 only'
            },
            {
              key: 6,
              image: require('../assets/images/offerphone2.jpeg'),
              textItem: 'Oppo Phone',
              textOff: '\u20B9 9999 only'
            },
            {
              key: 7,
              image: require('../assets/images/offerphone3.jpeg'),
              textItem: 'Samsung Phone',
              textOff: '\u20B9 12395 only'
            }
          ],
          header: 'Mobile Phones'
        }
      ],
    };
  }
  render() {
    return (
      <View style={styles.screen}>
        <SearchBar />
        <ScrollView>
          <View>
            <View style={styles.imageDeck}>
              <SliderBox
                images={this.state.imagesDeck}
                autoplay={true}
                sliderBoxHeight={175}
                circleLoop={true}
                resizeMode={'contain'}
              />
            </View>
          </View>
          <View>
            {this.state.cards.map(card => <Card images={card.images} header={card.header} />)}
          </View>
        </ScrollView>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  screen: {
    paddingTop: 0,
    flex: 1,
  },

  imageDeck: {
    elevation: 5,
    height: 175,
    borderColor: 'black',
    borderWidth: 1,
  },

  offerCards: {
    backgroundColor: 'white'
  }

});