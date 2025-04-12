import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";

import "./comicsList.scss";

export default function ComicsList() {
  const [comicsList, setComicsList] = useState([]);
  const [onRequestLoading, setOnRequestLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [comicsEnded, setComicsEnded] = useState(false);

  const { loading, error, getAllComics } = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
  }, [])

  const onRequest = (offset, initial) => {
    initial ? setOnRequestLoading(false) : setOnRequestLoading(true);
    getAllComics(offset)
      .then(onComicsListLoaded)
  };

  const onComicsListLoaded = (newComicsList) => {
    let ended = false;
    if (newComicsList.length < 8) ended = true;
    setComicsList([...comicsList, ...newComicsList]);
    setOnRequestLoading(false);
    setOffset(offset + 8);
    setComicsEnded(ended);
  };

  const renderItems = (arr) => {
    const items = arr.map((item, i) => {
      return (
        <li className="comics__item" key={i}>
          <Link to={`/comics/${item.id}`}>
            <img src={item.thumbnail} alt={item.title} className="comics__item-img" />
            <div className="comics__item-name">{item.title}</div>
            <div className="comics__item-price">{item.price}</div>
          </Link>
        </li>
      );
    });

    return (
      <ul className="comics__grid">
        {items}
      </ul>
    );
  };

  const items = renderItems(comicsList);

  const isError = error ? <Error /> : null;
  const isLoading = loading && !onRequestLoading ? <Spinner /> : null;

  return (
    <div className="comics__list">
      {isError} {isLoading} {items}

      <button
        onClick={() => onRequest(offset)}
        disabled={onRequestLoading}
        className="button button__main button__long"
        style={comicsEnded ? { "display": "none" } : null}
      >
        <div className="inner">
          {onRequestLoading ? "Loading..." : "load more"}
        </div>
      </button>
    </div>
  );
}