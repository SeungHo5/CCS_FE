import { WebView } from 'react-native-webview';
import { KAKAO_REDIRECT_URI } from '@env';
import { getKakaoAuthUrl, loginWithKakaoCode } from '@services/oAuth';
import { useRef } from 'react';

const KakaoLogin = ({ navigation }) => {
  const isProcessing = useRef(false);

  const handleWebViewNavigationStateChange = async (navState) => {
    const { url } = navState;

    if (url.startsWith(KAKAO_REDIRECT_URI) && !isProcessing.current) {
      const codeMatch = url.match(/[?&]code=([^&]+)/);
      if (codeMatch) {
        isProcessing.current = true; // 처리 중으로 설정

        const authCode = codeMatch[1];
        console.log('카카오 auth code:', authCode);
        
        await loginWithKakaoCode(authCode);
        navigation.navigate('SignupSuccess'); // 로그인 성공 시 처리
      }
    }
  };

  return (
    <WebView
      source={{ uri: getKakaoAuthUrl() }}
      onNavigationStateChange={handleWebViewNavigationStateChange}
      startInLoadingState={true}
    />
  );
};
export default KakaoLogin;
