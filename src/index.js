import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import CalcButton from './components/CalcButton';

const CalcButtons = [
        [
            {label: 'CE', action: 'CE', buttonStyles: { backgroundColor: 'darkgray'} }, 
            {label: 'C', action: 'C', buttonStyles: { backgroundColor: 'darkgray'} }, 
            {label: '', action: ''}, 
            {label: '÷', action: '/', buttonStyles: { backgroundColor: '#FFA500'} }
        ],
        [
            {label: '7', action: 7}, 
            {label: '8', action: 8}, 
            {label: '9', action: 9}, 
            {label: 'x', action: '*', buttonStyles: { backgroundColor: '#FFA500'} }
        ],
        [
            {label: '4', action: 4}, 
            {label: '5', action: 5}, 
            {label: '6', action: 6}, 
            {label: '+', action: '+', buttonStyles: { backgroundColor: '#FFA500'} }
        ],
        [
            {label: '1', action: 1}, 
            {label: '2', action: 2}, 
            {label: '3', action: 3}, 
            {label: '-', action: '-', buttonStyles: { backgroundColor: '#FFA500'} }
        ],
        [
            {label: '0', action: 0}, 
            {label: '', action: ''}, 
            {label: '', action: ''}, 
            {label: '=', action: '=', buttonStyles: { backgroundColor: '#FFA500'} }
        ],
    ]

export default class Calculator extends Component {
    constructor (props) {
        super(props);

        this.state= {
            currentValue: 0,
            currentEquation: []
        }
    }

    _onCalculate(operand) {
        if( typeof(operand) === "number") {
            let currentValue = this.state.currentValue * 10;
            let newValue = currentValue + operand;
            if (newValue <= 9999999) {
                this.setState({
                    currentValue: newValue
                });
            }
        } else if (typeof(operand) === "string") {
            let { currentValue, runningTotal, operator, currentEquation } = this.state;
 
            let oldValue = currentValue;
            if (operator) {
                currentValue = eval(runningTotal + operator + currentValue);
            }

            switch(operand){
                case '/':
                case '-':
                case '+':
                case '*':
                    currentEquation.push(oldValue, operand);
                    this.setState({
                        operator: operand,
                        runningTotal: currentValue,
                        currentValue: 0,
                        currentEquation  
                    });
                    break;
                case '=':
                    currentEquation.push(oldValue);
                    this.setState({
                        operator: null,
                        runningTotal: 0,
                        currentValue: currentValue,
                        currentEquation: []
                    });
                    break;
                case 'C':
                    this.setState({
                        currentValue: 0,
                    });
                    break;
                case 'CE':
                    this.setState({
                        operator: null,
                        runningTotal: 0,
                        currentValue: 0,
                        currentEquation: []
                    });
                    break;
                default:
                    console.log('not a valid operator');
            }
        }
    }

    _buildCalcButtons () {
        let renderElements = [];
        CalcButtons.forEach((row, index) => {
            renderElements.push(
                <View key={index} style={styles.rowContainer}>
                    {this._buildRow(row)}
                </View>
            );
        });

        return renderElements;
    }

    _buildRow (row) {
        let renderElements = [];

        row.forEach((item, index) => {
            renderElements.push(
                <CalcButton
                    key={index}
                    text={item.label} 
                    onPress={ this._onCalculate.bind(this, item.action) }
                    buttonStyles={item.buttonStyles}                    
                />
            )
        });

        return(renderElements);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.screenContainer}>
                    <Text style={ styles.equation }> { this.state.currentEquation.join(' ') } </Text>
                    <Text style={styles.currentValue}>{ this.state.currentValue }</Text>
                </View>
                <View style={styles.buttonConatiner}>
                    { this._buildCalcButtons() }
                </View> 
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 10,
        backgroundColor: '#fff',
    },
    screenContainer: {
        flex: 3,
        backgroundColor: 'black',
        justifyContent: 'flex-end',
        alignContent: 'flex-end'
    },
    equation: {
        color: 'darkgray',
        textAlign: 'right'
    },
    currentValue: {
        color: 'white',
        textAlign: 'right',
        fontSize: 100,
        fontWeight: 'bold'
    },
    buttonConatiner: {
        flex: 7
    },
    rowContainer: {
        flex: 1,
        flexDirection: 'row'
    }
});

AppRegistry.registerComponent('Calculator', () => Calculator);
