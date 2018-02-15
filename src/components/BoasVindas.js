import React from 'react';
import { Button, Image, ImageBackground, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { Actions } from 'react-native-router-flux';

const boasVindas = props =>  {
    return (
        <ImageBackground source={require('../images/bg.png')}  style={styles.imageBackground} >
            <View style={styles.principal} >
                <View style={styles.bemVindo} >
                    <Text style={styles.txtBemVindo}>Seja bem-vindo!</Text>
                    <Image source={require('../images/logo.png')} />
                </View>
                <View style={styles.botao}>
                    <Button title="Login" onPress={() => { console.log('teste'); Actions.formLogin(); }  } />
                </View>
            </View>
        </ImageBackground>
    );
}

export default boasVindas;

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1
    },    
    principal: {
        flex: 1,
        padding: 15
    },
    bemVindo: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtBemVindo: {
        fontSize: 25,
        color: '#fff'
    },
    botao: {
        flex: 1
    }
})