import { ScrollView, StyleSheet, View } from "react-native";
import Button from "@atoms/button/Button";
import { HStack } from "@ui/Stack"; // ✅ gap 대체 (대문자 S)

const FriendsFilterSection = (props) => {
  const menu = [
    { title: '친구목록' },
    { title: '친구검색' },
    { title: '추천친구' },
    { title: '보낸요청' },
    { title: '받은요청' },
    { title: '차단친구' },
  ];

  return (
      <View style={{ width: '100%', paddingHorizontal: 10 }}>
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.containerScrollNoGap}  // ❌ gap 제거
            showsHorizontalScrollIndicator={false}
            horizontal
        >
          {/* ✅ 가로 간격 5 → HStack gap={5} */}
          <HStack gap={5} align="center">
            {menu.map((item, index) => (
                <Button
                    key={index}
                    style={[styles.btn, props.filterType == index && styles.active]}
                    textStyle={props.filterType == index && styles.active}
                    title={item.title}
                    type="caption"
                    onPress={() => props.onPress(index)}
                    onPress2={() => props.onPress(index)}
                    activeOpacity={1}
                />
            ))}
          </HStack>
        </ScrollView>
      </View>
  );
};
export default FriendsFilterSection;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    // horizontal ScrollView이므로 flexDirection은 자식에게 맡김
  },
  // ❌ gap 제거 (HStack이 처리)
  containerScrollNoGap: {
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    borderRadius: 50,
    backgroundColor: '#C0D6C8',
  },
  active: {
    color: '#E4CC71',
    backgroundColor: '#91B7AB',
  },
});
