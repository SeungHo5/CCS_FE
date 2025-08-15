import { useRef } from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { useFormContext, Controller } from 'react-hook-form';
import Button from '@atoms/button/Button';
import Text from '@atoms/text/Text';
import { HStack } from '@ui/Stack'; // ✅ 추가: gap 대체용

const Input = ({
                 name,
                 rules,
                 autoFocus,
                 placeholder,
                 secureTextEntry = false,
                 keyboardType = 'default',
                 autoCapitalize = 'none',
                 style,
                 inputStyle,
                 labelStyle,
                 label = null,
                 isRow = false,
                 editable = true,
               }) => {
  const { control } = useFormContext();
  const inputRef = useRef(null);

  const { formState: { errors } } = useFormContext();
  const error = errors[name];

  return (
      <View style={[styles.container, isRow && { flexDirection: 'row' }, style]}>
        {/* ✅ gap: 10 → HStack gap={10}, row/align 처리도 이쪽에서 */}
        <HStack gap={10} align="center" style={styles.labelContainerNoGap}>
          {label && (
              <Button
                  onPress={() => inputRef.current?.focus()}
                  title={label}
                  transparent
                  style={[styles.label, labelStyle]}
              />
          )}
          {/* ⚠️ TextInput은 value가 undefined면 경고가 날 수 있음 → 문자열 보장 */}
          {error && <Text type="caption" style={{ color: 'red', marginTop: 4 }}>{error.message}</Text>}
        </HStack>

        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                    ref={inputRef}
                    style={[
                      styles.input,
                      inputStyle,
                      !editable && { backgroundColor: '#d6d6d6', color: '#888' } // ✅ #d6d6d6ff → 일반 6자리로 정리
                    ]}
                    value={value != null ? String(value) : ''}  // ✅ 문자열 보장 (undefined/null 안전)
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    autoCapitalize={autoCapitalize}
                    autoFocus={autoFocus}
                    placeholderTextColor="#999"
                    editable={editable}
                />
            )}
        />
      </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    width: '100%',
    height: 48,
    borderColor: 'transparent',
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: '#EFEFEF',
    fontFamily: 'Jua', // ⚠️ 커스텀 폰트면 RN-CLI에서 링크/설치 필요 (없으면 시스템 폰트로 바꿔야 함)
  },
  label: {
    paddingHorizontal: 0,
  },
  // ❌ 기존 gap/row 제거 → HStack이 처리
  labelContainerNoGap: {
    // flexDirection: 'row',
    // alignItems: 'center',
    // gap: 10,
  },
});
