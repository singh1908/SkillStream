// agar hum login hai toh home se wapas login ya signup pe nhi jaa payenge aur logout hai toh home pe direct nhi jaa payenge

import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const TeacherRefreshHandler = ({ setIsTeacherAuthenticated }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("teacher_token")) {
      setIsTeacherAuthenticated(true);
      if (
        location.pathname === "/" ||
        location.pathname === "/teacher-login" ||
        location.pathname === "/teacher-signup"
      ) {
        navigate("/teacher-home", { replace: false });
      }
    }
  }, [location, navigate, setIsTeacherAuthenticated]);
  return null;
};

export default TeacherRefreshHandler;
