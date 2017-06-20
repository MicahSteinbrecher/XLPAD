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
import CheckBox from 'react-native-check-box'
import { NavigationActions } from 'react-navigation';


export default class Copyright extends React.Component {
    static navigationOptions = {
        title: 'Copyright Notice'
    };
    render() {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Home' })],
        });
        return (
            <ScrollView>
                <Text style={{fontSize: 16, textAlign: 'justify', padding: 10}}>
                    I. Copyright ©2017, The University of Texas Southwestern Medical Center.  All rights reserved.
                    {"\n"}
                </Text>
                <Text style={{fontSize: 16, textAlign: 'justify', padding: 10}}>
                    II. This software and any related documentation constitutes published and/or unpublished works and may contain valuable trade secrets and proprietary information belonging to The University of Texas Southwestern Medical Center (UT SOUTHWESTERN).  None of the foregoing material may be copied, duplicated or disclosed without the express written permission of UT SOUTHWESTERN.  IN NO EVENT SHALL UT SOUTHWESTERN BE LIABLE TO ANY PARTY FOR DIRECT, INDIRECT, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGES, INCLUDING LOST PROFITS, ARISING OUT OF THE USE OF THIS SOFTWARE AND ITS DOCUMENTATION, EVEN IF UT SOUTHWESTERN HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.  UT SOUTHWESTERN SPECIFICALLY DISCLAIMS ANY WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. THE SOFTWARE AND ACCOMPANYING DOCUMENTATION, IF ANY, PROVIDED HEREUNDER IS PROVIDED "AS IS". UT SOUTHWESTERN HAS NO OBLIGATION TO PROVIDE MAINTENANCE, SUPPORT, UPDATES, ENHANCEMENTS, OR MODIFICATIONS.
                    {"\n"}
                </Text>
                <Text style={{fontSize: 16, textAlign: 'justify', padding: 10}}>
                    III. This software contains copyrighted materials protected under BSD, Apache 2.0, and MIT open source licenses.  Corresponding terms and conditions apply.
                </Text>
                <CheckBox
                    style={{paddingRight: 10, paddingTop: 30}}
                    onClick={()=>this.props.navigation.dispatch(resetAction)}
                    leftText={'I agree to the terms and conditions'}
                    leftTextStyle={{fontSize: 16, fontWeight: 'bold'}}
                />
            </ScrollView>
        );
    }
}