import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import MainLayout from '@templates/MainLayout';
import TopStatusBar from '@organisms/TopStatusBar';
import TypeTabs from '@molecules/character/TypeTabs';
import AuctionList from '@organisms/character/AuctionList';
import Box from '@atoms/box/Box';
import Icon from '@atoms/image/Icon';
import AuctionFilter from '@molecules/character/AuctionFilter';
import ConfirmModal from '@organisms/common/ConfirmModal';
import PriceInputModal from '@organisms/character/PriceInputModal';
import ButtonIconText from '@atoms/button/ButtonIconText';
import usePlayerStore from '../../stores/playerStore';
import { useUserStore } from '../../stores/userStore';
import { VStack } from '@ui/Stack'; // ✅ gap 대체용 (대문자 S)
import {
  loadAuctionItems,
  handleAuctionAction,
  getLoadingState
} from '@services/characterAPI';

const CharacterAuction = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { type = 'character' } = route.params || {};

  const { currency, level, refreshPlayerData } = usePlayerStore();
  const { user, fetchUser } = useUserStore();

  const [activeFilter, setActiveFilter] = useState('buy'); // 'buy' | 'sell' | 'receivable'
  const [activeType, setActiveType] = useState(type); // 'character' | 'room'
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [priceModalVisible, setPriceModalVisible] = useState(false);
  const [items, setItems] = useState([]);
  const [showMySales, setShowMySales] = useState(false);

  const loading = getLoadingState('loadAuctionItems') || getLoadingState('handleAuctionAction');

  useEffect(() => {
    loadItems();
  }, [activeType, activeFilter, showMySales]);

  const loadItems = async () => {
    const itemType = activeType === 'room' ? 'theme' : 'character';
    const filterType = showMySales ? 'my-sales' : activeFilter;

    const result = await loadAuctionItems(filterType, itemType);

    if (result.success) {
      setItems(result.data);
    } else {
      setItems([]);
      Alert.alert('로드 실패', '목록을 불러오는데 실패했습니다.');
    }
  };

  const handleFilterChange = (filter) => setActiveFilter(filter);
  const handleTypeChange = (type) => setActiveType(type);

  const handleConfirm = async (item) => {
    if (!selectedItem) return;

    const result = await handleAuctionAction(showMySales ? 'my-sales' : activeFilter, item, activeType, currency);

    if (result.success) {
      if (activeFilter === 'buy' || activeFilter === 'receivable') {
        refreshPlayerData();
      }
      setModalVisible(false);
      setSelectedItem(null);
      loadItems();
    } else {
      if (result.error?.type === 'INSUFFICIENT_FUNDS') {
        setModalVisible(false);
        Alert.alert('코인 부족', result.error.message, [
          { text: 'OK', onPress: () => setSelectedItem(null) }
        ]);
      } else {
        const errorMessage = result.error?.message || '작업에 실패했습니다.';
        setModalVisible(false);
        Alert.alert('알림', errorMessage, [
          { text: 'OK', onPress: () => setSelectedItem(null) }
        ]);
      }
    }
  };

  const handleItemPress = (item) => {
    setSelectedItem(item);
    if (activeFilter === 'sell' && (!item.price || item.price === 0)) {
      setPriceModalVisible(true);
    } else {
      setModalVisible(true);
    }
  };

  const handlePriceConfirm = async (itemWithPrice) => {
    const result = await handleAuctionAction(activeFilter, itemWithPrice, activeType, currency);

    if (result.success) {
      setPriceModalVisible(false);
      setSelectedItem(null);
      loadItems();
      Alert.alert('성공', '상품이 등록되었습니다.', [
        { text: 'OK', onPress: () => loadItems() }
      ]);
    } else {
      const errorMessage = result.error?.message || '상품 등록에 실패했습니다.';
      setPriceModalVisible(false);
      Alert.alert('오류', errorMessage, [
        { text: 'OK', onPress: () => setSelectedItem(null) }
      ]);
    }
  };

  const handlePriceCancel = () => {
    setPriceModalVisible(false);
    setSelectedItem(null);
  };

  const getConfirmMessage = () => {
    if (showMySales) return '이 상품의 판매를 취소하시겠습니까?';
    switch (activeFilter) {
      case 'buy': return '이 아이템을 구매하시겠습니까?';
      case 'sell': return '이 아이템을 판매하시겠습니까?';
      case 'receivable': return '판매 대금을 수령하시겠습니까?';
      default: return '';
    }
  };

  return (
      <>
        <MainLayout style={styles.containerNoGap}>
          {/* ✅ 원래 container의 gap:15 → VStack으로 대체 */}
          <VStack gap={15} style={{ flex: 1 }}>
            <TopStatusBar contentStyle={{ justifyContent: 'center' }} level={level} coin={currency} />

            <Box
                title={'Trade Center'}
                titleContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                titleStyle={{ textAlign: 'center', width: '100%' }}
                contentStyle={{ justifyContent: 'flex-start', paddingTop: 27, overflow: 'hidden', borderRadius: 0 }}
                titleHeight={64}
            >
              <Icon
                  icon={require('@assets/characterfamily.png')}
                  size={{ height: '30%' }}
                  style={styles.footerImage}
              />

              <Icon
                  size={{ width: '100%', height: 30 }}
                  icon={require('@assets/curtain.png')}
                  style={{ position: 'absolute', top: -3 }}
              />

              <View style={{ width: '100%', paddingHorizontal: 20 }}>
                {/* 내 판매목록 보기 체크박스 + 타입 탭 */}
                <View style={styles.checkboxContainer}>
                  <ButtonIconText
                      flexNone
                      style={styles.mySalesBtn}
                      textStyle={styles.mySalesBtnText}
                      icon={showMySales ? require('@assets/checkBox_on.png') : require('@assets/checkBox_off.png')}
                      iconSize={{ width: 12, height: 12 }}
                      text="내 판매목록"
                      type="caption"
                      onPress={() => setShowMySales(!showMySales)}
                      activeOpacity={0.7}
                  />

                  <TypeTabs
                      activeType={activeType}
                      onTypeChange={setActiveType}
                      style={{ alignSelf: 'flex-start', marginTop: 5, marginBottom: 4, marginLeft: 0 }}
                  />
                </View>

                {/* 아이템 리스트 */}
                <Box style={{ width: '100%' }} contentStyle={styles.box}>
                  <View style={styles.listContainer}>
                    <AuctionList
                        items={items}
                        filterType={showMySales ? 'my-sales' : activeFilter}
                        showMySales={showMySales}
                        onItemAction={handleItemPress}
                    />
                  </View>
                </Box>
              </View>
            </Box>

            <AuctionFilter
                activeFilter={activeFilter}
                onChange={setActiveFilter}
            />
          </VStack>
        </MainLayout>

        {/* 일반 확인 모달 */}
        {modalVisible && selectedItem && (
            <ConfirmModal
                visible={modalVisible}
                onConfirm={() => handleConfirm(selectedItem)}
                onCancel={() => setModalVisible(false)}
                message={getConfirmMessage()}
            />
        )}

        {/* 가격 입력 모달 */}
        {priceModalVisible && selectedItem && (
            <PriceInputModal
                visible={priceModalVisible}
                onConfirm={handlePriceConfirm}
                onCancel={handlePriceCancel}
                item={selectedItem}
            />
        )}
      </>
  );
};

const styles = StyleSheet.create({
  // ❌ gap 제거: VStack이 처리
  containerNoGap: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 100,
  },
  box: {
    backgroundColor: '#91B7AB',
    height: '60%',
    width: '100%',
  },
  listContainer: {
    width: '100%',
    height: '100%',
    padding: 10,
    overflow: 'hidden',
  },
  footerImage: {
    position: 'absolute',
    bottom: -15,
    left: 5,
    width: '70%',
    height: '30%',
    zIndex: 100,
  },
  checkboxContainer: {
    width: '100%',
    height: 48,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mySalesBtn: {
    width: 100,
    height: 25,
    backgroundColor: '#C5C5C5',
    borderRadius: 10,
    paddingHorizontal: 3,
  },
  mySalesBtnText: {
    color: 'white',
    marginLeft: 0,
    flex: 2.5,
  },
});

export default CharacterAuction;
