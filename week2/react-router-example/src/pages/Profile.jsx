import React from "react";

export default function Profile({ match }) {
  const id = match.params.id;

  if (id === undefined) {
    return (
      <div>
        <h2>/Profile</h2>
      </div>
    );
  }
  return (
    <div>
      <h2>/Profile/{id}</h2>
    </div>
  );
}
