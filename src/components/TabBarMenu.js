import React from 'react';
import { Image, StatusBar, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { TabBar } from 'react-native-tab-view';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { habilitaInclusaoContato } from '../actions/AppActions';

const styles = StyleSheet.create({
  principal: {
    backgroundColor: '#115e54',
    elevation: 4,
    marginBottom: 1,
  },

  txtTitle: {
    color: '#fff',
    fontSize: 20,
    marginLeft: 20,
  },

  statusBar: { },

  viewTitle: {
    height: 50,
    justifyContent: 'center',
  },

  tabBar: {
    backgroundColor: '#115e54',
    elevation: 0,
  },
});

const TabBarMenu = props => (
  <View style={styles.principal} >
    <StatusBar backgroundColor="#114d44" />
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <View style={styles.viewTitle} >
        <Text style={styles.txtTitle} >Whatsup?</Text>
      </View>

      <View style={{ flexDirection: 'row', marginRight: 20 }}>
        <View style={{ width: 50, justifyContent: 'center', alignItems: 'center' }} >
          <TouchableHighlight
            onPress={() => { Actions.adicionarContato(); props.habilitaInclusaoContato(); }}
            underlayColor="#114d44"
          >
            <Image source={require('../images/adicionar-contato.png')} />
          </TouchableHighlight>
        </View>
        <View style={{ justifyContent: 'center' }} >
          <TouchableHighlight
            onPress={() => { firebase.auth().signOut().then(() => Actions.formLogin()); }}
          >
            <Text style={{ fontSize: 20, color: '#fff' }}>Sair</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
    <TabBar {...props} style={styles.tabBar} />
  </View>
);

export default connect(null, { habilitaInclusaoContato })(TabBarMenu);
