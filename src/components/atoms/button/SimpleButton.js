import React from 'react';
import { TouchableOpacity, StyleSheet, Text as RNText } from 'react-native';

const SimpleButton = (props) => {
  return (
    <TouchableOpacity
      style={[styles.button, props.transparent && {backgroundColor: 'transparent'}, props.center && {alignItems:'center'}, props.style]}
      onPress={props.onPress}
      disabled={props.disabled}
      activeOpacity={props.activeOpacity || 0.5}
    >
      <RNText
        style={[{color: 'white'}, props.transparent && {color: 'black'}, props.textStyle]}
      >
        {props.title}
      </RNText>
    </TouchableOpacity>
  );
};

export default SimpleButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#91B7AB',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    justifyContent: 'center',
  },
});
