import { useLocation, useNavigate } from 'react-router-dom'

function CharacterDetails() {
	const location = useLocation()
	const navigate = useNavigate()
	const character = location.state?.character

	if (!character) return <p>No character data found</p>

	return (
		<div style={{ textAlign: 'center' }}>
			<h2>{character.name}</h2>
			<img
				src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
				alt={character.name}
				width='300'
			/>
			<p>{character.description || 'No description available.'}</p>
			<button onClick={() => navigate('/')}>Back to All</button>
		</div>
	)
}

export default CharacterDetails
