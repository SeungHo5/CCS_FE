import React from 'react';
import { Text as RNText, StyleSheet, Platform } from 'react-native';

// React Native 0.71+에서 시도할 폰트 이름들
const fontTests = [
  'Jua-Regular',     // 파일명 기반
  'Jua',             // 단순 이름
  'jua',             // 소문자
  undefined,         // 기본 폰트
];

const currentTest = 0; // 기본 폰트부터 시작해서 차이 확인

const Text = ({ children, style, type = 'body', ...props }) => {
  const testFont = fontTests[currentTest];
  console.log(`🔤 현재 테스트 폰트: ${testFont || '시스템기본폰트'}`);
  
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
    ...(fontTests[currentTest] && { fontFamily: fontTests[currentTest] }),
  },
  mediumTitle: {
    fontSize: 22,
    fontWeight: '600',
    ...(fontTests[currentTest] && { fontFamily: fontTests[currentTest] }),
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    ...(fontTests[currentTest] && { fontFamily: fontTests[currentTest] }),
  },
  body: {
    fontSize: 16,
    ...(fontTests[currentTest] && { fontFamily: fontTests[currentTest] }),
  },
  medium: {
    fontSize: 14,
    ...(fontTests[currentTest] && { fontFamily: fontTests[currentTest] }),
  },
  caption: {
    fontSize: 12,
    ...(fontTests[currentTest] && { fontFamily: fontTests[currentTest] }),
  },
});