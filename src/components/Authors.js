import { useMutation, useQuery } from '@apollo/client'
import { useState } from 'react'
import { Button, FloatingLabel, Form, Table } from 'react-bootstrap'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const Authors = () => {
  const [name, setName] = useState('')
  const [year, setYear] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.log(
        `error occured while editing author information: ${JSON.stringify(
          error
        )}`
      )
    },
  })

  const submitEditAuthor = async (event) => {
    event.preventDefault()
    editAuthor({
      variables: { name, setBornTo: parseInt(year) },
    })
    setName('')
    setYear('')
  }

  const result = useQuery(ALL_AUTHORS, {
    pollInterval: 10000,
  })

  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  return (
    <div>
      <h1 style={{ marginBottom: '20px' }}>Authors</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <h3>Author</h3>
            </th>
            <th>
              <h3>Born</h3>
            </th>
            <th>
              <h3>Books</h3>
            </th>
          </tr>
        </thead>
        <tbody>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <hr style={{ marginTop: '30px' }} />
      <h3 style={{ marginTop: '20px', marginBottom: '20px' }}>Set birthyear</h3>

      <Form onSubmit={submitEditAuthor}>
        <Form.Group>
          <FloatingLabel label="name" className="mb-2">
            <Form.Control
              value={name}
              list="authorNameOptions"
              onChange={({ target }) => setName(target.value)}
            />
            <datalist id="authorNameOptions">
              {authors.map((author, index) => (
                <option key={index} value={author.name} />
              ))}
            </datalist>
          </FloatingLabel>
          <FloatingLabel label="year" className="mb-2">
            <Form.Control
              value={year}
              onChange={({ target }) => setYear(target.value)}
            />
          </FloatingLabel>
        </Form.Group>
        <Button type="submit" variant="primary" style={{ marginTop: '20px' }}>
          Update author
        </Button>
      </Form>
    </div>
  )
}

export default Authors
