import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import Header from './header'
import { Feather } from '@expo/vector-icons';
import { Avatar } from 'react-native-elements';
import { Rating, AirbnbRating } from 'react-native-ratings';

const { width, height } = Dimensions.get('window');

export default class Search extends Component {
    state = {
        text: "",
        // data: []
    }


    // componentwillMount() {
    //     const data = this.props.navigation.getParam('tutors');
    //     this.setState({data});
    //         // axios.post('https://faheemapp.com/api-server/api/search/tutors', {api_key_val: '1'}).then( res => {
    //         //     console.log(res.data);
    //         //     const data = res.data;
    //         //     this.setState({data});
    //         // })
    // }


    ratingCompleted(rating) {
        console.log("Rating is: " + rating)
    }

    usersResult() {
        const tutors = this.props.navigation.getParam('tutors');
        const userSubject = this.props.navigation.getParam('subject');
        const city = this.props.navigation.getParam('city');
        
        const filteredTutors = [];
        
        for (let i = 0; i < tutors.length; i++) {
            const tutor = tutors[i];

            for (let j = 0; j < tutor.subjects.length; j++) {
                const subject = tutor.subjects[j];

                if (subject.subject_name == userSubject || subject.location_name == city) {
                    filteredTutors.push(tutor);
                    break;
                }
            }
        }
        
        return tutors.map((item, index) => {
            return (
                <View style={{
                    width: width - 48,
                    height: height * .2,
                    borderColor: "rgba(255, 0, 0, .1)",
                    borderRadius: 6,
                    borderStyle: "solid",
                    borderWidth: 2,
                    marginBottom: 24,
                    flexDirection: "column",
                }}
                    key={index}
                >

                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        alignItems: "center",
                        height: height * .15,
                        flex: 1
                    }}>
                        <View>
                            <Avatar rounded source={{ uri: item.photo }} size="large" />
                        </View>
                        <View style={{ height: height * .12, justifyContent: "space-around" }}>

                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ fontSize: 16, fontWeight: "700" }}>{item.username}</Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <Rating
                                    type='star'
                                    ratingCount={5}
                                    startingValue={parseInt(item.avg_rating)}
                                    imageSize={14}
                                    onFinishRating={this.ratingCompleted}
                                />
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ fontSize: 12, color: "grey" }}>
                                    {item.qualification}
                                </Text>
                            </View>

                        </View>
                        <View>
                            <Text>SR {item.tutor_average_price}</Text>
                            <Text>Per Hour</Text>
                        </View>
                    </View >
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: width - 48, overflow: "hidden" }}>
                        {item.subjects.map((keyword, index) => {
                            while (index < 6) {
                                return (<View key={index} style={{ justifyContent: "center", alignItems: "center", margin: 4, paddingHorizontal: 6, paddingVertical: 4, borderRadius: 12, backgroundColor: "#ff8c1a" }}>
                                    <Text style={{ fontSize: 12 }}>{keyword.subject_name}</Text></View>)
                            }
                        })}
                    </View>
                </View >
            )
        })

    }

    render() {

        return (
            <View >
                <Header title="Search Result" navigation={this.props.navigation} />
                <View style={{ paddingHorizontal: 24, paddingTop: 32, direction: "ltr" }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>

                        <View style={{
                            height: 48,
                            width: width * .54,
                            borderColor: "#D3D3D3",
                            borderRadius: 6,
                            border: "solid",
                            borderWidth: 1,
                            flexDirection: "row",
                            justifyContent: "space-between"
                        }}>
                            <TouchableOpacity style={{
                                height: 46,
                                width: width * .12,
                                backgroundColor: "#ff8c1a",
                                borderTopLeftRadius: 5,
                                borderBottomLeftRadius: 5,
                                justifyContent: "center",
                                alignItems: "center"

                            }}>
                                <Feather name="search" color="grey" size={24} />
                            </TouchableOpacity>
                            <View style={{ justifyContent: "center", alignItems: "center" }}>
                                <TextInput style={{ width: width * .4, textAlign: "right" }}
                                    onChangeText={(text) => this.setState({ text })}
                                    value={this.state.text}
                                    placeholder="Search Here ..."
                                    placeholderTextColor="grey" />
                            </View>

                        </View>
                        <View style={{
                            height: 48,
                            width: width * .28,
                            borderColor: "#D3D3D3",
                            borderRadius: 6,
                            border: "solid",
                            borderWidth: 1,
                        }}>
                        </View>
                    </View>
                    <View style={{ paddingVertical: 24, flexDirection: "row" }}>
                        <Text style={{
                            fontSize: 16, fontWeight: "700", color: "#ff8c1a"
                        }}>Advanced Search?</Text>
                    </View>
                    <View style={{
                        height: 48,
                        width: width - 48,
                        borderColor: "#D3D3D3",
                        borderRadius: 6,
                        border: "solid",
                        borderWidth: 1,
                    }}>
                    </View>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{
                            marginTop: 24, height: height - 280
                        }}>
                        {this.usersResult()}
                    </ScrollView>
                </View>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    spinnerStyle: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})