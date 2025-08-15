import { StyleSheet } from 'react-native';
import Input from '@atoms/inputs/Input';
import Button from '@atoms/button/Button';
import { useFormContext } from 'react-hook-form';
import { HStack } from '@ui/Stack'; // ✅ gap 대체

const InputWithCheck = (props) => {
    const { getValues } = useFormContext();

    return (
        // ✅ 가로 + gap:10 + alignItems:'flex-end'
        <HStack gap={10} align="flex-end" style={styles.containerNoGap}>
            <Input
                name={props.name}
                keyboardType={props.keyboardType}
                label={props.label}
                placeholder={props.placeholder}
                style={{ flex: 3 }}
                autoFocus={!!props.autoFocus}
                rules={{ required: props.required }}
            />
            <Button
                onPress={() => props.onPress(getValues(props.name))}
                title={props.title}
                center
                type="caption"
                style={[{ flex: 1, height: 48, paddingHorizontal: 10 }, props.buttonStyle]}
            />
        </HStack>
    );
};
export default InputWithCheck;

const styles = StyleSheet.create({
    // ❌ gap/row 제거(HStack이 처리)
    containerNoGap: {
        width: '100%',
    },
});
