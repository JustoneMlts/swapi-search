import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { SearchResult } from "../../types/types";

export interface SearchState {
  searchResults: SearchResult[]; 
  searchResult: SearchResult | undefined;
}

const initialState: SearchState = {
  searchResults: [], 
  searchResult: undefined,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchResults(state, action: PayloadAction<SearchResult[]>) {
      state.searchResults = action.payload; 
    },
    clearSearchResults(state) {
      state.searchResults = []; 
    },
    addSearchResult(state, action: PayloadAction<SearchResult>) {
      state.searchResults.push(action.payload); 
    },
    setSearchResult(state, action: PayloadAction<SearchResult | undefined>) {
      state.searchResult = action.payload; 
    }
  },
});

export const { setSearchResults, clearSearchResults, addSearchResult, setSearchResult } = searchSlice.actions;
export const selectSearchResults = (state: RootState): SearchResult[] | undefined => state.search.searchResults;
export const selectSearchResult = (state: RootState): SearchResult | undefined => state.search.searchResult;
export default searchSlice.reducer;
