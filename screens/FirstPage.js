import React, { useState, useEffect ,useContext} from 'react';
import HeaderComponent from '../components/Header';
import { getTerms } from '../services/drawer';
import { Content} from 'native-base';
import { StyleSheet, Text, AsyncStorage, TextInput, TouchableHighlight, View, Image,ScrollView } from 'react-native';
import { TermsEulaContext } from '../services/termsandEulaContext';



const FirstPage = ({ params, navigation }) => {
    const [isAcceptTerms, setIsAcceptTerms] = useContext(TermsEulaContext);
    const [data, setData] = useState({});
    const fetchData = async () => {
        const res = await getTerms();
        setData({ ...res.data });
    }
    useEffect(() => {
        fetchData();
    }, []);
    return (
        isAcceptTerms ? navigation.navigate('SignUp') : 
            <View style={styles.container}>
            <Image style={{top : 100}} source={require('../assets/images/logo.png')} />
                 <View style={{flex : 1, padding : 20 , marginTop : 50 , height : 200}}>

                 <ScrollView style={{ marginTop  : 50 }}>
                         <Text style={{ fontFamily: 'Cairo' , fontSize : 16 , color : 'white' }}>{data.body}</Text>
                </ScrollView>

                 <TouchableHighlight style={[styles.buttonContainer, { backgroundColor: '#742A99' }]} 
                 onPress={() => {
                    AsyncStorage.setItem('accept_terms','true').then(data => {
                        setIsAcceptTerms(true);
                        navigation.navigate('Login');
                    });
                    
                 }}>
                    <Text style={styles.text}> I Completly Accept Hakaya Eula</Text>
                </TouchableHighlight>
                </View>
    
                </View>
        
       
    )
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#B047E5',
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        marginTop : 10,
        width: -1,
        marginLeft : 10,
        borderRadius: 30,
    },
    text: {
        color: 'white',
        fontFamily: 'Cairo',
        fontSize: 14
    }
});
export default FirstPage;
