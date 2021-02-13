import React from "react";
import useState from "react";

function SearchBox({ handleSearch }) {
  const [searchTerm, setSearchTerm] = useState(""); // Candidato a useCallback y una explicacion del porque

  return (
    <div>
      <input onChange={(e) => setSearchTerm(e.target.value)} />
      <button className="mybutton" onClick={() => handleSearch(searchTerm)}>
        Search
      </button>
    </div>
  );
}
export default SearchBox;
