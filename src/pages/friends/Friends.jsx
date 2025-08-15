import LayoutWidthStatus from '@templates/LayoutWidthStatus';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import FriendsList from '@organisms/friends/FriendsList';
import { StyleSheet } from 'react-native';
import FriendsFilterSection from '@organisms/friends/FriendsFilterSection';
import SearchFriendSection from '@organisms/friends/SearchFriendSection';
import UserInfo from '@organisms/user/UserInfo';
import {
  getReceivedFriendRequests,
  getFriends,
  rejectFriendRequest,
  requestFriend,
  cancelFriendRequest,
  unblockUser,
  acceptFriendRequest,
  searchUsers,
  getLoadingState,
  getBlockedUsers,
  getSentFriendRequests
} from '@services/userAPI';
import Loading from '../../components/organisms/common/Loading';
import useModalStore from '@stores/modalStore';

const Friends = () => {
  const showConfirm = useModalStore((state) => state.showConfirm);
  const navigation = useNavigation();

  const [friend, setFriend] = useState();
  const [friendsList, setFriendsList] = useState([]);
  const [detailOpen, setDetailOpen] = useState(false);
  const [currentId, setCurrentId] = useState();

  // 친구 목록 가져오기
  const getFriendsAPICall = async () => {
    const result = await getFriends();
    if (result.success) setFriendsList(result.data);
    console.log(result.data);
  }

  const route = useRoute();
  const { initialTab } = route.params || {};
  useEffect(()=>{
    getFriendsAPICall();
    if (initialTab) {
      setFilterType(initialTab);
    }
  },[]);

  // 친구 상세보기 open
  const open = (id) => {
    setCurrentId(id);
    setDetailOpen(true);
  }
  // 친구 상세보기 close
  const close = () => {
    setDetailOpen(false);
  }
  
  // 친구 요청
  const requestFriendAPICall = async (id) => {
    const result = await requestFriend(id);
    if (result.success) showConfirm('친구 요청 성공', false, ()=>friendsReset(), ()=>friendsReset());
  }

  // 친구 요청 해제
  const requestCancle = async (id) => {
    const result = await cancelFriendRequest(id);
    if (result.success) showConfirm('친구 요청 취소', false, ()=>friendsReset(), ()=>friendsReset());
  }

  // 친구 요청 수락
  const acceptFriendRequestAPICall = async (id) => {
    const result = await acceptFriendRequest(id);
    if (result.success) showConfirm('요청 수락', false, ()=>friendsReset(), ()=>friendsReset());
  }

  // 친구 요청 거절
  const rejectFriendRequestAPICall = async (id) => {
    const result = await rejectFriendRequest(id);
    if (result.success) showConfirm('거절 성공', false, ()=>friendsReset(), ()=>friendsReset());
  }

  // 친구 차단 해제
  const blockCancle = async (id) => {
    const result = await unblockUser(id);
    if (result.success) showConfirm('차단 해제 성공', false, ()=>friendsReset(), ()=>friendsReset());
  }
  
  // 친구 검색
  const searchFriend = async (query) => {
    console.log(query);
    const result = await searchUsers(query);
    if (result.success) setFriendsList(result.data);
  }
  // 보낸 친구 요청 목록 조회
  const getSentFriendRequestsAPICall = async () => {
    const result = await getSentFriendRequests();
    if (result.success) setFriendsList(result.data.data);
  }
  // 받은 친구 요청 목록 조회
  const getReceivedFriendRequestsAPICall = async () => {
    const result = await getReceivedFriendRequests();
    if (result.success) setFriendsList(result.data);
  }
  // 차단 친구 목록 조회
  const getBlockedUsersAPICall = async () => {
    const result = await getBlockedUsers();
    if (result.success) setFriendsList(result.data.data);
  }

  // typeId:    0=친구목록 | 1=추천친구 | 2=친구검색 | 3=친구요청 | 4=차단친구
  const [filterType, setFilterType] = useState(0);
  const filtered = (typeId) => {
    console.log("filtered: ", typeId)
    setFilterType(typeId);
  }

  // filterType에 따라 FrinedsListBox의 두번째 버튼에 함수 할당 + 목록 변경
  const friendsReset = useCallback(() => {
    switch (filterType) {
      case 0:
        return getFriendsAPICall();
      case 1:
      case 2:
        return setFriendsList([]);
      case 3:
        return getSentFriendRequestsAPICall();
      case 4:
        return getReceivedFriendRequestsAPICall();
      case 5:
        return getBlockedUsersAPICall();
    }
  }, [filterType]);
  const [btn1Function, setBtn1Function] = useState('');
  const [btn2Function, setBtn2Function] = useState('');
  const [btnTitle1, setBtnTitle1] = useState('');
  const [btnTitle2, setBtnTitle2] = useState('');
  useEffect(()=>{
    switch (filterType) {
      case 0:
        getFriendsAPICall();
        setBtnTitle1('Info');
        setBtnTitle2('');
        setBtn1Function(() => open);
        break;
      case 1:
        setFriendsList([]);
        setBtnTitle1('Info');
        setBtnTitle2('Send');
        setBtn1Function(() => open);
        setBtn2Function(() => requestFriendAPICall);
        break;
      case 2:
        setFriendsList([]);
        setBtnTitle1('Info');
        setBtnTitle2('Send');
        setBtn1Function(() => open);
        setBtn2Function(() => requestFriendAPICall);
        break;
      case 3:
        getSentFriendRequestsAPICall();
        setBtnTitle1('Info');
        setBtnTitle2('Cancle');
        setBtn1Function(() => open);
        setBtn2Function(() => requestCancle);
        break;
      case 4:
        getReceivedFriendRequestsAPICall();
        setBtnTitle1('Accept');
        setBtnTitle2('Reject');
        setBtn1Function(() => acceptFriendRequestAPICall);
        setBtn2Function(() => rejectFriendRequestAPICall);
        break;
      case 5:
        getBlockedUsersAPICall();
        setBtnTitle1('Info');
        setBtnTitle2('Cancle');
        setBtn1Function(() => open);
        setBtn2Function(() => blockCancle);
      break;
    }
  },[filterType]);
  
  return (
    <>
      <LayoutWidthStatus
        title="Friends"
        titleBtnIcon={require('@assets/close.png')}
        titleBtnOnPress={() => navigation.goBack()}
        titleBtnStyle={{height: '30%'}}
      >
        <FriendsFilterSection onPress={(type) => filtered(type)} filterType={filterType}/>
        { filterType == 1 &&
          <SearchFriendSection onSearch={(data) => searchFriend(data)}/>
        }
        { getLoadingState('getFriends') || getLoadingState('getReceivedFriendRequests') 
        || getLoadingState('searchUsers') || getLoadingState('getBlockedUsers')
        || getLoadingState('getSentFriendRequests')
        ? <Loading />
        : <FriendsList
            friends={friendsList}
            btnTitle={btnTitle1}
            btnTitle2={btnTitle2}
            onPress={(id) => btn1Function(id)}
            onPress2={(id) => btn2Function(id)}
          />
        }
      </LayoutWidthStatus>
      {detailOpen && <UserInfo onPress={close} userId={currentId}/>}
    </>
  );
};
export default Friends;

const styles = StyleSheet.create({
});