import { useNavigate } from "react-router-dom";

function FoodCard({ product }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/${product.code}`)}
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        margin: "10px",
        cursor: "pointer",
        borderRadius: "8px"
      }}
    >
      <h3>{product.product_name || "No Name"}</h3>

      <p>{product.brands || "Unknown Brand"}</p>

      <img
        src={
          product.image_small_url ||
          "https://via.placeholder.com/100"
        }
        alt={product.product_name}
        style={{ width: "100px" }}
      />

      <p>Calories: {product.nutriments?.["energy-kcal_100g"] ?? "N/A"}</p>
      <p>Protein: {product.nutriments?.proteins_100g ?? "N/A"}</p>
      <p>Carbs: {product.nutriments?.carbohydrates_100g ?? "N/A"}</p>
      <p>Fat: {product.nutriments?.fat_100g ?? "N/A"}</p>
    </div>
  );
}

export default FoodCard;