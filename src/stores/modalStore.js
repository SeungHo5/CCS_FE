import { create } from 'zustand';

const useModalStore = create((set, get) => ({
  // 상태
  visible: false,
  message: '',
  onConfirm: null,
  onCancel: null,
  cancelOpen: null,
  
  // 액션들
  showConfirm: (message, cancelOpen, onConfirm, onCancel) => set({
    visible: true,
    message,
    cancelOpen: cancelOpen || null,
    onConfirm: onConfirm || null,
    onCancel: onCancel || null,
  }),
  
  hide: () => set({
    visible: false,
    message: '',
    onConfirm: null,
    onCancel: null,
    cancelOpen: null,
  }),
  
  // 확인 버튼 클릭 처리
  handleConfirm: () => {
    const { onConfirm, hide } = get();
    if (onConfirm) {
      onConfirm();
    }
    hide();
  },
  
  // 취소 버튼 클릭 처리
  handleCancel: () => {
    const { onCancel, hide } = get();
    if (onCancel) {
      onCancel();
    }
    hide();
  },
}));

export default useModalStore;