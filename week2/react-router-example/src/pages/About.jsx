import React from "react";
import queryString from "query-string";

export default function About({ location }) {
  // const name = new URLSearchParams(location.search).get("name");
  const { name } = queryString.parse(location.search);

  if (name === undefined) {
    return (
      <div>
        <h2>About</h2>
      </div>
    );
  }
  return (
    <div>
      <h2>About : {name}</h2>
    </div>
  );
}
