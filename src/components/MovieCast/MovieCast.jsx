import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCreditsById } from "../../services/api";
import defaultAvatar from "../../assets/person.jpg";
import Loader from "../../components/Loader/Loader.jsx";
import toast, { Toaster } from "react-hot-toast";
import css from "./MovieCast.module.css";

const MovieCast = () => {
  const params = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);
    getCreditsById(params.id)
      .then((data) => {
        setCast(data.cast);
      })
      .catch((err) => {
        setIsError(true);
        toast.error("An error occurred");
      })
      .finally(() => setIsLoading(false));
  }, [params.id]);

  return (
    <div>
      <Toaster position="top-right" />
      {isError && (
        <p className="errorMsg">Error, try again or reload the page...</p>
      )}
      {isLoading ? (
        <Loader />
      ) : cast.length > 0 && !isError ? (
        <ul className={css.castList}>
          {cast.map((member) => {
            return (
              <li key={member.id}>
                <div className={css.castImgHoler}>
                  <img
                    src={
                      member.profile_path
                        ? `https://image.tmdb.org/t/p/w200${member.profile_path}`
                        : defaultAvatar
                    }
                    alt={member.original_name}
                    className={css.castImg}
                  />
                </div>
                <h2>{member.original_name}</h2>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No information found...</p>
      )}
    </div>
  );
};

export default MovieCast;
