import { useState } from "react"
import { ALL_BOOKS, CREATE_BOOK } from "../queries"
import { useMutation } from "@apollo/client"

const NewBook = () => {
	const [title, setTitle] = useState("")
	const [author, setAuthor] = useState("")
	const [published, setPublished] = useState("")
	const [genre, setGenre] = useState("")
	const [genres, setGenres] = useState([""])

	const [createBook] = useMutation(CREATE_BOOK, {
		refetchQueries: [{ query: ALL_BOOKS }],
		onError: (error) => {
			console.log(
				`error occured while book creation: ${error.graphQLErrors[0].message}`
			)
		},
	})

	const submit = async (event) => {
		event.preventDefault()
		console.log(`title: ${title}`)
		console.log(`author: ${author}`)
		console.log(`published: ${published}`)
		console.log(`genres: ${JSON.stringify(genres)}`)

		createBook({
			variables: { title, published: parseInt(published), author, genres },
		})

		setTitle("")
		setPublished("")
		setAuthor("")
		setGenres([])
		setGenre("")
	}

	const addGenre = () => {
		setGenres(genres.concat(genre))
		setGenre("")
	}

	return (
		<div>
			<h1 style={{ marginBottom: "20px" }}>Add a new book</h1>
			<form onSubmit={submit}>
				<div>
					title
					<input
						value={title}
						onChange={({ target }) => setTitle(target.value)}
					/>
				</div>
				<div>
					author
					<input
						value={author}
						onChange={({ target }) => setAuthor(target.value)}
					/>
				</div>
				<div>
					published
					<input
						type="number"
						value={published}
						onChange={({ target }) => setPublished(target.value)}
					/>
				</div>
				<div>
					<input
						value={genre}
						onChange={({ target }) => setGenre(target.value)}
					/>
					<button onClick={addGenre} type="button">
						add genre
					</button>
				</div>
				<div>genres: {genres.join(" ")}</div>
				<button type="submit">create book</button>
			</form>
		</div>
	)
}

export default NewBook
