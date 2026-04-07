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
    </div>
  );
}

export default FoodCard;