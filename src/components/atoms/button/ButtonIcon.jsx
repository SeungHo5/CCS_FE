import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from '@atoms/image/Icon';

const ButtonIcon = ({ icon, onPress, style, size = 24, disabled = false, ...props }) => {
  console.log('🔘 ButtonIcon 렌더링:', {
    icon,
    size,
    hasIcon: !!icon
  });
  
  // icon이 없으면 렌더링하지 않음
  if (!icon) {
    console.warn('⚠️ ButtonIcon: icon이 없습니다!');
    return null;
  }
  return (
    <TouchableOpacity 
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, style]}
      activeOpacity={0.7}
      {...props}
    >
      <Icon 
        source={icon}
        size={size}
        style={styles.icon}
      />
    </TouchableOpacity>
  );
};

export default ButtonIcon;

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    // 기본 아이콘 스타일
  },
});
