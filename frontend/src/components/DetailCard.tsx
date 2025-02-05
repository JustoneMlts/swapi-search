import React, { useState } from "react";
import type { SearchResult } from "../types/types"
import styles from "./DetailCard.module.css"
import { FaUser } from "react-icons/fa";
import { IoMdPlanet } from "react-icons/io";
import { getNameByType } from "../helpers/typeHelper";
import { useNavigate } from "react-router-dom";
import { ModernButton } from "./ModernButton";

interface DetailCardProps {
  result: SearchResult | null
}

const extractPathFromUrl = (url: string): string => {
    const parts = new URL(url).pathname.split("/").filter(Boolean);
    if (parts.length >= 2) {
      return `/${parts[parts.length - 2]}/${parts[parts.length - 1]}`;
    }
    else {
      return url
    }
};

const isSwapiUrl = (value: string): boolean => {
  return value.startsWith("https://swapi.dev/api/");
};

const RenderDetails: React.FC<{ result: Record<string, any> }> = ({ result }) => {
  const [expandedFields, setExpandedFields] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();

  const toggleExpand = (key: string) => {
    setExpandedFields(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div>
      {Object.entries(result)
        .filter(([_, value]) =>
          value !== "" &&
          value !== null &&
          value !== undefined &&
          (!Array.isArray(value) || value.length > 0)
        )
        .map(([key, value]) => {
          return (
            <div key={key}>
              {Array.isArray(value) ? (
                <>
                  <div className={styles.cardText}>
                    <button
                      onClick={() => toggleExpand(key)}
                      className={styles.cardText}
                    >
                      {expandedFields[key] ? "🔽" : "▶️"} <strong>{formatKey(key)}</strong> ({value.length})
                    </button>
                    {expandedFields[key] && (
                      <ul>
                        {value.map((item, index) => {
                          const urlPath = typeof item === "string" && isSwapiUrl(item) ? extractPathFromUrl(item) : null;
                          return (
                            <li key={index}>
                              {urlPath ? (
                                <ModernButton onClick={() => navigate(urlPath)}>
                                  {urlPath}
                                </ModernButton>
                              ) : (
                                typeof item === "object" ? JSON.stringify(item, null, 2) : item
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                </>
              ) : (
                <p>
                  <strong>{formatKey(key)}:</strong> &nbsp;
                  {typeof value === "string" && isSwapiUrl(value) ? (
                    <ModernButton onClick={() => {
                      if (extractPathFromUrl(value) !== null) {
                        navigate(extractPathFromUrl(value))
                      }
                    }}>
                      {extractPathFromUrl(value)}
                    </ModernButton>
                  ) : (
                    value
                  )}
                </p>
              )}
            </div>
          )
        })}
    </div>
  );
};

const formatKey = (key: string) =>
  key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase());


export const DetailCard: React.FC<DetailCardProps> = ({ result }) => {
  if (!result) return null

  const isCharacter = "birth_year" in result

  return (
    <div className={styles.detailCard}>
      <h2>
        {isCharacter ? <FaUser className={styles.icon} /> : <IoMdPlanet className={styles.icon} />}
        {getNameByType(result)}
      </h2>
      <RenderDetails result={result} />
    </div>
  )
}

