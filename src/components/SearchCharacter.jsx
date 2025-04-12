import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'

function SearchCharacter() {
	const navigate = useNavigate()

	const formik = useFormik({
		initialValues: { name: '' },
		validationSchema: Yup.object({
			name: Yup.string().required('Name is required'),
		}),
		onSubmit: async (values, { setStatus }) => {
			const name = values.name
			const apiKey = '7a2f90270b6303fe8a6acd07672c5bba'

			try {
				const res = await fetch(
					`https://gateway.marvel.com/v1/public/characters?name=${name}&apikey=${apiKey}`
				)
				const data = await res.json()

				if (data.data.results.length > 0) {
					const character = data.data.results[0]
					navigate(`/character/${character.id}`, { state: { character } })
				} else {
					setStatus('Character Not Found')
				}
			} catch (err) {
				setStatus('Error fetching data')
			}
		},
	})

	return (
		<div>
			<h2>Search Marvel Character</h2>
			<form onSubmit={formik.handleSubmit}>
				<input
					name='name'
					onChange={formik.handleChange}
					value={formik.values.name}
					placeholder='Enter character name'
				/>
				<button type='submit'>Search</button>
			</form>

			{formik.errors.name && (
				<p style={{ color: 'red' }}>{formik.errors.name}</p>
			)}
			{formik.status && <p style={{ color: 'orange' }}>{formik.status}</p>}
		</div>
	)
}

export default SearchCharacter
