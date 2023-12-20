// Ruselt.js
import React from "react";
import Card from "../Card/Card";
import "./ruselt.css";

export default function Ruselt({ searchResults }) {
  return (
    <section className="result">
      <div className="result-cards">
        {searchResults.map((recipe , index) => (
          <Card key={index} recipe={recipe} like={true} />
        ))}
      </div>
    </section>
  );
}
