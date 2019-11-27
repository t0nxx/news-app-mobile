import { http } from './httpService';
import { AsyncStorage } from 'react-native';


export const checkCurrentUser = () => {
    AsyncStorage.getItem('token').then(data => {
        if (data != null) {
            return true;
        } else {
            return false;
        }
    }
    )
}