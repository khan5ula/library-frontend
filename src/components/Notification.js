import { useState } from 'react'
import { Alert } from 'react-bootstrap'

const Notification = ({ errorMessage }) => {
  const [show, setShow] = useState(true)

  if (show && errorMessage) {
    return (
      <Alert
        variant="info"
        onClose={() => setShow(false)}
        dismissible
        style={{
          marginTop: '20px',
        }}
      >
        {errorMessage}
      </Alert>
    )
  }
}

export default Notification
