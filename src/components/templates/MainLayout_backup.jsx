import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

const MainLayout = ({ children, style }) => {
  console.log("🏗️ MainLayout (완전 단순화 - BackgroundLayout도 제거)");

  return (
    <View style={{flex: 1, backgroundColor: '#E8F5E8'}}>
      <ScrollView style={{width: '100%'}} contentContainerStyle={[{paddingBottom: 60}, style]}>
        {children}
      </ScrollView>
    </View>
  );
};

export default MainLayout;

const styles = StyleSheet.create({
 
});
