import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store/index';

interface UserState {
  user: string;
}
const initialState: UserState = {
  user: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState as UserState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    loginSuccess: (state) => {
      sessionStorage.setItem('usertoken', state.user);
    },
    logout: (state) => {
      state.user = '';
    },
    logoutSuccess: () => {
      sessionStorage.clear();
    },
  },
});

export const { login, loginSuccess, logout, logoutSuccess } = userSlice.actions;

export const selectUser = (state: RootState): UserState['user'] =>
  state.user.user;

export default userSlice.reducer;
