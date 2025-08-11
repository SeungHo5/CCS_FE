import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Icon = ({ source, icon, style, size = 24, ...props }) => {
  // icon prop이 있으면 icon을 사용, 없으면 source 사용
  const imageSource = icon || source;
  
  // 디버깅 로그 추가
  console.log('🖼️ Icon 렌더링:', {
    source,
    icon,
    imageSource,
    size
  });
  
  // null이나 undefined 체크
  if (!imageSource) {
    console.warn('⚠️ Icon: imageSource가 null입니다!');
    return null; // 아이콘이 없으면 아무것도 렌더링하지 않음
  }
  
  // size가 객체인 경우 (width, height)와 숫자인 경우 모두 처리
  const imageSize = typeof size === 'object' 
    ? { width: size.width, height: size.height }
    : { width: size, height: size };

  return (
    <Image 
      source={imageSource}
      style={[
        styles.icon, 
        imageSize,
        style
      ]}
      {...props}
    />
  );
};

export default Icon;

const styles = StyleSheet.create({
  icon: {
    resizeMode: 'contain',
  },
});
