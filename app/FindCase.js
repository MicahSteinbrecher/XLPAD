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
            matchingNames: [],
            name: '',
            targetVessel: '',
            vessels: ['Common Iliac', 'External Iliac', 'Common Femoral', 'Femoral Popliteal', 'BTK'],
            matchingVessels: [],
        }
    }

    componentWillUpdate(nextProps, nextState) {
        this.resultsDisplay=null;
        if (nextState.name != '' || nextState.targetVessel != '') {
            const { navigate } = this.props.navigation;
            var cases = getCases(nextState.name, nextState.targetVessel);
            /* case is realm object, c is an index*/
            this.resultsDisplay = Object.keys(cases).map((c, index) =>
                <TouchableOpacity key={index}
                                  onPress={ () => navigate('CaseDetails', { data: cases[index] }) }
                                  style={ (index == 0) ? Styles.firstListItemSearch : Styles.listItemSearch}
                >
                    <Text style={Styles.listText}
                          numberOfLines={2}
                          ellipsizeMode='tail'
                    >
                        {cases[index].targets}
                    </Text>
                    <View style={Styles.column}>
                        <View style={Styles.row}>
                            <Text style={Styles.listItemDate}>
                                {cases[index].dateOfProcedure}
                            </Text>
                            <Image
                                style={Styles.icon}
                                source={arrowIcon}
                            />
                        </View>
                        <Text style={Styles.name} ellipsizeMode="tail" numberOfLines={1}>
                            {cases[index].name}
                        </Text>
                    </View>
                </TouchableOpacity>
            );
        }
    }

    getMatches(query, src){
        var matches = [];
        if (query != '') {
            query = query.toLowerCase();
            for (var i in src) {
                var name = src[i].toLowerCase();
                if (name.includes(query)) {
                    matches.push(src[i]);
                }
            }
        }
        return matches;
    }

    render() {
        return (
            <View>
                    <Text style={Styles.inputHeader}>Patient Name</Text>
                    <Autocomplete
                        data={this.state.matchingNames}
                        value={this.state.name}
                        onChangeText={text => {matches = this.getMatches(text, this.state.patients);
                                                   this.setState({matchingNames: [], name: text})}}
                        renderItem={data => (
                              <TouchableOpacity
                               style={{height:40}}
                               onPress={() => {this.setState({ name: data, matchingNames:[] })}}>
                                <Text>{data}</Text>
                              </TouchableOpacity>
                            )}
                    />

                    <Text style={Styles.inputHeader}>Target Vessel</Text>
                    <Autocomplete
                        data={this.state.matchingVessels}
                        value={this.state.targetVessel}
                        listStyle={{position:'absolute'}}
                        onChangeText={text => {matches = this.getMatches(text, this.state.vessels);
                                                   this.setState({matchingVessels: [], targetVessel: text})}}
                        renderItem={data => (
                              <TouchableOpacity
                                style={{height:40}}
                                onPress={() => {this.setState({ targetVessel: data, matchingVessels:[] })}}>
                                <Text>{data}</Text>
                              </TouchableOpacity>
                            )}
                    />

                <Text style={Styles.inputHeader}>Results:</Text>
                <ScrollView keyboardShouldPersistTaps="handled">
                    {this.resultsDisplay}
                </ScrollView>
            </View>
        )
    }
}