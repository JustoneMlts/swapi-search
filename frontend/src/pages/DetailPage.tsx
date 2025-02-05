import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FullScreenDetailCard } from "../components/FullScreenDetailCard";
import type { SearchResult } from "../types/types";
import { searchApi } from "../controllers/searchController"; // API pour récupérer la fiche
import axios from "axios";

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

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;
  if (!result) return <p>Aucun résultat trouvé.</p>;

  return <FullScreenDetailCard result={result} onClose={() => navigate(-1)} />;
};

export default DetailPage;