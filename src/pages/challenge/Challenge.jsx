import LayoutWidthStatus from '@templates/LayoutWidthStatus';
import { useNavigation } from '@react-navigation/native';
import ChallengeList from '@organisms/challenge/ChallengeList'
import ChallengeDetail from '@organisms/challenge/ChallengeDetail';
import { useEffect, useState } from 'react';
import { getAllChallenges, claimChallengeReward, getLoadingState } from '@services/characterAPI';
import useModalStore from '@stores/modalStore';
import Loading from '@organisms/common/Loading';
import usePlayerStore from '@stores/playerStore';

const Challenge = () => {
	const showConfirm = useModalStore((state) => state.showConfirm);
  const navigation = useNavigation();

  const [challenge, setChallenge] = useState();
  const [challengeList, setChallengeList] = useState();
  const [detailOpen, setDetailOpen] = useState(false);
  const [currentIdx, setCurrentIdx] = useState();
  const { refreshPlayerData } = usePlayerStore();

  const getAllChallengesAPICall = async() => {
    setDetailOpen(false);
    const res = await getAllChallenges();
    if(res.success) setChallengeList(res.data);
  };

  const claimChallengeRewardAPICall = async(challengeId) => {
    const res = await claimChallengeReward(challengeId);
    if(res.success) showConfirm('보상을 수령하였습니다!', false, () => {
        getAllChallengesAPICall()
        refreshPlayerData();
      }, () => {
        getAllChallengesAPICall()
        refreshPlayerData();
      }
    );
  };

  useEffect(()=>{
    getAllChallengesAPICall();
  },[]);

  const open = (index) => {
    console.log("open: ",index)
    setCurrentIdx(index);
    setChallenge(challengeList[index]);
    setDetailOpen(true);
  }
  const close = () => {
    setDetailOpen(false);
  }
  const complate = (index) => {
    console.log("complate: ",index)
  }
  
  return (
    <>
      <LayoutWidthStatus
        title="Challenge"
        titleBtnIcon={require('@assets/close.png')}
        titleBtnOnPress={() => navigation.goBack()}
        titleBtnStyle={{height: '50%'}}
      >
        {challengeList && !getLoadingState('getAllChallenges')
          ? <ChallengeList challenges={challengeList} onPress={(index) => open(index)} onPressComplate={(challengeId) => claimChallengeRewardAPICall(challengeId)}/>
          : <Loading />
        }
      </LayoutWidthStatus>
      {detailOpen && <ChallengeDetail onPress={close}  onPressComplate={(challengeId) => claimChallengeRewardAPICall(challengeId)} item={challenge}/>}
    </>
  );
};
export default Challenge;