import type React from "react"
import { useState } from "react"
import type { SearchResult } from "../types/types"
import styles from "./FullScreenDetailCard.module.css"
import { User, Globe, ArrowLeft } from "lucide-react"
import { getNameByType } from "../helpers/typeHelper"
import { ModernButton } from "./ModernButton"
import { useNavigate } from "react-router-dom"
import { isSwapiUrl, extractPathFromUrl, formatKey, formatDate } from "../helpers/renderHelper"

interface FullScreenDetailPageProps {
    result: SearchResult | null
    onClose: () => void
}

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
                ))}
        </div>
    )
}

export const FullScreenDetailCard: React.FC<FullScreenDetailPageProps> = ({ result, onClose }) => {

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
                <RenderDetails result={result} /> 
            </div>
        </div>
    )
}

