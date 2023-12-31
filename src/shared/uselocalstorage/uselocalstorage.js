import { useEffect, useState } from "react";

/**
 * Muuttaa muuttujan JSON-merkkijonoksi.
 * @param {any} value - Muutettava arvo.
 * @returns {string} JSON-merkkijono.
 */
const decode = (value) => {  
  return JSON.stringify(value);
}

/**
 * Purkaa JSON-merkkijonon muuttujaksi.
 * @param {string} value - Purettava JSON-merkkijono.
 * @returns {any} Purettu muuttuja.
 */
const encode = (value) => {
  return JSON.parse(value);
}

/**
 * React Hook, joka hallinnoi tilamuuttujaa localStorage:ssa.
 * @param {string} key - Avain, jolla tilamuuttuja tallennetaan localStorageen.
 * @param {any} defaultState - Alkuarvo tilamuuttujalle, jos localStorage:ssa ei ole tallennettua arvoa.
 * @returns {[any, function, function]} Palauttaa kolme arvoa:
 *  1. Tilamuuttuja localStorage-arvolla.
 *  2. Funktio tilamuuttujan päivittämiseen.
 *  3. Funktio tilamuuttujan palauttamiseen alkutilanteeseen.
 */
const useLocalStorage = (key, defaultState) => {
  // Tilamuuttujan määrittely, arvoksi haetaan joko
  // localStorage-muuttujan arvo tai alkuarvo.
  const [value, setValue] = useState(
    encode(localStorage.getItem(key) || null) || defaultState
  );

  // Tallennetaan tilamuuttuja localStorageen aina,
  // kun arvo muuttuu.
  useEffect(() => {
    localStorage.setItem(key, decode(value));
  },  [value]);

  // Alkuarvojen palautusfunktio.
  /**
   * Funktio palauttaa tilamuuttujan alkutilanteeseen.
   * @returns {void}
   */
  const resetValue = () => {
    setValue(defaultState);
  }

  return [value, setValue, resetValue];
}

export default useLocalStorage;
