import { StyleSheet } from "react-native";
import ButtonBox from "@atoms/box/ButtonBox";
import Text from '@atoms/text/Text';
import Icon from '@atoms/image/Icon';
import IconText from "@molecules/IconText";
import { HStack, VStack } from '@ui/Stack'; // ✅ 대문자 S

const GroupListButton = (props) => {
  return (
      <ButtonBox
          disabled={props.disabled}
          style={styles.box}
          contentStyle={styles.contentNoGap} 
          onPress={props.onPress}
      >
       
        <HStack gap="5%" align="center" style={{ width: '100%' }}>
          <Icon style={styles.roomIcon} icon={props.icon} />

          
          <VStack gap={5} style={styles.roomInfoContainer}>
            <Text type="subtitle" style={{ fontSize: 18 }}>{props.name}</Text>
            <Text type="caption" style={{ color: 'white' }}>{props.description}</Text>
          </VStack>

          
          <View style={styles.personnelContainer}>
            <IconText
                width={'90%'}
                height={20}
                iconSize={{ width:'20%', height:'70%' }}
                icon={require('@assets/people.png')}
                resizeMode="stretch"
                text={`${props.currentMembers} / ${props.maxMembers}`}
                type="caption"
                textStyle={{ color:'#E4CC71' }}
                boxStyle={styles.personnelBox}
            />
          </View>
        </HStack>
      </ButtonBox>
  );
};
export default GroupListButton;

const styles = StyleSheet.create({
  box:{
    width: '100%',
    height: 80,
    backgroundColor: '#C0D6C8',
    borderColor: '#ADC1B4',
    borderWidth: 1,
  },
  // ❌ flexDirection/gap 제거 (HStack이 담당)
  contentNoGap:{},
  roomIcon:{
    height: '100%',
    aspectRatio: 1,
    borderRadius: 100,
  },
  roomInfoContainer:{
    width: '70%',
    justifyContent: 'center',
    // gap: 5  // ← VStack이 처리
  },
  personnelContainer:{
    position: 'absolute',
    width:'26%',
    justifyContent:'flex-end',
    alignItems:'center',
    paddingVertical: 10,
    paddingRight: 5,
    bottom: 0,
    right: 0
  },
  personnelBox:{
    backgroundColor: '#91B7AB',
    borderColor: '#83A59A',
    paddingHorizontal: 5
  }
});
