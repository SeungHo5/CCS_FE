import React from 'react';
import { StyleSheet } from 'react-native';
import Icon from '@atoms/image/Icon';
import Button from '@atoms/button/Button';
import BackgroundLayout from '@atoms/image/BackgroundLayout';
import FloatingIcon from '@atoms/image/FloatingIcon';

const Index = ({ navigation }) => {
  // TODO: 디바이스에 저장된 로그인 정보 가져오기
  const loginUser = {name: 'ssafy'};
  // const loginUser = null;

  const handleNavigation = () => {
    console.log('🔄 네비게이션 버튼 클릭!');
    console.log('👤 loginUser:', loginUser);
    
    if (loginUser) {
      console.log('✅ Home으로 이동 시도...');
      navigation.navigate('Home');
    } else {
      console.log('❌ SignupMain으로 이동 시도...');
      navigation.navigate('SignupMain');
    }
  }

  return (
    <BackgroundLayout>
      <Icon 
        icon={require('@assets/index_title.png')} 
        size={{width:250,height:150}} 
        style={styles.titleIcon} 
      />
      <FloatingIcon 
        icon={require('@assets/logo.png')} 
        style={styles.logo}
      />
      <Button
        onPress={handleNavigation}
        title='press the start'
        style={[StyleSheet.absoluteFillObject, styles.textButton]}
        type='title'
        transparent
        textStyle={styles.text}
      />
    </BackgroundLayout>
  );
};

export default Index;

const styles = StyleSheet.create({
  titleIcon: {
    marginTop: 130
  },
  textButton: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 100
  },
  text: {
    color: '#DAFD95',
  }
});
