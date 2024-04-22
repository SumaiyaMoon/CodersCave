import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import colors from '../misc/colors';

const Note = ({item, onPress}: any) => {
    const {title, desc, } = item;

    return (

        <TouchableOpacity onPress={onPress} style={styles.container} >
            <Text numberOfLines={2} style={styles.title} >{title}</Text>
            <Text numberOfLines={3} style={styles.desc} >{desc}</Text>
        </TouchableOpacity>
    );
};



const width = Dimensions.get('window').width - 40;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.PRIMARY,
        width: width / 2 - 10,
        height: width / 2 - 10,
        borderRadius: 10,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 20,
        paddingVertical: 20,
        marginVertical: 10,
        shadowColor: '#000',
        elevation: 2,
    },
    title: {
        color: colors.LIGHT,
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'left',
        marginBottom: 10,
    },
    desc: {
        color: colors.DARK,
        fontSize: 15,
        textAlign: 'left',
        marginBottom: 10,
    },
});

export default Note;