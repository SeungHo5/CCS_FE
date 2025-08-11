import React from 'react';
import { StyleSheet, View } from 'react-native';
import MainLayout from '@templates/MainLayout';
import FloatingIcon from '@atoms/image/FloatingIcon';
import StudyBox from '@organisms/home/StudyBox';
import ChallengeBox from '@organisms/home/ChallengeBox';
import RankBox from '@organisms/home/RankBox';

const Home = () => {
  console.log('🏠 Home 풀버전 렌더링 시작...');
  
  try {
    console.log('🏠 Home 모든 Box 적용 테스트...');
    
    return (
      <MainLayout style={styles.container}>
        <View style={styles.logo}>
          <FloatingIcon icon={require('@assets/logo.png')} />
        </View>
        <StudyBox />
        <ChallengeBox />
        <RankBox />
      </MainLayout>
    );
  } catch (error) {
    console.error('❌ Home 렌더링 에러:', error);
    return (
      <View style={styles.container}>
        <Text>Home Error: {error.message}</Text>
      </View>
    );
  }
};

export default Home;

const styles = StyleSheet.create({
  container:{
    paddingHorizontal: 20,
    alignItems: 'center',
    gap: 20
  },
  logo:{
    height: 300,
    justifyContent: 'center',
  },
});
