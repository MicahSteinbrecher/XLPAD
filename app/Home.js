
import React from 'react';
import {
    AppRegistry,
    Text,
    TextInput,
    View,
    Button,
    Alert,
    AsyncStorage,
    ScrollView,
    Image,
    TouchableOpacity,
} from 'react-native';
import { TabNavigator, StackNavigator, TabRouter } from "react-navigation";
import Realm from 'realm';
import Styles from './Style';
import NewCase from './NewCase';
import CaseDetails from './CaseDetails';
import { Case } from './models/Case'
import { Procedure } from './models/Case'
import { Complication } from './models/Complication'
var arrowIcon = require('./images/arrow.png');



export default class Home extends React.Component {
    static navigationOptions = {
        title: 'Your Patients',
    };

    constructor(props) {
        super(props);
    };


    render() {
        const { navigate } = this.props.navigation;
        const listItems = this.props.screenProps.patients.map((data, index) =>
            <TouchableOpacity key={index}
                              onPress={ () => navigate('Cases', { data: data }) }
                              style={ (index == 0) ? Styles.firstListItem : Styles.listItem}
            >
                <Text style={Styles.listText}
                      numberOfLines={2}
                        ellipsizeMode='tail'
                >
                    {data.name}
                </Text>
                <View style={Styles.row}>
                    <Text style={Styles.listItemDate}>
                        {Date(data.dataTimeUpdated).split(' ').slice(0,3).join(' ')}
                    </Text>
                    <Image
                        style={Styles.icon}
                        source={arrowIcon}
                    />
                </View>
            </TouchableOpacity>

        );
        return (
            <View>
                <ScrollView>
                    { listItems }
                </ScrollView>
            </View>
        );
    }
}