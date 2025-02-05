import { configureStore } from "@reduxjs/toolkit";
import searchReducer, { SearchState } from "./slices/searchSlice";
import { SearchResult } from "../types/types";

export interface RootState {
    search: SearchState;
  }
const store = configureStore({
  reducer: {
    search: searchReducer, 
  },
});

export default store;
