import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import ButtonIconText from '@atoms/button/ButtonIconText'
import { useNavigation, useRoute } from '@react-navigation/native';


const TabBar = ({ onOpenMenu }) => {
  const route = useRoute();
  const ICONS_ACTIVE = {
    Home: require('@assets/homeBtnActive.png'),
    CharacterMain: require('@assets/petBtnActive.png'),
    StudyList: require('@assets/studyBtnActive.png'),
    Menu: require('@assets/menuBtnActive.png'),
  };

  const ICONS_INACTIVE = {
    Home: require('@assets/homeBtn.png'),
    CharacterMain: require('@assets/petBtn.png'),
    StudyList: require('@assets/studyBtn.png'),
    Menu: require('@assets/menuBtn.png'),
  };

  const [currentIcons, setCurrentIcons] = useState(ICONS_INACTIVE);

  useEffect(() => {
    const newIcons = {...ICONS_INACTIVE};
    switch (route.name) {
      case 'Home':
      case 'Challenge':
      case 'Friends':
        newIcons.Home = ICONS_ACTIVE.Home;
        break;
      case 'CharacterMain':
      case 'CharacterDraw':
      case 'CharacterAuction':
        newIcons.CharacterMain = ICONS_ACTIVE.CharacterMain;
        break;
      case 'StudyList':
      case 'GroupList':
        newIcons.StudyList = ICONS_ACTIVE.StudyList;
        break;
    }
    setCurrentIcons(newIcons);
  }, [route.name]);

  const navigation = useNavigation();

  const navigateTo = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
      <ButtonIconText onPress={() => navigateTo('Home')} icon={currentIcons.Home} text="HOME" type="caption" style={styles.btn} iconStyle={{flex:2, margin: 5}} textStyle={styles.titleStyle}/>
      <ButtonIconText onPress={() => navigateTo('CharacterMain')} icon={currentIcons.CharacterMain} text="PET" type="caption" style={styles.btn} iconStyle={{flex:2, margin: 5}} textStyle={styles.titleStyle}/>
      <ButtonIconText onPress={() => navigateTo('StudyList')} icon={currentIcons.StudyList} text="STUDY" type="caption" style={styles.btn} iconStyle={{flex:2, margin: 5}} textStyle={styles.titleStyle}/>
      <ButtonIconText onPress={onOpenMenu} icon={currentIcons.Menu} text="MENU" type="caption" style={styles.btn} iconStyle={{flex:2, margin: 5}} textStyle={styles.titleStyle}/>
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  container:{
    backgroundColor: '#91B7AB',
    flexDirection: 'row',
    width: '100%',
    height: 50,
    top: 'none',
    bottom: 0
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
