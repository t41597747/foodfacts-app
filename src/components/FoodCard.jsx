<<<<<<< HEAD
import { useNavigate } from "react-router-dom";

function FoodCard({ item }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/${item.code}`)}
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        margin: "10px",
        cursor: "pointer"
      }}
    >
      <h3>{item.product_name}</h3>
      <p>{item.brands}</p>
=======
function FoodCard({ product }) {
  return (
    <div className="card">
      <h3>{product.product_name || "No Name"}</h3>
      
      <p>{product.brands || "Unknown Brand"}</p>

      <img
        src={
          product.image_small_url ||
          "https://via.placeholder.com/100"
        }
        alt={product.product_name}
      />

      <p>Calories: {product.nutriments?.["energy-kcal_100g"] ?? "N/A"}</p>
      <p>Protein: {product.nutriments?.proteins_100g ?? "N/A"}</p>
      <p>Carbs: {product.nutriments?.carbohydrates_100g ?? "N/A"}</p>
      <p>Fat: {product.nutriments?.fat_100g ?? "N/A"}</p>
>>>>>>> 0cc68c4ef3e2bee762aa7d8012b5f3d41a6c0969
    </div>
  );
}

export default FoodCard;