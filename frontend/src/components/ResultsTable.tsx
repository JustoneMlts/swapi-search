import type React from "react";
import type { SearchResult, ICharacter, IPlanet } from "../types/types";
import styles from "./ResultsTable.module.css";
import { renderIcon } from "../helpers/iconHelper";
import { getNameByType } from "../helpers/typeHelper";

interface ResultsTableProps {
  results: SearchResult[];
  onSelectResult: (result: SearchResult) => void;
}

const isCharacter = (result: SearchResult): result is ICharacter => {
  return "height" in result;
};

export const ResultsTable: React.FC<ResultsTableProps> = ({ results, onSelectResult }) => {
  if (results.length === 0) return null;

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.resultsTable}>
        <thead>
          <tr>
            <th>Name</th>
            {results.length > 0 && isCharacter(results[0]) ? (
              <>
                <th>Height</th>
                <th>Mass</th>
                <th>Birth Year</th>
              </>
            ) : (
              <>
                <th>Climate</th>
                <th>Terrain</th>
                <th>Population</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index} onClick={() => onSelectResult(result)}>
              <td>
                {renderIcon(typeof result)}
                {getNameByType(result)}
              </td>
              {isCharacter(result) ? (
                <>
                  <td>{result.height}</td>
                  <td>{result.mass}</td>
                  <td>{result.birthYear}</td>
                </>
              ) : (
                (() => {
                  const planet = result as IPlanet;
                  return (
                    <>
                      <td>{planet.climate}</td>
                      <td>{planet.terrain}</td>
                      <td>{planet.population}</td>
                    </>
                  );
                })()
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

