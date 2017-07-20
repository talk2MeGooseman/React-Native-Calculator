import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet 
} from 'react-native';

export default class CalcButton extends Component {
    static propTypes = {
        text: PropTypes.string.isRequired,
        onPress: PropTypes.func.isRequired
    };
    
    render(){
        const { text, onPress } = this.props;
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.buttonContainer} onPress={ onPress }>
                    <Text style={ styles.textContainer }>{ text }</Text>
                </TouchableOpacity>
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
        borderStyle: 'solid'
    },
    textContainer: {
        color: 'white',
        fontWeight: 'bold'
    }
});