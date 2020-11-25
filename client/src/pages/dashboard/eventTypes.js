import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Inputs/Button';

const eventTypes = () => {
    return (
        <div>
            <Button 
                component={Link} 
                to="/event_types/new"
                variant="contained"
                color="primary"
                text="New Event Type"
            />
        </div>
    )
}

export default eventTypes
