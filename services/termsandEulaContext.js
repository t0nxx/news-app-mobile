import React, { useState, createContext } from 'react';
import { http } from './httpService';
import { AsyncStorage } from 'react-native';


export const TermsEulaContext = createContext();

export const TermsEulaProvider = props => {
    const [isAcceptTerms, setIsAcceptTerms] = useState(false);
    AsyncStorage.getItem('accept_terms').then(data => {
        if (data != null) {
            setIsAcceptTerms(true);
        }
    });

    return <TermsEulaContext.Provider value={[isAcceptTerms, setIsAcceptTerms]}>{props.children}</TermsEulaContext.Provider>
}
