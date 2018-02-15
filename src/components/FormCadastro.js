import React, { Component } from 'react';
import { ActivityIndicator, Alert, Button, ImageBackground, StyleSheet, Text, TextInput, View } from 'react-native';
import { connect } from 'react-redux';
import { cadastraUsuario, modificaNome, modificaEmail, modificaSenha } from '../actions/AutenticacaoActions';

class formCadastro extends Component {
    _cadastraUsuario() {
        const { nome, email, senha } = this.props;
        this.props.cadastraUsuario({ nome, email, senha });
    }

    renderBtnCadastro() {
        if (this.props.loadingCadastro) {
            return (
                <ActivityIndicator size="large" />
            );
        } else {
            return (
                <Button
                    title="Cadastrar"
                    color="#115e54"
                    onPress={ () => { this._cadastraUsuario(); }}
                    style={styles.btnCadastrar}
                />
            );
        }
    }

    render() {
        return (
            <ImageBackground source={require('../images/bg.png')} style={styles.imageBackground} >
                <View style={styles.principal}>
                    <View style={styles.form}>
                        <TextInput
                            value={this.props.nome}
                            placeholder="Nome"
                            placeholderTextColor="#fff"
                            style={styles.txtNome}
                            onChangeText={ texto => this.props.modificaNome(texto) }
                        />
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
                        <Text style={styles.txtErro}>{this.props.erroCadastro}</Text>
                    </View>
                    <View style={styles.botao}>
                        { this.renderBtnCadastro() }
                    </View>        
                </View>
            </ImageBackground>
        );
    }
}

const mapStateToProps = state => (
    {
        nome: state.AutenticacaoReducer.nome,
        email: state.AutenticacaoReducer.email,
        senha: state.AutenticacaoReducer.senha,
        erroCadastro: state.AutenticacaoReducer.erroCadastro,
        loadingCadastro: state.AutenticacaoReducer.loadingCadastro
    }
)

export default connect(
    mapStateToProps,
    { 
        cadastraUsuario,
        modificaNome, 
        modificaEmail, 
        modificaSenha
    })(formCadastro);

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1
    },
    
    principal: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
   },
    
    form: {
        flex: 1,
        justifyContent: 'center',
    },

    txtNome: {
        fontSize: 20,
        height: 45,
    },

    txtEmail: {
        fontSize: 20,
        height: 45,
    },

    txtSenha: {
        fontSize: 20,
        height: 45,
    },

    txtErro: {
        color: 'red',
        fontSize: 25
    },

    botao: {
        flex: 1
    },
    
    btnCadastrar: {

    }    
    
});