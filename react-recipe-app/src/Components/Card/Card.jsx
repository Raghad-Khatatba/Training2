// Card.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import "./card.css";

export default function Card({ recipe, trash, like, onDelete }) {
  const { id, title, image } = recipe;
  const [isLiked, setIsLiked] = useState(false);
  const [showLiked, setShowLiked] = useState(false);
  const [showTrash, setShowTrash] = useState(false);

  useEffect(() => {
    setShowTrash(trash);
  }, [trash]);

  useEffect(() => {
    setShowLiked(like);
  }, [like]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isRecipeLiked = storedFavorites.some(
      (favorite) => favorite.id === id
    );
    setIsLiked(isRecipeLiked);
  }, [id]);

  const handleLikeClick = () => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (isLiked) {
      showAlreadyLikedAlert();
      return;
    }

    const updatedFavorites = [...storedFavorites, { id, title, image }];
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setIsLiked(true);

    showLikeAlert();
  };

  const handleTrashClick = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(id);
        Swal.fire({
          title: "Deleted!",
          text: "Your recipe has been deleted.",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };

  const showLikeAlert = () => {
    const alertText = "Added to favorites";

    Swal.fire({
      icon: "success",
      title: alertText,
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const showAlreadyLikedAlert = () => {
    const alertText = "This recipe is already in favorites";

    Swal.fire({
      icon: "info",
      title: alertText,
      showConfirmButton: false,
      timer: 2000,
    });
  };

  return (
    <div className="card1">
      {image ? <img src={image} alt={title} /> : <p>Image not available</p>}
      <div className="box">
        <p className="title">{title}</p>
        <Link
          to={{ pathname: `/details/${id}`}}
          className="btn border border-black rounded-pill text-white"
        >
          Show more
        </Link>

        <button
          style={{ all: "unset" }}
          className={`heart-btn ${isLiked ? "text-danger" : "text-white"} ${
            showLiked ? "" : "d-none"
          }`}
          onClick={handleLikeClick}
        >
          <FaHeart className="heart" size={22} />
        </button>
        <button
          style={{ all: "unset" }}
          className={`trash-btn text-danger ${showTrash ? "" : "d-none"}`}
          onClick={handleTrashClick}
        >
          <FaTrash size={22} />
        </button>
      </div>
    </div>
  );
}
