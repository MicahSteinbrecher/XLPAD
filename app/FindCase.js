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
import CheckBox from 'react-native-checkbox';


export default class FindCase extends React.Component {

    static navigationOptions = {
        title: 'Search'
    };

    constructor(props){
        super(props);
        this.state = {
            patients: getPatients(),
            id: '',
            vessels: {
                'Common Iliac': false,
                'External Iliac': false,
                'Common Femoral': false,
                'Femroal Popliteal': false,
                'BTK': false,
            },
            activeVessel: '',
            interventions: {
                'PTA': false,
                'Scoring Balloon': false,
                'Atherectomy': false,
                'Scoring Balloon': false,
                'DCB': false,
                'BMS': false,
                'DES': false,
                'Supera': false
            },
            activeIntervention: '',
        }
    }

    componentWillUpdate(nextProps, nextState) {
        this.resultsDisplay=null;
        if (nextState.activeVessel != '' || nextState.activeIntervention != '') {
            const { navigate } = this.props.navigation;
            var cases = getCases(nextState.activeVessel, nextState.activeIntervention);
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

    onInterventionsChange(key){
        /*only one checkbox can be marked at a time*/
        var interventions = this.state.interventions;
        for (var i in interventions) {
            if (i == key) {
                interventions[i] = !interventions[i]
            }
            else {
                interventions[i]=false
            }
        }
        if (!interventions[key]) {
            key = '';
        }
        this.setState({activeIntervention: key, interventions: interventions});

    }

    onTargetVesselChange(key) {
        /*only one checkbox can be marked at a time*/
        var vessels = this.state.vessels;
        for (var i in vessels) {
            if (i == key) {
                vessels[i] = !vessels[i]
            } else {
                vessels[i] = false
            }
        }
        if (!vessels[key]) {
            key = '';
        }
        this.setState({activeVessel: key, vessels: vessels});
    }

    render() {

        var targetLesionsDisplay = Object.keys(this.state.vessels).map((key, index) =>
            <CheckBox
                checked={this.state.vessels[key]}
                key={index}
                onChange={()=>this.onTargetVesselChange(key)}
                label={key}
            />
        );

        var interventionsDisplay = Object.keys(this.state.interventions).map((key, index) =>
            <CheckBox
                checked={this.state.interventions[key]}
                key={index}
                onChange={()=>this.onInterventionsChange(key)}
                label={key}
            />
        );

        return (

            <ScrollView keyboardShouldPersistTaps="handled">
                <Text style={Styles.inputHeader}>Target Vessel</Text>
                {targetLesionsDisplay}

                <Text style={Styles.inputHeader}>Interventions</Text>
                {interventionsDisplay}

                <Text style={Styles.inputHeader}>Results:</Text>
                {this.resultsDisplay}
            </ScrollView>
        )
    }
}