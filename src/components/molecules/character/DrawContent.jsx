import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from '@atoms/image/Icon';
import ItemAvatar from '@atoms/common/ItemAvatar';
import Text from '@atoms/text/Text';
import Box from '@atoms/box/Box';
import ButtonIcon from '@atoms/button/ButtonIcon';
import LottieView from 'lottie-react-native'; // ✅ 오탈자 수정: LottiView → LottieView
import { HStack } from '@ui/Stack';           // ✅ gap 대체 (wrap 지원)

const DrawContent = ({
                       drawState,
                       revealedItems = [],
                       contentHeight = 0,
                       type,
                     }) => {
  const navigation = useNavigation();
  const chestSize = contentHeight ? contentHeight * 0.4 : 230;

  const shakeAnim = useRef(new Animated.Value(0)).current;
  const loopRef = useRef(null); // ✅ loop 핸들 보관

  useEffect(() => {
    if (drawState === 'revealing') {
      // ✅ loop 레퍼런스 저장 → 상태 변경 시 확실히 정지
      loopRef.current = Animated.loop(
          Animated.sequence([
            Animated.timing(shakeAnim, {
              toValue: 1,
              duration: 80,
              useNativeDriver: true,
              easing: Easing.linear,
            }),
            Animated.timing(shakeAnim, {
              toValue: -1,
              duration: 80,
              useNativeDriver: true,
              easing: Easing.linear,
            }),
          ])
      );
      loopRef.current.start();
    } else {
      loopRef.current?.stop();
      shakeAnim.stopAnimation();
      shakeAnim.setValue(0);
    }
    return () => {
      loopRef.current?.stop();
    };
  }, [drawState, shakeAnim]);

  const rotate = shakeAnim.interpolate({
    inputRange: [-1, 1],
    outputRange: ['-5deg', '5deg'],
  });

  if (drawState === 'ready' || drawState === 'revealing') {
    return (
        <View style={styles.container}>
          <View style={styles.chestContainer}>
            <Animated.View style={{ transform: [{ rotate }] }}>
              <Icon
                  icon={require('@assets/chest.png')}
                  size={{ width: chestSize, height: chestSize }}
                  style={styles.chest}
              />
            </Animated.View>
          </View>
        </View>
    );
  }

  if (drawState === 'revealed' && revealedItems.length > 0) {
    const isSingle = revealedItems.length === 1;
    const item = revealedItems[0];

    return (
        <View style={styles.container}>
          <Box style={{ width: '90%', height: '75%', backgroundColor: 'rgba(255, 254, 235, 0.9)' }}>
            {/* 닫기 버튼 */}
            <ButtonIcon
                icon={require('@assets/close2.png')}
                onPress={() => navigation.navigate('CharacterDraw', { type, reset: true })}
                size={{ width: 30, height: 30 }}
                style={styles.closeButton}
            />

            {/* 폭죽 애니메이션 */}
            <LottieView
                source={require('@assets/animations/Confetti.json')}
                autoPlay
                loop={false}
                style={styles.fireworks}
            />

            {isSingle ? (
                <View style={styles.SingleBackdrop}>
                  <ItemAvatar
                      item={item}
                      size={200}
                      showSelection={false}
                      showLock={false}
                      disabled={true}
                      type={type}
                  />
                  <Box style={styles.characterNameBox}>
                    <Text style={styles.characterName}>
                      {item.name || (type === 'room' ? `방 ${item.name}` : `캐릭터 ${item.name}`)}
                    </Text>
                  </Box>
                </View>
            ) : (
                // ✅ gap: 5, flexWrap 등 → HStack wrap + gap으로 대체
                <HStack gap={5} wrap align="center" justify="center" style={styles.multiBackdropNoGap}>
                  {revealedItems.map((it, index) => (
                      <View key={index} style={styles.itemBox}>
                        <ItemAvatar
                            item={it}
                            size={80}
                            showSelection={false}
                            showLock={false}
                            disabled={true}
                            type={type}
                        />
                        <Box style={{ width: '80%', height: 25, backgroundColor: '#F0CB5F', paddingVertical: 0 }}>
                          <Text style={styles.itemName}>
                            {it.name || (type === 'room' ? `방 ${it.name}` : `캐릭터 ${it.name}`)}
                          </Text>
                        </Box>
                      </View>
                  ))}
                </HStack>
            )}
          </Box>
        </View>
    );
  }
  return null;
};

export default DrawContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 15,
    zIndex: 20,
    borderRadius: 12,
    padding: 4,
  },
  SingleBackdrop: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  characterNameBox: {
    // width: '50%', // ❌ 고정 폭 제거 → 텍스트 길이에 맞춰 자연스럽게
    alignSelf: 'center', // ✅ 가운데 정렬
    paddingHorizontal: 16, // ✅ 내용 기반 너비
    marginTop: 60,
    marginBottom: -40,
    backgroundColor: '#F0CB5F',
    minHeight: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  characterName: {
    fontSize: 25,
    color: '#fff',
    fontWeight: '600', // ✅ RN은 문자열 weight 권장
    textAlign: 'center',
  },
  // ❌ 기존 multiBackdrop에서 flexDirection/Wrap/gap 삭제
  // ✅ HStack wrap + gap으로 대체하고, 나머지 스타일만 유지
  multiBackdropNoGap: {
    flex: 1,
    width: '100%',
    paddingTop: 55,
  },
  itemBox: {
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemName: {
    marginTop: 3,
    marginBottom: 2,
    fontSize: 14,
    fontWeight: '500', // ✅ 문자열 weight
    color: '#fff',
    textAlign: 'center',
    lineHeight: 16,
    includeFontPadding: false,
  },
  fireworks: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 5,
    pointerEvents: 'none',
  },
});
