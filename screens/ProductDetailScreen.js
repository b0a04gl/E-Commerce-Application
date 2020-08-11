import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert, Modal, TextInput, Button } from 'react-native';
import unclicked from '../assets/images/unclicked_heart.png';
import clicked from '../assets/images/clicked_heart.png';
import StarRating from 'react-native-star-rating';
import * as firebase from 'firebase';
import ApiKeys from '../database/RealtimeDb';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';

export default class ProductDetailScreen extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            image: unclicked,
            clicked: false,
            rating: 0,
            showModal: false,
            showRateModal: false,
            comment: '',
            comments: [],
            product: {},
            userToken: '',
            key: '',
            category: '',

        }
        if (!firebase.apps.length) {
            firebase.initializeApp(ApiKeys.firebaseConfig);
        }

    }

    componentDidMount() {
        this._isMounted = true;

        firebase.database().ref('/current').on('value', (data) => {
            if (this._isMounted) {
                if (data.val()) {
                    this.setState({
                        product: data.val(),
                        comments: [],
                    });
                }
            }
        }
        );

        var key = '';
        firebase.database().ref('/key').on('value', (data) => {
            if (this._isMounted) {
                if (data.val()) {
                    key = data.val().key;
                    this.setState({
                        key: key,
                        category: data.val().category,
                    });

                }
            }
        }
        );
        console.log(key);
        

        AsyncStorage.getItem('userToken').then((userToken) => {
            if (userToken) {
                this.setState({
                    userToken: userToken,
                });
            }
        });

    }

    componentDidUpdate(prevProps, prevState) {
        console.log(prevState.key);
        console.log(this.state.key);
        if (this.state.key !== prevState.key) {
            firebase.database().ref('/comments/' + this.state.key).on('value', data => {
                if (this._isMounted) {
                    if (data.val()) {
                        this.setState({
                           comments: data.val(),
                        });
    
                    }
                }
            });
            this.setState({
                clicked: this.state.product.wishlist,
            })
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    toggleFavorite = () => {
        firebase.database().ref('/wishlist/' + this.state.userToken).push(this.state.product).then(() => {
            firebase.database().ref('/current').update({ wishlist: true });
            firebase.database().ref('inventory/' + this.state.category + '/' + this.state.key).update({ wishlist: true });
        }).catch((error) => {
            console.log(error);
        });
        this.setState({
            clicked: true,
        });
    }

    commentHandler = (comment) => {
        this.setState({
            comment: comment,
        });
    }

    commentsHandler = () => {
        const date = new Date();
        const dateFormat = date.getDate() + '/' + (parseInt(date.getMonth()) + 1).toString() + '/' + date.getFullYear();
        const comments = [...this.state.comments, {
            user: 'Anonymous',
            comment: this.state.comment,
            date: dateFormat,
            rating: this.state.rating,
        }];
        this.setState({
            comments: comments,
            comment: '',
            showRateModal: false,
            rating: 0,
        });
        firebase.database().ref('/comments/' + this.state.key).set(comments).then(() => {
            console.log('Pushed');
        }).catch((error) => {
            console.log(error);
        });
    }

    saveToCart = () => {
        firebase.database().ref('/cart/' + this.state.userToken).set(this.state.product).then(() => {
            Toast.show('Added to Cart', Toast.LONG);
        }).catch((error) => {
            console.log(error);
        });
    }

    closeModal = () => {
        this.setState({
            showModal: false,
            showRateModal: false,
        });
    };

    render() {

        return (
            <View style={styles.screen}>
                <ScrollView>
                    <View style={styles.display}>
                        <View style={styles.imageContainer}>
                            <Image source={this.state.product.image} style={styles.mainImage} />
                            <TouchableOpacity style={styles.iconContainer} onPress={this.toggleFavorite}>
                                <Image source={this.state.clicked ? clicked : unclicked} style={styles.icon} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.text}>{this.state.product.productName}</Text>
                        <Text style={styles.price}>{this.state.product.productPrice}</Text>
                    </View>
                    <View style={styles.body}>
                        <View style={styles.reviewContainer}>
                            <Modal
                                transparent
                                visible={this.state.showRateModal}
                                onRequestClose={this.closeModal}>
                                <View style={styles.modalContainer}>
                                    <View style={styles.modalScreen}>
                                        <Text style={styles.ratingText}>Rate this Product: </Text>
                                        <View style={styles.textInputContainer}>
                                            <TextInput placeholder='Enter your review' multiline={true} style={styles.textInput} value={this.state.comment} onChangeText={this.commentHandler} />
                                        </View>
                                        <View style={styles.rating}>
                                            <StarRating
                                                disabled={false}
                                                maxStars={5}
                                                rating={this.state.rating}
                                                fullStarColor='#f1c40f'
                                                containerStyle={{ marginVertical: 10, }}
                                                selectedStar={(rating) => this.setState({ rating: rating })}
                                            />
                                            <TouchableOpacity onPress={this.commentsHandler}>
                                                <Text style={{ color: 'blue', fontSize: 16, marginVertical: 10, elevation: 1, borderWidth: 0.1, padding: 10 }}>Submit your Review</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </Modal>
                            <Text style={styles.ratingText}>Ratings & Reviews</Text>
                            <TouchableOpacity style={styles.rateProduct} onPress={() => { this.setState({ showRateModal: true }) }}>
                                <Text style={{ color: 'blue', fontSize: 16 }}>Rate Product</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.comments}>
                            {
                                this.state.comments.slice(0, 2).reverse().map(comment =>
                                    <View style={styles.commentBox}>
                                        <View style={styles.userContainer}>
                                            <Image source={require('../assets/images/avatar.png')} style={styles.image} />
                                            <Text style={styles.user}>{comment.user}</Text>
                                        </View>
                                        <View style={styles.row}>
                                            <View style={styles.starCotainer}>
                                                <StarRating
                                                    disabled={false}
                                                    maxStars={5}
                                                    rating={comment.rating}
                                                    starSize={17}
                                                    fullStarColor='#66aa66' />
                                            </View>
                                            <Text style={styles.dateText}>{comment.date}</Text>
                                        </View>
                                        <Text style={styles.commentText}>{comment.comment}</Text>
                                    </View>
                                )}
                        </View>
                        <View style={styles.review}>
                            <TouchableOpacity onPress={() => {
                                this.setState({
                                    showModal: true,
                                })
                            }}>
                                <Text style={styles.link}>See all Ratings and Reviews </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
                <View>
                    <TouchableOpacity style={styles.footer} onPress={this.saveToCart}>
                        <Text style={styles.footerText}>ADD TO CART</Text>
                    </TouchableOpacity>
                </View>
                <Modal
                    visible={this.state.showModal}
                    onRequestClose={this.closeModal}>
                    <View style={styles.screen}>
                        <ScrollView style={styles.comments}>
                            {
                                this.state.comments.map(comment =>
                                    <View style={styles.commentBox}>
                                        <View style={styles.userContainer}>
                                            <Image source={require('../assets/images/avatar.png')} style={styles.image} />
                                            <Text style={styles.user}>{comment.user}</Text>
                                        </View>
                                        <View style={styles.row}>
                                            <View style={styles.starCotainer}>
                                                <StarRating
                                                    disabled={false}
                                                    maxStars={5}
                                                    rating={3}
                                                    starSize={17}
                                                    fullStarColor='#66aa66' />
                                            </View>
                                            <Text style={styles.dateText}>{comment.date}</Text>
                                        </View>
                                        <Text style={styles.commentText}>{comment.comment}</Text>
                                    </View>
                                )}
                        </ScrollView>
                    </View>
                </Modal>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },

    display: {
        borderBottomWidth: 0.3,
        borderBottomColor: 'black',
        padding: 10,
        paddingHorizontal: 20,
        marginVertical: 20,
    },

    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
        marginVertical: 35,
    },

    mainImage: {
        flex: 1,
        resizeMode: 'contain',
        width: 300,
        height: 450,
    },

    iconContainer: {
        position: 'absolute',
        top: 10,
        right: 0,
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FAFAFA',
        borderRadius: 100,
        borderWidth: 0.2,
        elevation: 1,
    },

    icon: {
        height: 30,
        width: 30,
    },

    strike: {
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
        fontSize: 16,
        marginVertical: 5,
    },

    price: {
        color: 'red',
        fontSize: 24,
    },

    body: {
        padding: 10,
        flex: 1,
    },

    reviewContainer: {
        justifyContent: 'space-between',
        padding: 10,
        flexDirection: 'row',
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalScreen: {
        height: 300,
        width: '90%',
        elevation: 1,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },

    rating: {
        width: '70%',
        marginBottom: 10,
        alignItems: 'center',
    },

    ratingText: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10,
    },

    rateProduct: {
        padding: 10,
        elevation: 2,
        borderWidth: 0.1,
    },

    review: {
        padding: 20,
        backgroundColor: '#FAFAFA'
    },

    link: {
        marginVertical: 20,
        color: 'blue',
        fontSize: 16,
    },

    text: {
        fontSize: 20,
    },

    footer: {
        backgroundColor: '#ec2F4B',
        padding: 15,
        elevation: 10,
        borderRadius: 10,
        margin: 5,
        alignItems: 'center',
    },

    footerText: {
        color: 'white',
    },

    comments: {
        paddingHorizontal: 10,
    },

    commentBox: {
        elevation: 1,
        borderRadius: 10,
        marginVertical: 10,
        padding: 10,
    },

    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    row: {
        flexDirection: 'row',
    },

    image: {
        height: 40,
        width: 40,
    },

    user: {
        marginHorizontal: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },

    starCotainer: {
        width: '20%',
        marginVertical: 10,
    },

    dateText: {
        marginLeft: 10,
        marginVertical: 10,
    },

    commentText: {
        marginVertical: 5,
        fontSize: 16,
    },

    textInputContainer: {
        marginVertical: 20,
        width: '100%',
    },

    textInput: {
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        elevation: 1,
        borderColor: 'black',
        backgroundColor: '#FAFAFA',
        paddingHorizontal: 8,
        fontSize: 16,
    },
});