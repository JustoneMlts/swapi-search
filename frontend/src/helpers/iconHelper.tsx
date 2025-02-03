import { PiFilmSlateFill } from "react-icons/pi";
import { FaUser, FaDna, FaCarSide } from "react-icons/fa";
import { IoIosRocket, IoMdPlanet } from "react-icons/io";
import { MdOutlineQuestionMark } from "react-icons/md";
import styles from "../components/ResultsList.module.css"

export const renderIcon = (type: string) => {
    console.log("type : ", type)
    switch (type) {
        case "Character":
            return <FaUser className={styles.icon} size={18} />
        case "Planets":
            return <IoMdPlanet className={styles.icon} size={18} />
        case "Films":
            return <PiFilmSlateFill className={styles.icon} size={18} />
        case "Species":
            return <FaDna className={styles.icon} size={18} />
        case "Vehicles":
            return <FaCarSide className={styles.icon} size={18} />
        case "Starships":
            return <IoIosRocket className={styles.icon} size={18} />
        default:
            return <MdOutlineQuestionMark className={styles.icon} size={18} />
    }
}
