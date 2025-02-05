import { useEffect, useState } from "react"
import { SearchBar } from "../components/SearchBar"
import { ResultsList } from "../components/ResultsList"
import { ResultsTable } from "../components/ResultsTable"
import { DetailCard } from "../components/DetailCard"
import type { SearchResult, SearchCategory } from "../types/types"
import { Spinner } from '../components/Spinner';
import { searchApi } from "../controllers/searchController"
import styles from "./Home.module.css"
import { getNameByType } from "../helpers/typeHelper"
import { ModernButton } from "../components/ModernButton"
import { useNavigate } from "react-router-dom"
import { authController } from "../controllers/authController"
import { useDispatch, useSelector } from "react-redux";
import { setSearchResults, clearSearchResults, selectSearchResults, selectSearchResult, setSearchResult } from "../redux/slices/searchSlice"; 

export const Home = ({
  handleLogout
}: {
  handleLogout: () => void;
}) => {
  const searchResults = useSelector(selectSearchResults);
  const selectedResult = useSelector(selectSearchResult);
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"list" | "table">("list")
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSearch = async (query: string, category: SearchCategory): Promise<string[]> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await searchApi(query, category);

      const extractedResults: SearchResult[] = Object.values(response)
        .filter(Array.isArray)
        .flat();
      dispatch(setSearchResults(extractedResults));
      dispatch(setSearchResult(undefined));

      return extractedResults.map((item) => {
        return getNameByType(item)
      });
    } catch (err) {
      setError("An error occurred while searching. Please try again.");
      dispatch(setSearchResults([]));
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetSelectedResult = (result: SearchResult) => {
    dispatch(setSearchResult(result));
  }

  return (
    <div className={styles.app}>
       <div className={styles.logout}>
          <ModernButton onClick={() => {
            authController.logout();
            handleLogout();
            navigate('/')
          }}>
            Logout
          </ModernButton>
        </div>
      <h1 className={styles.title}>Rebel Alliance Explorer</h1>
      <div className={styles.container}>
        <div className={styles.searchBarContainer}>
          <SearchBar onSearch={handleSearch}  />
        </div>
        <div className={styles.content}>
          {isLoading ? (
            <Spinner />
          ) : error ? (
            <p className={styles.error}>{error}</p>
          ) : searchResults && searchResults.length ? (
            <>
              {viewMode === "list" ? (
                <ResultsList results={searchResults} onSelectResult={handleSetSelectedResult} />
              ) : (
                <ResultsTable results={searchResults} onSelectResult={handleSetSelectedResult} />
              )}
              <DetailCard result={selectedResult} />
            </>
          ) : (
            <p>No results found. Try a different search.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home;
