import { StyleSheet, View } from "react-native";
import Text from '@atoms/text/Text'
import Icon from '@atoms/image/Icon'
import Box from "@atoms/box/Box";
import { getChallengeIconSource } from "@utils/challengeIconRegistry";

const ChallengeBoard = (props) => {
  console.log("🎯 ChallengeBoard props:", props);
  
  const iconSource = getChallengeIconSource(props.category+"Board");
  console.log("📊 ChallengeBoard 아이콘:", {
    category: props.category,
    iconKey: props.category+"Board", 
    iconSource: iconSource
  });

  return (
    <View style={styles.innerView}>
      <Icon style={styles.icon} icon={iconSource}/>
      <Box
        style={styles.innerBox}
        title={props.category}
        titleType="caption"
        titleContainerStyle={{alignItems: 'center', paddingHorizontal: 0}}
        titleHeight={20}
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
  },
  icon: {
    width: '100%',
    flex: 60,
  },
  innerBox:{
    width: '60%',
    height: '30%',
  },
  innerBoxContent:{
    flex: 1,
    backgroundColor: 'white',
    borderColor: '#91B7AB',
    borderWidth: 1,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
});
