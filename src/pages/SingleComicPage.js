
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import useMarvelService from "../services/MarvelService";
import Spinner from "../components/spinner/Spinner";
import Error from "../components/error/Error";

import "./singleComicPage.scss";

export default function SingleComicPage() {
  const { id } = useParams();
  const [comic, setComic] = useState(null);
  const { loading, error, getComic, clearError } = useMarvelService();

  useEffect(() => {
    updateComic();
  }, [id]);

  const updateComic = () => {
    clearError();
    getComic(id).then(onComicLoaded);
  };

  const onComicLoaded = (comic) => setComic(comic);

  const isError = error ? <Error /> : null;
  const isLoading = loading ? <Spinner /> : null;
  const isContent = !(loading || error || !comic) ? <View comic={comic} /> : null;
  
  return (
    <>
      {isError}
      {isLoading}
      {isContent}
    </>
  );
}

const View = ({ comic }) => {
  const { title, description, pageCount, thumbnail, language, price } = comic;
  return (
    <div className="single-comic">
      <img src={thumbnail} alt={title} className="single-comic__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{title}</h2>
        <p className="single-comic__descr">{description}</p>
        <p className="single-comic__descr">{pageCount}</p>
        <p className="single-comic__descr">{language}</p>
        <p className="single-comic__price">{price}</p>
      </div>
      <Link to="/comics" className="single-comic__back">Back to all</Link>
    </div>
  );
};