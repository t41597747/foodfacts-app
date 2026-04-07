import SearchBar from "../components/SearchBar";
import FoodCard from "../components/FoodCard";
import useFoodSearch from "../hooks/useFoodSearch";

function HomePage() {
  const { results, loading, error, searchFood } = useFoodSearch();

  return (
    <div>
  <SearchBar onSearch={searchFood} />

  {loading && <p>Loading...</p>}
  {error && <p>{error}</p>}

  <div style={{ display: "flex", flexWrap: "wrap" }}>
    {results.map(item => (
      <FoodCard key={item.code} item={item} />
    ))}
  </div>
</div>
  );
}

export default HomePage;