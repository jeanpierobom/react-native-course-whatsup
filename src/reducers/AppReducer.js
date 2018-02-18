import {
  MODIFICA_NOVO_CONTATO_EMAIL, ADICIONA_CONTATO_ERRO, ADICIONA_CONTATO_SUCESSO,
  MODIFICA_MENSAGEM, ENVIA_MENSAGEM_SUCESSO,
} from '../actions/types';

const INITIAL_STATE = {
  novoContatoEmail: '',
  erroCadastroNovoContato: '',
  inclusaoNovoCadastro: false,
  mensagem: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MODIFICA_NOVO_CONTATO_EMAIL:
      return { ...state, novoContatoEmail: action.payload };
    case ADICIONA_CONTATO_SUCESSO:
      return {
        ...state,
        erroCadastroNovoContato: '',
        inclusaoNovoCadastro: action.payload,
        novoContatoEmail: '',
      };
    case ADICIONA_CONTATO_ERRO:
      return { ...state, erroCadastroNovoContato: action.payload, inclusaoNovoCadastro: false };
    case MODIFICA_MENSAGEM:
      return { ...state, mensagem: action.payload };
    case ENVIA_MENSAGEM_SUCESSO:
      return { ...state, mensagem: '' };
    default:
      return state;
  }
};
