import firebase from 'firebase';
import b64 from 'base-64';
import _ from 'lodash';

import {
  MODIFICA_NOVO_CONTATO_EMAIL, ADICIONA_CONTATO_ERRO, ADICIONA_CONTATO_SUCESSO,
  LISTA_CONTATO_USUARIO, MODIFICA_MENSAGEM, ENVIA_MENSAGEM_SUCESSO, LISTA_CONVERSA_USUARIO,
  LISTA_CONVERSAS_USUARIO,
} from './types';

export const modificaNovoContatoEmail = (texto) => {
  return {
    type: MODIFICA_NOVO_CONTATO_EMAIL,
    payload: texto,
  };
};

const adicionaContatoErro = (erro, dispatch) => {
  dispatch({
    type: ADICIONA_CONTATO_ERRO,
    payload: erro,
  });
};

const adicionaContatoSucesso = (dispatch) => {
  dispatch({
    type: ADICIONA_CONTATO_SUCESSO,
    payload: true,
  });
};

export const habilitaInclusaoContato = () => {
  return ({
    type: ADICIONA_CONTATO_SUCESSO,
    payload: false,
  });
};

export const contatosUsuarioFetch = (dispatch) => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    const emailUsuarioB64 = b64.encode(currentUser.email);
    firebase.database().ref(`/usuario_contatos/${emailUsuarioB64}`)
      .on('value', (snapshot) => {
        dispatch({ type: LISTA_CONTATO_USUARIO, payload: snapshot.val() });
      });
  };
};

export const modificaMensagem = (mensagem) => {
  return ({
    type: MODIFICA_MENSAGEM,
    payload: mensagem,
  });
};

export const enviarMensagem = (mensagem, contatoNome, contatoEmail) => {
  // Dados do usuário (email)
  const { currentUser } = firebase.auth();
  const usuarioEmail = currentUser.email;

  return (dispatch) => {
    // Conversão para base 64
    const usuarioEmailB64 = b64.encode(usuarioEmail);
    const contatoEmailB64 = b64.encode(contatoEmail);

    // Armazenar no firebase
    firebase.database().ref(`/mensagens/${usuarioEmailB64}/${contatoEmailB64}`)
      .push({ mensagem, tipo: 'e' })
      .then(() => {
        firebase.database().ref(`/mensagens/${contatoEmailB64}/${usuarioEmailB64}`)
          .push({ mensagem, tipo: 'r' })
          .then(() => dispatch({ type: ENVIA_MENSAGEM_SUCESSO }));
      })
      .then(() => {
        // Armazenar os cabeçalhos das conversas do usuário autenticado
        firebase.database().ref(`/usuario_conversas/${usuarioEmailB64}/${contatoEmailB64}`)
          .set({ nome: contatoNome, email: contatoEmail });
      })
      .then(() => { // Armazenar os cabeçalhos das conversas do contato
        firebase.database.ref(`/contatos/${usuarioEmailB64}`)
          .once('value')
          .then((snapshot) => {
            const dadosUsuario = _.first(_.values(snapshot.val()));
            firebase.database().ref(`/usuario_conversas/${contatoEmailB64}/${usuarioEmailB64}`)
              .set({ nome: dadosUsuario.nome, email: currentUser.email });
          });
      });
  };
};

export const conversaUsuarioFetch = (contatoEmail) => {
  // Compor os emais na base 64
  const { currentUser } = firebase.auth();
  const usuarioEmail = currentUser.email;
  const usuarioEmailB64 = b64.encode(usuarioEmail);
  const contatoEmailB64 = b64.encode(contatoEmail);

  return (dispatch) => {
    firebase.database().ref(`/mensagens/${usuarioEmailB64}/${contatoEmailB64}`)
      .on('value', (snapshot) => {
        dispatch({ type: LISTA_CONVERSA_USUARIO, payload: snapshot.val() });
      });
  };
};

export const conversasUsuarioFetch = () => {
  // Compor o email na base 64
  const { currentUser } = firebase.auth();
  const usuarioEmail = currentUser.email;
  const usuarioEmailB64 = b64.encode(usuarioEmail);

  return (dispatch) => {
    firebase.database().ref(`/usuario_conversas/${usuarioEmailB64}`)
      .on('value', (snapshot) => {
        dispatch({ type: LISTA_CONVERSAS_USUARIO, payload: snapshot.val() });
      });
  };
};

export const adicionarContato = (email) => {
  return (dispatch) => {
    const emailB64 = b64.encode(email);
    firebase.database().ref(`/contatos/${emailB64}`)
      .once('value')
      .then((snapshot) => {
        if (snapshot.val()) {
          // email do contato que queremos adicionar
          const dadosUsuario = _.first(_.values(snapshot.val()));

          // email do usuário autenticado
          const { currentUser } = firebase.auth();
          const emailUsuarioB64 = b64.encode(currentUser.email);
          firebase.database().ref(`/usuario_contatos/${emailUsuarioB64}`)
            .push({ email, nome: dadosUsuario.nome })
            .then(() => adicionaContatoSucesso(dispatch))
            .catch(erro => adicionaContatoErro(erro.message, dispatch));

          dispatch({ type: ADICIONA_CONTATO_SUCESSO });
        } else {
          adicionaContatoErro('E-mail informado não corresponde a um usuário válido.', dispatch);
        }
      });
  };
};
