import React, { useRef, useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ChatMessageItem from '@molecules/chat/ChatMessageItem';

const ChatMessages = ({ messages, myUserId, contentContainerStyle }) => {
  const flatListRef = useRef(null);

  // 새 메시지가 추가될 때마다 맨 아래로 스크롤
  useEffect(() => {
    if (messages.length > 0 && flatListRef.current) {
      // 약간의 지연을 두어 렌더링 완료 후 스크롤
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages.length]);

  const renderMessage = ({ item: msg, index }) => {
    const prev = messages[index - 1];
    const next = messages[index + 1];
    const isFirstInGroup = !prev || prev.senderId !== msg.senderId;
    const isLastInGroup  = !next || next.senderId !== msg.senderId;
    
    return (
      <ChatMessageItem
        key={msg.id}
        message={msg}
        isMine={msg.senderId === myUserId}
        showHeader={isFirstInGroup}  // 아바타/이름
        showTime={isLastInGroup}     // 시간
      />
    );
  };

  return (
    <FlatList
      ref={flatListRef}
      style={styles.container}
      data={messages}
      renderItem={renderMessage}
      keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
      contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      maintainVisibleContentPosition={{
        minIndexForVisible: 0,
        autoscrollToTopThreshold: 10,
      }}
    />
  );
};

export default ChatMessages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    // backgroundColor: 'red',
  },
});
