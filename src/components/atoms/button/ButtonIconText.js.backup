import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from '@atoms/image/Icon';
import Text from '@atoms/text/Text.jsx';

const ButtonIconText = (props) => {
  const title = props.title || '';
  const titleStyle = props.titleStyle || {};
  const iconStyle = props.iconStyle || {};

  return (
    <TouchableOpacity onPress={props.onPress} style={[styles.button, props.style]} disabled={props.disabled} activeOpacity={props.activeOpacity || 0.5}>
      <Icon icon={props.icon} size={props.iconSize} style={[styles.icon, props.iconStyle]}/>
      <Text type={props.type} style={[styles.text, props.textStyle]}>{props.text}</Text>
    </TouchableOpacity>
  );
};

export default ButtonIconText;

const styles = StyleSheet.create({
  button:{
    flex: 1,
    flexDirection: 'column', // 세로 배치로 변경 (TabBar용)
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon:{
    marginBottom: 4, // 아이콘과 텍스트 사이 간격
  },
  text: {
    fontWeight: '500',
    textAlign: 'center'
  },
});
