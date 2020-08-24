import React from "react";

export default function Statistics(props) {
    const {history, location, match} = {...props};
    const name = match.params.name;
  return (
    <div>
      <h1>Statistics</h1><h2>{name}</h2>
    </div>
  );
}
