import React from "react";

import Posts from "./Posts";

export default function Top() {
  return (
    <>
      <h2>Top Stories</h2>
      <ul>
        <Posts type="top" />
      </ul>
    </>
  );
}
