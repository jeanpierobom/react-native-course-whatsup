import React, { Component } from 'react';
import { Button, Image, StyleSheet, Text, View, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { adicionarContato, modificaNovoContatoEmail } from '../actions/AppActions';

class AdicionarContato extends Component {

    renderAdicionarContato() {
        if (!this.props.inclusaoNovoCadastro) {
            return (
                <View style={{ flex: 1, justifyContent: 'center'}}>
                    <View style={{ flex: 1, justifyContent: 'center'}}>
                        <TextInput
                            placeholder="E-mail"
                            style={{ fontSize: 20, height: 45 }}
                            onChangeText={(texto) => this.props.modificaNovoContatoEmail(texto) }
                            value={this.props.novoContatoEmail}
                        />
                    </View>
                
                    <View style={{ flex: 1 }}>
                        <Button
                            title="Adicionar"
                            color="#115e54"
                            onPress={() => this.props.adicionarContato(this.props.novoContatoEmail) }
                        />
                        <Text style={{color: '#f00', fontSize: 20}} >
                            {this.props.erroCadastroNovoContato}
                        </Text>
                    </View>
                </View>
            );
        } else {
            return (
                <View style={styles.principal} >
                    <View style={styles.sucesso} >
                        <Text style={styles.txtSucesso}>Contato adicionado com sucesso!</Text>
                        <Image source={require('../images/logo.png')} />
                    </View>
                </View>
            )
        }
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
                { this.renderAdicionarContato() }
            </View>
        )
    }
}

const mapStateToProps = state => (
    {
        novoContatoEmail: state.AppReducer.novoContatoEmail,
        erroCadastroNovoContato: state.AppReducer.erroCadastroNovoContato,
        inclusaoNovoCadastro: state.AppReducer.inclusaoNovoCadastro
    }
)

export default connect(mapStateToProps, { adicionarContato, modificaNovoContatoEmail })(AdicionarContato);

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1
    },    
    principal: {
        flex: 1,
        padding: 15
    },
    sucesso: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtSucesso: {
        fontSize: 25,
    },
    botao: {
        flex: 1
    }
})