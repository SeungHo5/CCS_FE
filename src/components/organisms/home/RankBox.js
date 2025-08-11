import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import Box from '../../atoms/box/Box';
import Text from '../../atoms/text/Text.jsx';
import Icon from '../../atoms/image/Icon';
import friendsList from '../../../assets/data/friendsListDummy';

const RankBox = () => {
  // 점수 기준으로 정렬하여 랭킹 만들기
  const rankedFriends = [...friendsList]
    .sort((a, b) => b.score - a.score)
    .slice(0, 5); // 상위 5명만 표시

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return `${rank}위`;
    }
  };

  const getCharacterIcon = (iconName) => {
    try {
      switch (iconName) {
        case '0':
          return require('../../../assets/characters/0.png');
        case '1':
          return require('../../../assets/characters/1.png');
        case '2':
          return require('../../../assets/characters/2.png');
        case '3':
          return require('../../../assets/characters/3.png');
        case '4':
          return require('../../../assets/characters/4.png');
        case '5':
          return require('../../../assets/characters/5.png');
        default:
          return require('../../../assets/characters/0.png');
      }
    } catch {
      return require('../../../assets/logo.png');
    }
  };

  const RankItem = ({ friend, rank }) => (
    <View style={styles.rankItem}>
      <View style={styles.rankInfo}>
        <Text type="medium" style={styles.rankNumber}>
          {getRankIcon(rank)}
        </Text>
        <Icon 
          source={getCharacterIcon(friend.icon)}
          size={35}
          style={styles.characterIcon}
        />
        <View style={styles.userInfo}>
          <Text type="medium" style={styles.userName}>
            {friend.name}
          </Text>
          <Text type="caption" style={styles.userLevel}>
            Lv.{friend.level}
          </Text>
        </View>
      </View>
      <Text type="medium" style={styles.userScore}>
        {friend.score.toLocaleString()}
      </Text>
    </View>
  );

  return (
    <Box title="Rank" height={500} contentStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text type="subtitle" style={styles.headerTitle}>
          🏆 이번 주 랭킹
        </Text>
        <Text type="caption" style={styles.headerSubtitle}>
          친구들과 함께 스터디 점수로 경쟁해보세요!
        </Text>
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {rankedFriends.map((friend, index) => (
          <RankItem 
            key={friend.name} 
            friend={friend} 
            rank={index + 1}
          />
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Text type="caption" style={styles.footerText}>
          더 많은 친구들과 경쟁하고 싶다면?
        </Text>
        <Text type="caption" style={styles.addFriendsText}>
          친구 추가하기 →
        </Text>
      </View>
    </Box>
  );
};

export default RankBox;

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    justifyContent: 'flex-start',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    color: '#2c3e50',
    marginBottom: 5,
  },
  headerSubtitle: {
    color: '#7f8c8d',
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  rankItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginBottom: 8,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  rankInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rankNumber: {
    width: 40,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#91B7AB',
  },
  characterIcon: {
    marginRight: 12,
    borderRadius: 17.5,
    borderWidth: 2,
    borderColor: '#91B7AB',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    color: '#2c3e50',
    fontWeight: 'bold',
  },
  userLevel: {
    color: '#7f8c8d',
    marginTop: 2,
  },
  userScore: {
    color: '#91B7AB',
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  footerText: {
    color: '#7f8c8d',
    marginBottom: 5,
  },
  addFriendsText: {
    color: '#91B7AB',
    fontWeight: 'bold',
  },
});
