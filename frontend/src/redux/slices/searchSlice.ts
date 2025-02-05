import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { SearchResult } from "../../types/types";

export interface SearchState {
  searchResult: SearchResult[]; 
  searchInput: string;
}

const initialState: SearchState = {
  searchResult: [], 
  searchInput: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchResults(state, action: PayloadAction<SearchResult[]>) {
      state.searchResult = action.payload; 
    },
    clearSearchResults(state) {
      state.searchResult = []; 
    },
    addSearchResult(state, action: PayloadAction<SearchResult>) {
      state.searchResult.push(action.payload); 
    },
    setSearchInput(state, action: PayloadAction<string>) {
      state.searchInput = action.payload; 
    }
  },
});

export const { setSearchResults, clearSearchResults, addSearchResult, setSearchInput } = searchSlice.actions;
export const selectSearchResults = (state: RootState): SearchResult[] | undefined => state.search.searchResult;
export const selectSearchInput = (state: RootState): string | undefined => state.search.searchInput;
export default searchSlice.reducer;
