import React, { useState } from 'react';
import LayoutWidthStatus from '@templates/LayoutWidthStatus';
import { useNavigation } from '@react-navigation/native';
import ChallengeList from '@organisms/challenge/ChallengeList'
import challenges from '@assets/data/challengesDummy';

const Challenge = () => {
  console.log("📋 Challenge 페이지 - ChallengeList 추가");
  
  const navigation = useNavigation();

  const open = (index) => {
    console.log("📋 챌린지 클릭:", index, challenges[index].title);
  }
  
  const complete = (index) => {
    console.log("🎯 챌린지 완료:", index);
  }
  
  return (
    <LayoutWidthStatus
      title="Challenge"
      titleBtnIcon={require('@assets/close.png')}
      titleBtnOnPress={() => navigation.goBack()}
      titleBtnStyle={{height: '60%'}}
    >
      <ChallengeList 
        challenges={challenges} 
        onPress={(index) => open(index)} 
        onPressComplate={(index) => complete(index)}
      />
    </LayoutWidthStatus>
  );
};

export default Challenge;
