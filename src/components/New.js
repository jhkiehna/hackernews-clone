import React from "react";

import Posts from "./Posts";

export default function New() {
  return (
    <>
      <h2>New Stories</h2>
      <ul>
        <Posts type="new" />
      </ul>
    </>
  );
}
