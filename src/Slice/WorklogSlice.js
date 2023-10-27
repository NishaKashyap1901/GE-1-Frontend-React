
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  worklogs: [],
  status: 'idle',
  error: null,
};

const worklogSlice = createSlice({
  name: 'worklogs',
  initialState,
  reducers: {
    addWorklogPending: (state) => {
      state.status = 'loading';
    },
    addWorklogFulfilled: (state, action) => {
      state.status = 'succeeded';
      state.worklogs.push(action.payload);
    },
    addWorklogRejected: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    fetchWorklogsStart(state) {
      state.status = 'loading';
    },
    fetchWorklogsSuccess(state, action) {
      state.status = 'succeeded';
      state.worklogs = action.payload;
    },
    fetchWorklogsFailure(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const {
  fetchWorklogsStart,
  fetchWorklogsSuccess,
  fetchWorklogsFailure,
  addWorklogPending,
  addWorklogFulfilled,
  addWorklogRejected,
} = worklogSlice.actions;

export default worklogSlice.reducer;

// Action to add a worklog to the backend
export const addWorklogToBackend = (worklogData) => {
  return async (dispatch) => {
    dispatch(addWorklogPending());
    try {
      const response = await axios.post('http://localhost:8080/worklogs', worklogData); // Replace with your API endpoint
      dispatch(addWorklogFulfilled(response.data)); // Update the state with the added worklog
    } catch (error) {
      dispatch(addWorklogRejected(error.message));
    }
  };
};


export const fetchWorklogs = (ticketId) => {
  return async (dispatch) => {
    dispatch(fetchWorklogsStart());
    try {
      const response = await axios.get(`http://localhost:8080/worklogs/by-ticket/${ticketId}`);

      if (response.status === 200) {
        const data = response.data;
        dispatch(fetchWorklogsSuccess(data));
      } else {
        throw new Error('Failed to fetch worklogs');
      }
    } catch (error) {
      dispatch(fetchWorklogsFailure(error.message));
    }
  };
};
