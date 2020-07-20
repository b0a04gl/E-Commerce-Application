import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, TextInput, Modal, TouchableWithoutFeedback, FlatList } from 'react-native';

const SearchBar = props => {

    const [searchText, setSearchText] = useState('');
    const [searchHistory, setSearchHistory] = useState([]);
    const [displayContent, setDisplayContent] = useState(false);

    const searchTextHandler = (searchValue) => {
        setSearchText(searchValue);
    }

    const SearchIconPressHandler = (enteredSearch) => {
        if (/\S/.test(searchText) && searchText != null) {
            setSearchHistory([...searchHistory, { id: new Date().getTime().toString(), value: enteredSearch }]);
        }
        else
            return;
    }

    const DisplayContentHandler = () => {
        setDisplayContent(true);
    }

    const FillSearchTextHandler = (selectedText) => {
        setSearchText(selectedText);
    }

    return (
        <View>
            <View style={styles.headerContainer}>
                <View style={styles.inputContainer}>
                    <TouchableWithoutFeedback onPress={DisplayContentHandler}>
                        <Text style={styles.input}>Search for Products...</Text>
                    </TouchableWithoutFeedback>
                    <TouchableOpacity onPress={DisplayContentHandler} >
                        <Image source={require('../../assets/images/search.png')} style={styles.searchIcon} />
                    </TouchableOpacity>
                </View>
            </View>
            <Modal visible={displayContent} onRequestClose={() => {
                setDisplayContent(false);
                setSearchText('');
            }}>
                <View style={styles.modalContainer}>
                    <View style={styles.inputTextContainer}>
                        <TextInput placeholder='Search for products...' autoFocus onChangeText={searchTextHandler} value={searchText} style={styles.inputText} />
                        <TouchableOpacity onPress={SearchIconPressHandler.bind(this, searchText)}>
                            <Image source={require('../../assets/images/search.png')} style={styles.searchIcon} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <FlatList
                            keyboardShouldPersistTaps='always'
                            data={searchHistory}
                            renderItem={itemData => (
                                <View style={styles.ListContainer}>
                                    <View style={styles.historyContainer}>
                                        <Image source={require('../../assets/images/history.png')} style={styles.historyIcon} />
                                        <Text style={styles.list}>{itemData.item.value}</Text>
                                    </View>
                                    <TouchableOpacity onPress={FillSearchTextHandler.bind(this, itemData.item.value)}>
                                        <Image source={require('../../assets/images/arrow.png')} style={styles.arrowIcon} />
                                    </TouchableOpacity>
                                </View>
                            )}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        width: '100%',
        backgroundColor: '#ec2F4B',
        padding: 0,
    },

    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 5,
        marginLeft: 5
    },

    searchIcon: {
        height: 10,
        width: 10,
        padding: 15,

    },

    modalContainer: {
        flex: 1,
        backgroundColor: '#FFF',
    },

    arrowIcon: {
        height: 10,
        width: 10,
        padding: 10,
    },

    historyIcon: {
        height: 10,
        width: 10,
        padding: 12,
        marginRight: 20,
    },

    input: {
        marginVertical: 10,
        padding: 10,
        paddingLeft: 10,
        marginRight: 10,
        width: '90%',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'black',
        backgroundColor: 'white',
        color: 'gray'
    },

    inputTextContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10,

    },

    inputText: {
        marginVertical: 10,
        paddingHorizontal: 10,
        padding: 5,
        width: '85%',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'black',
        backgroundColor: 'white'
    },

    ListContainer: {
        flexDirection: 'row',
        backgroundColor: '#FAFAFA',
        marginHorizontal: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 10,
        padding: 15,
    },

    historyContainer: {
        flexDirection: 'row'
    },

    list: {
        fontSize: 15,
    }
});

export default SearchBar;