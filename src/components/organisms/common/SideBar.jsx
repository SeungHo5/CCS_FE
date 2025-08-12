import React from 'react';
import { View, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import Box from '@atoms/box/Box';
import BackgroundOverlay from '@atoms/image/BackgroundOverlay';
import ButtonBox from '@atoms/box/ButtonBox';
import { useNavigation } from '@react-navigation/native';
import { Platform, StatusBar as RNStatusBar } from 'react-native';
import Icon from '@atoms/image/Icon';
import Text from '@atoms/text/Text';

const { width } = Dimensions.get('window');

const SideBar = ({ visible, onClose }) => {
  const getIconSource = (icon) => {
    switch (icon) {
      case 'logo':
        return require('@assets/logo.png');
    }
  };

    const menus = [
        {
            icon: 'logo',
            title: '알림',
            link: 'link1'
        },
        {
            icon: 'logo',
            title: '친구관리',
            link: 'Friends'
        },
        {
            icon: 'logo',
            title: '설정',
            link: 'link1'
        },
        {
            icon: 'logo',
            title: '공지사항',
            link: 'link1'
        }
    ]
    // const { user } = useUserStore();

    const userName = "똑똑한참치김치찌개";
    const navigation = useNavigation();

    if (!visible) return null;

    const handleNavigate = (route) => {
        navigation.navigate(route);
    }
    // onPress={() => handleNavigate('AlarmSetting')}

    const paddingTop = Platform.OS === 'android' ? RNStatusBar.currentHeight : 0;
    return (
        <BackgroundOverlay
            onPress={onClose}
            containerStyle={styles.container}
            overlayStyle={styles.overlay}>
                <Box contentStyle={[styles.sidebarWrapper, {paddingTop: paddingTop}]}>
                    {/* 사용자 정보 영역 */}
                    <View style={styles.userSection}>
                        <ButtonBox contentStyle={styles.userButton} onPress={onClose}>
                            <View style={styles.userInfo}>
                                <Icon
                                    icon={require('@assets/logo.png')}
                                    size={{width:40,height:40}}
                                    style={{ marginRight: 15, borderColor: '#91B7AB', borderWidth: 1, borderRadius: 50   }}
                                />
                                <Text type="midium">
                                    {userName}
                                </Text>
                            </View>
                            <Icon
                                icon={require('@assets/arrow.png')}
                                size={5}
                                style={{ marginLeft: 0 }}>
                            </Icon>
                        </ButtonBox>
                    </View>

                    {/* 메뉴 */}
                    <View style={styles.menuSection}>
                        {menus.map((item, index) => (
                            <ButtonBox 
                                key={index}
                                style={{ height: 70, width: '100%', borderBottomColor: '#91B7AB', borderBottomWidth: 1 }}
                                    contentStyle={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingHorizontal: 12,
                                }}
                                onPress={() => handleNavigate(item.link)}>
                                <View style={styles.menuInfo}>
                                    <Icon
                                        icon={getIconSource(item.icon)}
                                        size={20}
                                        style={{ marginRight: 4 }}
                                    />
                                    <Text>
                                        {item.title}
                                    </Text>
                                </View>
                                <Icon
                                    icon={require('@assets/arrow.png')}
                                    size={5}
                                    style={{ marginLeft: 0 }}>
                                </Icon>
                            </ButtonBox>
                        ))}
                    </View>
                </Box>

        </BackgroundOverlay>
    )
}
export default SideBar;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        alignItems: 'flex-end',
    },
    container: {
        width: width * 0.7,
    },
    sidebarWrapper: {
        justifyContent: 'flex-start',
        borderRadius: 0,
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
        borderLeftColor: '#91B7AB',
        borderLeftWidth: 25,
    },
    userSection: {
        borderBottomWidth: 1,
        borderBottomColor: '#91B7AB',
        width: '100%',
        height: '12%',
        justifyContent: 'center',
        paddingRight: 15,
    },
    userButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        maxWidth: '80%',        // 오른쪽 아이콘 침범 방지
    },
    menuInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        maxWidth: '80%',        // 오른쪽 아이콘 침범 방지
        marginTop: 10,
    },
    menuSection: {
        // backgroundColor: 'purple',
        height: '85%',
        width: '100%',
        paddingTop: 30,
        paddingHorizontal: 15,
    },
});
