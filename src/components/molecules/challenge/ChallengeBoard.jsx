import { StyleSheet, TouchableOpacity, View } from "react-native";
import Text from '@atoms/text/Text';
import Icon from '@atoms/image/Icon';
import Box from "@atoms/box/Box";
import { getChallengeBoardImage } from "@utils/imageMapping";
import { useNavigation } from "@react-navigation/native";
import { VStack } from '@ui/Stack'; // ✅ 추가: gap 대체용

const ChallengeBoard = (props) => {
  const navigation = useNavigation();
  return (
      <TouchableOpacity
          style={styles.innerView}
          onPress={() => navigation.navigate('Challenge')}
          activeOpacity={0.8}
      >
        {/* ✅ gap: 5 → VStack gap={5}로 세로 간격 처리 */}
        <VStack gap={5} style={styles.stack}>
          <Icon style={styles.icon} icon={getChallengeBoardImage(props.category + "Board")} />

          <Box
              style={styles.innerBox}
              title={props.category}
              titleType="caption"
              titleContainerStyle={{ alignItems: 'center', paddingHorizontal: 0 }}
              titleHeight={'40%'}
              contentStyle={styles.innerBoxContent}
          >
            <Text style={{ color: '#91B7AB' }}>{props.progress}</Text>
          </Box>
        </VStack>
      </TouchableOpacity>
  );
};
export default ChallengeBoard;

const styles = StyleSheet.create({
  innerView: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 10,
    // gap: 5,  // ❌ 제거: VStack이 처리
  },
  // VStack 래퍼에 줄 스타일
  stack: {
    width: '100%',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    width: '100%',
    flex: 60,  // ✅ 퍼센트/플렉스는 유지 (부모 높이가 명확해야 기대대로 동작)
  },
  innerBox: {
    width: '60%',
    height: '30%', // ✅ 퍼센트 유지
  },
  innerBoxContent: {
    flex: 1,
    backgroundColor: 'white',
    borderColor: '#91B7AB',
    borderWidth: 1,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
});
