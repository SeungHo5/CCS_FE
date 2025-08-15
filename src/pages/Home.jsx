import { StyleSheet, View } from 'react-native';
import MainLayout from '../components/templates/MainLayout';
import FloatingIcon from '@atoms/image/FloatingIcon';
import StudyBox from '@organisms/home/StudyBox';
import ChallengeBox from '@organisms/home/ChallengeBox';
import RankBox from '@organisms/home/RankBox';
import { VStack } from '@ui/Stack'; // ✅ gap 대체 (대문자 S)

const Home = () => {
    return (
        <MainLayout style={styles.containerNoGap}>
            {/* ✅ gap: 20 → VStack gap={20} */}
            <VStack gap={20} align="center">
                <View style={styles.logo}>
                    <FloatingIcon icon={require('@assets/logo.png')} />
                </View>
                <ChallengeBox />
                <StudyBox />
                <RankBox />
            </VStack>
        </MainLayout>
    );
};
export default Home;

const styles = StyleSheet.create({
    // ❌ gap 제거 (VStack이 처리)
    containerNoGap: {
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    logo: {
        height: 300,
        justifyContent: 'center',
    },
});
