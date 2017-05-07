import React from 'react';
import {
    Text,
    View,
    Button,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Image,
} from 'react-native';
import Styles from './Style';
var arrowIcon = require('./images/arrow.png');

export default class CaseDetails extends React.Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: navigation.state.params.data.name + "'s Cases",
    });

    render() {
        var cases = this.props.navigation.state.params.data.cases;
        const { navigate } = this.props.navigation;

        console.log(JSON.stringify(cases));

        /* case is realm object, c is an index*/
        var casesDisplay = Object.keys(cases).map((c, index) =>
            <TouchableOpacity key={index}
                              onPress={ () => navigate('CaseDetails', { data: cases[index] }) }
                              style={ (index == 0) ? Styles.firstListItem : Styles.listItem}
            >
                {/* Empty Text component only way date aligns right??*/}
                <Text style={Styles.listText}
                      numberOfLines={2}
                      ellipsizeMode='tail'
                >
                    {cases[index].targets}
                </Text>
                <View style={Styles.row}>
                    <Text style={Styles.listItemDate}>
                        {cases[index].dateOfProcedure}
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
                {casesDisplay}
            </View>
        );
    }
}


