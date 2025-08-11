import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Icon = ({ source, icon, style, size = 24, ...props }) => {
  // icon prop이 있으면 icon을 사용, 없으면 source 사용
  const imageSource = icon || source;
  
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
