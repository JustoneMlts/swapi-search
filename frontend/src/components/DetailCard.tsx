import React, { useState } from "react";
import type { SearchResult } from "../types/types"
import styles from "./DetailCard.module.css"
import { FaUser } from "react-icons/fa";
import { IoMdPlanet } from "react-icons/io";
import { getNameByType } from "../helpers/typeHelper";
import { useNavigate } from "react-router-dom";
import { ModernButton } from "./ModernButton";
import { extractPathFromUrl, isSwapiUrl, formatKey, formatDate } from "../helpers/renderHelper";

interface DetailCardProps {
  result: SearchResult | undefined
}

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
                    (key.toLowerCase().includes("created") || key.toLowerCase().includes("edited")) ? formatDate(value) : value
                  )}
                </p>
              )}
            </div>
          )
        })}
    </div>
  );
};

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

