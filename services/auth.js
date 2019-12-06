import React, { useState, createContext } from 'react';
import { http } from './httpService';
import { AsyncStorage } from 'react-native';


export const AuthContext = createContext();

export const AuthProvider = props => {
    const [isLogin, setIsLogin] = useState(false);
    AsyncStorage.getItem('token').then(data => {
        if (data != null) {
            setIsLogin(true);
        }
    });

    return <AuthContext.Provider value={[isLogin, setIsLogin]}>{props.children}</AuthContext.Provider>
}
