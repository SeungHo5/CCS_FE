import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import ButtonIconText from '../atoms/button/ButtonIconText';
import { useNavigation, useRoute } from '@react-navigation/native';

const TabBar = ({ onOpenMenu }) => {
  console.log('📱 TabBar 아이콘 버전 렌더링 시작...');
  
  const route = useRoute();
  const navigation = useNavigation();
  
  const ICONS_ACTIVE = {
    Home: require('../../assets/homeBtnActive.png'),
    CharacterMain: require('../../assets/petBtnActive.png'),
    StudyList: require('../../assets/studyBtnActive.png'),
    Menu: require('../../assets/menuBtnActive.png'),
  };

  const ICONS_INACTIVE = {
    Home: require('../../assets/homeBtn.png'),
    CharacterMain: require('../../assets/petBtn.png'),
    StudyList: require('../../assets/studyBtn.png'),
    Menu: require('../../assets/menuBtn.png'),
  };

  const [currentIcons, setCurrentIcons] = useState(ICONS_INACTIVE);

  useEffect(() => {
    console.log('현재 페이지:', route.name);
    const newIcons = {};
    Object.keys(ICONS_INACTIVE).forEach(key => {
      newIcons[key] = key === route.name ? ICONS_ACTIVE[key] : ICONS_INACTIVE[key];
    });
    setCurrentIcons(newIcons);
  }, [route.name]);

  const navigateTo = (screenName) => {
    console.log(`📱 TabBar: ${screenName}으로 이동 시도...`);
    try {
      navigation.navigate(screenName);
      console.log(`✅ ${screenName} 네비게이션 성공`);
    } catch (error) {
      console.error(`❌ ${screenName} 네비게이션 실패:`, error);
    }
  };

  try {
    return (
      <View style={styles.container}>
        <ButtonIconText 
          onPress={() => navigateTo('Home')} 
          icon={currentIcons.Home} 
          iconSize={24}
          text="HOME" 
          type="caption" 
          style={styles.btn} 
          textStyle={styles.titleStyle}
        />
        <ButtonIconText 
          onPress={() => navigateTo('CharacterMain')} 
          icon={currentIcons.CharacterMain} 
          iconSize={24}
          text="PET" 
          type="caption" 
          style={styles.btn} 
          textStyle={styles.titleStyle}
        />
        <ButtonIconText 
          onPress={() => navigateTo('StudyList')} 
          icon={currentIcons.StudyList} 
          iconSize={24}
          text="STUDY" 
          type="caption" 
          style={styles.btn} 
          textStyle={styles.titleStyle}
        />
        <ButtonIconText 
          onPress={() => {
            console.log('🍔 MENU 버튼 클릭');
            if (onOpenMenu) onOpenMenu();
          }} 
          icon={currentIcons.Menu} 
          iconSize={24}
          text="MENU" 
          type="caption" 
          style={styles.btn} 
          textStyle={styles.titleStyle}
        />
      </View>
    );
  } catch (error) {
    console.error('❌ TabBar 렌더링 에러:', error);
    return (
      <View style={styles.container}>
        <Text>TabBar Error</Text>
      </View>
    );
  }
};

export default TabBar;

const styles = StyleSheet.create({
  container:{
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#91B7AB',
    flexDirection: 'row',
    width: '100%',
    height: 60,
    paddingBottom: 10, // 안드로이드 하단 여백
  },
  btn: {
    flex: 1,
    height: '100%',
    padding: 2,
    flexDirection: 'column',
  },
  titleStyle: {
    fontSize: 10,
    color: '#C0D6C8'
  }
});
