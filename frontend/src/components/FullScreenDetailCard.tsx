import type React from "react"
import { useState } from "react"
import type { SearchResult } from "../types/types"
import styles from "./FullScreenDetailCard.module.css"
import { User, Globe, ArrowLeft } from "lucide-react"
import { getNameByType } from "../helpers/typeHelper"
import { ModernButton } from "./ModernButton"
import { useNavigate } from "react-router-dom"

interface FullScreenDetailPageProps {
    result: SearchResult | null
    onClose: () => void
}

const extractPathFromUrl = (url: string): string | null => {
    try {
        const parts = new URL(url).pathname.split("/").filter(Boolean);
        if (parts.length >= 2) {
            return `/${parts[parts.length - 2]}/${parts[parts.length - 1]}`;
        }
    } catch (e) {
        return null;
    }
    return null;
};

const isSwapiUrl = (value: string): boolean => {
    return value.startsWith("https://swapi.dev/api/");
};

const RenderDetails: React.FC<{ result: Record<string, any> }> = ({ result }) => {
    const [expandedFields, setExpandedFields] = useState<Record<string, boolean>>({})
    const navigate = useNavigate();

    const toggleExpand = (key: string) => {
        setExpandedFields((prev) => ({ ...prev, [key]: !prev[key] }))
    }

    return (
        <div className={styles.detailsContainer}>
            {Object.entries(result)
                .filter(([_, value]) =>
                    value !== "" &&
                    value !== null &&
                    value !== undefined &&
                    (!Array.isArray(value) || value.length > 0)
                )
                .map(([key, value]) => (
                    <div key={key} className={styles.detailItem}>
                        {Array.isArray(value) ? (
                            <div>
                                <button
                                    onClick={() => toggleExpand(key)}
                                    className={styles.expandButton}
                                >
                                    {expandedFields[key] ? "🔽" : "▶️"} <strong>{formatKey(key)}</strong> ({value.length})
                                </button>
                                {expandedFields[key] && (
                                    <ul className={styles.expandedList}>
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
    )
}

const formatKey = (key: string) => key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())

export const FullScreenDetailCard: React.FC<FullScreenDetailPageProps> = ({ result, onClose }) => {
    const [expandedFields, setExpandedFields] = useState<Record<string, boolean>>({}) // Moved useState here

    if (!result) return null

    const isCharacter = "birth_year" in result

    return (
        <div className={styles.fullScreenPage}>
            <div className={styles.header}>
                <button onClick={onClose} className={styles.backButton}>
                    <ArrowLeft size={24} />
                    Back
                </button>
                <h1 className={styles.title}>
                    {isCharacter ? <User className={styles.icon} /> : <Globe className={styles.icon} />}
                    {getNameByType(result)}
                </h1>
            </div>
            <div className={styles.content}>
                <RenderDetails result={result} /> {/* Pass result prop to RenderDetails */}
            </div>
        </div>
    )
}

