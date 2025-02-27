import { User } from '@/app/(authenticated)/(routes)/user-maintenance/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  data: User[]
}

const initialState: UserState = {
  data: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    createUser: (state, action) => {
      state.data.push(action.payload)
    },
    updateUser: (state, action) => {
      const { id } = action.payload
      const updatedUser = action.payload
      const userIdx = state.data.findIndex(item => item.id === id)
      state.data[userIdx] = updatedUser
    },
    deleteUser: (state, action) => {
      const { id } = action.payload
      const userIdx = state.data.findIndex(item => item.id === id)
      state.data.splice(userIdx, 1)
    }
  },
});

export const { createUser, updateUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;