import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../../components/Layout/Container';
import Button from '../../components/Inputs/Button';
import DashboardHeader from '../../components/Layout/DashboardHeader';

const eventTypes = () => {
    return (
        <>
            <DashboardHeader />
            <Container>
                <Button 
                    component={Link} 
                    to="/event_types/new"
                    variant="outlined"
                    color="primary"
                    text="New Event Type"
                />
            </Container>
        </>
    )
}

export default eventTypes
