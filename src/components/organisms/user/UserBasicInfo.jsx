import { StyleSheet, View } from 'react-native';
import Text from '@atoms/text/Text';
import Icon from '@atoms/image/Icon';
import Button from '@atoms/button/Button';
import { getCharacterImage } from '@utils/imageMapping';
import ButtonIcon from '@atoms/button/ButtonIcon';
import { updateMyInfo } from '@services/userAPI';
import useModalStore from '@stores/modalStore';
import { useUserStore } from '@stores/userStore';
import { VStack, HStack } from '@ui/Stack'; // ✅ gap 대체

const UserBasicInfo = (props) => {
  const { fetchUser } = useUserStore();
  const showConfirm = useModalStore((state) => state.showConfirm);
  const levelProgress = (props.user?.levelProgress) + '%';

  const updateMyInfoAPICall = async (newNickName) => {
    const res = await updateMyInfo(newNickName);
    if (res.success) showConfirm('닉네임이 변경되었습니다.', false, () => fetchUser(), () => fetchUser());
  };

  return (
      <View style={styles.container}>
        <View style={styles.profileImgContainer}>
          <View style={styles.profileImgBackground}>
            <Icon
                style={styles.profileImg}
                icon={getCharacterImage(props.user?.selectedCharacterId)}
            />
          </View>
        </View>

        {/* ✅ 세로 간격 8 → VStack */}
        <VStack gap={8} style={styles.infoContainerNoGap}>
          <Button title="이름" type="caption" center disabled style={styles.infoTitle} />
          <View style={styles.name}>
            <Text type="caption">{props.user?.nickname}</Text>
            {props.me && (
                <ButtonIcon
                    style={styles.settingIcon}
                    icon={require('@assets/img/common/setting.png')}
                    onPress={() => updateMyInfoAPICall('지렁지렁이')}
                />
            )}
          </View>

          {/* ✅ 가로 간격 15 → HStack */}
          <HStack gap={15} align="center">
            <Button title="순위" type="caption" center disabled style={styles.infoTitle} />
            <Text type="caption">{props.user?.rank ? props.user.rank + '위' : '없음'}</Text>
          </HStack>

          <View>
            {/* ✅ 가로 간격 15 → HStack */}
            <HStack gap={15} align="center">
              <Button title="레벨" type="caption" center disabled style={styles.infoTitle} />
              <Text type="caption">Lv {props.user?.currentLevel}</Text>
            </HStack>
          </View>

          <View style={styles.exp}>
            <View style={[{ width: levelProgress }, styles.currentExp]} />
          </View>
          <Text type="caption" style={{ textAlign: 'center' }}>
            {props.user?.currentLevelExp} / {props.user?.expToNextLevel}
          </Text>
        </VStack>
      </View>
  );
};
export default UserBasicInfo;

const styles = StyleSheet.create({
  container: {
    flex: 40,
    flexDirection: 'row',
    paddingTop: 20,
  },
  profileImgContainer: {
    width: '45%',
    height: '100%',
    paddingLeft: 20,
    paddingRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImgBackground: {
    width: '100%',
    aspectRatio: 1,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 500,
    borderColor: '#E6E6E6',
    borderWidth: 2,
  },
  profileImg: {
    width: '100%',
    height: '100%',
  },
  // ❌ gap 제거 (VStack이 처리)
  infoContainerNoGap: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 20,
  },
  infoTitle: {
    paddingVertical: 3,
    paddingHorizontal: 18,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  name: {
    width: '80%',
    backgroundColor: '#D9D9D9',
    paddingVertical: 3,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  // rankContainer는 제거하고 HStack으로 대체
  settingIcon: {
    position: 'absolute',
    width: 20,
    height: 20,
    top: -10,
    right: -5,
  },
  exp: {
    borderWidth: 1,
    borderColor: '#C0DACB',
    backgroundColor: 'white',
    height: 10,
    width: '100%',
  },
  currentExp: {
    backgroundColor: '#E4CC71',
    height: '100%',
  },
});
