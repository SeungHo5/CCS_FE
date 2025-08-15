import { KAKAO_CLIENT_ID, KAKAO_REDIRECT_URI } from '@env';
import { userAPI as api} from '@services/api';

export const getKakaoAuthUrl = () => {
  const baseUrl = 'https://kauth.kakao.com/oauth/authorize';
  const query = `client_id=${KAKAO_CLIENT_ID}&redirect_uri=${encodeURIComponent(
    KAKAO_REDIRECT_URI
  )}&response_type=code&scope=profile_nickname,account_email`;
  return `${baseUrl}?${query}`;
};

import { useTokenStore } from '@stores/tokenStore';
import { useUserStore  } from '@stores/userStore';
export const loginWithKakaoCode = async (code) => {
  try {
    const response = await api.post('/auth/kakao', { code });
    const accessToken = response.headers.authorization;
    const refreshToken = response.headers['refresh-token'];

    console.log('카카오 로그인 API 성공');
    console.log('JWT:', accessToken);
    console.log('Refresh:', refreshToken);

    await useTokenStore.getState().setTokens(accessToken, refreshToken);
    await useUserStore.getState().fetchUser();

    return { success: true, data: response };
  } catch (error) {
    console.log('카카오 로그인 API 호출 실패:', error.response?.data || error);
    return { success: false, error: error.response?.data || error };
  }
};