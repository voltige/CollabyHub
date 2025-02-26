import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import projectReducer from './slices/projectSlice';
import notificationReducer from './slices/notificationSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    projects: projectReducer,
    notifications: notificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;