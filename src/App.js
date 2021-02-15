import Title from "./Components/Title";
import { LocationContainer } from "./Components/LocationContainer";
import { ResidentContainer } from "./Components/ResidentContainer";
import { useState, useEffect } from "react";
import Logo from "./Components/Logo";
import Card from "react-bootstrap/Card";
import { FcLike } from "react-icons/fc";
import { FcDislike } from "react-icons/fc";
import { FcQuestions } from "react-icons/fc";
import "./App.css";

let characteresTemp = [];
let myArrOfCharacter = [];

const LocationInfo = ({ name, type, dimension, residents }) => {
  return (
    <div className="hero">
      <h1>{name}</h1>
      <h3>{type}</h3>
      <p>{dimension}</p>
      <p>
        <strong>Residents: {residents ? residents.length : "0"}</strong>
      </p>
    </div>
  );
};

const ResidentInfo = ({ name, image, status, origin, episode }) => {
  return (
    <>
      <div className="gallery">
        <Card style={{ width: "15rem" }}>
          <Card.Img variant="top" src={image} />
          <Card.Body>
            <Card.Title>Name: {name}</Card.Title>
            <Card.Text>
              {status === "Alive" ? (
                <FcLike />
              ) : status === "Dead" ? (
                <FcDislike />
              ) : (
                <FcQuestions />
              )}{" "}
              Status: {status}
            </Card.Text>
            <Card.Text>Origin: {origin}</Card.Text>
            <Card.Text>Episodes: {episode}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

const SearchBox = ({ handleSearchTerm }) => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div>
      <input
        value={searchTerm}
        style={{
          width: "20rem",
          backgroundColor: "#f4f9f4",
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

const Clear = ({ handleClearTerm }) => {
  return (
    <div>
      <button className="mybutton" onClick={() => handleClearTerm()}>
        Clear
      </button>
    </div>
  );
};

function App() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [dimension, setDimension] = useState("");
  const [residents, setResidents] = useState("");
  const [hasData, setHasData] = useState(false);
  let random = Math.floor(Math.random() * 108);
  const [query, setQuery] = useState(random);

  useEffect(() => {
    setHasData(false);
    LocationContainer(query).then((res) => {
      setHasData(true);
      setName(res.data.name);
      setType(res.data.type);
      setDimension(res.data.dimension);
      setResidents(res.data.residents);
      characteresTemp = ResidentContainer(res.data.residents);
    });
  }, [query]);

  const handleSearch = (value, setSearchTerm) => {
    setQuery(value);
    setSearchTerm("");
  };

  const handleClear = (value) => {
    setQuery("");
    while (myArrOfCharacter.length > 0) myArrOfCharacter.pop();
    while (characteresTemp.length > 0) characteresTemp.pop();

    let random = Math.floor(Math.random() * 108);
    setQuery(random);
    setHasData(false);
  };

  useEffect(() => {
    if (characteresTemp.length > 0) {
      myArrOfCharacter = characteresTemp.map((value) => (
        <ResidentInfo
          key={value.id}
          name={value.name}
          image={value.image}
          status={value.status}
          origin={value.origin.name}
          episode={value.episode.length}
        />
      ));
    }
  });

  return (
    <div className="App layout">
      <Logo />
      <Title />
      <SearchBox handleSearchTerm={handleSearch} />
      <Clear handleClearTerm={handleClear} />
      {hasData && (
        <>
          <LocationInfo
            key={name}
            name={name}
            type={type}
            dimension={dimension}
            residents={residents}
          />
          <div className="pokegallery">{myArrOfCharacter}</div>
        </>
      )}
    </div>
  );
}

export default App;
