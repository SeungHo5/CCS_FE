// 채팅 입력창, 전송 버튼
import React, { useRef } from 'react';
import SearchInput from '@molecules/common/SearchInput';
import { StyleSheet, View } from 'react-native';  

const ChatInputBar = ({onSend}) => {
  const searchInputRef = useRef(null);

  const handleSend = (message) => {
    if (message && message.trim()) {
      onSend(message);
      // 메시지 전송 후 입력창 비우기
      if (searchInputRef.current && searchInputRef.current.reset) {
        searchInputRef.current.reset();
      }
    }
  };

  return (
    <View style = {styles.container}>
      <SearchInput 
        ref={searchInputRef}
        name="message"
        placeholder="메시지 입력"
        onSearch={handleSend}
        style={styles.input}
        icon = {require('@assets/petBtn.png')}
        iconStyle = {{ width: 30, height: 30, marginRight:10 }}
      />
    </View>
  );
};
export default ChatInputBar;

const styles = StyleSheet.create({
  container: { padding: 10, backgroundColor: '#91B7AB', },
  input: { borderColor: '#E6E6E6', borderWidth: 3, borderRadius: 20 },
});