import { StyleSheet, View } from 'react-native';
import Modal from '@templates/Modal';
import { useEffect, useState } from 'react';
import Text from '@atoms/text/Text';
import Button from '@atoms/button/Button';
import { useNavigation } from '@react-navigation/native';
import Loading from '@organisms/common/Loading';

const StudyInfo = (props) => {
    const navigation = useNavigation();

    const [studyInfo, setStudyInfo] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const studyAPICall = async () => {
                // 기본 정보 API
                await new Promise(resolve => setTimeout(resolve, 1000));
                return { ...props.study }; // 실제로는 API 응답
            };

            try {
                const res = await studyAPICall();

                setStudyInfo(res);
                setLoading(false);
            } catch (error) {
                console.error('Study Info API 호출 실패:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const enterRoom = () => {
        console.log("스터디 방 입장: ", studyInfo.roomId)
        // navigation.navigate("", {roomId: studyInfo.roomId})
    }

    return (
        <Modal {...props} title="Room Info" overlayStyle={{paddingVertical: 130}}>
            {loading ?
                <Loading />
                :<>
                    <View style={styles.container}>
                        <View style={styles.basicInfoContainer}>
                            <View style={styles.nameContainer}>
                                <Text type="title" style={styles.infoTitle}>Name</Text>
                                <View style={styles.nameTextContainer}>
                                    <Text>{studyInfo.title}</Text>
                                </View>
                            </View>
                            <View style={styles.membersContainer}>
                                <Text type="title" style={styles.infoTitle}>Members</Text>
                                <View style={styles.membersTextContainer}>
                                    <Text>멤버1, 멤버2, 멤버3, 멤버4, 멤버5</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.lineContainer}>
                            <View style={styles.line}/>
                        </View>
                        <View style={styles.detailInfoContainer}>

                        </View>
                        <View style={styles.bottomContainer}>
                            <Button
                                title="입장하기"
                                style={styles.bottomBtn}
                                onPress={() => enterRoom()}/>
                        </View>
                    </View>
                </>
            }
        </Modal>
    );
};
export default StudyInfo;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 20,
    },
    basicInfoContainer:{
        flex: 40,
        justifyContent: 'flex-end',
        gap: 10,
    },
    infoTitle:{
        color: '#91B7AB',
    },
    nameContainer:{
        height: "30%",
        gap: 5,
    },
    nameTextContainer:{
        backgroundColor: 'white',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#C0D6C8',
        paddingVertical: 5,
        paddingHorizontal: 15,
    },
    membersContainer:{
        height: "50%",
        gap: 5
    },
    membersTextContainer:{
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#C0D6C8',
        paddingVertical: 5,
        paddingHorizontal: 15,
    },
    detailInfoContainer:{
        flex: 50,
    },
    bottomContainer:{
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottomBtn:{
        borderRadius: 50,
        paddingVertical: 8
    },
    lineContainer:{
        flex: 5,
        justifyContent: 'center'
    },
    line:{
        width: '100%',
        borderColor: '#91B7AB',
        borderBottomWidth: 1
    }
});