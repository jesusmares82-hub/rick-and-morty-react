import React from "react";
import ResidentContainer from "./ResidentContainer";

const LocationInfo = ({ name, type, dimension, residents }) => {
  //console.log(name);
  //console.log(residents);
  {
    residents &&
      residents.map((value, i) => (
        <p key={i}>
          {" "}
          {value} {}
        </p>
      ));
  }
  //sconsole.log(residents);
  return (
    <div>
      <h1>{name}</h1>
      <h3>{type}</h3>
      <p>{dimension}</p>
      <ResidentContainer residents={residents} />
    </div>
  );
};

export default LocationInfo;
