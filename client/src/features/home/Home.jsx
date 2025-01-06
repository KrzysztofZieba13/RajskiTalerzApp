import Button from "../../ui/Button";
import styles from "./Home.module.css";
import Contact from "../contact/Contact";
import { useInView } from "react-intersection-observer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { switchVisibility } from "./homeSlice";
import useScrollToSection from "../../hooks/useScrollToSection";
import { useIsLoggedInQuery } from "../../services/auth";
import { useSetTitle } from "../../hooks/useSetTitle";

function Home() {
  const { data } = useIsLoggedInQuery();
  const { ref, inView } = useInView({ initialInView: true, threshold: 0.1 });
  const dispatch = useDispatch();
  useScrollToSection();
  useSetTitle("Restauracja");

  useEffect(
    function () {
      dispatch(switchVisibility(inView));
    },
    [inView, dispatch]
  );

  return (
    <>
      <div className={styles.home} ref={ref} id="home">
        <div>
          <h1>
            Rajski Talerz na <br /> ratunek!
          </h1>

          <p>Przygotujemy coś specjalnego dla Ciebie. Zasługujesz na to.</p>

          <div className={styles.buttons}>
            <Button
              to={`menu/${data?.user ? "favourites" : "pasta"}`}
              bgColor="#EE4E4E"
            >
              Menu
            </Button>

            <a href="#contact" className={styles.locationBtn}>
              Lokalizacja
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-5"
              >
                <path
                  fillRule="evenodd"
                  d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
        <img src="./talerz.png" alt="zdjęcie talerza" />
      </div>
      <Contact />
    </>
  );
}

export default Home;
