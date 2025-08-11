import { configureStore } from '@reduxjs/toolkit';
import adminReducer from '../features/auth/adminSlice';

export const store = configureStore({
  reducer: {
    auth: adminReducer,
  },
});
