import React, { useState } from 'react';
import { ScrollView, StyleSheet, Dimensions} from 'react-native';
import BackgroundLayout from '@atoms/image/BackgroundLayout';
import TabBar from '@organisms/TabBar';
import SideBar from '@organisms/common/SideBar';


const { width } = Dimensions.get('window');

const MainLayout = ({ children, style }) => {
  console.log('🏗️ MainLayout + SideBar 활성화...');
  
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  try {
    return (
      <>
        <BackgroundLayout>
          <ScrollView style={{width: '100%'}} contentContainerStyle={[{paddingBottom: 60}, style]}>
            {children}
          </ScrollView >
          <TabBar onOpenMenu={() => {
            console.log('🍔 MENU 버튼 클릭 - SideBar 열기');
            setSidebarVisible(true);
          }} />
        </BackgroundLayout>

        <SideBar 
          visible={isSidebarVisible} 
          onClose={() => {
            console.log('🍔 SideBar 닫기');
            setSidebarVisible(false);
          }} 
        />
      </>
    );
  } catch (error) {
    console.error('❌ MainLayout 렌더링 에러:', error);
    return null;
  }
};

export default MainLayout;

const styles = StyleSheet.create({
 
});
