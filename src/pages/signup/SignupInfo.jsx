import { StyleSheet } from 'react-native';
import SignupTemplate from '@templates/SignupTemplate';
import SignupInfoForm from '@organisms/signup/SignupInfoForm';
import { signUp } from '@services/userAPI';
import { login } from '@services/userAPI';

const SignupInfo = ({navigation}) => {

  const loginAPICall = async () => {
    const result = await login("yujinjeong053@gmail.com", '0703');
    // const result = await login("sojung017@naver.com", "1234");
    if (result.success) {
      console.log('로그인 알림 메시지 출력하기');
      navigation.navigate('SignupSuccess');
    }
  };

  const handleSubmit = async (data) => {
    const result = await signUp(data.email, data.password, data.nickname);
    if (result.success) {
      await loginAPICall();
    }
  };

  return (
    <SignupTemplate height="75%" title="가입 정보 입력">
      <SignupInfoForm
        onSubmit={handleSubmit}
      />
    </SignupTemplate>
  );
};

export default SignupInfo;

const styles = StyleSheet.create({
});
