import { useApolloClient } from '@apollo/client'
import { Button, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const User = ({ setToken }) => {
  const client = useApolloClient()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    navigate('/login')
  }

  useEffect(() => {
    const storedUsername = localStorage.getItem('library-username')
    if (storedUsername) {
      setUsername(storedUsername)
    }
  }, [])

  return (
    <Container>
      <h1 style={{ marginBottom: '20px' }}>User info</h1>
      Logged in as 🧑🏼‍💼 {username}
      <Button
        size="sm"
        style={{ marginLeft: '15px' }}
        variant="outline-danger"
        onClick={logout}
      >
        Logout
      </Button>
    </Container>
  )
}

export default User
