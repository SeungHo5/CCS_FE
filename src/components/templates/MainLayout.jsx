import React, { useState } from 'react';
import { ScrollView, StyleSheet, Dimensions} from 'react-native';
import BackgroundLayout from '@atoms/image/BackgroundLayout';

const { width } = Dimensions.get('window');

const MainLayout = ({ children, style }) => {
  console.log("🏗️ MainLayout (TabBar 제거 테스트)");

  return (
    <>
      <BackgroundLayout>
        <ScrollView style={{width: '100%'}} contentContainerStyle={[{paddingBottom: 60}, style]}>
          {children}
        </ScrollView >
        {/* TabBar 완전 제거 */}
      </BackgroundLayout>
    </>
  );
};

export default MainLayout;

const styles = StyleSheet.create({
 
});
