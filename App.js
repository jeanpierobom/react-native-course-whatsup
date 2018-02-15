import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';

import Routes from './src/Routes';
import reducers from './src/reducers';

export default class App extends Component {
    componentWillMount() {
        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyD_lLqO_EyGAXO0V1dtITar-Qny4Zmcrk0",
            authDomain: "whatsup-4f165.firebaseapp.com",
            databaseURL: "https://whatsup-4f165.firebaseio.com",
            projectId: "whatsup-4f165",
            storageBucket: "whatsup-4f165.appspot.com",
            messagingSenderId: "915612129024"
        };
        firebase.initializeApp(config);
    }

    render() {
        return (
            <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
                <Routes />
            </Provider>
        );
    }
}