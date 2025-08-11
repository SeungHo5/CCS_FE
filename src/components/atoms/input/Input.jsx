import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import Text from '@atoms/text/Text.jsx';

const Input = ({ 
  label, 
  placeholder, 
  value, 
  onChangeText, 
  style, 
  inputStyle,
  error,
  ...props 
}) => {
  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text type="medium" style={styles.label}>
          {label}
        </Text>
      )}
      <TextInput
        style={[
          styles.input, 
          error && styles.inputError,
          inputStyle
        ]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#999"
        {...props}
      />
      {error && (
        <Text type="caption" style={styles.errorText}>
          {error}
        </Text>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: 'Jua-Regular',
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: '#ff6b6b',
  },
  errorText: {
    color: '#ff6b6b',
    marginTop: 4,
  },
});
