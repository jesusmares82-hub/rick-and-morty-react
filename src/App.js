import Title from "./Components/Title";
import { LocationContainer } from "./Components/LocationContainer";
import { useState, useEffect } from "react";
import Logo from "./Components/Logo";
import Card from "react-bootstrap/Card";
import { FcLike } from "react-icons/fc";
import { FcDislike } from "react-icons/fc";
import { FcQuestions } from "react-icons/fc";
import "./App.css";
import axios from "axios";
let characteresTemp = [];
let myArrOfCharacter = [];

const LocationInfo = ({ name, type, dimension }) => {
  //console.log(name);
  return (
    <div className="hero">
      <h1>{name}</h1>
      <h3>{type}</h3>
      <p>{dimension}</p>
    </div>
  );
};

const ResidentContainer = ({ residents, query }) => {
  //console.log(residents);
  const [characteres, setCharacteres] = useState([]);
  const responseOne = "";

  useEffect(() => {
    if (residents.length > 0) {
      for (let i = 0; i < residents.length; i++) {
        if (i >= 10) {
          break;
        }
        console.log("entro al for" + i);
        axios.get(`${residents[i]}`).then((res) => {
          //console.log(res.data.name);
          //setCharacteres(res.data);
          characteresTemp.push(res.data);
        });
      }
    }

    setCharacteres(characteresTemp);
    if (characteres.length > 0) {
      console.log("entro al if characteres");
      myArrOfCharacter = characteres.map((value) => (
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
  }, [query]);

  return <div>{characteres && myArrOfCharacter}</div>;
};

const ResidentInfo = ({ name, image, status, origin, episode }) => {
  return (
    <>
      <div className="gallery">
        <Card style={{ width: "15rem" }}>
          {<Card.Img variant="top" src={image} />}
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
  let random = Math.floor(Math.random() * 108);
  const [query, setQuery] = useState(random);

  useEffect(() => {
    setHasData(false);
    LocationContainer(query).then(
      (res) => {
        console.log(res.data);
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
    <div className="App layout">
      <Logo />
      <Title />
      <SearchBox handleSearchTerm={handleSearch} />
      {hasData && (
        <>
          <LocationInfo
            key={name}
            name={name}
            type={type}
            dimension={dimension}
          />
          <ResidentContainer residents={residents} query={query} />
        </>
      )}
    </div>
  );
}

export default App;
