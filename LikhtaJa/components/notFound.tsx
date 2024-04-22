import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RoundIconBtn from './RoundIconBtn';
import  Icon  from 'react-native-vector-icons/MaterialIcons';

const NotFound = () =>{
    return (
        <View style={[StyleSheet.absoluteFillObject, styles.container]} >
            <Icon name='sentiment-dissatisfied' size={90} color='black' />
            <Text style={{marginTop: 20, fontSize: 20,}}>404 - Result Not Found</Text>
            <Text>The Note you are looking for does not exist.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        zIndex: -1,
        opacity: 0.5,
    }
})

export default NotFound;