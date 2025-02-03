import React, {useState} from "react";
import type { ICharacter, SearchResult } from "../types/types"
import styles from "./DetailCard.module.css"
import { User, Globe, Ruler, Weight, Cake, Users } from "lucide-react"
import { getNameByType } from "../helpers/typeHelper";

interface DetailCardProps {
  result: SearchResult | null
}

const RenderDetails = (result: Record<string, any>) => {
  const [expandedFields, setExpandedFields] = useState<Record<string, boolean>>({});

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
        .map(([key, value]) => (
          <div key={key}>
            {Array.isArray(value) ? (
              <div>
                <button 
                  onClick={() => toggleExpand(key)} 
                  style={{ cursor: "pointer", background: "none", border: "none", fontSize: "16px" }}
                >
                  {expandedFields[key] ? "🔽" : "▶️"} <strong>{formatKey(key)}</strong> ({value.length})
                </button>
                {expandedFields[key] && (
                  <ul>
                    {value.map((item, index) => (
                      <li key={index}>{typeof item === "object" ? JSON.stringify(item, null, 2) : item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              <p>
                <strong>{formatKey(key)}:</strong> 
                &nbsp;{value}
              </p>
            )}
          </div>
        ))}
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
        {isCharacter ? <User className={styles.icon} /> : <Globe className={styles.icon} />}
        {getNameByType(result)}
      </h2>
      {RenderDetails(result)}
    </div>
  )
}

