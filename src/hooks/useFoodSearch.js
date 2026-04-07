import { useState } from "react";

const useFoodSearch = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchFood = async (query) => {
    if (!query) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
          query
        )}&search_simple=1&action=process&json=1`
      );

      const data = await res.json();

      // 🔥 IMPORTANT: fallback if API structure changes
      const products = data.products || [];

      const filtered = products.filter(
        (p) => p.product_name && p.product_name.trim() !== ""
      );

      setResults(filtered);
    } catch (err) {
      console.log("REAL ERROR:", err); // 👈 see this in console
      setError(""); // ❌ remove visible error
      setResults([]); // safe fallback
    }

    setLoading(false);
  };

  return { results, loading, error, searchFood };
};

export default useFoodSearch;