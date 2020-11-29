import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Box, Button } from '@material-ui/core';
import Container from './Container';


const DashboardHeader = (props) => {
  const path = props.location.pathname;
  return (
    <Box>
      <Container>
        <div>
          <h1>My CalendApp</h1>
        </div>
        <div>
          <Button 
            component={Link} 
            to="/event_types/user/me"
            color={path === "/event_types/user/me" ? "secondary" : "default"}
          >
            Event Types
          </Button>
          <Button 
            component={Link} 
            to="/app/scheduled_events/user/me"
            color={path === "/app/scheduled_events/user/me" ? "secondary" : "default"}
          >
            Scheduled Events
          </Button>
        </div>
      </Container>
      {props.children}
    </Box>
  )
}

export default withRouter(DashboardHeader)
