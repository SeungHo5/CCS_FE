import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '@atoms/text/Text';
import Icon from '@atoms/image/Icon';
import { HStack } from '@ui/Stack'; // ✅ gap 대체

const ItemInfo = ({ item }) => {
  // ✅ 가격 표시: 로케일 고정하고 null/undefined 대비(선택 사항)
  const priceLabel = (item?.price ?? 0).toLocaleString('ko-KR');

  return (
      <View style={styles.container}>
        <Text style={styles.name}>{item?.name}</Text>

        
        <HStack gap={4} align="center">
          <Icon
              icon={require('@assets/coin.png')}
              size={{ width: 16, height: 16 }}
          />
          <Text style={styles.price}>{priceLabel}</Text>
        </HStack>
      </View>
  );
};

export default ItemInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },

  // priceContainer 삭제 가능
  price: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
});
