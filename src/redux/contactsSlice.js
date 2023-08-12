import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchContacts } from 'services/api';

const initialState = {
  contacts: [],
  isLoading: false,
    error: null,
  filter: '',
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action) => {
      state.contacts.push(action.payload);
    },
    deleteContact: (state, action) => {
      state.contacts = state.contacts.filter(
        contact => contact.id !== action.payload
      );
    },
    filterContacts: (state, action) => {
      state.filter = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchContactsThunk.pending, (state, action) => {
        // state.isLoading = true
        // state.error = false
      })
      .addCase(fetchContactsThunk.fulfilled, (state, action) => {
        // state.isLoading = false
        // state.contacts = action.payload
        console.log(action.payload);
      })
      .addCase(fetchContactsThunk.rejected, (state, action) => {
        // state.isLoading = false
        // state.error = action.payload
      });
  }
});


export const fetchContactsThunk = createAsyncThunk('contacts/fetchContactsThunk', async (_, thunkApi) => {
  try {
  const response = await fetchContacts();
  return response
    
  } catch (error) {
    return thunkApi.rejectWithValue(error.message)
  }
});


export const { addContact, deleteContact, filterContacts } =
  contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;
