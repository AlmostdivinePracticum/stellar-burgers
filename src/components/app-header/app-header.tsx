import { FC } from 'react';
import { useAppSelector } from '../../services/store';
import { selectUser } from '../../slices/userSlice';
import { AppHeaderUI } from '@ui';

export const AppHeader: FC = () => {
  const user = useAppSelector(selectUser);
  const userName = user ? user.name : undefined;

  return <AppHeaderUI userName={userName} />;
};
