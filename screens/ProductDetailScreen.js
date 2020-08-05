import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert, Modal, TextInput, Button } from 'react-native';
import unclicked from '../assets/images/unclicked_heart.png';
import clicked from '../assets/images/clicked_heart.png';
import StarRating from 'react-native-star-rating';
import * as firebase from 'firebase';
import ApiKeys from '../database/RealtimeDb';

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
        }
        if (!firebase.apps.length) {
            firebase.initializeApp(ApiKeys.firebaseConfig);
        }
    }

    componentDidMount() {
        this._isMounted = true;
        firebase.database().ref('/comments').once('value', (data) => {
            if (this._isMounted) {
                if (data.val()) {
                    this.setState({
                        comments: Object.values(data.val()),
                    });
                }
            }
        }
        );
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    toggleFavorite = () => {
        this.setState({
            clicked: !this.state.clicked,
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
        const comment = {
            user: 'Anonymous',
            comment: this.state.comment,
            date: dateFormat,
            rating: this.state.rating,
        };
        this.setState({
            comments: [...this.state.comments, comment],
            comment: '',
            showRateModal: false,
            rating: 0,
        });
        firebase.database().ref('/comments').push(comment).then(() => {
            console.log('Pushed');
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
                            <Image source={this.props.product.image} style={styles.mainImage} />
                            <TouchableOpacity style={styles.iconContainer} onPress={this.toggleFavorite}>
                                <Image source={this.state.clicked ? clicked : unclicked} style={styles.icon} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.text}>{this.props.product.productName}</Text>
                        <Text style={styles.price}>{this.props.product.productPrice}</Text>
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
                                this.state.comments.slice(this.state.comments.length - 2, this.state.comments.length).reverse().map(comment =>
                                    <View style={styles.commentBox}>
                                        <View style={styles.userContainer}>
                                            <Image source={require('./assets/images/avatar.png')} style={styles.image} />
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
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.button1}>
                        <Text style={styles.footerText}>ADD TO CART</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button2}>
                        <Text style={styles.footerText}>BUY NOW</Text>
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
        right: 10,
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
        flexDirection: 'row',
        alignItems: 'center',
    },

    button1: {
        flex: 1,
        backgroundColor: '#898989',
        alignItems: 'center',
        padding: 15,
        elevation: 10,
    },

    button2: {
        flex: 1,
        backgroundColor: '#389BD9',
        alignItems: 'center',
        padding: 15,
        elevation: 10,
    },

    footerText: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 14,
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