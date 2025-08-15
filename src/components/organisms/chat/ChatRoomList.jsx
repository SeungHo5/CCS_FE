import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Text from '@atoms/text/Text';
import Icon from '@atoms/image/Icon';
import SearchInput from '@molecules/common/SearchInput';
import { getChatRooms, searchUsers, createOrGetChatRoom } from '@services/userAPI';
import { getCharacterImage } from '@utils/imageMapping';
import { useUserStore } from '@stores/userStore';

const ChatRoomList = () => {
  const navigation = useNavigation();
  const { user } = useUserStore();
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [chatRooms, setChatRooms] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const avatarMap = {
    3: require('@assets/characters/3.png'),
    5: require('@assets/characters/5.png'),
    7: require('@assets/characters/1.png'),
    8: require('@assets/characters/2.png'),
  };

  // 채팅방 목록 로딩
  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        console.log('채팅방 목록 로딩 시작');
        const data = await getChatRooms();
        console.log('채팅방 목록 API 응답:', data);
        
        // userAPI wrapper 형태 처리: { success: true, data: [...] }
        console.log('전체 응답:', JSON.stringify(data, null, 2));
        console.log('data.data.data:', JSON.stringify(data.data?.data, null, 2));
       
        
        // 중첩된 구조 처리: data.data.data가 실제 배열
        const roomsArray = Array.isArray(data.data?.data) ? data.data.data : [];
        
        // 데이터 구조 맞춤 변환
        const normalizedRooms = roomsArray.map(room => ({
          id: room.roomId,                    // roomId → id
          name: room.targetUserNickname,      // targetUserNickname → name
          lastMessage: room.lastMessage || '아직 메시지가 없습니다',
          updatedAt: room.lastSentAt || new Date().toISOString(),
          unreadCount: room.unreadCount || 0,
          avatar: room.targetUserSelectedCharacterId || room.targetUserCharacterId || 3, // selectedCharacterId 우선, 기본 아바타
          opponentId: room.targetUserId,      // targetUserId → opponentId
          roomId: room.roomId                 // 원본 유지
        }));
        
        setChatRooms(normalizedRooms);
        console.log('🏠 채팅방 목록 (캐릭터 ID 포함):', normalizedRooms.map(r => ({
          name: r.name,
          avatar: r.avatar,
          opponentId: r.opponentId
        })));
        console.log('채팅방 목록 로딩 성공:', roomsArray.length, '개');
      } catch (error) {
        console.error('채팅방 목록 로딩 실패:', error);
        // 실패 시 빈 배열로 설정
        setChatRooms([]);
      }
    };
    
    fetchChatRooms();
  }, []);

  // 사용자 검색 API 호출
  const searchForUsers = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      console.log('사용자 검색 시작:', searchQuery);
      const result = await searchUsers(searchQuery, 10, 0);
      
      if (result.success) {
        console.log('사용자 검색 성공:', result.data);
        console.log('첫 번째 사용자 데이터:', result.data[0]);
        
        // 사용자 검색 결과에 type 필드 추가
        const usersWithType = (result.data || []).map(user => ({
          ...user,
          type: 'user'  // 명시적으로 type 추가
        }));
        
        console.log('🔍 사용자 검색 결과 (캐릭터 ID 포함):', usersWithType.map(u => ({
          name: u.nickname,
          characterId: u.characterId,
          userId: u.userId
        })));
        
        setSearchResults(usersWithType);
      } else {
        console.error('사용자 검색 실패:', result.error);
        setSearchResults([]);
      }
    } catch (error) {
      console.error('사용자 검색 에러:', error);
      setSearchResults([]);
    }
  };

  // 기존 채팅방 필터링 (로컬)
  const filteredChatRooms = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return chatRooms;
    return chatRooms.filter(r =>
      r.name.toLowerCase().includes(q) ||
      r.lastMessage.toLowerCase().includes(q)
    );
  }, [query, chatRooms]);

  // 드롭다운에 표시할 항목들 (기존 채팅방 + 검색된 사용자)
  const suggestions = useMemo(() => {
    const suggestions = [];
    
    // 1. 기존 채팅방 필터링 결과
    console.log('여기 찍힘?', filteredChatRooms.slice(0, 5).map(room => room.id))
    const chatRoomSuggestions = filteredChatRooms.slice(0, 5).map(room => ({
      type: 'chatroom',
      ...room
    }));
    
    // 2. 검색된 새로운 사용자들
    const userSuggestions = searchResults.slice(0, 5).map(user => ({
      type: 'user',
      id: user.userId || user.id,
      name: user.nickname,
      email: user.email,
      avatar: user.characterId || user.selectedCharacterId || 3, // characterId 우선, 기본 아바타
      userId: user.userId || user.id
    }));
    
    suggestions.push(...chatRoomSuggestions, ...userSuggestions);
    return suggestions.slice(0, 10);
  }, [filteredChatRooms, searchResults]);

  // 돋보기 눌렀을 때
  const handleSearch = useCallback((text) => {
    setQuery(text ?? '');
    setShowDropdown(false);  // 제출하면 닫기
  }, []);

  // 채팅방 생성 및 이동
  const createChatRoomAndNavigate = async (targetUserId) => {
    try {
      console.log('채팅방 생성 시작:', targetUserId);
      const result = await createOrGetChatRoom(targetUserId);
      
      if (result.success) {
        console.log('채팅방 생성/조회 성공:', result.data);
        
        // 채팅방으로 이동 - 백엔드에서 바로 roomId를 반환함
        const roomId = result.data?.data || result.data;
        console.log('API 응답:', result);
        console.log('추출된 룸 ID:', roomId);
        
        const myUserId = user?.data?.data?.id || user?.id;
        console.log('네비게이션에 전달할 사용자 ID:', myUserId);
        
        navigation.navigate('Chat', {
          roomId: roomId,
          myUserId: myUserId,
          opponentId: targetUserId,
        });
        
        // 검색창 초기화
        setQuery('');
        setShowDropdown(false);
        
        // 채팅방 목록 새로고침 (나중에 필요하면 구현)
        // fetchChatRooms();
      } else {
        console.error('채팅방 생성 실패:', result.error);
        Alert.alert('오류', '채팅방 생성에 실패했습니다.');
      }
    } catch (error) {
      console.error('채팅방 생성 에러:', error);
      Alert.alert('오류', '채팅방 생성 중 오류가 발생했습니다.');
    }
  };

  const handlePressRoom = (room) => {
    const myUserId = user?.data?.data?.id || user?.id;
    console.log('기존 채팅방 진입 - 사용자 ID:', myUserId);
    
    navigation.navigate('Chat', {
      roomId: room.id,
      myUserId: myUserId,
      opponentId: room.opponentId,
    });
  };

  // 드롭다운 항목 클릭 처리
  const handleSuggestionPress = (item) => {
    if (item.type === 'chatroom') {
      // 기존 채팅방 → 바로 이동
      handlePressRoom(item);
    } else if (item.type === 'user') {
      // 새로운 사용자 → 채팅방 생성 후 이동
      createChatRoomAndNavigate(item.userId);
    }
  };

  const formatTime = (datetime) => {
    const date = new Date(datetime);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.roomItem} onPress={() => handlePressRoom(item)}>
      <Icon 
        icon={getCharacterImage(item.avatar)} 
        size={{ width: 35, height: 35 }}
        style={{ marginRight: 10, borderColor: '#91B7AB', borderWidth: 1, borderRadius: 50 }}
        />
      <View style={styles.roomInfo}>
        <View style={styles.topRow}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.time}>{formatTime(item.updatedAt)}</Text>
        </View>
        <View style={styles.bottomRow}>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {item.lastMessage}
          </Text>
          {item.unreadCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );


return (
  <View style={{ flex: 1 }}>
    <View style={styles.searchContainer}>
      {/* 검색창 위치 고정 */}
      <SearchInput 
        placeholder="친구 검색" 
        onSearch={handleSearch} // 엔터/돋보기 눌렀을 때
        onChangeText={(t)=>{
          console.log('[SearchInput onChangeText]', t);
          const text = t ?? '';
          setQuery(text);
          setShowDropdown(!!text.trim());   // 타이핑하면 열기/비우면 닫기
          
          // 사용자 검색 API 호출
          if (text.trim()) {
            searchForUsers(text.trim());
          } else {
            setSearchResults([]);
          }
        }}
        style={styles.searchButton} 
      />
      {/* 검색창 밑에 나오는 검색 결과 */}
      {showDropdown && suggestions.length > 0 && (
        <View style={styles.dropdown}>
          <FlatList
            keyboardShouldPersistTaps="handled"
            data={suggestions}
            keyExtractor={(it) => it.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.row}
                onPress={() => handleSuggestionPress(item)}
              >
                <Icon icon={getCharacterImage(item.avatar)} size={{width:24, height:24}} style={{marginRight:8, borderRadius:12}} />
                <View style={{flex:1}}>
                  <Text style={{fontWeight:'600'}}>{item.name}</Text>
                  <Text numberOfLines={1} style={{color:'#666', fontSize:12}}>
                    {item.type === 'user' ? (item.email || '이메일 없음') : (item.lastMessage || '채팅방')}
                  </Text>
                </View>
                {item.type === 'user' && (
                  <Text style={{fontSize:10, color:'#999', backgroundColor:'#f0f0f0', paddingHorizontal:6, paddingVertical:2, borderRadius:8}}>
                    새 채팅
                  </Text>
                )}
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => <View style={{height:1, backgroundColor:'#f0f0f0'}} />}
          />
        </View>
      )}
    </View>

  {/* 스크롤되는 목록 */}
    <FlatList
      style={{ flex: 1 }}
      data={query.trim() ? filteredChatRooms : chatRooms}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      keyboardShouldPersistTaps="handled"
    />
  </View>
  );
};
export default ChatRoomList;

const DROPDOWN_MAX_H = 260;
const styles = StyleSheet.create({
  searchContainer: {
    position: 'relative',
    paddingHorizontal: 10,
    paddingVertical: 10,
    zIndex: 10,     // 드롭다운이 리스트 위에 오도록
    elevation: 2,
  },
  dropdown: {
    position: 'absolute',
    top: '100%',    // 검색창 바로 아래
    left: 10,
    right: 10,
    maxHeight: DROPDOWN_MAX_H,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E6E6E6',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    zIndex: 1000,
    elevation: 16,
  },
  row: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 10 },
  searchButton: {
    borderColor: '#91B7AB',
    borderWidth: 2,
  },
  roomItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#91B7AB',
  },
  roomInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#91B7AB',
  },
  time: {
    fontSize: 12,
    color: '#888',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    fontSize: 14,
    color: '#444',
    flexShrink: 1,
  },
  badge: {
    backgroundColor: '#FF6B6B',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 8,
  },
  badgeText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
});
