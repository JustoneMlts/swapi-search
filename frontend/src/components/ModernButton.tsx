import type React from "react"
import { ChevronRight } from "lucide-react"
import styles from "./ModernButton.module.css"

interface ModernButtonProps {
  onClick: () => void
  children: React.ReactNode
}

export const ModernButton: React.FC<ModernButtonProps> = ({ onClick, children }) => {
  return (
    <button className={styles.modernButton} onClick={onClick}>
      <span className={styles.buttonText}>{children}</span>
      <ChevronRight className={styles.buttonIcon} size={18} />
    </button>
  )
}

