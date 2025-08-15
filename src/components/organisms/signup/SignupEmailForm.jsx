import { StyleSheet, View } from 'react-native';
import Form from '@organisms/common/Form';
import InputWithCheck from '@molecules/common/InputWithCheck';
import Text from '@atoms/text/Text';
import Loading from '@organisms/common/Loading';
import { getLoadingState } from '@services/userAPI';
import { VStack } from '@ui/Stack'; // ✅ gap 대체

const SignupEmailForm = ({ emailCheck, checkedEmail, codeCheck, codeTime }) => {
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
      <Form style={styles.containerNoGap} defaultValues={{ email: '', AuthenticationNumber: '' }}>
        {/* ✅ 세로 간격 10 → VStack */}
        <VStack gap={10}>
          <InputWithCheck
              name="email"
              keyboardType="email-address"
              label="이메일"
              placeholder="이메일을 입력해주세요."
              required="이메일은 필수입니다"
              title="인증 코드 발송"
              autoFocus
              onPress={emailCheck}
          />

          {checkedEmail && (
              <View>
                {getLoadingState('emailCheck') ? (
                    <Loading
                        style={{ marginTop: 10, backgroundColor: 'transparent', height: 80 }}
                        iconStyle={{ height: '100%', flexDirection: 'row' }}
                        textType="caption"
                    />
                ) : (
                    <>
                      <InputWithCheck
                          name="AuthenticationNumber"
                          keyboardType="email-address"
                          placeholder="인증 번호"
                          required="인증을 완료해주세요."
                          title="완료"
                          onPress={codeCheck}
                          buttonStyle={{ flex: 0.5 }}
                      />
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text type="caption" style={{ color: '#888' }}>
                          인증번호는 10분간 유효합니다.
                        </Text>
                        <Text type="caption" style={{ color: '#888' }}>
                          {codeTime > 0 ? formatTime(codeTime) : codeTime}
                        </Text>
                      </View>
                    </>
                )}
              </View>
          )}
        </VStack>
      </Form>
  );
};

export default SignupEmailForm;

const styles = StyleSheet.create({
  // ❌ gap 제거 (VStack이 처리)
  containerNoGap: {
    flex: 1,
  },
  submit: {
    width: 100,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
  },
});
