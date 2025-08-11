// src/components/atoms/Box.jsx
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '@atoms/text/Text';
import ButtonIcon from '@atoms/button/ButtonIcon'

const Box = ({
  title,          // 타이틀
  titleBtnIcon,   // 타이틀 상단 우측 버튼 아이콘
  titleBtnOnPress, // 타이틀 상단 우측 버튼 연결 함수
  titleContainerStyle,
  titleStyle,     // 타이틀 텍스트 스타일
  titleBtnStyle,  // 타이틀 버튼 스타일
  children,       // 박스 내용
  style,          // 전체 박스 스타일
  contentStyle,   // 내용 스타일
  height,         // 높이
  width,          // 너비
  titleHeight = 48,
  titleType = "title"
}) => {
  const [parentHeight, setParentHeight] = useState(0);
  return (
    <View
      onLayout={e => setParentHeight(e.nativeEvent.layout.height)}
      style={[
        styles.container,
        height && { height },
        width && { width },
        style, // 사용자 정의 스타일
      ]}
    >
      {title ? (
        <View style={[styles.titleContainer, titleHeight && {height: titleHeight}, titleContainerStyle]}>
          <Text type={titleType} style={[styles.title, titleStyle]}>{title}</Text>
          <View style={styles.titleBtnContainer}>
            <ButtonIcon
              icon={titleBtnIcon}
              onPress={titleBtnOnPress}
              style={titleBtnStyle}
            />
          </View>
        </View>
      ) : null}
      <View style={[styles.contentContainer, title ? {height: parentHeight - titleHeight} : {height: parentHeight},contentStyle]}>
        {children}
      </View>
    </View>
  );
};
export default Box;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#FFFEEB',
    borderRadius: 15,
  },
  titleContainer: {
    width: '100%',
    backgroundColor: '#91B7AB', // 타이틀 있을 때 배경색
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    overflow: 'hidden'
  },
  titleBtnContainer: {
    width: 48,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0
  }
});