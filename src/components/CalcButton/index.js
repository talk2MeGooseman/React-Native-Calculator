import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet 
} from 'react-native';

export default class CalcButton extends Component {
    static propTypes = {
        text: PropTypes.string.isRequired,
        onPress: PropTypes.func.isRequired,
        buttonstyles: PropTypes.object
    };
    
    render(){
        const { text, onPress, buttonStyles } = this.props;
        return (
            <View style={styles.container}>
                <TouchableHighlight style={[styles.buttonContainer, buttonStyles]} onPress={ onPress }>
                    <Text style={ styles.textContainer }>{ text }</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 1,
        borderStyle: 'solid',
        backgroundColor: 'gray'
    },
    textContainer: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 40
    }
});