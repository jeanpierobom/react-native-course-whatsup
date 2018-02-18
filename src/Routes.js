import React from 'react';
import { StyleSheet } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';

import BoasVindas from './components/BoasVindas';
import FormCadastro from './components/FormCadastro';
import FormLogin from './components/FormLogin';
import Principal from './components/Principal';
import AdicionarContato from './components/AdicionarContato';
import Conversa from './components/Conversa';

const styles = StyleSheet.create({
  navegacao: {
    backgroundColor: '#115e54',
  },

  titulo: {
    color: 'white',
  },
});

export default () => (
  <Router navigationBarStyle={styles.navegacao} titleStyle={styles.titulo} >
    <Scene modal>
      <Scene key="formLogin" component={FormLogin} title="Login" hideNavBar />
      <Scene key="formCadastro" component={FormCadastro} title="Cadastro" hideNavBar={false} />
      <Scene key="boasVindas" component={BoasVindas} title="Bem-Vindo!" hideNavBar />
      <Scene key="principal" component={Principal} title="Principal" hideNavBar />
      <Scene
        key="adicionarContato"
        component={AdicionarContato}
        title="Adicionar Contato"
        hideNavBar={false}
      />
      <Scene key="conversa" component={Conversa} title="Conversa" hideNavBar={false} />
    </Scene>
  </Router>
);
