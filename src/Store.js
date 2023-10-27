// store.js
import { configureStore } from '@reduxjs/toolkit';
import projectSlice from './Slice/projectSlice';
import ticketSlice from './Slice/ticketSlice';
import WorklogSlice from './Slice/WorklogSlice';
const store = configureStore({
  reducer: {
    projects: projectSlice,
    tickets: ticketSlice,
    worklogs:WorklogSlice,
  },
});

export default store;
