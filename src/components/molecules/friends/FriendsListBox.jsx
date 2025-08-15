import { StyleSheet, View } from "react-native";
import Box from "@atoms/box/Box";
import Text from '@atoms/text/Text';
import Icon from '@atoms/image/Icon';
import Button from '@atoms/button/Button';
import { HStack, VStack } from '@ui/Stack'; // ✅ Stack 사용

const FriendsListBox = (props) => {
  return (
      <Box style={styles.box} contentStyle={styles.contentStyle}>

        {/* 프로필 아이콘 + 이름/레벨 (가로 간격 10) */}
        <HStack gap={10} align="center">
          <View style={styles.iconContainer}>
            <Icon icon={props.icon} size={{ width: '80%', height: '80%' }} />
          </View>

          {/* 이름/레벨 (세로 간격 6) 
            ※ 기존 'space-around'는 gap과 중복될 수 있어 제거 */}
          <VStack gap={6} style={{ height: '100%' }}>
            <Text style={{ fontWeight: '600' }}>{props.name}</Text>
            <Button
                title={"Lv." + props.level}
                type="caption"
                style={styles.level}
            />
          </VStack>
        </HStack>

        {/* 우측 버튼들 (세로 간격 5) */}
        <VStack gap={5} style={styles.btnContainer}>
          <Button
              onPress={() => props.onPress()}
              title={props.btnTitle}
              type="caption"
              style={styles.iconText}
          />
          {props.btnTitle2 &&
              <Button
                  onPress={() => props.onPress2()}
                  title={props.btnTitle2}
                  type="caption"
                  style={styles.iconText}
              />
          }
        </VStack>

      </Box>
  );
};

export default FriendsListBox;

const styles = StyleSheet.create({
  box: {
    width: '100%',
    height: 80,
    marginBottom: 15,
  },
  contentStyle: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: 60,
    height: 60,
    backgroundColor: '#ffffff',
    borderColor: '#E6E6E6',
    borderWidth: 1,
    borderRadius: 500,
    justifyContent: 'center',
    alignItems: 'center',
    // marginRight: 10, // ❌ HStack gap이 간격을 주므로 제거
  },
  level: {
    borderRadius: 10,
    backgroundColor: '#C0D6C8',
    paddingHorizontal: 15,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    borderRadius: 25,
    backgroundColor: '#C0D6C8',
    paddingHorizontal: 15,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    // gap: 5, // ❌ VStack gap으로 대체
  },
});
