import { useState, useEffect, useRef } from "react";

import Spinner from "../spinner/Spinner";
import Error from "../error/Error";
import useMarvelService from "../../services/MarvelService";
import "./charList.scss";

// import logger from "./test";

export default function CharList({ onCharSelected }) {
  const [charList, setCharList] = useState([]);
  const [onRequestLoading, setOnRequestLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [charEnded, setCharEnded] = useState(false);

  const { loading, error, getAllCharacters } = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
  }, []);
 
  const onRequest = (offset, initial) => {
    initial ? setOnRequestLoading(false) : setOnRequestLoading(true);
    getAllCharacters(offset).then(onCharListLoaded)
  };

  const onCharListLoaded = (newCharList) => {
    let ended = false;

    if (newCharList.length < 9) ended = true;

    setCharList(charList => [...charList, ...newCharList]);
    setOnRequestLoading(false);
    setOffset(offset => offset + 9);
    setCharEnded(ended);
  };

  const refItems = useRef([]);

  const focucOnItem = (id) => {
    refItems.current.forEach(item => item.classList.remove("char__item_selected"));
    refItems.current[id].classList.add("char__item_selected");
    refItems.current[id].focus();
  };

  const renderItems = (arr) => {
    const items = arr.map(({ id, thumbnail, name }, i) => {
      let imgStyle = { "objectFit": "cover" };
      if (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
        imgStyle = { "objectFit": "contain" };
      }

      return (
        <li
          className="char__item"
          tabIndex={0}
          ref={el => refItems.current[i] = el}
          key={i}
          onClick={() => {
            onCharSelected(id);
            focucOnItem(i);
          }}
        >
          <img src={thumbnail} alt={name} style={imgStyle} />
          <div className="char__name">{name}</div>
        </li>
      );
    });

    return (
      <ul className="char__grid">
        {items}
      </ul>
    );
  };

  const items = renderItems(charList);

  const isError = error ? <Error /> : null;
  const isLoading = loading && !onRequestLoading ? <Spinner /> : null;

  return (
    <div className="char__list">
      {isError} {isLoading} {items}

      <button
        onClick={() => onRequest(offset)}
        disabled={onRequestLoading}
        className="button button__main button__long"
        style={charEnded ? { "display": "none" } : null}
      >
        <div className="inner">
          {onRequestLoading ? "Loading..." : "load more"}
        </div>
      </button>
    </div>
  );
}