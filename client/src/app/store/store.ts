import { configureStore } from '@reduxjs/toolkit';

import { sessionReducer } from '@/entities/session';

export const store = configureStore({
  reducer: {
    session: sessionReducer,
  },
});
