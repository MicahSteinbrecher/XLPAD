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
    SegmentedControlIOS,
    Picker,
    Item,
    TouchableOpacity,
    KeyboardAvoidingView,
} from 'react-native';
import Realm from 'realm';
import Styles from './Style';
import { Case } from './models/Case';
import DatePicker from 'react-native-datepicker';
import { Patient } from './models/Patient';
import { Procedure } from './models/Procedure';
import { Complication } from './models/Complication';
import { Institution } from './models/Institution';
import { getDate, getPatients, getInstitutions, getTargets, getMinDate, getMaxDate } from './utilities';
import uuid from 'react-native-uuid';
import ProceduresContainer from './ProceduresContainer';
import update from 'immutability-helper';
import Autocomplete from 'react-native-autocomplete-input';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CheckBox from 'react-native-checkbox';

class NewCase extends React.Component {
    static navigationOptions = {
        title: 'New Case',
    };

    constructor(props) {
        super(props);
        this.realm = new Realm({schema: [Case, Procedure, Complication, Patient, Institution]});

        this.state = {
            name: '',
            age: '',
            institution: '',
            date: getDate(),
            complications: {
                str: '',
                data:[{type:'Dissection (Flow-Limiting)',active:false},
                {type:'Dissection (Non Flow-Limiting)',active:false},
                {type:'Access Site Hematoma',active:false},
                {type:'Retroperitoneal Hematoma',active:false},
                {type:'Distal Embolization',active:false},
                {type:'Bleeding Diathesis',active:false},
                {type:'Allergic Reaction',active:false},
                {type:'Acute Renal Failure',active:false},
                {type:'Perforation',active:false},
                {type:'Emergency Surgery',active:false}]
            },
            leftProcedures: [{}],
            rightProcedures: [{}],
            matchingNames: [],
            matchingInstitutions: [],
            patients: getPatients(),
            institutions: getInstitutions(),
        };

        this.handleProcedureChange = this.handleProcedureChange.bind(this);
        this.handleNewProcedure = this.handleNewProcedure.bind(this);
        this.handleButtonPress = this.handleButtonPress.bind(this);
    };


    handleButtonPress() {
        console.log(this.state);
        //if new institution
            //add new institution
        if (this.state.institutions.indexOf(this.state.institution) < 0) {
            this.realm.write(() => {
               this.realm.create('Institution', {
                    name: String(this.state.institution),
                });
            });
            //fthis.refs.scroll.scrollToPosition(0, 0, true);
            Alert.alert(
                'Done',
                'A new case has been successfully added.'

            )
        }


        var patient = this.realm.objects('Patient').filtered('name == $0', this.state.name)[0];

        //patient exists- add case to patients cases
        if (patient != null) {
            console.log('patient: ' + JSON.stringify(patient));

            this.realm.write(() => {
                var procedures = this.state.leftProcedures.concat(this.state.rightProcedures);
                procedures = procedures.filter(function(procedure){ return Object.keys(procedure).length > 0 });

                var existingPatient = this.realm.create('Patient', {id: patient.id}, true);
                existingPatient.cases.push({
                        id: uuid.v4(),
                        dateOfProcedure: String(this.state.date),
                        name: String(this.state.name),
                        age: String(this.state.age),
                        institution: String(this.state.institution),
                        rutherfordCategory: String(this.state.rutherfordCategory),
                        leftABI: String(this.state.leftABI),
                        rightABI: String(this.state.rightABI),
                        targetLimbs: String(this.state.targetLimbs),
                        success: String(this.state.success),
                        complications: this.state.complications.str,
                        comment: this.state.comment,
                        targets: getTargets(procedures),
                    });
                var idx = existingPatient.cases.length-1;
                for (var i in procedures) {
                    if (Object.keys(procedures[i]).length > 0) {
                        existingPatient.cases[idx].procedures.push(procedures[i]);
                    }
                }
                console.log('(ln 74) updated patient : '+ existingPatient.name + ' : ' + JSON.stringify(existingPatient));
            });
            this.resetState();
        }

        // patient doesn't exist- create new patient
        else if (this.state.name != '') {
            this.realm.write(() => {
                let newPatient = this.realm.create('Patient', {
                    name: String(this.state.name),
                    id: uuid.v4(),
                    dateTimeCreated: Date.now(),
                    dateTimeUpdated: Date.now(),
                });
                var procedures = this.state.leftProcedures.concat(this.state.rightProcedures);
                procedures = procedures.filter(function(procedure){ return Object.keys(procedure).length > 0 });

                newPatient.cases.push({
                    id: uuid.v4(),
                    dateOfProcedure: String(this.state.date),
                    name: String(this.state.name),
                    age: String(this.state.age),
                    institution: String(this.state.institution),
                    rutherfordCategory: String(this.state.rutherfordCategory),
                    leftABI: String(this.state.leftABI),
                    rightABI: String(this.state.rightABI),
                    targetLimbs: String(this.state.targetLimbs),
                    success: String(this.state.success),
                    complications: this.state.complications.str,
                    comment: this.state.comment,
                    targets: getTargets(procedures),
                });
                var idx = newPatient.cases.length-1;

                for (var i in procedures) {
                    if (Object.keys(procedures[i]).length > 0) {
                        newPatient.cases[idx].procedures.push(procedures[i]);
                    }
                }
                console.log('created new patient ' + newPatient.name + ': ' + JSON.stringify(newPatient));
            });
            this.resetState();
            console.log('ln 85 new case state: ' + JSON.stringify(this.state));
        }
    }

    resetState() {
        this.setState({
            name: '',
            age: '',
            institution: '',
            date: getDate(),
            leftProcedures: [{}],
            rightProcedures: [{}],
            matchingNames: [],
            matchingInstitutions: [],
            patients: getPatients(),
            institutions: getInstitutions(),
            targetLimbs: '',
            success: '',
            complications: {
                str: '',
                data:[{type:'Dissection (Flow-Limiting)',active:false},
                    {type:'Dissection (Non Flow-Limiting)',active:false},
                    {type:'Access Site Hematoma',active:false},
                    {type:'Retroperitoneal Hematoma',active:false},
                    {type:'Distal Embolization',active:false},
                    {type:'Bleeding Diathesis',active:false},
                    {type:'Allergic Reaction',active:false},
                    {type:'Acute Renal Failure',active:false},
                    {type:'Perforation',active:false},
                    {type:'Emergency Surgery',active:false}]
            },
            comment: '',
            complicationIndices: [0,0,0,0,0,0,0,0,0,0],
            rutherfordCategoryIndex: -1,
            leftABIIndex: -1,
            rightABIIndex: -1,
            targetLimbsIndex: -1,
            successIndex: -1,
        });
    }

    handleNewComplication(complication, i) {
        console.log('updating complications');
        var complications = this.state.complications;
        complications.data[i].active ? complications.data[i].active=false : complications.data[i].active=true;
        var str = '';
        for (var idx in complications.data){
            if (complications.data[idx].active)
                str += complications.data[idx].type + ', ';
        }
        complications.str = str;
        this.setState({
           complications: complications
        });

        /*updates state*/
        console.log(complications.str);
    }

    handleNewProcedure(leg){
        console.log('adding new procedure');
        if (leg == 'Right') {
            var procedures = this.state.rightProcedures;
            procedures.push({leg: 'Right'});
            this.setState({rightProcedures: procedures});
        } else {
            var procedures = this.state.leftProcedures;
            procedures.push({leg: 'Left'});
            this.setState({leftProcedures: procedures});
        }
    }

    handleProcedureChange(procedure, index, leg, updatedfield, updatedValue) {
        console.log('updated ' + leg + ' leg, lesion ' + index + ' ' + JSON.stringify(procedure));
        if (leg=='Right') {
            var procedures = this.state.rightProcedures;
            procedures[index] = procedure;
            this.setState({rightProcedures: procedures});
        } else {
            var procedures = this.state.leftProcedures;
            procedures[index] = procedure;
            this.setState({leftProcedures: procedures});
        }
    }

    componentWillUpdate(nextProps, nextState) {
        const complicationsList = nextState.complications.data.map((complication, index) =>
            <CheckBox
                checked={complication.active}
                key={index}
                onChange={()=>this.handleNewComplication(complication, index)}
                label={complication.type}
            />
        );

        this.complicationsDisplay = null;
        if (nextState.success == "No"){
            this.complicationsDisplay =
                <View>
                    <Text style={Styles.inputHeader}>Complications</Text>
                    {complicationsList}
                </View>
        }
    }

    handleTargetLimbChange(event){
        console.log('changed lesion location to ' + event.nativeEvent.value);
        this.setState(
            {
                targetLimbs: event.nativeEvent.value,
                targetLimbsIndex: event.nativeEvent.selectedSegmentIndex,
                leftProcedures: [{}],
                rightProcedures: [{}],
            });
    }

    /* replace by <handle procedure change> */
    // handleTargetVesselChange(value, index){
    //     console.log('target vessel updated : ' + value + ' at lesion: ' + index);
    //     var procedures = this.state.procedures;
    //     procedures[index].targetVessel = value;
    //     this.setState({
    //         procedures: procedures,
    //     });
    //     //this.setState(update(this.state, {procedures: {index: {targetVessel: {$set: value}}}}));
    //     // var isOccluded = (value=='Yes') ? true : false;
    //     // this.setState(update(this.state.procedures[index], {chronicTotalOcclusion: {$set: isOccluded }}));
    // };
    //
    // handleCTOChange(value, index){
    //     console.log('CTO value updated: ' + value + ' at lesion: ' + index);
    //     var procedures = this.state.procedures;
    //     procedures[index].isCTO = value;
    //     this.setState({
    //         procedures: procedures,
    //     });
    // }
    //
    // handleSliderChange(value, index){
    //     console.log('Stenosis percentage value updated: ' + value + ' at lesion: ' + index);
    //     var procedures = this.state.procedures;
    //     procedures[index].stenosisPercentage = value;
    //     this.setState({
    //         procedures: procedures,
    //     });
    // }
    //
    // handleInterventionsChange(value, index){
    //     console.log('Interventions updated: ' + value + ' at lesion: ' + index);
    //     var procedures = this.state.procedures;
    //     procedures[index].interventions = value;
    //     this.setState({
    //         procedures: procedures,
    //     });
    // }
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

        if (this.state.targetLimbs == 'Left') {
            var proceduresDisplay = <ProceduresContainer leg={this.state.targetLimbs} procedures={this.state.leftProcedures} onNewProcedure={this.handleNewProcedure} onProcedureChange={this.handleProcedureChange} {...this.state} />
        } else if (this.state.targetLimbs == 'Right') {
            var proceduresDisplay = <ProceduresContainer leg={this.state.targetLimbs} procedures={this.state.rightProcedures} onNewProcedure={this.handleNewProcedure} onProcedureChange={this.handleProcedureChange} {...this.state} />
        } else if (this.state.targetLimbs=='Both'){
            var proceduresDisplay =
                <View>
                    <ProceduresContainer leg='Left' procedures={this.state.leftProcedures} onNewProcedure={this.handleNewProcedure} onProcedureChange={this.handleProcedureChange} {...this.state} />
                    <ProceduresContainer leg='Right' procedures={this.state.rightProcedures} onNewProcedure={this.handleNewProcedure} onProcedureChange={this.handleProcedureChange} {...this.state} />
                </View>
        }

        return (
            <KeyboardAwareScrollView ref='scroll' keyboardShouldPersistTaps="handled">

                        <Text style={Styles.sectionHeader}>General Information</Text>

                        <Text style={Styles.inputHeader}>Patient First and Last Name</Text>

                        <Autocomplete
                            ref="name"
                            data={this.state.matchingNames}
                            value={this.state.name}
                            onChangeText={text => {matches = this.getMatches(text, this.state.patients);
                                                   this.setState({matchingNames: matches, name: text})}}
                            renderItem={data => (
                              <TouchableOpacity
                              style={{height:40}}
                              onPress={() => {this.refs.name.blur();
                                  this.setState({ name: data, matchingNames:[] })}
                              }>
                                <Text>{data}</Text>
                              </TouchableOpacity>
                            )}
                        />


                        <Text style={Styles.inputHeader}>Age</Text>
                        <TextInput
                            style={Styles.input}
                            onChangeText={(age) => this.setState({age})}
                            value={this.state.age}
                            backgroundColor="white"
                            keyboardType="numbers-and-punctuation"
                        />

                        <Text style={Styles.inputHeader}>Date of Procedure</Text>
                        <DatePicker
                            style={Styles.datePicker}
                            date={this.state.date}
                            mode="date"
                            format="YYYY-MM-DD"
                            minDate={getMinDate()}
                            maxDate={getMaxDate()}
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                  dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                  },
                                  dateInput: {
                                    marginLeft: 36
                                  }
                                }}
                            onDateChange={(date) => {this.setState({date})}}
                        />

                        <Text style={Styles.inputHeader}>Institution</Text>
                        {/*<Text>*/}
                            {/*{this.state.institution}*/}
                        {/*</Text>*/}
                        <Autocomplete
                            data={this.state.matchingInstitutions}
                            value={this.state.institution}
                            onChangeText={text => {matches = this.getMatches(text, this.state.institutions);
                                                   this.setState({matchingInstitutions: matches, institution: text})}}
                            renderItem={data => (
                              <TouchableOpacity
                              style={{height:40}}
                              onPress={() => {this.setState({ institution: data, matchingInstitutions:[] })}}>
                                <Text>{data}</Text>
                              </TouchableOpacity>
                            )}
                        />

                        <Text style={Styles.inputHeader}>Rutherford Category</Text>
                        <SegmentedControlIOS tintColor="#3567a3"
                                             selectedIndex={this.state.rutherfordCategoryIndex}
                                             values={['One', 'Two', 'Three', 'Four', 'Five', 'Six']}
                                             onChange={(event) => {
                                                                 this.setState({rutherfordCategory: event.nativeEvent.value,
                                                                                rutherfordCategoryIndex: event.nativeEvent.selectedSegmentIndex})
                                                                 }}
                        />

                        <Text style={Styles.inputHeader}>Left ABI</Text>
                        <SegmentedControlIOS
                            tintColor="#3567a3"
                            selectedIndex={this.state.leftABIIndex}
                            values={['> 1.3', '0.9-1.3', '0.6-0.9', '0.3-0.6', '< 0.3']}
                            onChange={(event) => {
                                                 this.setState({leftABI: event.nativeEvent.value,
                                                                leftABIIndex: event.nativeEvent.selectedSegmentIndex})
                                                 }}
                        />

                        <Text style={Styles.inputHeader}>Right ABI</Text>
                        <SegmentedControlIOS
                            tintColor="#3567a3"
                            selectedIndex={this.state.rightABIIndex}
                            values={['> 1.3', '0.9-1.3', '0.6-0.9', '0.3-0.6', '< 0.3']}
                            onChange={(event) => {
                                                 this.setState({rightABI: event.nativeEvent.value,
                                                                rightABIIndex: event.nativeEvent.selectedSegmentIndex})
                                                 }}                    />

                        <Text style={Styles.sectionHeader}>Procedure</Text>

                        <Text style={Styles.inputHeader}>Target Limbs</Text>
                        <SegmentedControlIOS
                            tintColor="#3567a3"
                            selectedIndex={this.state.targetLimbsIndex}
                            values={['Left', 'Right', 'Both']}
                            onChange={(event) => {this.handleTargetLimbChange(event)}}
                        />

                        {proceduresDisplay}

                        <Text style={Styles.sectionHeader}>Outcome</Text>

                        <Text style={Styles.inputHeader}>Success</Text>
                        <SegmentedControlIOS
                            tintColor="#3567a3"
                            selectedIndex={this.state.successIndex}
                            values={['Yes', 'No']}
                            onChange={(event) => {
                                                 this.setState({success: event.nativeEvent.value,
                                                                successIndex: event.nativeEvent.selectedSegmentIndex})
                                                 }}
                        />

                        {this.complicationsDisplay}

                        <KeyboardAvoidingView>
                        <Text style={Styles.inputHeader}>Comment</Text>

                        <AutoGrowingTextInput style={Styles.comment}
                                   value={this.state.comment}
                                   onChangeText={text=> this.setState({comment: text})}
                        />
                        </KeyboardAvoidingView>
                        <Button
                            onPress={this.handleButtonPress}
                            title="Save"
                        />
            </KeyboardAwareScrollView>

        )
    }
}

export default NewCase