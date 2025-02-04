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

export const Home = ({
  handleLogout
}: {
  handleLogout: () => void;
}) => {
  const [results, setResults] = useState<SearchResult[]>([])
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"list" | "table">("list")
  const navigate = useNavigate();

  const handleSearch = async (query: string, category: SearchCategory): Promise<string[]> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await searchApi(query, category);

      const extractedResults: SearchResult[] = Object.values(response)
        .filter(Array.isArray)
        .flat();

      setResults(extractedResults);
      setSelectedResult(null);

      return extractedResults.map((item) => {
        return getNameByType(item)
      });
    } catch (err) {
      setError("An error occurred while searching. Please try again.");
      setResults([]);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

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
      <h1 className={styles.title}>Star Wars Explorer</h1>
      <div className={styles.container}>
        <div className={styles.searchBarContainer}>
          <SearchBar onSearch={handleSearch} setResults={setResults} />
        </div>
        <div className={styles.content}>
          {isLoading ? (
            <Spinner />
          ) : error ? (
            <p className={styles.error}>{error}</p>
          ) : results && results.length ? (
            <>
              {viewMode === "list" ? (
                <ResultsList results={results} onSelectResult={setSelectedResult} />
              ) : (
                <ResultsTable results={results} onSelectResult={setSelectedResult} />
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
