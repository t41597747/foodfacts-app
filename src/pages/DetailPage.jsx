import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function DetailPage({ saved, dispatch }) {
  const { barcode } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const isSaved = saved.some(p => p.code === barcode);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
        );

        if (!cancelled) {
          setProduct(res.data.product);
          setLoading(false);
        }
      } catch {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [barcode]);

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>No product found</p>;

  return (
    <div>
      <button onClick={() => navigate(-1)}>⬅ Back</button>

      <h2>{product.product_name}</h2>
      <p><b>Brand:</b> {product.brands}</p>

      <p><b>Calories:</b> {product.nutriments?.energy}</p>
      <p><b>Fat:</b> {product.nutriments?.fat}</p>
      <p><b>Carbs:</b> {product.nutriments?.carbohydrates}</p>
      <p><b>Protein:</b> {product.nutriments?.proteins}</p>

      <button
        onClick={() =>
          isSaved
            ? dispatch({ type: "REMOVE", code: barcode })
            : dispatch({ type: "ADD", product })
        }
      >
        {isSaved ? "Remove" : "Save"}
      </button>
    </div>
  );
}

export default DetailPage;