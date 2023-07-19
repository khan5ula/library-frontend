import { useQuery } from '@apollo/client'
import { Container, Table, ButtonGroup, ToggleButton } from 'react-bootstrap'
import { ALL_BOOKS, ALL_GENRES } from '../queries'
import Loading from './Loading'
import { useState, useEffect } from 'react'

const Books = () => {
  const booksResult = useQuery(ALL_BOOKS, {
    pollInterval: 10000,
  })

  const genresResult = useQuery(ALL_GENRES, {
    pollInterval: 10000,
  })

  const [checkedGenres, setCheckedGenres] = useState([])

  useEffect(() => {
    if (genresResult.data) {
      const genres = genresResult.data.allGenres
      const initialCheckedGenres = {}
      genres.forEach((g) => {
        initialCheckedGenres[g] = false
      })
      setCheckedGenres(initialCheckedGenres)
    }
  }, [genresResult.data])

  if (booksResult.loading || genresResult.loading) {
    return (
      <div>
        <Loading />
      </div>
    )
  }

  const books = booksResult.data.allBooks
  const genres = genresResult.data.allGenres

  const handleToggle = (genre) => {
    setCheckedGenres((state) => ({
      ...state,
      [genre]: !state[genre],
    }))
  }

  return (
    <Container>
      <h1 style={{ marginBottom: '20px' }}>Books</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <h3>Title</h3>
            </th>
            <th>
              <h3>Author</h3>
            </th>
            <th>
              <h3>Published</h3>
            </th>
          </tr>
        </thead>
        <tbody>
          {books.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {genres.length > 0 && (
        <ButtonGroup className="mb-2">
          {genres.map((g) => (
            <ToggleButton
              key={g}
              id={`toggle-check-${g}`}
              size="sm"
              type="checkbox"
              variant="outline-primary"
              checked={checkedGenres[g]}
              onChange={() => handleToggle(g)}
            >
              {g}
            </ToggleButton>
          ))}
        </ButtonGroup>
      )}{' '}
    </Container>
  )
}

export default Books
