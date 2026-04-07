<<<<<<< HEAD
import { Routes, Route } from "react-router-dom";
import { useReducer } from "react";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import SavedPage from "./pages/SavedPage";

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      if (state.some(item => item.code === action.product.code)) return state;
      return [...state, action.product];

    case "REMOVE":
      return state.filter(item => item.code !== action.code);

    default:
      return state;
  }
};

function App() {
  const [saved, dispatch] = useReducer(reducer, []);

  return (
    <>
      <NavBar count={saved.length} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:barcode" element={<DetailPage saved={saved} dispatch={dispatch} />} />
        <Route path="/saved" element={<SavedPage saved={saved} dispatch={dispatch} />} />
      </Routes>
    </>
=======
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
>>>>>>> 0cc68c4ef3e2bee762aa7d8012b5f3d41a6c0969
  );
}

export default App;