import axios from "axios";
import { useState, useEffect } from "react";

const ResidentContainer = (residents) => {
  const [residentName, setResidentName] = useState("");
  const [residentImage, setResidentImage] = useState("");
  const [residentStatus, setResidentStatus] = useState("");
  const [residentOrigin, setResidentOrigin] = useState("");
  const [residentEpisode, setResidentEpisode] = useState("");
  const [hasData, setHasData] = useState(false);

  console.log(residents);
  console.log(residents.residents[0]);

  const promise = axios(residents.residents[0]);
  useEffect(() => {
    setHasData(false);
    promise.then((res) => {
      console.log(res.data);
      setResidentName(res.data.name);
      setResidentImage(res.data.image);
      setResidentStatus(res.data.status);
      setResidentOrigin(res.data.origin.name);
      setResidentEpisode(res.data.episode.length);
      //console.log(res.data.episode.length);
      //console.log(residentEpisode);
    });
  }, [residents]);

  return (
    <div>
      <>
        <h2>{residentName}</h2>
        <img src={residentImage} alt="" />
        <h4>Status: {residentStatus}</h4>
        <h4>Origin: {residentOrigin}</h4>
        <h4>Episodes: {residentEpisode}</h4>
      </>
    </div>
  );
};

export default ResidentContainer;
