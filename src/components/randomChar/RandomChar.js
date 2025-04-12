import { useState, useEffect } from "react";
import useMarvelService from "../../services/MarvelService.js"
import Spinner from "../spinner/Spinner.js";
import Error from "../error/Error.js";

import "./randomChar.scss";

import mjolnir from "../../resources/img/mjolnir.png"

export default function RandomChar () {
  const[char, setChar] = useState({});

  const { loading, error, getCharacter, clearError } = useMarvelService();

  useEffect(() => {
    updateChar();
  }, []);

  // useEffect(() => {
  //   const timerID = setInterval(updateChar, 1000);
  //   return () => clearInterval(timerID);
  // }, [char]);

  const updateChar = () => {
    clearError();
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    getCharacter(id).then(onCharLoaded);
  };

  const onCharLoaded = (char) => setChar(char);

  const isError = error ? <Error /> : null;
  const isLoading = loading ? <Spinner /> : null;
  const isContent = !(loading || error) ? <View char={char} /> : null;

  return (
    <div className="randomchar">
      {isError}
      {isLoading}
      {isContent}

      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">
          Or choose another one
        </p>
        <button
          className="button button__main"
          onClick={updateChar}
        >
          <div className="inner">try it</div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );
}

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki } = char;
  let imgStyle = { "objectFit": "cover" };
  if (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
    imgStyle = { "objectFit": "contain" };
  }

  return (
    <div className="randomchar__block">
      <img
        src={thumbnail}
        alt={name}
        className="randomchar__img"
        style={imgStyle}
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{description}</p>
        <div className="randomchar__btns">
          <a
            href={homepage}
            className="button button__main"
            target="_blank"
            rel="noreferrer"
          >
            <div className="inner">homepage</div>
          </a>
          <a
            href={wiki}
            className="button button__secondary"
            target="_blank"
            rel="noreferrer"
          >
            <div className="inner">wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};