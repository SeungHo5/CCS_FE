import { StyleSheet, View } from 'react-native';
import Text from '@atoms/text/Text';
import Input from '@atoms/inputs/Input';
import { HStack, VStack} from '@ui/Stack';

const GroupCreateModalTitle = (props) => {
  return (
    <VStack gap={10} style={styles.titleContainer}>
      <HStack gap={15} style={[styles.innerContainer, styles.name]}>
        <Text type="body" style={styles.title}>그룹 이름</Text>
        <View style={styles.inputContainer}>
          <Input name="name" inputStyle={[styles.input,{height: '100%'}]}></Input>
        </View>
      </HStack>
      <HStack gap={15} style={[styles.innerContainer, styles.description]}>
        <Text type="body" style={styles.title}>그룹 설명</Text>
        <View style={styles.inputContainer}>
          <Input name="description" inputStyle={styles.input}></Input>
        </View>
      </HStack>
    </VStack>
  );
};
export default GroupCreateModalTitle;

const styles = StyleSheet.create({
  titleContainer:{
    width: '100%',
    flex:25,
    
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    borderRadius: 8,
    justifyContent: 'center',
    
  },
  title:{
    color: 'white',
    backgroundColor: '#91B7AB',
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 15,
    alignSelf: 'flex-start'
  },
  inputContainer:{
    backgroundColor: '#C0D6C8',
    borderRadius: 8,
    flex: 1,
  },
  input:{
    backgroundColor: 'transparent',
    paddingVertical: 0,
  },
  name:{
    flex: 1,
  },
  description:{
    flex: 2,
  }
});