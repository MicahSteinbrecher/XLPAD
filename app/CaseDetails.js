import React from 'react';
import {
    Text,
    View,
    Button,
    TextInput,
    AsyncStorage,
    ScrollView
} from 'react-native';
import { TabNavigator, StackNavigator } from "react-navigation";
import Realm from 'realm';
import Styles from './Style';
import { Case } from './models/Case';
import { splitVar, toString } from './utilities';

export default class CaseDetails extends React.Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: "Case " + navigation.state.params.data.id,
    });

    render() {
        var data = this.props.navigation.state.params.data;
        //normalize case data
        var normalizedCase = {};
        data.procedures = data.procedures.slice();
        for (var idx in data) {
            if (data[idx] != 'undefined' && data[idx] != null && data[idx] != ''  && data[idx] != []) {
                if (idx == 'id' ) {
                    continue;
                }
                if (idx == 'dateTimeCreated') {
                    normalizedCase[idx] = {title: splitVar(idx), value: Date(data[idx])}
                } else {
                    normalizedCase[idx] = {title: splitVar(idx), value: data[idx]}
                }
            }
        }
        console.log(JSON.stringify(normalizedCase));
        var dataDisplay = Object.keys(normalizedCase).map((key, index) =>
            <View style={Styles.detailsItem} key={index}>
                <Text style={Styles.inputHeader}>{normalizedCase[key].title}</Text>
                <Text style={{fontSize: 16}}>{toString(normalizedCase[key].value)}</Text>
            </View>
        );
        return (
            <ScrollView>
                {dataDisplay}
            </ScrollView>
        );
    }
}

