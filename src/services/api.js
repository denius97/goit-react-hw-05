import axios from "axios";

const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YTNmY2Q3NTAxZTMwNTRiYzFkODNmMzY3YjJhOTk0NiIsIm5iZiI6MTcyMzEyMzQyOS4zMTcwNTQsInN1YiI6IjY2YjRjMjQ1MmNkNjc1OTg5YTI0MTgyMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ot1WdJK1JYCE9ZlhuABbcvz1PHL1HOuFkLOU8s-OOws",
  },
};

export const fetchTrendingMovie = async () => {
  const res = await axios.get(
    "https://api.themoviedb.org/3/trending/movie/week?language=en-US",
    options
  );
  return res.data;
};

export const getMovieById = async (id) => {
  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}`,
    options
  );
  return res.data;
};

export const getCreditsById = async (id) => {
  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/credits`,
    options
  );
  return res.data;
};
export const getReviewsById = async (id) => {
  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/reviews`,
    options
  );
  return res.data;
};

export const searchMowies = async (query) => {
  const res = await axios.get(
    `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false`,
    options
  );
  return res.data;
};
