import { Button, Container, Row, Col } from 'react-bootstrap'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { Route, Routes, useNavigate } from 'react-router-dom'

const App = () => {
  const navigate = useNavigate()

  return (
    <Container style={{ marginTop: '20px' }}>
      <Row className="justify-content-md-center">
        <Col xs={12} lg={6}>
          <div style={{ marginBottom: '20px' }}>
            <Button
              variant="outline-secondary"
              style={{ marginRight: '5px' }}
              onClick={() => navigate('/authors')}
            >
              authors
            </Button>
            <Button
              variant="outline-secondary"
              style={{ marginRight: '5px' }}
              onClick={() => navigate('/books')}
            >
              books
            </Button>
            <Button
              variant="outline-secondary"
              onClick={() => navigate('/add-book')}
            >
              add book
            </Button>
          </div>
          <Routes>
            <Route path="/authors" element={<Authors />} />
            <Route path="/books" element={<Books />} />
            <Route path="/add-book" element={<NewBook />} />
            <Route path="/" element={<Authors />} />
          </Routes>
        </Col>
      </Row>
    </Container>
  )
}

export default App
