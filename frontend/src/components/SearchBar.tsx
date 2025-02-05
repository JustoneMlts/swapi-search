import React, { useState, useEffect, useRef } from "react";
import type { SearchCategory, SearchResult } from "../types/types";
import styles from "./SearchBar.module.css";
import { Search, ChevronDown } from "lucide-react";
import { setSearchResults } from "../redux/slices/searchSlice";


interface SearchBarProps {
  onSearch: (query: string, category: SearchCategory) => Promise<string[]>;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<SearchCategory>("all");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!query.trim()) {
      setSearchResults([])
      return;
    }

    const timer = setTimeout(async () => {
      try {
        await onSearch(query, category);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query, category])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, category);
  };

  return (
    <form className={styles.searchBar} onSubmit={handleSubmit}>
      <div className={styles.searchWrapper}>
        <input
          type="text"
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search the galaxy..."
          className={styles.searchInput}
        />
        <div className={styles.searchControls}>
          <div className={styles.categorySelect}>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as SearchCategory)}
              className={styles.select}
            >
              <option value="all">All</option>
              <option value="people">Characters</option>
              <option value="planets">Planets</option>
              <option value="films">Films</option>
              <option value="starships">Starships</option>
              <option value="species">Species</option>
              <option value="vehicles">Vehicles</option>
            </select>
            <ChevronDown size={20} className={styles.selectIcon} />
          </div>
          <button type="submit" className={styles.searchButton}>
            <Search size={20} />
          </button>
        </div>
      </div>
    </form>
  );
};
