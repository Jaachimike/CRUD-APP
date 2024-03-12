import { useState, useEffect } from "react";

import "./App.css";
import Axios from "axios";

function App() {
  const [movieName, setMovieName] = useState("");
  const [review, setReview] = useState("");
  const [movieReviewList, setMovieReviewList] = useState([]);

  const [newReview, setNewReview] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:4000/api/get").then((response) => {
      setMovieReviewList(response.data);
    });
  }, []);

  const submitReview = () => {
    if (movieName !== "" && review !== "") {
      Axios.post("http://localhost:4000/api/insert", {
        movieName: movieName,
        movieReview: review,
      });
      setMovieReviewList([
        ...movieReviewList,
        { movieName: movieName, movieReview: review },
      ]);
    } else {
      alert("Missing Fields");
    }
    setMovieName("");
    setReview("");
  };

  const deleteReview = (movie) => {
    Axios.delete(`http://localhost:4000/api/delete/${movie}`);
  };

  const updateReview = (movieName) => {
    Axios.put("http://localhost:4000/api/update", {
      movieName: movieName,
      movieReview: newReview,
    });
  };

  return (
    <div className="app">
      <h1>CRUD APPLICATION</h1>

      <div className="form">
        <label htmlFor="">Movie Name:</label>
        <input
          type="text"
          name="movieName"
          value={movieName}
          onChange={(e) => {
            setMovieName(e.target.value);
          }}
        />
        <label htmlFor="">Review:</label>
        <input
          type="text"
          name="review"
          value={review}
          onChange={(e) => {
            setReview(e.target.value);
          }}
        />

        <button onClick={submitReview}>Submit</button>

        {movieReviewList.map((val, index) => {
          return (
            <div key={index} className="card">
              <h1>{val.movieName}</h1>
              <p> {val.movieReview}</p>

              <button onClick={() => deleteReview(val.movieName)}>
                Delete
              </button>
              <input
                type="text"
                id="updateInput"
                onChange={(e) => {
                  setNewReview(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  updateReview(val.movieName);
                }}
              >
                Update
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
