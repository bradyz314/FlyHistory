import { Box, Button, TextField } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import { useState } from "react";


interface FilterBarProps {
    handleOriginChange: (origin: string) => void,
    handleDestinationChange: (destination: string) => void,
}

export default function FilterBar({handleOriginChange, handleDestinationChange} : FilterBarProps) {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
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
                            borderColor: '#4387cc'
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
                    sx={{
                        input: { 
                            color: 'white',  
                            borderColor: '#4387cc'
                        }
                    }}
                    onChange={(e) => setDestination(e.target.value)}
                />
            </Grid>
            <Grid xs={4}></Grid>
            <Grid xs={4}>
                <Box textAlign='center'>
                    <Button 
                        variant="contained"
                        onClick={() => {
                            handleOriginChange(origin);
                            handleDestinationChange(destination);
                        }}
                        className="filter-btn"
                        sx={{
                            input: { 
                                mx: 'auto'
                            }
                        }}
                    >
                        Filter
                    </Button>
                </Box>
            </Grid>
            <Grid xs={4}></Grid>
        </Grid>
    )
}