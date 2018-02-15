import React, { Component } from 'react';
import { ListView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { connect } from 'react-redux';
import { contatosUsuarioFetch } from '../actions/AppActions';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';

class Contatos extends Component {

    componentWillMount() {
        this.props.contatosUsuarioFetch();
        console.log(`this.props.contatos ${this.props.contatos}`)
        this.criaFonteDados(this.props.contatos);
    }

    componentWillReceiveProps(nextProps) {
        this.criaFonteDados(nextProps.contatos);
    }

    criaFonteDados(contatos) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.fonteDados = ds.cloneWithRows(contatos);
    }

    renderRow(contato) {
        return (
            <TouchableHighlight
                onPress={ () => Actions.conversa(
                    { 
                        title: contato.nome,
                        contatoNome: contato.nome,
                        contatoEmail: contato.email 
                    }) }
            >
                <View style={{ flex: 1, padding: 20, borderBottomWidth: 1, borderColor: '#ccc' }}>
                    <Text style={{ fontSize: 25 }}>{contato.nome}</Text>
                    <Text style={{ fontSize: 18 }}>{contato.email}</Text>
                </View>
            </TouchableHighlight>
        );
    }

    render() {
        return (
            <ListView
                enableEmptySections
                dataSource={ this.fonteDados }
                renderRow={ this.renderRow }
            />
        );
    } 
}

mapStateToProps = state => {
    const contatos = _.map(state.ListaContatosReducer, (val, uid) => {
        return { ...val, uid };
    });
    return { contatos }
}

export default connect(mapStateToProps, { contatosUsuarioFetch })(Contatos);

const styles = StyleSheet.create({
    principal: {
        flex: 1,
        backgroundColor: '#673ab7'
    }
})


