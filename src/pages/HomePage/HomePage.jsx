import { fetchTrendingMovie } from "../../services/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList.jsx";
import Navigation from "../../components/Navigation/Navigation.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import toast, { Toaster } from "react-hot-toast";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);
    fetchTrendingMovie()
      .then((data) => {
        setMovies(data.results);
      })
      .catch((err) => {
        setIsError(true);
        toast.error("An error occurred");
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div>
      <Toaster position="top-right" />
      <Navigation />
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

export default HomePage;
