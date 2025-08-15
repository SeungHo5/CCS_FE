import { StyleSheet, View } from 'react-native';
import Text from '@atoms/text/Text';
import { VStack } from '@ui/Stack'; // ✅ gap 대체 (대문자 S)

const UserAnalyzeInfo = (props) => {
  return (
      <View style={styles.container}>
        <View style={{ flex: 40 }}>
          <View style={styles.summaryContainer}>
            {/* ✅ summary: gap → VStack */}
            <VStack gap={10} style={styles.summaryNoGap}>
              <Text type="title">{props.user?.totalStudyRoomTimeMinutes}m</Text>
              <Text type="caption">총 사용시간</Text>
            </VStack>
            <View style={styles.borderRight} />

            <VStack gap={10} style={styles.summaryNoGap}>
              <Text type="title">{props.user?.focusTimeRatio}%</Text>
              <Text type="caption">공부 집중률</Text>
            </VStack>
            <View style={styles.borderRight} />

            <VStack gap={10} style={styles.summaryNoGap}>
              <Text type="title">{props.user?.avgContinuousFocusTimeMinutes}m</Text>
              <Text type="caption">평균 집중 시간</Text>
            </VStack>
          </View>
        </View>

        <View style={styles.graphContainer}>
          {/* ✅ graph: gap → VStack */}
          <VStack gap={10} style={styles.graphNoGap}>
            <View style={styles.canvas} />
            <Text>일일 집중도 변화량</Text>
          </VStack>

          <VStack gap={10} style={styles.graphNoGap}>
            <View style={styles.canvas} />
            <Text>공부 집중률</Text>
          </VStack>
        </View>
      </View>
  );
};
export default UserAnalyzeInfo;

const styles = StyleSheet.create({
  container: {
    flex: 50,
    paddingHorizontal: 20,
  },
  summaryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // ❌ gap 제거 (VStack이 세로 간격 처리)
  summaryNoGap: {
    width: '33%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  graphContainer: {
    flex: 60,
    flexDirection: 'row',
  },
  // ❌ gap 제거 (VStack이 세로 간격 처리)
  graphNoGap: {
    width: '50%',
    alignItems: 'center',
  },
  canvas: {
    width: '70%',
    aspectRatio: 1,
    backgroundColor: '#91B7AB',
  },
  borderRight: {
    borderRightWidth: 1,
    height: '40%',
    borderColor: '#000000',
  },
});
