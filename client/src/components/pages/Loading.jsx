import React from 'react';
import { Button, Spinner } from 'react-bootstrap';


const LoadingPage = () => (
    
    <Button variant="primary" disabled>
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        Loading...
      </Button>
    
)

export default LoadingPage