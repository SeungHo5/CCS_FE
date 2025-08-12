import { TouchableOpacity, StyleSheet } from 'react-native';
import Box from '@atoms/box/Box.jsx'

const ButtonBox = ({children, style, contentStyle, onPress, disabled = false}) => {
  return (
    <TouchableOpacity onPress={onPress ? onPress : (e) => e.stopPropagation()} disabled={disabled}>
      <Box style={style} contentStyle={contentStyle}>
        {children}
      </Box>
    </TouchableOpacity>
  );
};
export default ButtonBox;

const styles = StyleSheet.create({
  
});
