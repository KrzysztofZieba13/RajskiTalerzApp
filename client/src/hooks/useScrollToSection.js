import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function useScrollToSection() {
  const location = useLocation();

  useEffect(
    function () {
      const hash = location.hash;
      const element = document.getElementById(hash.replace("#", ""));

      if (element) element.scrollIntoView({ behavior: "smooth" });
      else window.scrollTo({ top: 0 });
    },
    [location.hash]
  );
}

export default useScrollToSection;
