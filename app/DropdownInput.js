import React from 'react';
import {
    Picker,
    Text,
    TextInput,
    View,
    TouchableOpacity,
} from 'react-native';
import Styles from './Style';
const Item = Picker.Item;

export default class DropdownInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inputText: '',
        }
    }

    componentWillUpdate() {
        console.log('updating');
        if (this.state.inputText != '') {
            this.picker =
                <Picker>
                    <Item label="hello" value="key0"/>
                    <Item label="world" value="key1"/>
                </Picker>
        }
    }
    inputHandler(event) {
        var inputText = event.nativeEvent.text;
        console.log('input text: ' + inputText);
        this.setState({
            matchingPatients: [],
            inputText: inputText
        });
    }
    render() {
        return (
            <View>
                <TextInput onFocus={(event) => {this.inputHandler(event)}}
                           onChange={(event) => {this.inputHandler(event)}}
                           style = {Styles.input}
                />
                {this.picker}
            </View>
        )
    }
}
