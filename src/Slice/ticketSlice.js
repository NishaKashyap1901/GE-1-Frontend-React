import { createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
  tickets: [],
  userTickets: [],
  status: false,
  error: null,
};

export const getTicketsOfUser = (id) => {
  console.log("user Id",id)
  return async (dispatch) => {
    dispatch(fetchUserTicketPending());
    try {
      const response = await axios.get(`http://localhost:8080/tickets/user/${id}`);
      console.log("user Ticket.............",response.data);
      dispatch(fetchUserTicketFulfilled(response.data));
    } catch (error) {
      console.log("Error fetching Ticket of User:", error);
      dispatch(fetchUserTicketRejected(error.message));
    }
  };
};

export const fetchTickets = () => {
  return async (dispatch) => {
    dispatch(fetchTicketsPending());
    try {
      const response = await axios.get('http://localhost:8080/tickets');
      console.log(response.data);
      dispatch(fetchTicketsFulfilled(response.data));
    } catch (error) {
      console.error("Error fetching projects:", error);
      dispatch(fetchTicketsRejected(error.message));
    }
  };
};

export const addTicket = (newTicketData) => {
  return async (dispatch) => {
    try {
      // You can make a POST request to add a new ticket
      const response = await axios.post('http://localhost:8080/tickets', newTicketData);

      // Dispatch an action to update the state
      dispatch(addTicketFulfilled(response.data));
    } catch (error) {
      // Handle errors
      // console.error("Error adding a ticket:", error);
      dispatch(addTicketRejected(error.message));
    } 
  };
};

// Fetch tickets by project ID
export const fetchTicketsByProject = (projectId) => {
  return async (dispatch) => {
    // console.log(".................");
    dispatch(fetchTicketsPending());
    try {
      const response = await axios.get(`http://localhost:8080/projects/${projectId}/ticket`);
      // console.log("Inside ticket Slice  try.....",response.data);
      dispatch(fetchTicketsFulfilled(response.data.tickets));
    } catch (error) {
      // console.error("Error fetching tickets:", error);
      dispatch(fetchTicketsRejected(error.message));
    }
  };
};

const ticketsSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers: {

      setTickets: (state, action) => {
        state.userTickets = action.payload;
      },

        fetchTicketsPending: (state) => {
        state.status = true;
      },
      fetchTicketsFulfilled: (state, action) => {
        // console.log(state);
        state.status = false;
        state.tickets = action.payload;
      },
      fetchTicketsRejected: (state, action) => {
        state.status = false;
        state.error = action.payload;
      },
      addTicketPending: (state) => {
        state.status = true;
      },
      addTicketFulfilled: (state, action) => {
        state.status = false;
        state.tickets.push(action.payload); // Assuming the response contains the new ticket
      },
      addTicketRejected: (state, action) => {
        state.status = false;
        state.error = action.payload;
      },
      fetchUserTicketPending: (state) => {
        state.status = 'loading';
      },
      fetchUserTicketFulfilled: (state, action) => {
        // console.log(state);
        state.status = 'succeeded';
        state.tickets = action.payload;
      },
      fetchUserTicketRejected: (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      },
    },
});
export const {
    fetchTicketsPending,
    fetchTicketsFulfilled,
    fetchTicketsRejected,
    addTicketPending,
  addTicketFulfilled,
  addTicketRejected,fetchUserTicketFulfilled,fetchUserTicketPending,fetchUserTicketRejected
} = ticketsSlice.actions;
export default ticketsSlice.reducer;