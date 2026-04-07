import { useState } from "react";

function SearchBar({ onSearch }) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text.trim().length < 2) {
      setError("Enter at least 2 characters");
      return;
    }

    setError("");
    onSearch(text);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Search</button>
      {error && <p>{error}</p>}
    </form>
  );
}

export default SearchBar;