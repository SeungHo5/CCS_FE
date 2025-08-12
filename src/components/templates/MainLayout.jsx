import React, { useState } from 'react';
import { ScrollView, StyleSheet, Dimensions} from 'react-native';
import BackgroundLayout from '@atoms/image/BackgroundLayout';
import TabBar from '@organisms/TabBar';

const { width } = Dimensions.get('window');

const MainLayout = ({ children, style }) => {
  console.log("🏗️ MainLayout (안전한 TabBar 추가)");

  return (
    <>
      <BackgroundLayout>
        <ScrollView style={{width: '100%'}} contentContainerStyle={[{paddingBottom: 60}, style]}>
          {children}
        </ScrollView >
        <TabBar />
      </BackgroundLayout>
    </>
  );
};

export default MainLayout;

const styles = StyleSheet.create({
 
});
