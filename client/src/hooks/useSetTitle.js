import { useEffect } from "react";

export function useSetTitle(title) {
  useEffect(
    function () {
      document.title = `RajskiTalerz | ${title}`;
    },
    [title]
  );
}
