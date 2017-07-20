import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import CalcButton from './components/CalcButton';

export default class Calculator extends Component {
    constructor (props) {
        super(props);

        this.state= {
            currentValue: 0
        }
    }

    _onCalculate(operand) {
        if( typeof(operand) === "number") {
            let currentValue = this.state.currentValue * 10;
            let newValue = currentValue + operand;
            this.setState({
                currentValue: newValue
            });
        } else if (typeof(operand) === "string") {
            let { currentValue, previousvalue, operator } = this.state;
 
            if (operator) {
                currentValue = eval(previousvalue + operator + currentValue);
            }

            switch(operand){
                case '/':
                case '-':
                case '+':
                case '*':
                    this.setState({
                        operator: operand,
                        previousvalue: currentValue,
                        currentValue: 0
                    });
                    break;
                case '=':
                    this.setState({
                        operator: null,
                        previousvalue: 0,
                        currentValue: currentValue
                    });
                    break;
                case 'C':
                    this.setState({
                        currentValue: 0
                    });
                    break;
                case 'CE':
                    this.setState({
                        operator: null,
                        previousvalue: 0,
                        currentValue: 0
                    });
                    break;
                default:
                    console.log('not a valid operator');
            }
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.screenContainer}>
                    <Text style={styles.currentValue}>{ this.state.currentValue }</Text>
                </View>
                <View style={styles.buttonConatiner}>
                    <View style={ styles.rowContainer }>
                        <CalcButton text={'CE'} onPress={ this._onCalculate.bind(this, 'CE') }></CalcButton>
                        <CalcButton text={'C'} onPress={ this._onCalculate.bind(this, 'C') }></CalcButton>
                        <CalcButton text={''} onPress={ noop }></CalcButton>
                        <CalcButton text={'/'} onPress={ this._onCalculate.bind(this, '/') }></CalcButton>
                    </View>
                    <View style={ styles.rowContainer }>
                        <CalcButton text={'7'} onPress={ this._onCalculate.bind(this, 7) }></CalcButton>
                        <CalcButton text={'8'} onPress={ this._onCalculate.bind(this, 8) }></CalcButton>
                        <CalcButton text={'9'} onPress={ this._onCalculate.bind(this, 9) }></CalcButton>
                        <CalcButton text={'*'} onPress={ this._onCalculate.bind(this, '*') }></CalcButton>
                    </View>
                    <View style={ styles.rowContainer }>
                        <CalcButton text={'4'} onPress={ this._onCalculate.bind(this, 4) }></CalcButton>
                        <CalcButton text={'5'} onPress={ this._onCalculate.bind(this, 5) }></CalcButton>
                        <CalcButton text={'6'} onPress={ this._onCalculate.bind(this, 6) }></CalcButton>
                        <CalcButton text={'+'} onPress={ this._onCalculate.bind(this, '+') }></CalcButton>
                    </View>
                    <View style={ styles.rowContainer }>
                        <CalcButton text={'1'} onPress={ this._onCalculate.bind(this, 1) }></CalcButton>
                        <CalcButton text={'2'} onPress={ this._onCalculate.bind(this, 2) }></CalcButton>
                        <CalcButton text={'3'} onPress={ this._onCalculate.bind(this, 3) }></CalcButton>
                        <CalcButton text={'-'} onPress={ this._onCalculate.bind(this, '-') }></CalcButton>
                    </View>
                    <View style={ styles.rowContainer }>
                        <CalcButton text={'0'} onPress={ this._onCalculate.bind(this, 0) }></CalcButton>
                        <CalcButton text={''} onPress={ noop }></CalcButton>
                        <CalcButton text={''} onPress={ noop }></CalcButton>
                        <CalcButton text={'='} onPress={ this._onCalculate.bind(this, '=') }></CalcButton>
                    </View>
                </View> 
            </View>
        );
    }
}
const noop = () => {};
const styles = StyleSheet.create({
    container: {
        flex: 10,
        backgroundColor: '#fff',
    },
    screenContainer: {
        flex: 3,
        backgroundColor: 'black',
        justifyContent: 'flex-end'
    },
    buttonConatiner: {
        flex: 7,
        backgroundColor: 'gray'
    },
    currentValue: {
        color: 'white',
        textAlign: 'right',
        fontSize: 100,
        fontWeight: 'bold'
    },
    rowContainer: {
        flex: 1,
        flexDirection: 'row'
    }
});

AppRegistry.registerComponent('Calculator', () => Calculator);
