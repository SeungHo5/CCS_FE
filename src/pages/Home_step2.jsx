import { StyleSheet, View } from 'react-native';
import MainLayout from '../components/templates/MainLayout';
import Text from '@atoms/text/Text';
import FloatingIcon from '@atoms/image/FloatingIcon';

const Home = () => {
  console.log("🏠 Home - FloatingIcon 추가 테스트");

  return (
    <MainLayout style={styles.container}>
      <View style={styles.logo}>
        <FloatingIcon icon={require('@assets/logo.png')} />
      </View>
      <View style={styles.spacer} />
      <Text type="title">FloatingIcon 테스트</Text>
    </MainLayout>
  );
};
export default Home;

const styles = StyleSheet.create({
  container:{
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  logo:{
    height: 300,
    justifyContent: 'center',
  },
  spacer: {
    height: 20,
  },
});
