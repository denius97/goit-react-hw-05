import { useSearchParams } from "react-router-dom";
import { searchMowies } from "../../services/api";
import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../components/Loader/Loader.jsx";
import css from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const searchQuery = searchParams.get("query");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (searchQuery) {
      setIsError(false);
      setIsLoading(true);
      setInputValue(searchQuery);
      searchMowies(searchQuery)
        .then((data) => {
          if (!data.results.length) toast.error("Nothing is found");
          setMovies(data.results);
        })
        .catch((err) => {
          setIsError(true);
          toast.error("An error occurred");
        })
        .finally(() => setIsLoading(false));
    }
  }, [searchQuery]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    searchParams.set("query", inputValue);
    setSearchParams(searchParams);
  };

  return (
    <div>
      <Toaster position="top-right" />
      <form onSubmit={handleSubmit}>
        <label className={css.formLabel}>
          <span>Type Your query</span>
          <input
            onChange={handleInputChange}
            type="search"
            name="searchQuery"
            value={inputValue}
            className={css.searchInput}
          />
          <button>Search</button>
        </label>
      </form>
      {isError && (
        <p className="errorMsg">Error, try again or reload the page...</p>
      )}
      {isLoading ? (
        <Loader />
      ) : (
        movies.length > 0 && !isError && <MovieList movies={movies} />
      )}
    </div>
  );
};

export default MoviesPage;
