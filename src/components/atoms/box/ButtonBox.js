import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Box from './Box';

const ButtonBox = ({children, style, contentStyle, onPress, disabled = false, ...props}) => {
  return (
    <TouchableOpacity 
      onPress={onPress ? onPress : (e) => e.stopPropagation()} 
      disabled={disabled}
    >
      <Box style={style} contentStyle={contentStyle} {...props}>
        {children}
      </Box>
    </TouchableOpacity>
  );
};

export default ButtonBox;

const styles = StyleSheet.create({
  
});
