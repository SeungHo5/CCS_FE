// src/components/atoms/Box.jsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '@atoms/text/Text';
import ButtonIcon from '@atoms/button/ButtonIcon';

/**
 * 퍼센트는 문자열 그대로 유지하고, 숫자/px만 숫자로 변환
 * - '40%'  -> '40%' (그대로 전달, 부모 기준 비율)
 * - '64'   -> 64
 * - '64px' -> 64
 * - 64     -> 64
 */
const resolveSize = (v) => {
  if (v == null) return undefined;

  if (typeof v === 'string') {
    const s = v.trim();
    if (s.endsWith('%')) return s; // ✅ 퍼센트는 그대로 둔다
    if (/^-?\d+(\.\d+)?px$/i.test(s)) {
      const n = parseFloat(s);
      return Number.isFinite(n) ? Math.round(n) : undefined;
    }
    const n = Number(s);
    return Number.isFinite(n) ? n : undefined;
  }

  if (typeof v === 'number') return Number.isFinite(v) ? v : undefined;

  return undefined;
};

const Box = ({
               title,              // 타이틀 텍스트
               titleBtnIcon,       // 타이틀 우측 버튼 아이콘
               titleBtnOnPress,    // 타이틀 우측 버튼 핸들러
               titleContainerStyle,
               titleStyle,         // 타이틀 텍스트 스타일
               titleBtnStyle,      // 타이틀 버튼 스타일
               children,           // 박스 내용
               style,              // 전체 박스 스타일
               contentStyle,       // 내용 컨테이너 스타일
               height,             // 박스 높이 (숫자 | '40%' | '64px' 등)
               width,              // 박스 너비  (숫자 | '40%' | '64px' 등)
               titleHeight = 48,   // 타이틀 높이 (숫자 | 퍼센트 문자열 모두 허용)
               titleType = 'title' // 타이틀 Text 컴포넌트 type
             }) => {
  const containerStyle = [
    styles.container,
    width != null && { width: resolveSize(width) },
    height != null && { height: resolveSize(height) },
    style,
  ];

  const headerStyle = [
    styles.titleContainer,
    titleHeight != null && { height: resolveSize(titleHeight) }, // ✅ 퍼센트면 문자열로 그대로
    titleContainerStyle,
  ];

  return (
      <View style={containerStyle}>
        {title ? (
            <View style={headerStyle}>
              <Text type={titleType} style={[styles.title, titleStyle]}>
                {title}
              </Text>

              {/* 우측 상단 아이콘 버튼 (아이콘 없으면 렌더 안 함) */}
              {titleBtnIcon ? (
                  <View style={styles.titleBtnContainer}>
                    <ButtonIcon
                        icon={titleBtnIcon}
                        onPress={titleBtnOnPress}
                        style={titleBtnStyle}
                    />
                  </View>
              ) : null}
            </View>
        ) : null}

        {/* ✅ 높이 계산(부모-타이틀) 안 하고, flex로 채우기 */}
        <View style={[styles.contentContainer, contentStyle]}>
          {children}
        </View>
      </View>
  );
};

export default Box;

const styles = StyleSheet.create({
  container: {
    // 부모에서 비율/높이 줄 수 있도록 기본 100% 유지
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFEEB',
    borderRadius: 15,
    overflow: 'hidden', // 모서리 라운드 잘리도록
  },
  titleContainer: {
    width: '100%',
    backgroundColor: '#91B7AB',
    paddingVertical: 6,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
  },
  contentContainer: {
    flex: 1,                 // ✅ 남은 공간 모두 채우기
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleBtnContainer: {
    position: 'absolute',
    right: 0,
    height: '100%',
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
