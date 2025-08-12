import { StyleSheet, View } from 'react-native';
import Box from '@atoms/box/Box';
import { useNavigation } from '@react-navigation/native';
import ChallengeBoard from '@molecules/challenge/ChallengeBoard';

const ChallengeBox = () => {
  const navigation = useNavigation();
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
      <ChallengeBoard category="Study" completedCount="24" totalCount="32"/>
      <View style={styles.borderRight}></View>
      <ChallengeBoard category="Character" completedCount="7" totalCount="15"/>
      <View style={styles.borderRight}></View>
      <ChallengeBoard category="Coin" completedCount="12" totalCount="24"/>
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
