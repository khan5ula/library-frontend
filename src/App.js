import { useSubscription } from '@apollo/client'
import { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Route, Routes } from 'react-router-dom'
import Authors from './components/Authors'
import Books from './components/Books'
import Home from './components/Home'
import LoginForm from './components/LoginForm'
import Menu from './components/Menu'
import NewBook from './components/NewBook'
import Notification from './components/Notification'
import { BOOK_ADDED } from './queries'

const App = () => {
  const [token, setToken] = useState(null)
  const [message, setMessage] = useState(null)

  const notify = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 3500)
  }

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const bookTitle = data.data.bookAdded.title
      notify(`New book ${bookTitle} was just added`)
    },
  })

  return (
    <Container style={{ marginTop: '20px', marginBottom: '20px' }}>
      <Menu token={token} />
      <Notification message={message} />
      <Row className="justify-content-md-center">
        <Col xs={12} lg={6}></Col>
      </Row>
      <Routes>
        <Route path="/authors" element={<Authors setMessage={notify} />} />
        <Route path="/books" element={<Books setMessage={notify} />} />
        <Route path="/add-book" element={<NewBook setMessage={notify} />} />
        <Route
          path="/login"
          element={<LoginForm setToken={setToken} setMessage={notify} />}
        />
        <Route path="/home" element={<Home setToken={setToken} />} />
        <Route path="/" element={<Authors setMessage={notify} />} />
      </Routes>
    </Container>
  )
}

export default App
