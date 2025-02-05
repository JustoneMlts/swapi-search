import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FullScreenDetailCard } from "../components/FullScreenDetailCard";
import type { SearchResult } from "../types/types";
import axios from "axios";
import { Spinner } from "../components/Spinner";
import styles from "./DetailPage.module.css"

const DetailPage = () => {
  const { category, id } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!category || !id) return;

      try {
        const response = await axios.get(`https://swapi.dev/api/${category}/${id}/`);
        setResult(response.data);
      } catch (err) {
        setError("Impossible de charger les détails.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category, id]);

  if (loading) return (
    <div className={styles.detailContent}>
      <Spinner></Spinner>
    </div>
  );
  if (error) return <p>Erreur : {error}</p>;
  if (!result) return <p>Aucun résultat trouvé.</p>;

  return <FullScreenDetailCard result={result} onClose={() => navigate(-1)} />;
};

export default DetailPage;