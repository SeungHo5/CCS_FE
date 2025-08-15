import ButtonIcon from '@atoms/button/ButtonIcon';
import { useFormContext } from 'react-hook-form';

const SubmitButtonIcon = ({ onSubmit, title = '제출', ...props }) => {
  const { handleSubmit } = useFormContext();

  return (
    <ButtonIcon
      onPress={handleSubmit(onSubmit)}
      {...props}
    />
  );
};

export default SubmitButtonIcon;
