import React from 'react';
import { View, StyleSheet } from 'react-native';
import Button from '@atoms/button/Button';
import Icon from '@atoms/image/Icon';

const IconButton = ({ 
  iconSource, 
  iconSize = 20, 
  title, 
  onPress, 
  style, 
  iconStyle,
  ...props 
}) => {
  return (
    <Button
      onPress={onPress}
      style={[styles.button, style]}
      {...props}
    >
      <View style={styles.content}>
        {iconSource && (
          <Icon 
            source={iconSource}
            size={iconSize}
            style={[styles.icon, iconStyle]}
          />
        )}
        {title}
      </View>
    </Button>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
});
