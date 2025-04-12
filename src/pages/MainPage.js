import { useState } from "react";

import RandomChar from "../components/randomChar/RandomChar"
import CharList from "../components/charList/CharList";
import CharInfo from "../components/charInfo/CharInfo";
import SearchCharacter from "../components/SearchCharacter";

// Boundary
import ErrorBoundary from "../components/errorBoundary/ErrorBoundary";

import decoration from "../resources/img/vision.png";

export default function MainPage() {
  const [selectedChar, setChar] = useState(null);
  const onCharSelected = id => setChar(id);

  return (
		<>
			<ErrorBoundary>
				<RandomChar />
			</ErrorBoundary>
			<div className='char__content'>
				<ErrorBoundary>
					<CharList onCharSelected={onCharSelected} />
				</ErrorBoundary>
				<ErrorBoundary>
					<CharInfo charId={selectedChar} />
				</ErrorBoundary>
			</div>
			{/* 🆕 Add the search form here */}
			<div
				className='search__wrapper'
				style={{ padding: '20px 0', textAlign: 'center' }}
			>
				<SearchCharacter/>
			</div>
			<img src={decoration} alt='vision' className='bg-decoration' />
		</>
	)
}