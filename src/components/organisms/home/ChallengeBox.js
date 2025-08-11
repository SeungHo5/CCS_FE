import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Box from '../../atoms/box/Box';
import Text from '../../atoms/text/Text.jsx';
import Icon from '../../atoms/image/Icon';
import { useNavigation } from '@react-navigation/native';
import challenges from '../../../assets/data/challengesDummy';

const ChallengeBox = () => {
  const navigation = useNavigation();
  
  // 카테고리별 완료/총 개수 계산
  const getChallengeStats = (category) => {
    const categoryTasks = challenges.filter(c => c.category === category);
    const completed = categoryTasks.filter(c => c.complete).length;
    const total = categoryTasks.length;
    return { completed, total };
  };

  const studyStats = getChallengeStats('Study');
  const characterStats = getChallengeStats('Character');
  const coinStats = getChallengeStats('Coin');

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Study':
        return require('../../../assets/pencil.png');
      case 'Character':
        return require('../../../assets/logo.png');
      case 'Coin':
        return require('../../../assets/coin.png');
      default:
        return require('../../../assets/logo.png');
    }
  };

  const handleCategoryPress = (category) => {
    console.log(`${category} 챌린지 보기`);
    // 나중에 챌린지 상세 페이지로 이동
  };

  const ChallengeCategory = ({ category, stats, onPress }) => (
    <TouchableOpacity style={styles.challengeItem} onPress={onPress}>
      <Icon 
        source={getCategoryIcon(category)}
        size={30}
        style={styles.categoryIcon}
      />
      <Text type="medium" style={styles.categoryName}>
        {category}
      </Text>
      <View style={styles.progressContainer}>
        <Text type="caption" style={styles.progressText}>
          {stats.completed} / {stats.total}
        </Text>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${(stats.completed / stats.total) * 100}%` }
            ]} 
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <Box
      title="Challenge"
      height={260}
      style={styles.container} 
      contentStyle={styles.contentContainer} 
    >
      <ChallengeCategory 
        category="Study"
        stats={studyStats}
        onPress={() => handleCategoryPress('Study')}
      />
      
      <View style={styles.borderRight}></View>
      
      <ChallengeCategory 
        category="Character"
        stats={characterStats}
        onPress={() => handleCategoryPress('Character')}
      />
      
      <View style={styles.borderRight}></View>
      
      <ChallengeCategory 
        category="Coin"
        stats={coinStats}
        onPress={() => handleCategoryPress('Coin')}
      />
    </Box>
  );
};

export default ChallengeBox;

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  contentContainer:{
    flexDirection: 'row',
    paddingVertical: 10
  },
  challengeItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 8,
  },
  categoryIcon: {
    marginBottom: 8,
    tintColor: '#91B7AB',
  },
  categoryName: {
    color: '#2c3e50',
    marginBottom: 12,
    fontWeight: 'bold',
  },
  progressContainer: {
    width: '100%',
    alignItems: 'center',
  },
  progressText: {
    color: '#7f8c8d',
    marginBottom: 6,
    fontWeight: 'bold',
  },
  progressBar: {
    width: '80%',
    height: 8,
    backgroundColor: '#ecf0f1',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#91B7AB',
    borderRadius: 4,
  },
  borderRight:{
    borderRightWidth: 1,
    height: '80%',
    borderColor: '#91B7AB'
  }
});
