import React from "react"
import type { SearchResult } from "../types/types"
import styles from "./ResultsList.module.css"
import { renderIcon } from "../helpers/iconHelper";
import { getNameByType, getType } from "../helpers/typeHelper";

interface ResultsListProps {
  results: SearchResult[]
  onSelectResult: (result: SearchResult) => void
}

export const ResultsList: React.FC<ResultsListProps> = ({ results, onSelectResult }) => {
  return (
    <ul className={styles.resultsList}>
      {results && results.map((result, index) => (
        <li key={index} className={styles.resultItem} onClick={() => onSelectResult(result)}>
          {renderIcon(getType(result))}
          {getNameByType(result)}
        </li>
      ))}
    </ul>
  )
}

