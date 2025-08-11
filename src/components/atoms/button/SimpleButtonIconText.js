import React from 'react';
import { TouchableOpacity, StyleSheet, Text as RNText, View } from 'react-native';
import Icon from '@atoms/image/Icon';

const SimpleButtonIconText = ({ icon, iconSize, text, onPress, style, textStyle, activeOpacity }) => {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={activeOpacity || 0.7}
    >
      {icon && (
        <Icon 
          icon={icon} 
          size={iconSize || 16}
        />
      )}
      <RNText style={[styles.text, textStyle]}>
        {text}
      </RNText>
    </TouchableOpacity>
  );
};

export default SimpleButtonIconText;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#91B7AB',
    borderRadius: 6,
  },
  text: {
    color: 'white',
    fontSize: 14,
    marginLeft: 4,
  },
});
