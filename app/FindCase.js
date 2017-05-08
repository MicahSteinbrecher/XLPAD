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
import { getPatients, getCases } from './utilities';
import Autocomplete from 'react-native-autocomplete-input';

export default class FindCase extends React.Component {

    static navigationOptions = {
        title: 'Search'
    };

    constructor(props){
        super(props);
        this.state = {
            patients: getPatients(),
            id: '',
            targetVessel: '',
            vessels: ['Common Iliac', 'External Iliac', 'Common Femoral', 'Femoral Popliteal', 'BTK'],
            matchingVessels: [],
        }
    }

    componentWillUpdate(nextProps, nextState) {
        this.resultsDisplay=null;
        if (nextState.id != '' || nextState.targetVessel != '') {
            const { navigate } = this.props.navigation;
            var cases = getCases(nextState.id, nextState.targetVessel);
            /* case is realm object, c is an index*/
            this.resultsDisplay = Object.keys(cases).map((c, index) =>
                <TouchableOpacity key={index}
                                  onPress={ () => navigate('CaseDetails', { data: cases[index] }) }
                                  style={ (index == 0) ? Styles.firstListItem : Styles.listItem}
                >
                    <View style={{flexDirection:'row'}}>
                        <Text style={Styles.id}>
                            {cases[index].id + ". "}
                        </Text>
                        <Text style={Styles.listText}
                              numberOfLines={2}
                              ellipsizeMode='tail'>
                            {cases[index].targets}
                        </Text>
                    </View>
                    <View style={Styles.dateLabel}>
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
        }
    }

    render() {
        return (
            <View>
                    <Text style={Styles.inputHeader}>Case Number</Text>
                    <TextInput
                        style={Styles.input}
                        value={this.state.id}
                        onChangeText={text => {this.setState({id: text})}}
                        keyboardType="numbers-and-punctuation"
                    />

                    <Text style={Styles.inputHeader}>Target Vessel</Text>
                    <TextInput
                        style={Styles.input}
                        value={this.state.targetVessel}
                        onChangeText={text => {this.setState({targetVessel: text})}}
                    />

                <Text style={Styles.inputHeader}>Results:</Text>
                <ScrollView keyboardShouldPersistTaps="handled">
                    {this.resultsDisplay}
                </ScrollView>
            </View>
        )
    }
}