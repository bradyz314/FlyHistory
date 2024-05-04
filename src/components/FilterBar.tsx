import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, outlinedInputClasses, selectClasses } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import { useState } from "react";
import { styled } from '@mui/system';


interface FilterBarProps {
    handleOriginChange: (origin: string) => void,
    handleDestinationChange: (destination: string) => void,
    handleFlightsChange: (flights: number) => void,
    handleClassChange: (flightClass: string) => void
}

const StyledSelect = styled(Select)`
    border-color: #4387cc;
    color: white

    & .${selectClasses.icon} {
    color: #4387cc;
    }

    & .${outlinedInputClasses.notchedOutline} {
    border-color: #4387cc;
    }
    &:hover .${outlinedInputClasses.notchedOutline} {
    border-color: #4387cc;
    }

    &.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline} 
    {
    // VERY IMPORTANT TO NOT LEAVE AN EMPTY SPACE BETWEEN '&' AND '.'
    border-color: #4387cc !important;
    }
    `;

export default function FilterBar({handleOriginChange, handleDestinationChange, handleFlightsChange, handleClassChange} : FilterBarProps) {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [flights, setFlights] = useState(-1);
    const [flightClass, setFlightClass] = useState('Any');
    return (
        <Grid container spacing={2}>
            <Grid xs={12}>
                 <TextField
                    className="location-filter"
                    label="Origin"
                    focused
                    fullWidth
                    sx={{
                        input: { 
                            color: 'white',  
                        }
                    }}
                    onChange={(e) => setOrigin(e.target.value)}
                />
            </Grid>
            <Grid xs={12}>
                <TextField
                    className="location-filter"
                    label="Destination"
                    focused
                    fullWidth
                    variant="outlined"
                    sx={{
                        input: { 
                            color: 'white',  
                        }
                    }}
                    onChange={(e) => setDestination(e.target.value)}
                />
            </Grid>
            <Grid xs={6}>
                <FormControl fullWidth>
                    <InputLabel id="flight-select" style={{color: '#4387cc'}}>Num. of Flights</InputLabel>
                    <StyledSelect
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={flights}
                        label="Num. of Flights"
                        style={{color: 'white'}}
                        onChange={(e) => setFlights(e.target.value as number)}
                    >
                        <MenuItem value={-1}>Any</MenuItem>
                        <MenuItem value={1}>One</MenuItem>
                        <MenuItem value={2}>Two</MenuItem>
                        <MenuItem value={3}>Three</MenuItem>
                        <MenuItem value={4}>Four</MenuItem>
                        <MenuItem value={5}>Five</MenuItem>
                    </StyledSelect>
                </FormControl>
            </Grid>
            <Grid xs={6}>
                <FormControl fullWidth>
                    <InputLabel style={{color: '#4387cc'}}>Flight Class</InputLabel>
                    <StyledSelect
                        value={flightClass}
                        label="Flight Class"
                        style={{color: 'white'}}
                        onChange={(e) => setFlightClass(e.target.value as string)}
                    >
                        <MenuItem value={'Any'}>Any</MenuItem>
                        <MenuItem value={'Economy'}>Economy</MenuItem>
                        <MenuItem value={'Premium economy'}>Premium economy</MenuItem>
                        <MenuItem value={'Business'}>Business</MenuItem>
                        <MenuItem value={'First'}>First</MenuItem>
                    </StyledSelect>
                </FormControl>
            </Grid>
            <Grid xs={4}></Grid>
            <Grid xs={4}>
                <Box textAlign='center'>
                    <Button 
                        variant="contained"
                        onClick={() => {
                            handleOriginChange(origin);
                            handleDestinationChange(destination);
                            handleFlightsChange(flights);
                            handleClassChange(flightClass);
                        }}
                        className="filter-btn"
                    >
                        Filter
                    </Button>
                </Box>
            </Grid>
            <Grid xs={4}></Grid>
        </Grid>
    )
}