import { StyleSheet, View } from 'react-native';
import Modal from '@templates/Modal';
import UserBasicInfo from '@organisms/user/UserBasicInfo';
import UserAnalyzeInfo from '@organisms/user/UserAnalyzeInfo';
import { useEffect, useState } from 'react';
import Loading from '@organisms/common/Loading';
import { getLoadingState, getUserDetail, requestFriend, blockUser } from '@services/userAPI';
import { useUserStore } from '@stores/userStore';
import Button from '@atoms/button/Button';
import useModalStore from '@stores/modalStore';

const UserInfo = (props) => {
  const { user } = useUserStore();

  const [userBasicInfo, setUserBasicInfo] = useState();
  
  // 기본 정보 API
  const userBasicAPICall = async () => {
    const result = await getUserDetail(props.userId);
    if (result.success) return result.data.data;
  };

  const [myInfo, setMyInfo] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      // 모든 API를 병렬로 호출
      const basicInfo = await userBasicAPICall();

      setUserBasicInfo(basicInfo);
      setMyInfo(user.id === basicInfo.id);
    };

    fetchData();
  }, []);
  
  const showConfirm = useModalStore((state) => state.showConfirm);

  const requestFriendAPICall = async() => {
    const result = await requestFriend(userBasicInfo.id);
    if (result.success) showConfirm('친구 요청을 성공하였습니다!');
  }

  const blockUserAPICall = async() => {
    const result = await blockUser(userBasicInfo.id);
    if (result.success) showConfirm(`${userBasicInfo.nickname}님을 차단했습니다.`);
  }

  return (
    <Modal {...props} title="Info" overlayStyle={{paddingVertical: 130}}>
    {getLoadingState('getUserDetail') || getLoadingState()
      ? <Loading />
      : <>
          <UserBasicInfo user={userBasicInfo} me={myInfo}/>
          <View style={styles.line}/>
          <UserAnalyzeInfo user={userBasicInfo}/>
          {!myInfo &&
            <View style={styles.btnContainer}>
              <Button title="친구요청" type="midium" style={styles.btn} onPress={()=>requestFriendAPICall()}/>
              <Button title="차단하기" type="midium" style={styles.btn} onPress={()=>blockUserAPICall()}/>
            </View>
          }
        </>
    }
    </Modal>
  );
};
export default UserInfo;

const styles = StyleSheet.create({
  lineContainer:{
    justifyContent: 'center',
  },
  line:{
    width: '85%',
    alignSelf: 'center',
    borderColor: '#91B7AB',
    borderBottomWidth: 1
  },
  btnContainer:{
    flex:10, flexDirection: 'row', padding: 10, gap:10, justifyContent: 'center'
  },
  btn:{
    paddingVertical:0, paddingHorizontal: 15
  },
});