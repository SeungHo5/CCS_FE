import { ScrollView, StyleSheet, View } from "react-native";
import StudyListButton from '@molecules/study/StudyListButton';

const StudyList = (props) => {
    const getIconSource = (icon) => {
        switch (icon) {
            case 'studyRoom':
                return require('@assets/studyRoom.png');
            case 'studyRoom2':
                return require('@assets/studyRoom2.png');
        }
    };

    return (
        <ScrollView style={{width: '90%', marginBottom: 20}} contentContainerStyle={{ alignItems: 'center', gap: 10}}>
            {props.studyList.map((item, index) => (
                (props.filter && !item.isStudying || !props.filter) &&
                <StudyListButton
                    key={index}
                    icon={getIconSource(item.icon)}
                    index={index}
                    title={item.title}
                    status={item.status}
                    personnel={item.personnel}
                    isStudying={item.isStudying}
                    onPress={()=>props.onPress(index)}
                />
            ))}
        </ScrollView>
    );
};
export default StudyList;

const styles = StyleSheet.create({
});