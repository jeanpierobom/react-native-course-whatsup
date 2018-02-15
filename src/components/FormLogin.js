import React, { Component } from 'react';
import { ActivityIndicator, Button, ImageBackground, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { autenticarUsuario, modificaEmail, modificaSenha } from '../actions/AutenticacaoActions';

class formLogin extends Component {

    _autenticarUsuario = () => {
        console.log('_autenticarUsuario');
        const { email, senha } = this.props;
        this.props.autenticarUsuario({email, senha});        
    }

    renderBtnAcessar() {

        if (this.props.loadingLogin) {
            return (
                <ActivityIndicator size="large" />
            );
        } else {
            return (
                <Button
                    title="Acessar"
                    color="#115e54"
                    onPress={ () => { this._autenticarUsuario() }}
                    style={styles.btnAcessar}
                />
            );
        }
    }

    render() {
        return (
            <ImageBackground source={require('../images/bg.png')} style={styles.imageBackground} >
                <View style={styles.principal}>
                    <View style={styles.titulo}>
                        <Text style={styles.txtTitulo}>Whatsup</Text>
                    </View>
                    <View style={styles.form}>
                        <TextInput
                            value={this.props.email}
                            placeholder="E-mail"
                            placeholderTextColor="#fff"
                            style={styles.txtEmail}
                            onChangeText={ texto => this.props.modificaEmail(texto) }
                        />
                        <TextInput
                            secureTextEntry
                            value={this.props.senha}
                            placeholder="Senha"
                            placeholderTextColor="#fff"
                            style={styles.txtSenha}
                            onChangeText={ texto => this.props.modificaSenha(texto) }
                        />
                        <Text style={styles.txtErro}>{this.props.erroLogin}</Text>
                        <TouchableHighlight onPress={() => { Actions.formCadastro(); }}>
                            <Text style={styles.txtDica}>Ainda não tem cadastro? Cadastre-se!</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.botao}>
                        { this.renderBtnAcessar() }
                    </View>        
                </View>
            </ImageBackground>
        );
    }
}

const mapStateToProps = state => (
    {
        email: state.AutenticacaoReducer.email,
        senha: state.AutenticacaoReducer.senha,
        erroLogin: state.AutenticacaoReducer.erroLogin,
        loadingLogin: state.AutenticacaoReducer.loadingLogin
    }
);

export default connect(mapStateToProps, { modificaEmail, modificaSenha, autenticarUsuario })(formLogin);

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1
    },

    principal: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
    },
    
    titulo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    txtTitulo: {
        fontSize: 25,
        color: '#fff'
    },

    form: {
        flex: 2
    },

    txtEmail: {
        fontSize: 20,
        height: 45,
    },

    txtSenha: {
        fontSize: 20,
        height: 45,
    },

    txtDica: {
        fontSize: 20,
        color: '#fff'
    },

    txtErro: {
        color: 'red',
        fontSize: 25
    },
    
    botao: {
        flex: 1
    },
    
    btnAcessar: {

    }
    
});