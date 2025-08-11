import React from 'react';
import { StyleSheet, View, ScrollView, Text as RNText, TouchableOpacity } from 'react-native';
import Box from '@atoms/box/Box';
import Text from '@atoms/text/Text.jsx';
import Icon from '@atoms/image/Icon';
import { useNavigation } from '@react-navigation/native';
import studyList from '@assets/data/studyListDummy';

const StudyBox = () => {
  console.log('📚 StudyBox 렌더링 시작...');
  console.log('📚 studyList 데이터:', studyList);
  
  const navigation = useNavigation();
  
  // 상위 3개 스터디만 표시
  const topStudies = studyList.slice(0, 3);
  console.log('📚 topStudies:', topStudies);
  
  const getStudyIcon = (iconName) => {
    switch (iconName) {
      case 'studyRoom':
        return require('@assets/studyRoom.png');
      case 'studyRoom2':
        return require('@assets/studyRoom2.png');
      default:
        return require('@assets/studyRoom.png');
    }
  };

  const handleStudyPress = (study) => {
    console.log('스터디 선택:', study.title);
  };

  const handleViewAll = () => {
    console.log('📚 모든 스터디 보기 클릭!');
    navigation.navigate('StudyList');
  };

  try {
    return (
      <Box
        title="Study"
        height={300}
        style={styles.container} 
        contentStyle={styles.contentContainer}
        titleBtnIcon={require('@assets/navigate.png')}
        titleBtnOnPress={handleViewAll}
        titleBtnStyle={{height: '40%'}}
      >
        {/* 임시 디버깅 텍스트 */}
        <RNText style={{color: 'red', fontSize: 16, margin: 10}}>
          StudyBox 렌더링됨 - 스터디 {topStudies.length}개
        </RNText>
        
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {topStudies.map((study, index) => (
            <TouchableOpacity 
              key={study.roomId}
              style={styles.studyItem}
              onPress={() => handleStudyPress(study)}
              activeOpacity={0.7}
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
            </TouchableOpacity>
          ))}
          
          <TouchableOpacity 
            style={styles.viewAllButton}
            onPress={handleViewAll}
            activeOpacity={0.7}
          >
            <Text type="medium" style={styles.viewAllText}>
              모든 스터디 보기
            </Text>
            <Icon 
              source={require('@assets/arrow.png')}
              size={12}
              style={styles.arrowIcon}
            />
          </TouchableOpacity>
        </ScrollView>
      </Box>
    );
  } catch (error) {
    console.error('❌ StudyBox 렌더링 에러:', error);
    return (
      <Box title="Study" height={300}>
        <RNText style={{color: 'red', padding: 20}}>
          StudyBox 에러: {error.message}
        </RNText>
      </Box>
    );
  }
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
