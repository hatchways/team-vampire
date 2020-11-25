import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../../components/Layout/Container';
import Typography from '../../components/DataDisplay/Typography';
import Button from '../../components/Inputs/Button';

const newEventType = () => {
    return (
        <Container>
            <Button
                component={Link} 
                to="/event_types"
                variant="outlined"
                color="primary"
                text="Back"
            />
            <Typography 
                variant="h5" 
                text="Add One-on-One Event Type"
            />
        </Container>
    )
}

export default newEventType
