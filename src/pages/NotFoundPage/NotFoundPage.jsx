import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      <p>Sorry, page not found...</p>
      <Link to="/">Home page</Link>
    </div>
  );
};

export default NotFoundPage;
