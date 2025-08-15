import ChatHeader from '@organisms/chat/ChatHeader';
import ChatMessages from '@organisms/chat/ChatMessages';
import ChatInputBar from '@organisms/chat/ChatInputBar';
import React, {useEffect, useState, useRef} from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getChatMessages, getUserDetail } from '@services/userAPI';
import useTokenStore from '@stores/tokenStore';
import { useUserStore } from '@stores/userStore';
import { getCharacterImage } from '@utils/imageMapping';

const Chat = () => {
  const navigation = useNavigation();
  const { accessToken } = useTokenStore();
  const { user } = useUserStore();

  // 메시지 상태: 채팅 메시지 목록 관리
  const [messages, setMessages] = useState([]);
  
  // WebSocket 관련 상태
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef(null);
  const stompClientRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const maxReconnectAttempts = 5;
  const [connectionStatus, setConnectionStatus] = useState('connecting'); // connecting, connected, disconnected, reconnecting
  const [shouldReconnect, setShouldReconnect] = useState(true); // 재연결 여부 제어

  // 사용자 정보 상태
  const [myUserInfo, setMyUserInfo] = useState(null);
  const [opponentUserInfo, setOpponentUserInfo] = useState(null);

  // 라우터에서 파라미터 가져오기
  const route = useRoute();
  const { userId, opponentId: routeOpponentId, roomId: routeRoomId, myUserId: routeMyUserId } = route.params || {};
  
  // 내 정보는 userStore에서, 없으면 라우트 파라미터에서
  const myUserId = user?.data?.data?.id || user?.id || routeMyUserId;
  const opponentId = userId || routeOpponentId; // userId 또는 opponentId 사용

  // 채팅방 ID - 라우트에서 전달받은 roomId 우선 사용
  const extractedRoomId = routeRoomId?.data || routeRoomId;
  const roomId = extractedRoomId || (myUserId && opponentId ? 
    parseInt([myUserId, opponentId].sort().join('')) % 1000000 : // 6자리 숫자로 제한
    1); // 기본값을 숫자로 변경

  // 디버깅 로그 (한 번만 실행)
  useEffect(() => {
    console.log('🔍 라우트 파라미터 확인:', {
      routeParams: route.params,
      userId,
      routeOpponentId,
      routeRoomId,
      routeMyUserId
    });
    
    console.log('👥 사용자 ID 확인:', {
      myUserId,
      opponentId,
      userId,
      routeOpponentId,
      userStoreData: user?.data?.data
    });
    
    console.log('🏠 roomId 추출 과정:', {
      routeRoomId,
      extractedRoomId,
      finalRoomId: roomId
    });
  }, []);

  // 사용자 정보 가져오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // 내 정보 설정 (userStore에서)
        const myData = user?.data?.data;
        if (myData) {
          const myCharacterImage = myData.selectedCharacterId ? 
            getCharacterImage(myData.selectedCharacterId) : 
            require('@assets/logo.png');
          
          setMyUserInfo({
            id: myData.id,
            name: myData.nickname || '나',
            avatar: myCharacterImage
          });
        }

        // 상대방 정보 가져오기 (API 호출)
        if (opponentId) {
          const opponentResult = await getUserDetail(opponentId);
          
          if (opponentResult.success) {
            const opponentData = opponentResult.data.data;
            const opponentCharacterImage = opponentData.selectedCharacterId ? 
              getCharacterImage(opponentData.selectedCharacterId) : 
              require('@assets/logo.png');
            
            setOpponentUserInfo({
              id: opponentData.id,
              name: opponentData.nickname || '상대방',
              avatar: opponentCharacterImage
            });
          }
        }
      } catch (error) {
        console.error('사용자 정보 조회 실패:', error);
      }
    };

    if (myUserId && opponentId) {
      fetchUserInfo();
    }
  }, [myUserId, opponentId, user]);

  // 초기 메시지 로딩
  useEffect(() => {
    const fetchInitialMessages = async () => {
      try {
        console.log('🏠 ===== 채팅방 및 메시지 초기화 =====');
        console.log('🏠 roomId:', roomId);
        console.log('🏠 myUserId:', myUserId);
        console.log('🏠 opponentId:', opponentId);
        console.log('🏠 ======================================');
        
        console.log('💾 채팅 메시지 조회 API 호출 시작...');
        const result = await getChatMessages(roomId);
        console.log('💾 API 응답 전체:', JSON.stringify(result, null, 2));
        
        // API wrapper 구조 처리 - 중첩 구조: result.data.data
        const data = result.success ? (result.data?.data || []) : [];
        console.log('💾 파싱된 메시지 데이터:', data);
        console.log('💾 메시지 데이터 타입:', typeof data);
        console.log('💾 메시지 배열인가?', Array.isArray(data));
        
        if (Array.isArray(data)) {
          // 시간순으로 정렬 (오래된 메시지가 먼저)
          const sorted = data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
          setMessages(sorted);
          console.log('💾 ✅ 메시지 로딩 성공! 총 개수:', sorted.length);
          if (sorted.length > 0) {
            console.log('💾 첫 번째 메시지:', sorted[0]);
            console.log('💾 마지막 메시지:', sorted[sorted.length - 1]);
          }
        } else {
          setMessages([]);
          console.log('💾 ❌ 메시지 데이터가 배열이 아님, 빈 배열로 설정');
        }
      } catch (error) {
        // 실패 시 빈 배열로 설정
        setMessages([]);
        console.error('💾 ❌ 메시지 조회 실패:', error);
        console.error('💾 에러 상세:', error.message);
        console.error('💾 에러 스택:', error.stack);
      }
    };
    
    if (roomId && myUserId && opponentId) {
      console.log('💾 조건 만족, 메시지 로딩 시작...');
      fetchInitialMessages();
    } else {
      console.log('💾 ❌ 메시지 로딩 조건 불만족:', {roomId, myUserId, opponentId});
    }
  }, [roomId, myUserId, opponentId]);

  // WebSocket 연결
  useEffect(() => {
    if (!accessToken || !myUserId || !opponentId) {
      return;
    }
    
    // 자동 재연결 함수
    const scheduleReconnect = () => {
      // 재연결이 비활성화된 경우 재연결하지 않음
      if (!shouldReconnect) {
        setConnectionStatus('disconnected');
        return;
      }
      
      if (reconnectAttempts < maxReconnectAttempts) {
        const delay = Math.min(1000 * Math.pow(2, reconnectAttempts), 30000); // 지수 백오프 (최대 30초)
        setConnectionStatus('reconnecting');
        
        reconnectTimeoutRef.current = setTimeout(() => {
          setReconnectAttempts(prev => prev + 1);
          connectWebSocket();
        }, delay);
      } else {
        setConnectionStatus('disconnected');
      }
    };
    
    // STOMP over WebSocket 연결
    const connectWebSocket = () => {
      try {
        // user-service WebSocket 엔드포인트 - 토큰을 쿼리 파라미터로 전달
        const wsUrl = `wss://i13c201.p.ssafy.io/user/ws-stomp?token=${encodeURIComponent(accessToken)}`;
        const socket = new WebSocket(wsUrl);
        socketRef.current = socket;

        socket.onopen = () => {
          setConnectionStatus('connected');
          setReconnectAttempts(0); // 연결 성공시 재연결 카운터 리셋
          
          // 테스트: STOMP 없이 바로 연결 상태로 설정
          setIsConnected(true);
          
          // STOMP 프레임에 인증 헤더 추가
          const connectFrame = [
            'CONNECT',
            'accept-version:1.0,1.1,1.2',
            'host:i13c201.p.ssafy.io',
            `authorization:Bearer ${accessToken}`,
            `login:${myUserId}`,
            '',
            ''
          ].join('\n') + '\0';
          
          console.log('📋 CONNECT 프레임 (인증 포함):', connectFrame);
          socket.send(connectFrame);
        };


        socket.onmessage = (event) => {
          const data = String(event.data || '');
          console.log('📥 ===== WebSocket 메시지 수신 =====');
          console.log('📥 원본 데이터:', data);
          console.log('📥 데이터 길이:', data.length);
          console.log('📥 ================================');
          
          // 빈 메시지(heartbeat) 무시
          if (!data.trim()) {
            console.log('📥 빈 메시지(heartbeat) 무시');
            return;
          }
          
          // STOMP CONNECTED 수신 시에 연결 완료 처리
          if (data.startsWith('CONNECTED')) {
            console.log('✅ STOMP CONNECTED 수신');
            setIsConnected(true);
            
            // 채팅방 구독 - destination 경로 확인 필요
            const subscribeFrame = `SUBSCRIBE\nid:sub-0\ndestination:/topic/chat/${roomId}\n\n\u0000`;
            console.log('📋 구독 프레임 전송:', subscribeFrame);
            socket.send(subscribeFrame);
            return;
          }

          if (data.startsWith('MESSAGE')) {
            console.log('📨 MESSAGE 프레임 수신!');
            try {
              const lines = data.split('\n');
              const bodyIndex = lines.findIndex(line => line === '') + 1;
              const messageBody = lines.slice(bodyIndex).join('\n').replace(/\u0000$/, '');
              
              console.log('📨 메시지 본문:', messageBody);
              
              if (messageBody) {
                const received = JSON.parse(messageBody);
                console.log('📨 파싱된 메시지:', received);
                setMessages(prev => [...prev, received]);
                console.log('📨 메시지 추가 완료');
              }
            } catch (e) {
              console.error('📨 메시지 파싱 실패:', e);
            }
            return;
          }
          
          console.log('❓ 알 수 없는 STOMP 프레임:', data.substring(0, 50));

          if (data.startsWith('ERROR')) {
            setIsConnected(false);
            return;
          }

          if (data.startsWith('RECEIPT')) {
            return;
          }
        };

        socket.onerror = (error) => {
          setIsConnected(false);
          setConnectionStatus('disconnected');
        };

        socket.onclose = (event) => {
          setIsConnected(false);
          
          // 재연결이 비활성화되었거나 정상 종료인 경우 재연결하지 않음
          if (!shouldReconnect || event.wasClean || event.code === 1000) {
            setConnectionStatus('disconnected');
          } else {
            // 비정상 종료이고 재연결이 활성화된 경우에만 재연결 시도
            scheduleReconnect();
          }
        };

      } catch (error) {
        setIsConnected(false);
        setConnectionStatus('disconnected');
      }
    };

    connectWebSocket();

    // 컴포넌트 언마운트 시 연결 종료
    return () => {
      // 채팅방을 나가므로 재연결 비활성화
      setShouldReconnect(false);
      
      // 재연결 타이머 클리어
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
      
      // WebSocket 연결 정상 종료
      if (socketRef.current) {
        socketRef.current.close(1000, 'User left chat room'); // 정상 종료 코드
        socketRef.current = null;
        setIsConnected(false);
        setConnectionStatus('disconnected');
      }
    };
  }, [roomId, accessToken, myUserId, opponentId, reconnectAttempts, shouldReconnect]);

  // 메시지 전송 (WebSocket)
  const handleSendMessage = (text) => {
    console.log('📝 메시지 전송 시도:', {
      text,
      isConnected,
      hasSocket: !!socketRef.current,
      socketReadyState: socketRef.current?.readyState,
      roomId,
      myUserId,
      connectionStatus
    });
    
    if (!text.trim()) {
      console.log('❌ 빈 메시지');
      return;
    }
    
    // 항상 로컬에 메시지 추가 (WebSocket 상태와 관계없이)
    const localMessage = { 
      id: Date.now(),
      text: text,
      message: text,
      senderId: myUserId,
      roomId: roomId,
      createdAt: new Date().toISOString(),
      isMine: true
    };
    setMessages(prev => [...prev, localMessage]);
    console.log('💬 로컬 메시지 추가:', localMessage);
    
    // WebSocket이 연결되어 있으면 서버로도 전송
    if (isConnected && socketRef.current) {
      try {
        // 서버 DTO에 맞춘 메시지 객체 생성
        const messageToSend = {
          roomId: roomId,
          senderId: myUserId,
          message: text
        };

        // STOMP SEND 프레임 생성
        const sendFrame = `SEND\ndestination:/app/chat/${roomId}\ncontent-type:application/json\n\n${JSON.stringify(messageToSend)}\u0000`;
        
        console.log('📤 WebSocket으로 메시지 전송:', messageToSend);
        socketRef.current.send(sendFrame);
      } catch (e) {
        console.error('메시지 전송 실패:', e);
      }
    } else {
      console.log('❌ WebSocket 미연결, 로컬에만 추가');
    }
  };

  // 4) 표시용 가공 - 실제 사용자 정보 사용
  const processedMessages = messages.map((m) => {
    let user = { name: '알 수 없음', avatar: require('@assets/logo.png') };
    
    // 메시지 발신자에 따라 사용자 정보 매핑
    if (m.senderId === myUserId && myUserInfo) {
      user = myUserInfo;
    } else if (m.senderId === opponentId && opponentUserInfo) {
      user = opponentUserInfo;
    }
    
    // message | content | text 우선순위로 표시 텍스트 생성
    const displayText = m.message ?? m.content ?? m.text ?? ''; 
    
    return { 
      ...m, 
      text: displayText, 
      name: user.name, 
      avatar: user.avatar, 
      isMine: m.senderId === myUserId 
    };
  });
   
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <ChatHeader 
        username={opponentUserInfo?.name || '상대방'} 
        onBack={() => navigation.goBack()}
        connectionStatus={connectionStatus}
      />
      <ChatMessages 
        messages={processedMessages} 
        myUserId={myUserId} 
        contentContainerStyle={{ paddingBottom: 80 }}
      />
      <ChatInputBar onSend={handleSendMessage} />
    </KeyboardAvoidingView>
  );
};
export default Chat;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFEEB',
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
})