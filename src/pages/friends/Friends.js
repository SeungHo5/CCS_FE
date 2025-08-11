import React from 'react';
import { StyleSheet, View } from 'react-native';
import MainLayout from '@templates/MainLayout';
import Text from '@atoms/text/Text';

const Friends = () => {
  return (
    <MainLayout style={styles.container}>
      <View style={styles.content}>
        <Text type="title" style={styles.title}>
          친구 관리
        </Text>
        <Text type="body" style={styles.subtitle}>
          친구 목록과 관리 기능들이 여기에 표시됩니다
        </Text>
      </View>
    </MainLayout>
  );
};

export default Friends;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  title: {
    marginBottom: 20,
    textAlign: 'center',
    color: '#2c3e50',
  },
  subtitle: {
    textAlign: 'center',
    color: '#7f8c8d',
  },
});
