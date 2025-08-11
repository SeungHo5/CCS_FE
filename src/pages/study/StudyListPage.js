import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Text as RNText, TouchableOpacity, ScrollView } from 'react-native';
import studyListDummy from '@assets/data/studyListDummy';
import Loading from '@organisms/common/Loading'
import LayoutWidthStatus from "@templates/LayoutWidthStatus";
import {SearchBar} from "react-native-screens";
import SearchBarSection from "@organisms/study/SearchBarSection";
import { useNavigation } from '@react-navigation/native';
import StudyInfo from '@organisms/study/StudyInfo';
import StudyCreateModal from '@organisms/study/StudyCreateModal';

const StudyListPage = () => {
  console.log('📚 StudyListPage 최종 버전 (아이콘 매핑 적용)!');
  
  const [filter, setFilter] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [study, setStudy] = useState();
  const [detailOpen, setDetailOpen] = useState(false);
  const [currentIdx, setCurrentIdx] = useState();
  const [loading, setLoading] = useState(true);
  
  // 완성된 코드와 동일한 함수들
  const search = (value) => {
    console.log('검색:', value);
  }
  
  const filtering = () => {
    console.log('필터 :', !filter ? 'on' : 'off');
    setFilter((prev) => !prev);
  }
  
  const makeRoom = (data) => {
    console.log('🏠 방 만들기:', data);
    setCreateModalOpen(false);
  }
  
  const open = (index) => {
    setCurrentIdx(index);
    setStudy(studyListDummy[index]);
    setDetailOpen(true);
    console.log('스터디 열기:', studyListDummy[index]);
  }
  
  const close = () => {
    console.log('❌ 스터디 닫기');
    setDetailOpen(false);
  }
  
  // 필터링된 스터디 목록
  // const filteredStudyList = filter 
  //   ? studyListDummy.filter(study => study.status === 'WAITING')
  //   : studyListDummy;
  
  useEffect(() => {
    const fetchData = async () => {
      const loadingTest = async () => {
        await new Promise(resolve => setTimeout(resolve, 3000));
        return { };
      };
      await loadingTest();
      setLoading(false);
    };
    fetchData();
  }, []);


  try {
    console.log('📚 최종 StudyListPage 렌더링 시작...');

    return (
        <>
          {loading
              ? <Loading/>
              : <>
                <LayoutWidthStatus title="Study Room">
                  <SearchBarSection
                      onSearch={(value) => search(value)}
                      onFiltering={() => filtering()}
                      onMakeRoom={() => setCreateModalOpen(true)}
                      filter={filter}
                  />
                  <StudyList studyList={studyListDummy} filter={filter} onPress={(index) => open(index)}/>
                </LayoutWidthStatus>
                {detailOpen && <StudyInfo study={study} onClose={close}/>}
                {createModalOpen && <StudyCreateModal onClose={() => setCreateModalOpen(false)} onSubmit={makeRoom}/>}
              </>
          }
        </>
    );

  } catch (error) {
    console.error('❌ StudyListPage 에러:', error);
    return (
        <View style={styles.errorContainer}>
          <RNText style={styles.errorText}>
            StudyListPage 에러: {error.message}
          </RNText>
        </View>
    );
  }
};

export default StudyListPage;