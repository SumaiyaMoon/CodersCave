import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../misc/colors';

const RoundIconBtn = (props: any) => {
  const {name, size, color, style, onPress} = props;
  return (
    <Icon
      name={name || 'help'}
      size={size || 30}
      color={color || 'white'}
      style={[styles.icon, {...style}]}
      onPress={onPress}
    />
  );
};

export default RoundIconBtn;

const styles = StyleSheet.create({
  icon: {
    backgroundColor: colors.PRIMARY,
    padding: 15,
    borderRadius: 50,
    elevation: 5,
  },
});
