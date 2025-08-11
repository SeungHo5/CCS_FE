import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Box from '@atoms/box/Box';

const ButtonBox = ({children, style, contentStyle, onPress, disabled = false, ...props}) => {
  const handlePress = () => {
    console.log('ButtonBox 클릭됨');
    if (onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity 
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.7}
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
