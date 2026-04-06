import { useState } from "react";
import SearchBar from "./components/SearchBar";
import FoodList from "./components/FoodList";

function App() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query) => {
    try {
      setLoading(true);
      setHasSearched(true);

      const res = await fetch(
        `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
          query
        )}&search_simple=1&action=process&json=1`
      );

      const data = await res.json();

      const filtered = data.products.filter(
        (p) => p.product_name && p.product_name.trim() !== ""
      );

      setResults(filtered);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>FoodFacts</h1>

      <SearchBar onSearch={handleSearch} />

      {/* Loading State */}
      {loading && <p>Loading...</p>}

      {/* Initial State (before search) */}
      {!loading && !hasSearched && (
        <p>Search for a food to see nutrition 🍎</p>
      )}

      {/* No Results */}
      {!loading && hasSearched && results.length === 0 && (
        <p>No results found 😢</p>
      )}

      {/* Results */}
      {!loading && results.length > 0 && (
        <FoodList products={results} />
      )}
    </div>
  );
}

export default App;