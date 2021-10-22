import React from "react";

const Response = (props) => {
  const { player } = props;
  return <div>{player.responses[0]}</div>;
};

export default Response;
