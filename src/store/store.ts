
import { configureStore } from '@reduxjs/toolkit';
import providerReducer from './providerSlice';

export const store = configureStore({
  reducer: {
    providers: providerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

