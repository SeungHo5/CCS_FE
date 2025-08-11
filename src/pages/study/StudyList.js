import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import MainLayout from '../../components/templates/MainLayout';
import Text from '../../components/atoms/text/Text.jsx';
import ButtonBox from '../../components/atoms/box/ButtonBox';
import Icon from '../../components/atoms/image/Icon';
import Input from '../../components/atoms/input/Input';
import Button from '../../components/atoms/button/Button';
import studyList from '../../assets/data/studyListDummy';

const StudyList = () => {
  console.log('📚 StudyList 페이지 렌더링...');
  
  const [searchText, setSearchText] = useState('');
  const [filteredStudies, setFilteredStudies] = useState(studyList);

  const getStudyIcon = (iconName) => {
    switch (iconName) {
      case 'studyRoom':
        return require('../../assets/studyRoom.png');
      case 'studyRoom2':
        return require('../../assets/studyRoom2.png');
      default:
        return require('../../assets/studyRoom.png');
    }
  };

  const handleSearch = (text) => {
    setSearchText(text);
    if (text.trim() === '') {
      setFilteredStudies(studyList);
    } else {
      const filtered = studyList.filter(study => 
        study.title.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredStudies(filtered);
    }
  };

  const handleStudyPress = (study) => {
    console.log('스터디 선택:', study.title);
    // 나중에 스터디 상세 페이지로 이동
  };

  const StudyItem = ({ study, index }) => (
    <ButtonBox 
      style={styles.studyItem}
      contentStyle={styles.studyContent}
      onPress={() => handleStudyPress(study)}
    >
      <Icon 
        source={getStudyIcon(study.icon)}
        size={50}
        style={styles.studyIcon}
      />
      <View style={styles.studyInfo}>
        <View style={styles.studyHeader}>
          <Text type="medium" style={styles.roomNumber}>
            {index + 1}번방
          </Text>
          <Text 
            type="caption" 
            style={[
              styles.studyStatus,
              study.isStudying ? styles.studying : styles.waiting
            ]}
          >
            {study.status}
          </Text>
        </View>
        <Text type="medium" style={styles.studyTitle} numberOfLines={1}>
          {study.title}
        </Text>
        <View style={styles.studyFooter}>
          <Icon 
            source={require('../../assets/people.png')}
            size={16}
            style={styles.peopleIcon}
          />
          <Text type="caption" style={styles.personnel}>
            {study.personnel}
          </Text>
        </View>
      </View>
    </ButtonBox>
  );

  return (
    <MainLayout style={styles.container}>
      <View style={styles.header}>
        <Text type="title" style={styles.pageTitle}>
          📚 Study Room
        </Text>
        
        <Input
          placeholder="스터디 방 검색..."
          value={searchText}
          onChangeText={handleSearch}
          style={styles.searchInput}
        />
        
        <Button
          title="+ 방 만들기"
          onPress={() => console.log('방 만들기 클릭')}
          style={styles.createButton}
        />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Text type="subtitle" style={styles.listTitle}>
          총 {filteredStudies.length}개의 스터디 방
        </Text>
        
        {filteredStudies.map((study, index) => (
          <StudyItem key={study.roomId} study={study} index={index} />
        ))}
        
        {filteredStudies.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text type="body" style={styles.emptyText}>
              검색 결과가 없습니다
            </Text>
          </View>
        )}
      </ScrollView>
    </MainLayout>
  );
};

export default StudyList;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  header: {
    paddingTop: 20,
    marginBottom: 20,
  },
  pageTitle: {
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: 20,
  },
  searchInput: {
    marginBottom: 15,
  },
  createButton: {
    backgroundColor: '#27ae60',
    marginBottom: 10,
  },
  scrollView: {
    flex: 1,
  },
  listTitle: {
    color: '#2c3e50',
    marginBottom: 15,
    textAlign: 'center',
  },
  studyItem: {
    backgroundColor: '#fff',
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  studyContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  studyIcon: {
    marginRight: 15,
    borderRadius: 8,
  },
  studyInfo: {
    flex: 1,
  },
  studyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  roomNumber: {
    backgroundColor: '#91B7AB',
    color: 'white',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: 'bold',
  },
  studyStatus: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  studying: {
    color: '#27ae60',
  },
  waiting: {
    color: '#f39c12',
  },
  studyTitle: {
    color: '#2c3e50',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  studyFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  peopleIcon: {
    marginRight: 6,
    tintColor: '#7f8c8d',
  },
  personnel: {
    color: '#7f8c8d',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    color: '#7f8c8d',
  },
});
