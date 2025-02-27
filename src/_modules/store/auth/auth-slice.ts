import { User } from '@/app/(authenticated)/(routes)/user-maintenance/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState: any = {
  user: {},
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
     
      state.user = action.payload
      console.log(state)
    },
    logout: (state, action) => {
      state.user = {}
    }
  },
});

export const { login } = authSlice.actions;

export default authSlice.reducer;