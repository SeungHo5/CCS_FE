import { StyleSheet, View } from "react-native";
import Text from '@atoms/text/Text'
import Icon from '@atoms/image/Icon'
import Box from "@atoms/box/Box";
import { getChallengeIconSource } from "@utils/challengeIconRegistry";

const ChallengeBoard = (props) => {
  return (
    <View style={styles.innerView}>
      <Icon style={styles.icon} icon={getChallengeIconSource(props.category+"Board")}/>
      <Box
        style={styles.innerBox}
        title={props.category}
        titleType="caption"
        titleContainerStyle={{alignItems: 'center', paddingHorizontal: 0}}
        titleStyle={styles.titleText}
        titleHeight={30}
        contentStyle={styles.innerBoxContent}
      >
        <Text style={{color:'#91B7AB'}}>{props.completedCount} / {props.totalCount}</Text>
      </Box>
    </View>
  );
};
export default ChallengeBoard;

const styles = StyleSheet.create({
  innerView:{
    flex: 1,
    alignItems: 'center',
    paddingBottom: 10,
    marginTop: 5,
  },
  icon: {
    width: '100%',
    flex: 55, // 아이콘 영역 약간 줄임
  },
  innerBox:{
    width: '60%',
    height: '35%', // 박스 전체 높이 키움
  },
  innerBoxContent:{
    flex: 1,
    backgroundColor: 'white',
    borderColor: '#91B7AB',
    borderWidth: 1,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  titleText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 11,
  }
});
