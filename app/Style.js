import {
    StyleSheet, Dimensions
} from 'react-native';

var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;

var Styles = StyleSheet.create({

    picker: {
        height: 40
    },
    container: {
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
    },
    input: {
        height: 40,
        borderColor: '#b9b9b9',
        borderRadius: 1,
        borderWidth: 1,
        width: screenWidth
    },
    comment: {
        fontSize: 16,
        borderColor: '#b9b9b9',
        borderRadius: 1,
        borderWidth: 1,
        width: screenWidth,
        backgroundColor: 'white'
    },
    dropdown: {
        height: 40,
    },
    datePicker: {
        width: screenWidth,
        height: 40,
    },
    listItem: {
        width: screenWidth,
        justifyContent: 'space-between',
        flexDirection: 'row',
        minHeight: 60,
        borderColor: 'gray',
        borderBottomWidth: 1,
        alignItems: 'center',
    },
    firstListItem: {
        width: screenWidth,
        justifyContent: 'space-between',
        flexDirection: 'row',
        minHeight: 60,
        borderColor: 'gray',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        alignItems: 'center',
    },
    listItemSearch: {
        width: screenWidth,
        justifyContent: 'space-between',
        flexDirection: 'row',
        minHeight: 60,
        borderColor: 'gray',
        borderBottomWidth: 1,
    },
    firstListItemSearch: {
        width: screenWidth,
        justifyContent: 'space-between',
        flexDirection: 'row',
        minHeight: 60,
        borderColor: 'gray',
        borderBottomWidth: 1,
        borderTopWidth: 1,
    },
    listText: {
        width: screenWidth*.6,
        fontSize: 16,
    },
    detailsItem: {
        width: screenWidth,
        minHeight: 40,
    },
    containerItem: {
        borderColor: 'gray',
        borderBottomWidth: 1
    },
    firstContainerItem: {
        borderColor: 'gray',
        borderBottomWidth: 1,
        borderTopWidth: 1
    },
    row: {
        flexDirection: 'row',
    },
    column: {
        flexDirection: 'column',
        position: 'absolute',
        left: screenWidth*.65,
    },
    listItemDate: {
        marginRight: 10,
        fontSize: 16,
    },
    icon: {
        height: 15,
        width: 15,
        marginTop: 2,
    },
    sectionHeader: {
        fontWeight: 'bold',
        fontSize: 22,
        marginTop: 10,
        marginBottom: 10
    },
    inputHeader: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 10,
        marginBottom: 10
    },
    name: {
        marginTop: 10,
        fontWeight: 'bold',
    }
});

export default Styles