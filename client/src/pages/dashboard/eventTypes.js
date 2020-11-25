import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';


const eventTypes = () => {
    return (
        <div>
            <Button 
                component={Link} 
                to="/event_types/new"
                variant="contained"
                color="primary"
            >
                New Event Type
            </Button>
        </div>
    )
}

export default eventTypes
