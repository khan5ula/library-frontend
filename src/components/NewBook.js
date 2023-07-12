import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { Button, Container, FloatingLabel, Form } from 'react-bootstrap'
import { ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK } from '../queries'

const NewBook = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState([])
  const [genres, setGenres] = useState([])

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
  })

  const submit = async (event) => {
    event.preventDefault()
    createBook({
      variables: { title, published: parseInt(published), author, genres },
    })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre([])
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <Container>
      <h1 style={{ marginBottom: '20px' }}>Add a new book</h1>
      <Form onSubmit={submit}>
        <Form.Group>
          <FloatingLabel label="Title" className="mb-2">
            <Form.Control
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </FloatingLabel>
          <FloatingLabel label="Author" className="mb-2">
            <Form.Control
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </FloatingLabel>
          <FloatingLabel label="Published" className="mb-2">
            <Form.Control
              type="number"
              value={published}
              onChange={({ target }) => setPublished(target.value)}
            />
          </FloatingLabel>
          <FloatingLabel label="Add genre" className="mb-2">
            <Form.Control
              value={genre}
              onChange={({ target }) => setGenre(target.value)}
            />
          </FloatingLabel>
          <Button variant="primary" size="sm" onClick={addGenre} type="button">
            add genre
          </Button>
          <div style={{ marginTop: '15px' }}>genres: {genres.join(', ')}</div>
        </Form.Group>
        <Button type="submit" variant="primary" style={{ marginTop: '20px' }}>
          Create book
        </Button>
      </Form>
    </Container>
  )
}

export default NewBook
