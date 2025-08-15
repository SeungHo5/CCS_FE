import LayoutWidthStatus from '@templates/LayoutWidthStatus';
import { useNavigation } from '@react-navigation/native';
import StudyList from '@organisms/study/StudyList';
import SearchBarSection from '@organisms/study/SearchBarSection'
import StudyCreateModal from '@organisms/study/StudyCreateModal';
import { useEffect, useState } from 'react';
import StudyInfo from '@organisms/study/StudyInfo';
import Loading from '@organisms/common/Loading';
import { getStudyRooms, createStudyRoom, getLoadingState, getStudyRoomDetail, getStudyRoomMembers } from '@services/studyAPI';
import { useUserStore  } from '@stores/userStore';
import useModalStore from '@stores/modalStore';

const StudyListPage = () => {
  const showConfirm = useModalStore((state) => state.showConfirm);
  const navigation = useNavigation();

  const [studyList, setStudyList] = useState([]);
  const search = async (value) => {
    const result = await getStudyRooms(value);
    if (result.success) setStudyList(result.data);
    console.log(result);
  }
  useEffect(() => {
    search();
  }, []);
  
  const [filter, setFilter] = useState(false);
  const filtering = () => {
    console.log('필터 :', !filter ? 'on' : 'off');
    setFilter((prev) => !prev);
  }
  
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const { user } = useUserStore();
  const createRoom = async (data) => {
    const result = await createStudyRoom(data.name, data.maxMembers, data.isPublic, user.id);
    if (result.success) showConfirm('방이 생성되었습니다.',false,()=>search());
    setCreateModalOpen(false);
  }

  const [study, setStudy] = useState();
  const [detailOpen, setDetailOpen] = useState(false);
  const [members, setMembers] = useState([]);

  const getStudyRoomMembersAPICall = async (roomId) => {
    const res = await getStudyRoomMembers(roomId);
    setMembers(res.data.members);
  }

  const open = async (roomId) => {
    const result = await getStudyRoomDetail(roomId);
    if (result.success) setStudy(result.data);
    await getStudyRoomMembersAPICall(roomId);
    setDetailOpen(true);
  }
  const close = () => {
    setDetailOpen(false);
  }
  
  return (
    <>
      <LayoutWidthStatus title="Study Room">
        <SearchBarSection
          onSearch={(value) => search(value)}
          onFiltering={() => filtering()}
          onMakeRoom={() => setCreateModalOpen(true)}
          filter={filter}
        />
        { getLoadingState('getStudyRooms')
          ? <Loading />
          : <StudyList studyList={studyList} filter={filter} onPress={(roomId) => open(roomId)}/>
        }
      </LayoutWidthStatus>
      {detailOpen && <StudyInfo study={study} members={members} onPress={() => close()}/>}
      {createModalOpen && <StudyCreateModal onClose={() => setCreateModalOpen(false)} onSubmit={createRoom}/>}
    </>
  );
};
export default StudyListPage;