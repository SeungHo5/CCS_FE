import { ScrollView, StyleSheet, View } from "react-native";
import GroupListButton from '@molecules/group/GroupListButton';
import { getThemeImage } from "@utils/imageMapping";
import { VStack } from '@ui/Stack'; // ✅ gap 대체 (대문자 S)

const GroupList = (props) => {
  const shouldShow = (item) => (props.filter ? item.isJoined : true);

  return (
      <ScrollView
          style={{ width: '90%', marginBottom: 20 }}
          contentContainerStyle={{ alignItems: 'center' }} // ❌ gap 제거
          showsVerticalScrollIndicator={false}
      >
        {/* ✅ 세로 간격 10 → VStack */}
        <VStack gap={10} style={{ width: '100%', alignItems: 'center' }}>
          {props.groupList.map((item, index) => (
              shouldShow(item) && (
                  <GroupListButton
                      key={index}
                      icon={getThemeImage(item.leaderRepresentativeRoomId)}
                      index={index}
                      name={item.name}
                      description={item.description}
                      currentMembers={item.currentMembers}
                      maxMembers={item.maxMembers}
                      onPress={() => props.onPress(index)}
                  />
              )
          ))}
        </VStack>
      </ScrollView>
  );
};
export default GroupList;

const styles = StyleSheet.create({});
