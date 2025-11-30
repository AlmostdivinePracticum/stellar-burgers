import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { updateUser, logout } from '../../slices/userSlice';
import { selectUser } from '../../slices/userSlice';

export const Profile: FC = () => {
  const dispatch = useAppDispatch();
  const userFromStore = useAppSelector(selectUser);

  const [formValue, setFormValue] = useState({
    name: userFromStore?.name || '',
    email: userFromStore?.email || '',
    password: ''
  });

  useEffect(() => {
    if (userFromStore) {
      setFormValue({
        name: userFromStore.name,
        email: userFromStore.email,
        password: ''
      });
    }
  }, [userFromStore]);

  const isFormChanged =
    formValue.name !== userFromStore?.name ||
    formValue.email !== userFromStore?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (isFormChanged) {
      dispatch(updateUser(formValue));
    }
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    if (userFromStore) {
      setFormValue({
        name: userFromStore.name,
        email: userFromStore.email,
        password: ''
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!userFromStore) {
    return null;
  }

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
