import { StyleSheet, View } from 'react-native';
import Modal from '@templates/Modal';
import Text from '@atoms/text/Text';
import Button from '@atoms/button/Button';
import { useNavigation } from '@react-navigation/native';
import Loading from '@organisms/common/Loading';
import { getLoadingState } from '@services/studyAPI';
import useModalStore from '@stores/modalStore';
import { VStack } from '@ui/Stack'; // ✅ gap 대체 (대문자 S)

const StudyInfo = (props) => {
  const showConfirm = useModalStore((state) => state.showConfirm);
  const navigation = useNavigation();

  const enterRoom = () => {
    showConfirm('ㄹㅇ?', true, () => console.log('스터디 방 입장: ', props.study.roomId));
    // navigation.navigate("", {roomId: studyInfo.roomId})
  };

  return (
      <Modal {...props} title="Room Info" overlayStyle={{ paddingVertical: 130 }}>
        {getLoadingState('getStudyRoomMembers') ? (
            <Loading style={{ height: '80%', marginTop: 20 }} />
        ) : (
            <>
              <View style={styles.container}>
                {/* ✅ gap:10 → VStack */}
                <VStack gap={10} style={styles.basicInfoContainerNoGap}>
                  {/* ✅ gap:5 → VStack */}
                  <VStack gap={5} style={styles.nameContainerNoGap}>
                    <Text type="subtitle" style={styles.infoTitle}>Name</Text>
                    <View style={styles.nameTextContainer}>
                      <Text>{props.study.name}</Text>
                    </View>
                  </VStack>

                  {/* ✅ gap:5 → VStack */}
                  <VStack gap={5} style={styles.membersContainerNoGap}>
                    <Text type="subtitle" style={styles.infoTitle}>Members</Text>
                    <View style={styles.membersTextContainer}>
                      <Text>{props.members.join(', ')}</Text>
                    </View>
                  </VStack>
                </VStack>

                <View style={styles.lineContainer}>
                  <View style={styles.line} />
                </View>

                <View style={styles.detailInfoContainer} />

                <View style={styles.bottomContainer}>
                  <Button
                      title="입장하기"
                      style={styles.bottomBtn}
                      onPress={enterRoom}
                  />
                </View>
              </View>
            </>
        )}
      </Modal>
  );
};
export default StudyInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 0,
  },
  // ❌ gap 제거 (VStack이 처리)
  basicInfoContainerNoGap: {
    flex: 45,
    justifyContent: 'flex-end',
  },
  infoTitle: {
    color: '#91B7AB',
  },
  // ❌ gap 제거 (VStack이 처리)
  nameContainerNoGap: {
    height: '30%',
  },
  nameTextContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#C0D6C8',
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  // ❌ gap 제거 (VStack이 처리)
  membersContainerNoGap: {
    height: '50%',
  },
  membersTextContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#C0D6C8',
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  detailInfoContainer: {
    flex: 50,
  },
  bottomContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomBtn: {
    borderRadius: 50,
    paddingVertical: 8,
  },
  lineContainer: {
    flex: 5,
    justifyContent: 'center',
  },
  line: {
    width: '100%',
    borderColor: '#91B7AB',
    borderBottomWidth: 1,
  },
});
