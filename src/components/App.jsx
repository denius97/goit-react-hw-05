import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
const HomePage = lazy(() => import("../pages/HomePage/HomePage.jsx"));
const MoviesPage = lazy(() => import("../pages/MoviesPage/MoviesPage.jsx"));
const MovieDetailsPage = lazy(() =>
  import("../pages/MovieDetailsPage/MovieDetailsPage.jsx")
);
const NotFoundPage = lazy(() =>
  import("../pages/NotFoundPage/NotFoundPage.jsx")
);
import "./App.css";
const MovieCast = lazy(() => import("./MovieCast/MovieCast.jsx"));
const MovieReviews = lazy(() => import("./MovieReviews/MovieReviews.jsx"));
import Loader from "./Loader/Loader.jsx";
import Navigation from "./Navigation/Navigation.jsx";

function App() {
  return (
    <>
      <Navigation />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:id" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
