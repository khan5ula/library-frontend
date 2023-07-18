import { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Route, Routes } from 'react-router-dom'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import Menu from './components/Menu'
import NewBook from './components/NewBook'
import Notification from './components/Notification'
import User from './components/User'

const App = () => {
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 3500)
  }

  return (
    <Container style={{ marginTop: '20px', marginBottom: '20px' }}>
      <Menu />
      <Notification errorMessage={errorMessage} />
      <Row className="justify-content-md-center">
        <Col xs={12} lg={6}></Col>
      </Row>
      <Routes>
        <Route path="/authors" element={<Authors setError={notify} />} />
        <Route path="/books" element={<Books setError={notify} />} />
        <Route path="/add-book" element={<NewBook setError={notify} />} />
        <Route
          path="/login"
          element={<LoginForm setToken={setToken} setError={notify} />}
        />
        <Route path="/user" element={<User setToken={setToken} />} />
        <Route path="/" element={<Authors setError={notify} />} />
      </Routes>
    </Container>
  )
}

export default App
