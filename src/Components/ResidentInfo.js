import React from "react";

const ResidentInfo = (
  nameResident,
  imageResident,
  statusResident,
  originResident,
  episodeResident
) => {
  return (
    <>
      <h2>{nameResident}</h2>
      <img src={imageResident} alt={nameResident} />
      <h4>Status: {statusResident}</h4>
      <h4>Origin: {originResident}</h4>
      <h4>Episodes: {episodeResident}</h4>
    </>
  );
};

export default ResidentInfo;
