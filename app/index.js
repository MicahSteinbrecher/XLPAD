
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
} from 'react-native';
import { TabNavigator, StackNavigator } from "react-navigation";
import Realm from 'realm';
import Styles from './Style';
import NewCase from './NewCase';
import CaseDetails from './CaseDetails';
import Home from './Home';
import Cases from './Cases';
import FindCase from './FindCase';
import { Case } from './models/Case';
import { Complication } from './models/Complication';
import { Procedure } from './models/Procedure';
import { Patient } from './models/Patient';
import { Institution } from './models/Institution';

import ProcedureComponent from './Procedure'

const HomeScreen = TabNavigator({
        Home: {screen: Home},
        NewCase: {screen: NewCase},
        FindCase: {screen: FindCase},
        },
    {
        tabBarOptions: {
            activeTintColor: 'white',
            labelStyle: {
                fontSize: 18,
            },
            style: {
                height: 60,
                backgroundColor: '#3567a3',
            },
        }

    });


const MainScreenNavigator = StackNavigator({
    Home: { screen: HomeScreen },
    Cases: { screen: Cases},
    CaseDetails: { screen: CaseDetails }
});

class XLPAD extends React.Component {
    constructor(props) {
        super(props);
        this.realm = new Realm({schema: [Case, Procedure, Complication, Patient, Institution]});
        var data = this.realm.objects('Case').sorted('dateTimeCreated', true).slice();
        var cases = data.map(x => Object.assign({}, x));
        this.state = {
            cases: cases,
        }
        this.onNavigationStateChange = this.onNavigationStateChange.bind(this);
    }

    onNavigationStateChange(prevState, currentState){
        console.log(currentState);
        console.log(currentState.index);
        if ( (currentState.index) == 0 && (prevState.index == 0) && (currentState.routes[0].index == 0) ) {
            var data = this.realm.objects('Case').sorted('dateTimeCreated', true).slice();
            var cases = data.map(x => Object.assign({}, x));
            this.setState({
                cases: cases,
            });
        }
    }
    render() {
        return (
            <MainScreenNavigator screenProps={this.state} onNavigationStateChange={this.onNavigationStateChange}/>
        );
    }
}

AppRegistry.registerComponent('XLPAD', () => XLPAD);