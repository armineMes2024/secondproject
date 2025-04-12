import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import useMarvelService from "../../services/MarvelService.js"
import Spinner from "../spinner/Spinner.js";
import Error from "../error/Error.js";
import Skeleton from "../skeleton/Skeleton.js";

import "./charInfo.scss";

export default function CharInfo({ charId }) {
  const [char, setChar] = useState(null);
  const { loading, error, getCharacter, clearError } = useMarvelService();

  useEffect(() => {
    updateChar();
  }, [charId]);

  const updateChar = () => {
    if (!charId) return;

    clearError();
    getCharacter(charId).then(onCharLoaded);
  };

  const onCharLoaded = (char) => setChar(char);

  const iSkeleton = char || loading || error ? null : <Skeleton />
  const isError = error ? <Error /> : null;
  const isLoading = loading ? <Spinner /> : null;
  const isContent = !(loading || error || !char) ? <View char={char} /> : null;

  return (
    <div className="char__info">
      {iSkeleton}
      {isError}
      {isLoading}
      {isContent}
    </div>
  );
}

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = char;
  let imgStyle = { "objectFit": "cover" };
  if (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
    imgStyle = { "objectFit": "contain" };
  }

  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} style={imgStyle} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
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
      <div className="char__descr">
        {description}
      </div>
      {
        comics.length > 0 ?
        <>
          <div className="char__comics">Comics: </div>
          <ul className="char__comics-list">
            {
              comics.map((comic, index) => {
                // eslint-disable-next-line
                if (index > 10) return;
                return (
                  <li className="char__comics-item" key={index}>
                    <a
                      href={`${comic.resourceURI}?apikey=f886cb3db7c49504cc7206fb26ead8c0`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {comic.name}
                    </a>
                  </li>
                );
              })
            }
          </ul>
        </>
        :
        <p style={{ marginTop: 16, fontWeight: "bold"}}>
          There is no comics with this character
        </p>
      }
    </>
  );
};

CharInfo.propTypes = {
  charId: PropTypes.number,
}