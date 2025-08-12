import React from 'react';
import { View, StyleSheet } from 'react-native';
import MainLayout from '@templates/MainLayout';
import Text from '@atoms/text/Text';

const Challenge = () => {
  console.log("📋 Challenge 페이지 렌더링");

  return (
    <MainLayout style={styles.container}>
      <View style={styles.content}>
        <Text type="title" style={styles.title}>Challenge 페이지</Text>
        <Text type="body" style={styles.description}>
          챌린지 목록이 여기에 표시됩니다
        </Text>
        <Text type="caption" style={styles.note}>
          (ChallengeBox에서 navigate 버튼으로 이동)
        </Text>
      </View>
    </MainLayout>
  );
};

export default Challenge;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  title: {
    marginBottom: 20,
    color: '#333',
  },
  description: {
    textAlign: 'center',
    marginBottom: 10,
    color: '#666',
  },
  note: {
    textAlign: 'center',
    color: '#999',
  }
});
