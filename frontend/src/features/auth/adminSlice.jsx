import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = 'http://localhost:5000/api/admin';

// Async Thunks for login and signup
export const signupAdmin = createAsyncThunk('admin/signup', async (adminData, thunkAPI) => {
  try {
    const response = await axios.post(`${API}/signup`, adminData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Signup failed');
  }
});

export const loginAdmin = createAsyncThunk('admin/login', async (adminData, thunkAPI) => {
  try {
    const response = await axios.post(`${API}/login`, adminData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Login failed');
  }
});

// Initial state
const initialState = {
  admin: JSON.parse(localStorage.getItem('admin')) || null,
  loading: false,
  error: null,
};

// Slice
const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    logoutAdmin: (state) => {
      state.admin = null;
      localStorage.removeItem('admin');
    },
  },
  extraReducers: (builder) => {
    builder
      // Signup
      .addCase(signupAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload;
        localStorage.setItem('admin', JSON.stringify(action.payload));
      })
      .addCase(signupAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Login
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload;
        localStorage.setItem('admin', JSON.stringify(action.payload));
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;
