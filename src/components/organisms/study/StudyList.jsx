import { ScrollView, StyleSheet, View } from "react-native";
import StudyListButton from '@molecules/study/StudyListButton';
import { VStack } from '@ui/Stack'; // ✅ gap 대체 (대문자 S)

const StudyList = (props) => {
  const getIconSource = (icon) => {
    switch (icon) {
      case 'studyRoom':
        return require('@assets/studyRoom.png');
      case 'studyRoom2':
        return require('@assets/studyRoom2.png');
      default:
        return require('@assets/studyRoom.png');
    }
  };

  const shouldShow = (item) => (props.filter ? !item.isActive : true);

  return (
      <ScrollView
          style={{ width: '90%', marginBottom: 20 }}
          contentContainerStyle={{ alignItems: 'center' }} // ❌ gap 제거
          showsVerticalScrollIndicator={false}
      >
        {/* ✅ 세로 간격 10 → VStack */}
        <VStack gap={10} style={{ width: '100%', alignItems: 'center' }}>
          {props.studyList.map((item, index) => (
              shouldShow(item) && (
                  <StudyListButton
                      key={index}
                      icon={getIconSource('studyRoom')}
                      index={index}
                      title={item.name}
                      personnel={`${item.currentMembers}/${item.maxMembers}`}
                      isStudying={item.isActive}
                      onPress={() => props.onPress(item.roomId)}
                  />
              )
          ))}
        </VStack>
      </ScrollView>
  );
};
export default StudyList;

const styles = StyleSheet.create({});
