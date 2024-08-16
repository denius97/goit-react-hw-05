import { getMovieById } from "../../services/api";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { Suspense, useEffect, useRef, useState } from "react";
import defaultPoster from "../../assets/default-poster.jpg";
import Loader from "../../components/Loader/Loader";
import clsx from "clsx";
import css from "./MovieDetailsPage.module.css";

const buildLinkClass = ({ isActive }) => {
  return clsx(isActive && css.active);
};

const MovieDetailsPage = () => {
  const params = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const refLocation = useRef(location?.state || "/movies");

  useEffect(() => {
    getMovieById(params.id).then((data) => setMovie(data));
  }, [params.id]);

  if (!movie) return;

  const {
    title,
    poster_path,
    release_date,
    overview,
    vote_average,
    genres,
    vote_count,
  } = movie;

  return (
    <div>
      <Link to={refLocation.current} className={css.goBackLink}>
        Go back
      </Link>
      <div className={css.movie}>
        <div>
          <img
            src={
              poster_path
                ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                : defaultPoster
            }
            alt={`${title} poster`}
          />
        </div>
        <div>
          <h1>{`${title} (${new Date(release_date).getFullYear()})`}</h1>
          <p>{`Raiting: ${vote_average.toFixed(2)} (${vote_count})`}</p>{" "}
          <h2>Overview</h2>
          <p>{overview || "No information found..."}</p>
          <h2>Genres</h2>
          <p>
            {genres.map((genre) => genre.name).join(", ") ||
              "No information found..."}
          </p>
        </div>
      </div>
      <div className={css.adidtionalInfo}>
        <h3>Aditional information</h3>
        <ul className={css.infoNavigation}>
          <li>
            <NavLink to="cast" className={buildLinkClass}>
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink to="reviews" className={buildLinkClass}>
              Reviews
            </NavLink>
          </li>
        </ul>
      </div>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;
