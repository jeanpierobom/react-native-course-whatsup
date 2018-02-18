import React, { Component } from 'react';
import { ListView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
import { conversasUsuarioFetch } from '../actions/AppActions';

const styles = StyleSheet.create({
  principal: {
    flex: 1,
    backgroundColor: '#ff4081',
  },
});

class Conversas extends Component {
  componentWillMount() {
    this.props.conversasUsuarioFetch();
    this.criaFonteDados(this.props.conversas);
  }

  componentWillReceiveProps(nextProps) {
    this.criaFonteDados(nextProps.conversas);
  }

  criaFonteDados(conversas) {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => { return (r1 !== r2); } });
    this.dataSource = ds.cloneWithRows(conversas);
  }

  renderRow(conversa) {
    this.a = '';
    return (
      <TouchableHighlight
        onPress={() => Actions.conversa({
          title: conversa.nome,
          contatoNome: conversa.nome,
          contatoEmail: conversa.email,
        })}
      >
        <View style={{
            flex: 1,
            padding: 20,
            borderBottomWidth: 1,
            borderColor: '#ccc',
          }}
        >
          <Text style={{ fontSize: 25 }}>{conversa.nome}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View style={styles.principal}>
        <View style={{ flex: 1, paddingBottom: 20 }} >
          <ListView
            enableEmptySections
            dataSource={this.dataSource}
            renderRow={this.renderRow}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const conversas = _.map(state.ListaConversasReducer, (val, uid) => {
    return { ...val, uid };
  });

  return ({
    conversas,
  });
};

export default connect(mapStateToProps, { conversasUsuarioFetch })(Conversas);
