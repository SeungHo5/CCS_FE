import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native'; // 🧹 TouchableOpacity 미사용 → 제거
import Button from '@atoms/button/Button';
import Icon from '@atoms/image/Icon';
import { HStack, VStack } from '@ui/Stack'; // ✅ gap 대체

const AuctionItem = ({ item, filterType, onAction, showMySales }) => {
  const getButtonLabel = () => {
    if (showMySales) return '판매취소';
    if (filterType === 'buy') return '구매하기';
    if (filterType === 'sell') return item.isSelling ? '판매중' : '판매하기';
    if (filterType === 'receivable') return '수령하기';
    return '';
  };

  const isDisabled = (filterType === 'sell' && item.isSelling);

  return (
      <View style={styles.container}>
        <View style={styles.imageWrapper}>
          <Image source={item.image} style={styles.image} />
        </View>

        {/* ✅ info의 세로 간격 gap:5 → VStack gap={5} */}
        <VStack gap={5} style={styles.infoNoGap}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{item.name || '이름 없음'}</Text>
            {/* 판매 탭에서만 보유 개수 표시 */}
            {filterType === 'sell' && item.amount > 0 && (
                <Text style={styles.quantity}>x{item.amount}</Text>
            )}
          </View>

          {/* ✅ 가격 줄의 가로 간격 gap:3 → HStack gap={3} */}
          {(filterType !== 'sell' || (item.price && item.price > 0)) && (
              <HStack
                  gap={3}
                  align="center"
                  style={{ marginLeft: -5 }} // ⚠️ 음수 마진은 기기별로 튈 수 있어요. 가능하면 디자인에서 여유로 해결 권장.
              >
                <Icon icon={require('@assets/coin.png')} size={{ width: 16, height: 16 }} />
                <Text style={styles.price}>
                  {/* ⚠️ 렌더 중 console.log는 성능 저하 → 필요하면 useEffect로 이동 권장 */}
                  {item.price || item.salePrice || item.amount || 0}
                </Text>
              </HStack>
          )}
        </VStack>

        <Button
            onPress={onAction}
            disabled={isDisabled}
            title={getButtonLabel()}
            style={[styles.button, isDisabled && styles.disabledButton]}
            textStyle={[styles.buttonText, isDisabled && styles.disabledText]}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#FFFEEB',
    padding: 12,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 2,
    marginBottom: 11,            // 🧹 중복된 marginBottom(10, 11) → 하나로 정리
    justifyContent: 'space-between',
  },
  imageWrapper: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: '#fff',
    borderColor: '#b9d8d1',      // 🧹 '#b9d8d1ff' == '#b9d8d1' (alpha=FF) → 6자리로 정리
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    overflow: 'hidden',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  // ❌ 기존 info: { justifyContent:'space-evenly', gap:5 }
  // ✅ VStack이 세로 간격 처리
  infoNoGap: {
    flex: 1,
    alignItems: 'flex-start',
    paddingHorizontal: 10,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 14,
    flex: 1,
  },
  quantity: {
    fontSize: 12,
    color: '#666',
    backgroundColor: '#E8F4F0',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    fontWeight: 'bold',
  },
  price: {
    color: '#666',
    fontSize: 12,
  },
  button: {
    backgroundColor: '#66b5a3',
    paddingHorizontal: 11,
    paddingVertical: 7,
    marginTop: 6,
    borderRadius: 15,
  },
  disabledButton: {
    backgroundColor: '#DDD',
  },
  buttonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  disabledText: {
    color: '#999',
  },
});

export default AuctionItem;
