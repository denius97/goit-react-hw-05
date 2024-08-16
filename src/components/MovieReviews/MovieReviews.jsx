import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getReviewsById } from "../../services/api";
import Loader from "../../components/Loader/Loader.jsx";
import toast, { Toaster } from "react-hot-toast";

const MovieReviews = () => {
  const params = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);
    getReviewsById(params.id)
      .then((data) => {
        setReviews(data.results);
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
      ) : reviews.length > 0 && !isError ? (
        <ul>
          {reviews.map((review) => {
            return (
              <li key={review.id}>
                <h2>{`Author: ${review.author}`}</h2>
                <p>{review.content}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No reviews found...</p>
      )}
    </div>
  );
};

export default MovieReviews;
