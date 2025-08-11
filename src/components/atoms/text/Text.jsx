import React from 'react';
import { Text as RNText, StyleSheet } from 'react-native';

const Text = ({ children, style, type = 'body', ...props }) => {
  return (
    <RNText style={[styles[type], style]} {...props}>
      {children} 
    </RNText>
  );
};

export default Text;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '600',
    // fontFamily: 'Jua-Regular', // 임시 비활성화
  },
  mediumTitle: {
    fontSize: 22,
    fontWeight: '600',
    // fontFamily: 'Jua-Regular',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    // fontFamily: 'Jua-Regular',
  },
  body: {
    fontSize: 16,
    // fontFamily: 'Jua-Regular',
  },
  medium: {
    fontSize: 14,
    // fontFamily: 'Jua-Regular',
  },
  caption: {
    fontSize: 12,
    // fontFamily: 'Jua-Regular',
  },
});
