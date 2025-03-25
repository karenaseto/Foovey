// src/pages/Results.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import mockImages from "../data/imageData";
import Masonry from "../components/Masonry"; // ← NEW
import "../App.css";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ResultsPage() {
  const query = useQuery();
  const cuisine = query.get("cuisine")?.toLowerCase() || "";
  const images = mockImages[cuisine] || [];

  return (
    <div className="results-page">
      <Masonry images={images} columnCount={4} />
    </div>
  );
}

export default ResultsPage;
