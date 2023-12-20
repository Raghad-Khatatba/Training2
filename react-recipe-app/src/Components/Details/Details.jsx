import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import apiKey from "../api/Key";
import axios from "axios";
import Card from "../Card/Card";
import "./details.css";

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [details, setDetals] = useState([]);
  const [info, setInfo] = useState([]);
  const [similerResult, setSimilerResult] = useState([]);
  const [similerCard, setSimilerCard] = useState([]);

  const handleGoBack = () => {
    navigate(-1);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const detailsResponse = await axios.get(
          `https://api.spoonacular.com/recipes/${id}/summary?apiKey=${apiKey}`
        );
        setDetals(detailsResponse.data);

        const infoResponse = await axios.get(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`
        );
        const { title, image } = infoResponse.data;
        setInfo({ title, image });

        const similarResponse = await axios.get(
          `https://api.spoonacular.com/recipes/${id}/similar?apiKey=${apiKey}`
        );
        const similarData = similarResponse.data;
        setSimilerCard([]);

        const detailsPromises = similarData.map(async (similarRecipe) => {
          const detailsResponse = await axios.get(
            `https://api.spoonacular.com/recipes/${similarRecipe.id}/information?apiKey=${apiKey}`
          );
          return detailsResponse.data;
        });

        const detailsResults = await Promise.all(detailsPromises);
        setSimilerCard(detailsResults);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      <div className="details">
        <div className="arrow text-white ms-4 my-2" onClick={handleGoBack}>
          <FaArrowLeft size={18} className="m-2 faArrow" />
          Go Back
        </div>
        <div className="row">
          {info.image && (
            <div className="col-12 col-md-6 d-flex justify-content-center align-items-center text-white">
              <img src={info.image} alt="food" />
            </div>
          )}

          {details && (
            <div className="col-12 col-md-6 text-white recipeD">
              <h4 className="my-2">{details.title}</h4>
              <h5 className="my-2">Recipes:</h5>
              <p className="my-2" dangerouslySetInnerHTML={{ __html: details.summary}} ></p>
            </div>
          )}
        </div>
      </div>
      <div className="simeler">
        <h1 className="text-center text-white font-weight-bold m-4">
          simeler recipes
        </h1>
        <div className="similer-cards">
          {similerCard.map((similar, index) => (
            <Card key={index} recipe={similar} like={true} />
          ))}
        </div>
      </div>
    </>
  );
}
