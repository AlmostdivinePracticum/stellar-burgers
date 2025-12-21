// ./__tests__/userSlice.test.ts
import userReducer, {
  registerUser,
  loginUser,
  checkUserAuth,
  updateUser
} from '../slices/userSlice';
import { TUser } from '@utils-types';

const mockUser: TUser = { name: 'Alexey', email: 'alexey@example.com' };

describe('userSlice async thunks', () => {
  const initialState = {
    user: null,
    isAuthChecked: false,
    loginRequest: false,
    loginError: null,
    registerRequest: false,
    registerError: null
  };

  describe('registerUser', () => {
    it('handles registerUser.pending', () => {
      const action = { type: registerUser.pending.type };
      const state = userReducer(initialState, action);
      expect(state.registerRequest).toBe(true);
      expect(state.registerError).toBeNull();
    });

    it('handles registerUser.fulfilled', () => {
      const action = {
        type: registerUser.fulfilled.type,
        payload: mockUser
      };
      const state = userReducer(initialState, action);
      expect(state.registerRequest).toBe(false);
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthChecked).toBe(true);
    });

    it('handles registerUser.rejected', () => {
      const action = {
        type: registerUser.rejected.type,
        payload: 'Пользователь уже существует'
      };
      const state = userReducer(initialState, action);
      expect(state.registerRequest).toBe(false);
      expect(state.registerError).toBe('Пользователь уже существует');
    });
  });

  describe('loginUser', () => {
    it('Проверка входа пользователя (ожидание)', () => {
      const action = { type: loginUser.pending.type };
      const state = userReducer(initialState, action);
      expect(state.loginRequest).toBe(true);
      expect(state.loginError).toBeNull();
    });

    it('Проверка входа пользователя (выполнено)', () => {
      const action = {
        type: loginUser.fulfilled.type,
        payload: mockUser
      };
      const state = userReducer(initialState, action);
      expect(state.loginRequest).toBe(false);
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthChecked).toBe(true);
    });

    it('Проверка входа пользователя (отказ)', () => {
      const action = {
        type: loginUser.rejected.type,
        payload: 'Неверный пароль'
      };
      const state = userReducer(initialState, action);
      expect(state.loginRequest).toBe(false);
      expect(state.loginError).toBe('Неверный пароль');
    });
  });

  describe('checkUserAuth', () => {
    it('Проверка входа пользователя, пользователь существует (выполнено)', () => {
      const action = {
        type: checkUserAuth.fulfilled.type,
        payload: mockUser
      };
      const state = userReducer(initialState, action);
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthChecked).toBe(true);
    });

    it('Проверка входа пользователя, пользователь не существует (выполнено)', () => {
      const action = {
        type: checkUserAuth.fulfilled.type,
        payload: null
      };
      const state = userReducer(initialState, action);
      expect(state.user).toBeNull();
      expect(state.isAuthChecked).toBe(true);
    });
  });

  describe('updateUser', () => {
    it('Проверка обновление пользователя(выполнено)', () => {
      const updatedUser = { ...mockUser, name: 'User Updated' };
      const action = {
        type: updateUser.fulfilled.type,
        payload: updatedUser
      };
      const state = userReducer({ ...initialState, user: mockUser }, action);
      expect(state.user).toEqual(updatedUser);
    });
  });
});
