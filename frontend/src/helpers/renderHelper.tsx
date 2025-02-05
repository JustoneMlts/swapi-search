import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ModernButton } from "../components/ModernButton";
import styles from "../components/DetailCard.module.css"

export const extractPathFromUrl = (url: string): string => {
  const parts = new URL(url).pathname.split("/").filter(Boolean);
  if (parts.length >= 2) {
    return `/${parts[parts.length - 2]}/${parts[parts.length - 1]}`;
  }
  return url;
};

export const isSwapiUrl = (value: string): boolean => {
  return value.startsWith("https://swapi.dev/api/");
};

export const formatKey = (key: string): string => {
  return key
      .replace(/_/g, " ")  
      .replace(/\b\w/g, (char) => char.toUpperCase()); 
}

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString); 

  const options: Intl.DateTimeFormatOptions = {
      weekday: 'long', 
      year: 'numeric', 
      month: 'long',   
      day: 'numeric',  
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit', 
      hour12: true 
  };

  return date.toLocaleString('fr-FR', options); 
}


export const RenderDetails: React.FC<{ result: Record<string, any> }> = ({ result }) => {
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
        .map(([key, value]) => (
          <div key={key}>
            {Array.isArray(value) ? (
              <div>
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
            ) : (
              <p>
                <strong>{formatKey(key)}:</strong> &nbsp;
                {typeof value === "string" && isSwapiUrl(value) ? (
                  <ModernButton onClick={() => navigate(value)}>
                    {value}
                  </ModernButton>
                ) : (
                  value
                )}
              </p>
            )}
          </div>
        ))}
    </div>
  );
};

