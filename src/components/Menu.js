import { Container, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Menu = () => {
  const padding = {
    paddingLeft: 10,
  }

  return (
    <Container>
      <Nav
        fill
        justify
        variant="tabs"
        defaultActiveKey="/"
        className="justify-content-center"
        style={{ marginBottom: '30px' }}
      >
        <Nav.Link href="/" as="span">
          <Link style={padding} to="/">
            Authors
          </Link>
        </Nav.Link>
        <Nav.Link href="/books" as="span">
          <Link style={padding} to="/books">
            Books
          </Link>
        </Nav.Link>
        <Nav.Link href="/add-book" as="span">
          <Link style={padding} to="/add-book">
            New Book
          </Link>
        </Nav.Link>
      </Nav>
    </Container>
  )
}

export default Menu
