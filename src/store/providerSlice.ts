
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Provider } from '@/types/provider';
import { getProviders } from '@/services/api';
import { addDays, subDays, startOfWeek, format } from "date-fns";

interface ProviderState {
  providers: Provider[];
  loading: boolean;
  error: string | null;
  filters: {
    searchQuery: string;
    selectedService: string;
    selectedType: string;
    selectedCenter: string;
  };
  selectedDate: string;
  view: 'list' | 'calendar';
}

const initialState: ProviderState = {
  providers: [],
  loading: false,
  error: null,
  filters: {
    searchQuery: '',
    selectedService: 'all',
    selectedType: 'all',
    selectedCenter: 'all',
  },
  selectedDate: new Date().toISOString(),
  view: 'list',
};

export const fetchProviders = createAsyncThunk(
  'providers/fetchProviders',
  async () => {
    const response = await getProviders();
    return response;
  }
);
const providerSlice = createSlice({
  name: 'providers',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.filters.searchQuery = action.payload;
    },
    setSelectedService: (state, action) => {
      state.filters.selectedService = action.payload;
    },
    setSelectedType: (state, action) => {
      state.filters.selectedType = action.payload;
    },
    setSelectedCenter: (state, action) => {
      state.filters.selectedCenter = action.payload;
    },
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    setView: (state, action) => {
      state.view = action.payload;
    },
    nextWeek: (state) => {
      state.selectedDate = format(addDays(new Date(state.selectedDate), 7), "yyyy-MM-dd");
    },
    prevWeek: (state) => {
      state.selectedDate = format(subDays(new Date(state.selectedDate), 7), "yyyy-MM-dd");
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProviders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProviders.fulfilled, (state, action) => {
        state.loading = false;
        state.providers = action.payload;
      })
      .addCase(fetchProviders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch providers';
      });
  },
});

export const {
  setSearchQuery,
  setSelectedService,
  setSelectedType,
  setSelectedCenter,
  setSelectedDate,
  setView,
  nextWeek,
  prevWeek, } = providerSlice.actions;

export default providerSlice.reducer;

