import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import ButtonIconText from '@atoms/button/ButtonIconText'
import { useNavigation, useRoute } from '@react-navigation/native';


const TabBar = ({ onOpenMenu }) => {
  const route = useRoute();
  const ICONS_ACTIVE = {
    Home: require('@assets/homeBtnActive.png'),
    CharacterMain: require('@assets/petBtnActive.png'),
    StudyListPage: require('@assets/studyBtnActive.png'),
    Menu: require('@assets/menuBtnActive.png'),
  };

  const ICONS_INACTIVE = {
    Home: require('@assets/homeBtn.png'),
    CharacterMain: require('@assets/petBtn.png'),
    StudyListPage: require('@assets/studyBtn.png'),
    Menu: require('@assets/menuBtn.png'),
  };

  const [currentIcons, setCurrentIcons] = useState(ICONS_INACTIVE);

  useEffect(() => {
    const newIcons = {};
    Object.keys(ICONS_INACTIVE).forEach(key => {
      newIcons[key] = key === route.name ? ICONS_ACTIVE[key] : ICONS_INACTIVE[key];
    });
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
      <ButtonIconText onPress={() => navigateTo('StudyListPage')} icon={currentIcons.StudyListPage} text="STUDY" type="caption" style={styles.btn} iconStyle={{flex:2, margin: 5}} textStyle={styles.titleStyle}/>
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
