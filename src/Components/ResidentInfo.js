import React from "react";
import Card from "react-bootstrap/Card";

const ResidentInfo = (
  name,
  origin,
  image,
  status,
  episodes,
  nameLocation,
  type,
  dimension
) => {
  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={image} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            Status: {status} Origin: {origin} Episodes:
            {episodes}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default ResidentInfo;
