import { useNavigate } from "react-router-dom";

function SavedPage({ saved, dispatch }) {
  const navigate = useNavigate();

  if (saved.length === 0) return <h2>No saved items</h2>;

  return (
    <div>
      {saved.map(item => (
        <div key={item.code} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <h3>{item.product_name}</h3>
          <p>{item.brands}</p>

          <button onClick={() => navigate(`/product/${item.code}`)}>
            View Details
          </button>

          <button onClick={() => dispatch({ type: "REMOVE", code: item.code })}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

export default SavedPage;