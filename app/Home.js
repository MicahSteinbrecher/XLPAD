
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
        title: 'Your Cases',
    };

    constructor(props) {
        super(props);
    };


    render() {
        const { navigate } = this.props.navigation;
        const listItems = this.props.screenProps.cases.map((data, index) =>
            <TouchableOpacity key={index}
                              onPress={ () => navigate('CaseDetails', { data: data }) }
                              style={ (index == 0) ? Styles.firstListItem : Styles.listItem}
            >
                <View style={{flexDirection:'row'}}>
                    <Text style={Styles.id}>
                        {data.id + ". "}
                    </Text>
                    <Text style={Styles.listText}
                        numberOfLines={2}
                        ellipsizeMode='tail'>
                        {data.targets}
                    </Text>
                </View>
                <View style={Styles.dateLabel}>
                    <Text style={Styles.listItemDate}>
                        {data.dateOfProcedure}
                        {/*{Date(data.dataTimeCreated).split(' ').slice(0,3).join(' ')}*/}
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