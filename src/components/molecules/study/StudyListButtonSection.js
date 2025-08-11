import { StyleSheet, View } from 'react-native';
import SimpleButtonIconText from '@atoms/button/SimpleButtonIconText';
import SimpleButton from '@atoms/button/SimpleButton';

const StudyListButtonSection = (props) => {
  return (
    <View style={styles.container}>
      <SimpleButtonIconText
        style={styles.btn}
        textStyle={styles.filterBtnText}
        icon={props.filter ? require('@assets/checkBox_on.png') : require('@assets/checkBox_off.png')}
        iconSize={{width:12, height:12}}
        text="대기 방 보기"
        onPress={props.onFiltering}
        activeOpacity={0.7}
      />
      <SimpleButton
        style={styles.makeBtn}
        textStyle={styles.makeBtnText}
        title="방 만들기"
        onPress={props.onMakeRoom}
      />
    </View>
  );
};
export default StudyListButtonSection;

const styles = StyleSheet.create({
  container:{
    width: '100%',
    height: 48,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  btn: {
    flex: 'none',
    width: 100,
    height: 25,
    backgroundColor: '#C5C5C5',
    borderRadius: 10,
    paddingHorizontal: 3
  },
  filterBtnText: {
    color: 'white',
    marginLeft: 0,
    flex: 2.5
  },
  makeBtn: {
    flex: 'none',
    width: 80,
    height: 25,
    backgroundColor: '#91B7AB',
    paddingVertical: 0,
    paddingHorizontal: 0,
    borderRadius: 10,
    alignItems: 'center'
  },
  makeBtnText: {
    color: '#E4CC71',
  }
});
