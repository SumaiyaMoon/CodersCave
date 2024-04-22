import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import colors from '../misc/colors';
import Icon  from 'react-native-vector-icons/MaterialIcons';
import RoundIconBtn from './RoundIconBtn';

const SearchBar = ({containerStyle, value, onClear, onChangeText}: any) => {
  return (
    <View style={[styles.container, {...containerStyle}]}>
      <TextInput value={value}  onChangeText={onChangeText} placeholder="Search here..." style={styles.searchBar} />
      {value? <Icon name='close' style={[{backgroundColor: 'transparent'}, styles.clearIcon]} onPress={onClear} size={20} color={colors.PRIMARY} /> : null}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    
  },
  searchBar: {
    borderWidth: 0.5,
    borderColor: colors.PRIMARY,
    height: 50,
    borderRadius: 40,
    paddingLeft: 15,
    fontSize: 20,
  },
  clearIcon: {
   position: 'absolute',
   right: 10,
   
  },
});
