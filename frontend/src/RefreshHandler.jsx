// agar hum login hai toh home se wapas login ya signup pe nhi jaa payenge aur logout hai toh home pe direct nhi jaa payenge

import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RefreshHandler = ({ setIsAuthenticated }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsAuthenticated(true);
      if (
        location.pathname === "/" ||
        location.pathname === "/student-login" ||
        location.pathname === "/student-signup"
      ) {
        navigate("/student-home", { replace: false });
      }
    }
  }, [location, navigate, setIsAuthenticated]);
  return null;
};

export default RefreshHandler;
