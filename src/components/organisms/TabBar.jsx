import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Text from '@atoms/text/Text';
import Icon from '@atoms/image/Icon';
import { useNavigation, useRoute } from '@react-navigation/native';

const TabBar = () => {
  console.log("📱 TabBar 완성 버전 (모든 아이콘)");
  
  const navigation = useNavigation();
  const route = useRoute();
  
  console.log("현재 페이지:", route.name);

  const handlePress = (screenName) => {
    console.log("🎯 TabBar 클릭:", screenName);
    try {
      navigation.navigate(screenName);
    } catch (error) {
      console.error("네비게이션 에러:", error);
    }
  };

  const isActive = (screenName) => route.name === screenName;

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.btn, isActive('Home') && styles.activeBtn]} 
        onPress={() => handlePress('Home')}
      >
        <Icon 
          icon={isActive('Home') ? require('@assets/homeBtnActive.png') : require('@assets/homeBtn.png')}
          size={20}
          style={styles.icon}
        />
        <Text type="caption" style={[styles.text, isActive('Home') && styles.activeText]}>HOME</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.btn, isActive('CharacterMain') && styles.activeBtn]} 
        onPress={() => handlePress('CharacterMain')}
      >
        <Icon 
          icon={isActive('CharacterMain') ? require('@assets/petBtnActive.png') : require('@assets/petBtn.png')}
          size={20}
          style={styles.icon}
        />
        <Text type="caption" style={[styles.text, isActive('CharacterMain') && styles.activeText]}>PET</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.btn} 
        onPress={() => console.log("STUDY 버튼 클릭 (아직 비활성)")}
      >
        <Icon 
          icon={require('@assets/studyBtn.png')}
          size={20}
          style={styles.icon}
        />
        <Text type="caption" style={styles.text}>STUDY</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.btn} 
        onPress={() => console.log("메뉴 클릭")}
      >
        <Icon 
          icon={require('@assets/menuBtn.png')}
          size={20}
          style={styles.icon}
        />
        <Text type="caption" style={styles.text}>MENU</Text>
      </TouchableOpacity>
    </View>
  );
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
    height: 50,
  },
  btn: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 2,
  },
  activeBtn: {
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  icon: {
    marginBottom: 2,
  },
  text: {
    fontSize: 10,
    color: '#C0D6C8'
  },
  activeText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  }
});
