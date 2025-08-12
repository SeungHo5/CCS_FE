import { StyleSheet } from 'react-native';
import Icon from '@atoms/image/Icon'
import Button from '@atoms/button/Button'
import BackgroundLayout from '@atoms/image/BackgroundLayout';
import FloatingIcon from '@atoms/image/FloatingIcon';
import { useEffect } from 'react';
// import { login } from '@services/user/userAPI'; // 임시 주석 처리

const Index = ({ navigation }) => {
  console.log('📱 Index 페이지 (FloatingIcon 안전 버전 복구)');
  
  // TODO: 디바이스에 저장된 로그인 정보 가져오기
  useEffect(()=>{
    const fetchData = async () => {
      console.log("로그인 호출 (API 비활성화)");
      
      // try {
      //   const res = await login("sojung017@gmail.com", "1234");
      //   console.log('JWT:', res.headers.authorization);
      //   console.log('Refresh:', res.headers['refresh-token']);
      // } catch (error) {
      //   console.log('로그인 API 호출 실패');
      //   console.error('에러 상세:', error.response?.data || error);
      // }
    };
    // fetchData();
  },[]);
  
  const loginUser = {name: 'ssafy'};
  // const loginUser = null;

  const handleNavigation = () => {
    console.log('🚀 Index 네비게이션 클릭');
    if (loginUser) {
      navigation.navigate('Home')
    } else {
      navigation.navigate('SignupMain')
    }
  }

  return (
    <BackgroundLayout>
      <Icon icon={require('@assets/index_title.png')} size={{width:250,height:150}} style={styles.titleIcon} />
      <FloatingIcon icon={require('@assets/logo.png')} style={styles.logo}/>
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