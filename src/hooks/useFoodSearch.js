import { useState } from "react";
import axios from "axios";

const useFoodSearch = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchFood = async (query) => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get(
        "https://world.openfoodfacts.org/cgi/search.pl",
        {
          params: {
            search_terms: query,
            search_simple: 1,
            action: "process",
            json: 1,
          },
        }
      );

      // ✅ IMPORTANT FIX
      const filtered = res.data.products.filter(
        (p) => p.product_name
      );

      setResults(filtered || []);

    } catch (err) {
  console.log(err);

  // ✅ Better handling
  setError("Failed to fetch data. Try again.");
}// 👈 see error in console

      if (err.response) setError("Server error");
      else if (err.request) setError("No internet connection");
      else setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { results, loading, error, searchFood };


export default useFoodSearch;