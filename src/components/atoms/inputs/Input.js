import { useRef } from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { useFormContext, Controller } from 'react-hook-form';
import Button from '@atoms/button/Button';
import Text from '@atoms/text/Text';

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
      <View style={styles.labelContainer}>
        {label &&
          <Button
            onPress={() => inputRef.current?.focus()}
            title={label}
            transparent
            style={[styles.label, labelStyle]}
          />
        }
        {error && <Text type="caption" style={{ color: 'red', marginTop: 4 }}>{error.message}</Text>}
      </View>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            ref={inputRef}
            style={[styles.input, inputStyle, !editable && { backgroundColor: '#d6d6d6ff', color: '#888' }]}
            value={value}
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
    fontFamily: 'Jua',
  },
  label: {
    paddingHorizontal: 0,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  }
});
