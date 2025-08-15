import React, { useEffect } from 'react';
import MainLayout from '@templates/MainLayout';
import TopStatusBar from '@organisms/TopStatusBar';
import Box from '@atoms/box/Box';
import { StyleSheet } from 'react-native';
import usePlayerStore from '../../stores/playerStore';
import { VStack } from '@ui/Stack'; // ✅ gap 대체 (대문자 S)

const LayoutWidthStatus = ({
                             title, children, titleBtnIcon, titleBtnOnPress, titleBtnStyle,
                             titleHeight, boxStyle, style, contentStyle, titleContainerStyle, titleStyle
                           }) => {
  const { currency, level, loadPlayerData, isDataLoaded } = usePlayerStore();

  useEffect(() => {
    if (!isDataLoaded) loadPlayerData();
    // ✅ deps 권장: [isDataLoaded, loadPlayerData]
  }, [isDataLoaded, loadPlayerData]);

  return (
      <MainLayout style={[styles.containerNoGap, style]}>
        {/* ✅ gap: 15 → VStack으로 안전하게 처리 */}
        <VStack gap={15} style={{ flex: 1 }}>
          <TopStatusBar contentStyle={{ justifyContent: 'center' }} level={level} coin={currency} />
          <Box
              title={title}
              titleBtnIcon={titleBtnIcon}
              titleBtnOnPress={titleBtnOnPress}
              titleBtnStyle={titleBtnStyle}
              titleContainerStyle={titleContainerStyle}
              titleStyle={titleStyle}
              style={[styles.box, boxStyle]}
              contentStyle={contentStyle}
              titleHeight={titleHeight}
          >
            {children}
          </Box>
        </VStack>
      </MainLayout>
  );
};
export default LayoutWidthStatus;

const styles = StyleSheet.create({
  // ❌ gap 제거 (VStack이 처리)
  containerNoGap: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 100,
  },
  box: {
    // 필요 시 Box 공통 스타일을 여기서 확장
  },
});
