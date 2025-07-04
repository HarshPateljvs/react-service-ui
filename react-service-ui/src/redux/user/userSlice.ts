import { createSlice } from '@reduxjs/toolkit';
import type {PayloadAction}  from '@reduxjs/toolkit';

export interface User {
  id: number;
  name: string;
  email: string;
}

interface UserState {
  currentUser: User | null;
}

const initialState: UserState = {
  currentUser: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.currentUser = action.payload;
    },
    logout(state) {
      state.currentUser = null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
