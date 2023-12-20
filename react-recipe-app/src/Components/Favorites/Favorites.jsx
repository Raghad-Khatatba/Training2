// Favorites.js
import React, { useState, useEffect } from "react";

import Card from "../Card/Card";
import "./favorites.css";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [updateTrigger, setUpdateTrigger] = useState(false);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, [updateTrigger]);

  const handleCardDelete = (idToDelete) => {
    const updatedFavorites =
      JSON.parse(localStorage.getItem("favorites")) || [];
    const newFavorites = updatedFavorites.filter(
      (favorite) => favorite.id !== idToDelete
    );
    localStorage.setItem("favorites", JSON.stringify(newFavorites));

    setUpdateTrigger(!updateTrigger);
  };

  return (
    <>
      <h1 className="text-center text-white font-weight-bold m-4">
        Favorites Liist
      </h1>
      <section className="Favorites">
        {favorites.map((favorite , index) => (
          <div key={index} className="Favorite-card">
            <Card recipe={favorite} trash={true} onDelete={handleCardDelete} />
          </div>
        ))}
      </section>
    </>
  );
}
