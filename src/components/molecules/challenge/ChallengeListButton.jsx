import { StyleSheet } from "react-native";
import Box from "@atoms/box/Box";
import Text from '@atoms/text/Text';
import Icon from '@atoms/image/Icon';
import ButtonIconText from '@atoms/button/ButtonIconText';
import { HStack } from '@ui/Stack';              // ✅ gap 대체

// import IconText from "@molecules/IconText";    // 🗑️ 사용 안 함 → 제거 권장

const ChallengeListButton = (props) => {
  return (
      <Box
          style={[styles.box, props.complete && { backgroundColor: '#c8c8c8' }]}   // 🎨 '#c8c8c8ff' == '#c8c8c8'
          contentStyle={styles.contentStyle}
          onPress={props.onPress}
      >
        {/* ✅ gap:10 → HStack gap={10} */}
        <HStack gap={10} align="center">
          <Icon icon={props.icon} size={{ width: '80%', height: '80%' }} />
          <HStack style={{}} gap={2} align="flex-start"> {/* 타이틀/캡션 사이 살짝 간격 주고 싶다면 */}
            <Text style={{ color: '#E4CC71', fontWeight: '600' }}>{props.title}</Text>
            <Text type="caption">{props.caption}</Text>
          </HStack>
        </HStack>

        <ButtonIconText
            flexNone
            onPress={props.onPressComplate}  // ⚠️ 오탈자 가능: onPressComplete? (현재 prop 이름 유지)
            disabled={props.complete}
            icon={require('@assets/coin.png')}
            text={props.coin}
            type="caption"
            style={[styles.iconText, props.complete && { backgroundColor: '#c8c8c8' }]}
            iconStyle={{ flex: 35 }}
            textStyle={{ flex: 65, color: 'white', textAlign: 'right' }}
        />
      </Box>
  );
};

export default ChallengeListButton;

const styles = StyleSheet.create({
  box: {
    width: '100%',
    height: 70,
    backgroundColor: '#FFFFFF',
    borderColor: '#91B7AB',
    borderWidth: 3,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 20,
    justifyContent: 'center',
    marginBottom: 15,
  },
  contentStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#C0D6C8',
    borderRadius: 500,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    width: 70,
    height: 30,
    borderColor: '#91B7AB',
    borderWidth: 2,
    borderRadius: 25,
    marginLeft: 5,
    backgroundColor: '#C0D6C8',
    paddingLeft: 5,
    paddingRight: 10,
  },
});
