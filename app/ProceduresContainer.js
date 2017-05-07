import React from 'react';
import {
    Text,
    TextInput,
    View,
    Button,
    ScrollView,
    SegmentedControlIOS,
    Slider,
} from 'react-native';
import CheckBox from 'react-native-check-box'
import Styles from './Style';
import ProcedureComponent from './Procedure';

export default class ProceduresContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    handleButtonPress(){
        this.props.onNewProcedure(this.props.leg);
    }

    render() {
        var procedures = this.props.procedures.map((procedure, index) =>
            <View key={index} style={ (index == 0) ? Styles.firstContainerItem : Styles.containerItem}>
                <ProcedureComponent {...this.props} procedure={this.props.procedures[index]} index={index} />
            </View>
        );
        return (
            <View>
                <Text style={Styles.inputHeader}>{this.props.leg + ' Leg Lesions'}</Text>
                {procedures}
                <Button
                    onPress={() => this.handleButtonPress()}
                    title="New Lesion"
                />
            </View>
        )
    }
}
