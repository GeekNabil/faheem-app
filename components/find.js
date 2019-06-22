
import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import Header from './header';
import { Dropdown } from 'react-native-material-dropdown';
import { AntDesign } from '@expo/vector-icons';
const axios = require('axios');
import Spinner from './Spinner';
const { width, height } = Dimensions.get('window');


export default class Find extends Component {
    state = {
        text: '',
        city: '',
        data: [],
        tutors: [],
        errorMess: ''
    }

    componentDidMount = () => {
        axios.post('https://faheemapp.com/api-server/api/search/locations', { api_key_val: '1' }).then(res => {
            const data = res.data
            for (let i = 0; i < data.length; i++) {
                data[i].value = data[i].name;
                delete data[i].name;
            }
            this.setState({ data });
        })

        axios.post('https://faheemapp.com/api-server/api/search/tutors', { api_key_val: '1' }).then(res => {
            const tutors = res.data;
            this.setState({ tutors });
        });

    }

    getTutorsAndNavigate = () => {
        if (this.state.text === '' || this.state.city === '') {
            const errorMess = 'You must provide both City and Subject name!';
            this.setState({ errorMess })
            return;
        }

        { this.props.navigation.navigate('search', { tutors: this.state.tutors, city: this.state.city, subject: this.state.text }) }
        // return (<Spinner />)

    }

    render() {

        return (
            <View>
                <Header title="Find a Tutor" navigation={this.props.navigation} />
                <View style={styles.text1}>
                    <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Compare the best teacher and choose the</Text>
                    <Text style={{ fontSize: 17, fontWeight: 'bold' }}>most appropriate</Text>
                </View>
                <View style={styles.text2}>
                    <Text style={{ fontSize: 20, color: '#ff8c1a' }}>Here is best tutor in</Text>
                </View>
                <View style={styles.text3}>
                    <Text style={{ color: '#adabab' }}>Engineering  |  Science  |  Law  |  Medicine</Text>
                    <Text style={{ color: '#adabab' }}>Business  |  English</Text>
                </View>
                <Text style={{ textAlign: 'center', color: 'red', marginTop: 30 }}>{this.state.errorMess}</Text>
                <View style={styles.dropDown}>
                    <Dropdown
                        label='Select City'
                        containerStyle={{ borderWidth: 1, borderColor: 'lightgrey', borderRadius: 10, paddingLeft: 7, paddingRight: 7 }}
                        inputContainerStyle={{ borderBottomColor: 'transparent' }}
                        rippleCentered={true}
                        dropdownOffset={{ top: 10, left: 0 }}
                        data={this.state.data}
                        onChangeText={city => {
                            this.setState({ city });
                        }}
                    />
                </View>
                <View style={styles.SeCourse}>
                    <View style={styles.input}>
                        <TextInput
                            style={{ width: width * .6, textAlign: "right" }}
                            onChangeText={(text) => this.setState({ text })}
                            value={this.state.text}
                            placeholder="Search the course or test name"
                            placeholderTextColor="grey"
                        />
                    </View>
                    <TouchableOpacity style={styles.icon}>
                        <AntDesign name="close" color="grey" size={24} />
                    </TouchableOpacity>
                </View>
                <View style={{ margin: 8 }}>
                    <Text style={{ color: 'grey' }}>Advanced Search?</Text>
                </View>

                <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 40 }}>
                    <TouchableOpacity style={styles.button} onPress={this.getTutorsAndNavigate}>
                        <Text style={{ textAlign: 'center', color: '#ffff' }}>Search</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    text1: {
        marginTop: 40,
        alignItems: 'center'
    },
    text2: {
        marginTop: 40,
        alignItems: 'center'
    },
    text3: {
        marginTop: 25,
        alignItems: 'center'
    },
    dropDown: {
        marginTop: 40,
        margin: 7,
    },
    input: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    SeCourse: {
        height: 48,
        borderColor: "#D3D3D3",
        borderRadius: 10,
        borderWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 7,
        marginTop: 0
    },
    icon: {
        height: 48,
        width: width * .10,
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        height: 48,
        width: width * .60,
        backgroundColor: '#f4b942',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30
    }
});


