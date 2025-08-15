import React from 'react';
import { View, StyleSheet } from 'react-native';
import Modal from '@templates/Modal';
import Text from '@atoms/text/Text';
import ButtonIcon from '@atoms/button/ButtonIcon';
import { HStack } from '@ui/Stack'; // ✅ gap 대체

const ConfirmModal = ({ visible, message, onConfirm, onCancel }) => {
  if (!visible) return null;

  return (
      <Modal onPress={onCancel} basicTitle style={styles.modalContainer} contentStyle={styles.modal} isModal>
        <Text style={styles.message}>{message}</Text>

        {/* ✅ gap:12 → HStack gap={12} */}
        <HStack gap={12} justify="center" style={styles.buttonGroupNoGap}>
          <ButtonIcon onPress={onConfirm} style={styles.button} icon={require('@assets/checkY.png')} resizeMode="cover" />
          {onCancel && (
              <ButtonIcon onPress={onCancel} style={styles.button} icon={require('@assets/close.png')} />
          )}
        </HStack>
      </Modal>
  );
};

export default ConfirmModal;

const styles = StyleSheet.create({
  modalContainer:{
    width: 'auto',
    height: 'auto',
    borderRadius: 25,
  },
  modal:{
    backgroundColor: '#C0D6C8',
    borderColor: '#91B7AB',
    borderRadius: 25,
    borderWidth: 3,
    height: 'auto',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  message: {
    marginBottom: 16,
    textAlign: 'center',
    color: 'white',
  },
  // ❌ gap/row 제거 (HStack이 처리)
  buttonGroupNoGap: {},
  button: {
    width: 50,
    height: 30,
    backgroundColor:'#91B7AB',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 100,
  },
});
