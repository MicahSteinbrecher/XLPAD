import React from 'react';
import {
    Text,
    TextInput,
    View,
    Button,
    ScrollView,
    SegmentedControlIOS,
    Slider,
    Picker,
} from 'react-native';
import CheckBox from 'react-native-checkbox';
import { RadioButtons } from 'react-native-radio-buttons';
import Styles from './Style';


export default class ProcedureComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state =
            {...this.props,
            interventions: [{type: 'PTA', active: false},
                            {type:'Scoring Balloon', active: false},
                            {type:'Atherectomy', active: false},
                            {type:'Scoring Balloon', active: false},
                            {type:'DCB', active: false},
                            {type:'BMS', active: false},
                            {type:'DES', active: false},
                            {type:'Supera', active: false}],
            vessels: {
                'Common Iliac': false,
                'External Iliac': false,
                'Common Femoral': false,
                'Femroal Popliteal': false,
                'BTK': false,

            },
        };
        this.state.procedure.leg=this.props.leg;
        this.state.procedure.targetVessel='Common Iliac';
    }

    componentWillMount() {
        this.props.onProcedureChange(this.state.procedure, this.props.index, this.props.leg)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.leg != this.props.leg) {
            this.setState({
                ctoIndex: -1,
                interventions: [{type: 'PTA', active: false},
                    {type:'Scoring Balloon', active: false},
                    {type:'Atherectomy', active: false},
                    {type:'Scoring Balloon', active: false},
                    {type:'DCB', active: false},
                    {type:'BMS', active: false},
                    {type:'DES', active: false},
                    {type:'Supera', active: false}]
            });
        }
    }

    componentWillUpdate(nextProps) {
        this.stenosisPercentage = null;
        if (nextProps.procedure.isCTO === false) {
            this.stenosisPercentage =
                <View>
                    <Text style={Styles.inputHeader}>Stenosis Percentage</Text>
                    <Slider maximumValue={100}
                            step={1}
                            onValueChange={(value) => this.onSliderChange(value) } />
                    <Text>{nextProps.procedure.stenosisPercentage}</Text>
                </View>
        }
    }

    onTargetVesselChange(value) {
        /*only one checkbox can be marked at a time ;-(*/
        var vessels = this.state.vessels;
        var temp = !vessels[value];
        for (var i in vessels) {
            vessels[i]=false
        }
        vessels[value] = temp;

        var procedure = this.state.procedure;
        procedure.targetVessel = value;
        this.setState({procedure: procedure, vessels: vessels});
        this.props.onProcedureChange(procedure, this.props.index, this.props.leg)
    }
    onCTOChange(event) {
        isCTO = Boolean(event.nativeEvent.selectedSegmentIndex);
        var procedure = this.state.procedure;
        procedure.isCTO = isCTO;
        if (!isCTO) {
            procedure.stenosisPercentage = '0 %';
        }
        this.setState({procedure: procedure, ctoIndex: event.nativeEvent.selectedSegmentIndex});
        this.props.onProcedureChange(procedure, this.props.index, this.props.leg)
    }
    onSliderChange(value){
        var procedure = this.state.procedure;
        procedure.stenosisPercentage = value + ' %';
        this.setState({procedure: procedure});
        this.props.onProcedureChange(procedure, this.props.index, this.props.leg)
    }

    /*
    * this.props.index = procedure index in procedures
    * i = intervention index in interventions
    * idx = intervention in active interventions
    * */
    onInterventionsChange(i){
        /*builds list of interventions*/
        this.state.interventions[i].active ? this.state.interventions[i].active=false : this.state.interventions[i].active=true;
        var interventionData = '';
        for (var idx in this.state.interventions){
            if (this.state.interventions[idx].active)
                interventionData += this.state.interventions[idx].type + ', ';
        }

        /*updates state*/
        var procedure = this.state.procedure;
        procedure.interventions = interventionData;
        this.setState({procedure: procedure});
        this.props.onProcedureChange(procedure, this.props.index, this.props.leg)
    }

    render() {

        var interventionsDisplay = this.state.interventions.map((intervention, index) =>
            <CheckBox
                checked={intervention.active}
                key={index}
                onChange={()=>this.onInterventionsChange(index)}
                label={intervention.type}
            />
        );

        var targetLesionsDisplay = Object.keys(this.state.vessels).map((key, index) =>
            <CheckBox
                checked={this.state.vessels[key]}
                key={key}
                onChange={()=>this.onTargetVesselChange(key)}
                label={key}
            />
        );

        return (
            <View>
                <Text style={Styles.inputHeader}>Target Vessel</Text>

                {/*target vessel input as a picker*/}
                {/*<Picker*/}
                    {/*selectedValue={this.state.procedure.targetVessel}*/}
                    {/*onValueChange={ value => this.onTargetVesselChange(value)}>*/}
                    {/*<Picker.Item label="Common Iliac" value="Common Iliac" />*/}
                    {/*<Picker.Item label="External Iliac" value="External Iliac" />*/}
                    {/*<Picker.Item label="Common Femoral" value="Common Femoral" />*/}
                    {/*<Picker.Item label="Femoral Popliteal" value="Femoral Popliteal" />*/}
                {/*</Picker>*/}

                {/*target vessel input as a segment control*/}
                {/*<SegmentedControlIOS*/}
                    {/*tintColor="#3567a3"*/}
                    {/*values={['Common Iliac', 'External Iliac', 'Common Femoral', 'Femoral Popliteal', 'BTK']}*/}
                    {/*onValueChange={ value => this.onTargetVesselChange(value)}*/}
                {/*/>*/}
                {targetLesionsDisplay}

                <Text style={Styles.inputHeader}>Chronic Total Occlusion</Text>
                <SegmentedControlIOS
                    selectedIndex={this.state.ctoIndex}
                    tintColor="#3567a3"
                    values={['No', 'Yes']}
                    onChange={(event) => {this.onCTOChange(event)}}
                />

                {this.stenosisPercentage}

                <Text style={Styles.inputHeader}>Interventions</Text>
                {interventionsDisplay}
            </View>
        )
    }
}
