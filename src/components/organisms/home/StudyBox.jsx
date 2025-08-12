import { StyleSheet, View } from 'react-native';
import Box from '@atoms/box/Box';
import Text from '@atoms/text/Text';
import { useNavigation } from '@react-navigation/native';

const StudyBox = () => {
  const navigation = useNavigation();
  
  const handleNavigateToStudy = () => {
    console.log("🎯 StudyBox navigate 버튼 클릭 → GroupListPage");
    navigation.navigate('GroupListPage');
  };

  return (
    <Box
      title="Study Group"
      height={300}
      style={styles.container} 
      contentStyle={styles.contentContainer}
      titleBtnIcon={require('@assets/navigate.png')}
      titleBtnOnPress={handleNavigateToStudy}
      titleBtnStyle={{height: '60%'}}
    >
      <Text type="body">스터디 그룹 목록</Text>
      <Text type="caption" style={styles.description}>
        화살표 버튼을 누르면 스터디 목록 페이지로 이동합니다
      </Text>
    </Box>
  );
};

export default StudyBox;

const styles = StyleSheet.create({
  container: {
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
  }
});
