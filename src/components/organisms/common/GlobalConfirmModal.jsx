import React from 'react';
import { View, StyleSheet } from 'react-native';
import Modal from '@templates/Modal';
import Text from '@atoms/text/Text';
import ButtonIcon from '@atoms/button/ButtonIcon';
import useModalStore from '@stores/modalStore';
import { HStack } from '@ui/Stack'; // ✅ gap 대체

const GlobalConfirmModal = () => {
  const { visible, message, handleConfirm, handleCancel, cancelOpen } = useModalStore();

  if (!visible) return null;

  return (
      <Modal
          onPress={handleCancel}
          basicTitle
          style={styles.modalContainer}
          contentStyle={styles.modal}
          containerStyle={{ width: 'auto', height: 'auto' }}
          isModal
      >
        <Text style={styles.message}>{message}</Text>

        {/* gap:12 → HStack으로 치환 */}
        <HStack gap={12} justify="center" style={styles.buttonGroupNoGap}>
          <ButtonIcon
              onPress={handleConfirm}
              style={styles.button}
              icon={require('@assets/checkY.png')}
              resizeMode="cover"
          />
          {cancelOpen && (
              <ButtonIcon
                  onPress={handleCancel}
                  style={styles.button}
                  icon={require('@assets/close.png')}
              />
          )}
        </HStack>
      </Modal>
  );
};
export default GlobalConfirmModal;

const styles = StyleSheet.create({
  modalContainer: {
    width: 'auto',
    height: 'auto',
    borderRadius: 25,
  },
  modal: {
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
  // ❌ flexDirection/gap/justify 제거 → HStack이 처리
  buttonGroupNoGap: {},
  button: {
    width: 50,
    height: 30,
    backgroundColor: '#91B7AB',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 100,
  },
});
