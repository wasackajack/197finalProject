import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Searchbar = () => {
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const intervalID = setInterval(() => {
      axios.get("/api/quizzes").then((response) => {
        //console.log(response);
        setQuizzes(response.data);
      });
    }, 2000);
    // return a clean-up function so that the repetition can be stopped
    // when the component is unmounted
    return () => clearInterval(intervalID);
  }, []);

  useEffect(() => {
    const results = quizzes.filter((quiz) =>
      quiz.title.toLowerCase().includes(input)
    );
    setSearchResults(results);
  }, [input]);

  return (
    <div>
      <form className="form-inline d-flex justify-content-center md-form form-sm active-cyan-2 mt-2">
        <input
          className="form-control form-control-sm mr-3 w-75"
          type="text"
          placeholder="Search"
          aria-label="Search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <i className="fas fa-search" aria-hidden="true"></i>
      </form>

      <ul>
        {searchResults.map((quiz) => (
          <li>{quiz.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Searchbar;
