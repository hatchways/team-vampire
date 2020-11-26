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

import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';



const NewEventType = () => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("sm"));
    return (
        <Container>
            <Grid 
                container 
                alignItems="center" 
                spacing={2} 
            >
                <Grid 
                    item 
                    xs="12" 
                    sm="4"
                >
                    <Button
                        component={Link} 
                        to="/event_types"
                        variant="outlined"
                        color="secondary"
                        text="Back"
                    />
                </Grid> 
               <Grid 
                    item 
                    xs="12" 
                    sm="4"
                >
                    <Typography 
                        variant="subtitle1" 
                        component="h1"
                        text="Add One-on-One Event Type"
                        align="center"
                    />
               </Grid>
               <Grid 
                    item 
                    xs="12" 
                    sm="4"
                >
                    <Typography 
                        variant="subtitle2" 
                        component="p"
                        text="Your event type is OFF"
                        align={matches ? "right" : "center"}
                    />
               </Grid>
            </Grid>
            <form>
                <Grid container spacing={2}>
                    <Grid item container >
                        <Grid item xs={12} md={6} >
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
                    </Grid>
                    <Grid item container >
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="description"
                                label="Description"
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={2}
                            />
                        </Grid>
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
                        variant="contained"
                        color="primary"
                        text="Save"
                        fullWidth={matches ? "false" : "true"} 
                    />
                    </Grid>
                </Grid>
            </form>
        </Container>
    )
}

export default NewEventType
