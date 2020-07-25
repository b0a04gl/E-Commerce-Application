import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import Card from './Components/Card'
import SearchBar from './Components/SearchBar';

export default class UserScreen extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      imagesDeck: [],
      cards: [],
    };
  }

  componentDidMount() {
    this._isMounted = true;
    firebase.database().ref('/imagesDeck').on('value', (data) => {
        if (this._isMounted) {
            if (data.val()) {
                this.setState({
                    imagesDeck: data.val(),
                });
            }
        }
    }
    );
    firebase.database().ref('/cards').on('value', (data) => {
        if (this._isMounted) {
            if (data.val()) {
                this.setState({
                    cards: data.val(),
                });
            }
        }
    }
    );
}

componentWillUnmount() {
    this._isMounted = false;
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
            {this.state.cards.map(card => <Card key={card.key} images={card.images} header={card.header} />)}
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