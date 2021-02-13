import Title from "./Components/Title";
import { LocationContainer } from "./Components/LocationContainer";
import LocationInfo from "./Components/LocationInfo";
import { useState, useEffect } from "react";
import "./App.css";

const SearchBox = ({ handleSearchTerm }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <input
        value={searchTerm}
        style={{
          width: "20rem",
          backgroundColor: "#f4f9f9",
        }}
        onChange={(e) => {
          const value = e.target.value;
          setSearchTerm(value.toLowerCase());
        }}
      />
      <button
        className="mybutton"
        onClick={() => handleSearchTerm(searchTerm, setSearchTerm)}
      >
        Search
      </button>
    </div>
  );
};

function App() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [dimension, setDimension] = useState("");
  const [residents, setResidents] = useState([]);
  const [hasData, setHasData] = useState(false);
  const [query, setQuery] = useState("1");

  useEffect(() => {
    setHasData(false);
    LocationContainer(query).then(
      (res) => {
        //console.log(res.data);
        setHasData(true);
        setName(res.data.name);
        setType(res.data.type);
        setDimension(res.data.dimension);
        setResidents(res.data.residents);
      },
      (error) => console.error(error)
    );
  }, [query]);

  const handleSearch = (value, setSearchTerm) => {
    setQuery(value);
    setSearchTerm("");
  };

  return (
    <div className="App">
      <Title />
      <SearchBox handleSearchTerm={handleSearch} />
      {hasData && (
        <>
          <LocationInfo
            name={name}
            type={type}
            dimension={dimension}
            residents={residents}
          />
        </>
      )}
    </div>
  );
}

export default App;
