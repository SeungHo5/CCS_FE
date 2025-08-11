import React from 'react';
import { Text as RNText, StyleSheet, Platform } from 'react-native';

// 폰트 안전 처리 함수
const getFontFamily = () => {
  if (Platform.OS === 'android') {
    // Android에서 시도할 폰트 이름들
    return 'Jua-Regular'; // 또는 'Jua', 'JuaRegular' 등
  }
  return 'Jua'; // iOS
};

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
    fontFamily: getFontFamily(), // 안전한 폰트 적용
  },
  mediumTitle: {
    fontSize: 22,
    fontWeight: '600',
    fontFamily: getFontFamily(),
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: getFontFamily(),
  },
  body: {
    fontSize: 16,
    fontFamily: getFontFamily(),
  },
  medium: {
    fontSize: 14,
    fontFamily: getFontFamily(),
  },
  caption: {
    fontSize: 12,
    fontFamily: getFontFamily(),
  },
});