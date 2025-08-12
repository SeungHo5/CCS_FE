import { StyleSheet, View } from 'react-native';
import Box from '@atoms/box/Box';
import { useNavigation } from '@react-navigation/native';
import ChallengeBoard from '@molecules/challenge/ChallengeBoard';
import challenges from '@assets/data/challengesDummy';

const ChallengeBox = () => {
  const navigation = useNavigation();
  
  // 더미데이터에서 각 카테고리별 진행률 계산
  const calculateProgress = (category) => {
    const categoryItems = challenges.filter(challenge => challenge.category === category);
    const completed = categoryItems.filter(challenge => challenge.complete).length;
    const total = categoryItems.length;
    return { completed, total };
  };

  const studyProgress = calculateProgress('Study');
  const characterProgress = calculateProgress('Character');
  const coinProgress = calculateProgress('Coin');

  console.log("📊 ChallengeBox 더미데이터 연결:", {
    study: studyProgress,
    character: characterProgress, 
    coin: coinProgress
  });

  return (
    <Box
      title="Challenge"
      height={260}
      style={styles.container} 
      contentStyle={styles.contentContainer} 
      titleBtnIcon={require('@assets/navigate.png')}
      titleBtnOnPress={() => navigation.navigate('Challenge')}
      titleBtnStyle={{height: '60%'}}
    >
      <ChallengeBoard 
        category="Study" 
        completedCount={studyProgress.completed} 
        totalCount={studyProgress.total}
      />
      <View style={styles.borderRight}></View>
      <ChallengeBoard 
        category="Character" 
        completedCount={characterProgress.completed} 
        totalCount={characterProgress.total}
      />
      <View style={styles.borderRight}></View>
      <ChallengeBoard 
        category="Coin" 
        completedCount={coinProgress.completed} 
        totalCount={coinProgress.total}
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
  boxBottom: {
    width: '100%',
    height: 20,
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#91B7AB',
  },
  borderRight:{
    borderRightWidth: 1,
    height: '80%',
    borderColor: '#91B7AB'
  }
});
