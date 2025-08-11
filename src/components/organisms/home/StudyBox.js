import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import Box from '../../atoms/box/Box';
import ButtonBox from '../../atoms/box/ButtonBox';
import Text from '../../atoms/text/Text.jsx';
import Icon from '../../atoms/image/Icon';
import { useNavigation } from '@react-navigation/native';
import studyList from '../../../assets/data/studyListDummy';

const StudyBox = () => {
  const navigation = useNavigation();
  
  // 상위 3개 스터디만 표시
  const topStudies = studyList.slice(0, 3);
  
  const getStudyIcon = (iconName) => {
    switch (iconName) {
      case 'studyRoom':
        return require('../../../assets/studyRoom.png');
      case 'studyRoom2':
        return require('../../../assets/studyRoom2.png');
      default:
        return require('../../../assets/studyRoom.png');
    }
  };

  const handleStudyPress = (study) => {
    console.log('스터디 선택:', study.title);
    // 나중에 스터디 상세 페이지로 이동
  };

  const handleViewAll = () => {
    console.log('📚 모든 스터디 보기 클릭!');
    navigation.navigate('StudyList');
  };

  return (
    <Box
      title="Study"
      height={300}
      style={styles.container} 
      contentStyle={styles.contentContainer}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {topStudies.map((study, index) => (
          <ButtonBox 
            key={study.roomId}
            style={styles.studyItem}
            contentStyle={styles.studyContent}
            onPress={() => handleStudyPress(study)}
          >
            <Icon 
              source={getStudyIcon(study.icon)}
              size={40}
              style={styles.studyIcon}
            />
            <View style={styles.studyInfo}>
              <Text type="medium" style={styles.studyTitle} numberOfLines={1}>
                {study.title}
              </Text>
              <View style={styles.studyDetails}>
                <Text 
                  type="caption" 
                  style={[
                    styles.studyStatus,
                    study.isStudying ? styles.studying : styles.waiting
                  ]}
                >
                  {study.status}
                </Text>
                <Text type="caption" style={styles.personnel}>
                  {study.personnel}
                </Text>
              </View>
            </View>
          </ButtonBox>
        ))}
        
        <ButtonBox 
          style={styles.viewAllButton}
          contentStyle={styles.viewAllContent}
          onPress={handleViewAll}
        >
          <Text type="medium" style={styles.viewAllText}>
            모든 스터디 보기
          </Text>
          <Icon 
            source={require('../../../assets/arrow.png')}
            size={12}
            style={styles.arrowIcon}
          />
        </ButtonBox>
      </ScrollView>
    </Box>
  );
};

export default StudyBox;

const styles = StyleSheet.create({
  container: {
  },
  contentContainer: {
    padding: 10,
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  studyItem: {
    backgroundColor: '#f8f9fa',
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  studyContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  studyIcon: {
    marginRight: 12,
    borderRadius: 8,
  },
  studyInfo: {
    flex: 1,
  },
  studyTitle: {
    color: '#2c3e50',
    marginBottom: 4,
  },
  studyDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  studyStatus: {
    fontWeight: 'bold',
  },
  studying: {
    color: '#27ae60',
  },
  waiting: {
    color: '#f39c12',
  },
  personnel: {
    color: '#7f8c8d',
  },
  viewAllButton: {
    backgroundColor: '#91B7AB',
    marginTop: 8,
    borderRadius: 8,
  },
  viewAllContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  viewAllText: {
    color: 'white',
    marginRight: 8,
  },
  arrowIcon: {
    tintColor: 'white',
  },
});
