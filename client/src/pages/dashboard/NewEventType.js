import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../../components/Layout/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '../../components/DataDisplay/Typography';
import Button from '../../components/Inputs/Button';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const NewEventType = () => {
    return (
        <Container>
            <Grid container justify="space-between" alignItems="center" spacing={2} >
                <Grid item >
                    <Button
                        component={Link} 
                        to="/event_types"
                        variant="outlined"
                        color="primary"
                        text="Back"
                    />
                </Grid> 
               <Grid item>
                <Typography 
                    variant="subtitle1" 
                    component="h1"
                    text="Add One-on-One Event Type"
                    />
               </Grid>
               <Grid item>
                    <Typography 
                        variant="subtitle2" 
                        component="p"
                        text="Your event type is OFF"
                    />
               </Grid>
            </Grid>
            <form>
                <Grid container >
                    <Grid item xs={12}>
                        <TextField
                            autoComplete="name"
                            name="name"
                            variant="outlined"
                            required
                            fullWidth
                            id="name"
                            label="Event Name"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12}>
                         <TextField
                            id="description"
                            label="Description"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={2}
                        />
                    </Grid>
                    <Grid item xs={12}>
                    <FormControl component="fieldset">
                    <FormLabel component="legend">Duration</FormLabel>
                        <RadioGroup row aria-label="position" name="position" defaultValue="top">
                            <FormControlLabel
                                value="15"
                                control={<Radio color="primary" />}
                                label="15"
                                labelPlacement="bottom"
                            />
                            <FormControlLabel
                            value="30"
                            control={<Radio color="primary" />}
                            label="30"
                            labelPlacement="bottom"
                            />
                            <FormControlLabel
                            value="45"
                            control={<Radio color="primary" />}
                            label="45"
                            labelPlacement="bottom"
                            />
                             <FormControlLabel
                            value="60"
                            control={<Radio color="primary" />}
                            label="60"
                            labelPlacement="bottom"
                            />
                        </RadioGroup>
                    </FormControl>
                    <Button
                        type="submit"
                        variant="outlined"
                        color="primary"
                        text="Save"
                    />
                    </Grid>
                </Grid>
            </form>
        </Container>
    )
}

export default NewEventType
