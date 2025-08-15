import { ScrollView, StyleSheet, View } from "react-native";
import ChallengeListButton from "@molecules/challenge/ChallengeListButton";

const ChallengeList = (props) => {
  const getIconSource = (name) => {
    switch (name) {
      case 2:
        return require('@assets/pencil.png');
      case 3:
        return require('@assets/logo.png');
      case 4:
        return require('@assets/coin.png');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} scrollEnabled={props.scrollEnabled}>
      {props.challenges.map((item, index) => (
        item.categoryId !== 1 &&
        <ChallengeListButton
          onPressComplate={() => props.onPressComplate(item.userChallengeProgressId)}
          key={index}
          icon={getIconSource(item.categoryId)}
          title={item.title}
          caption={item.caption}
          coin={item.amount}
          complete={item.isRewarded}
          onPress={() => props.onPress(index)}
        />
      ))}
    </ScrollView>
  );
};
export default ChallengeList;

const styles = StyleSheet.create({
  container:{
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 20,
  }
});