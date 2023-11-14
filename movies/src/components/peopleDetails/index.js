import React from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Woman2OutlinedIcon from "@mui/icons-material/Woman2Outlined";
import ManOutlinedIcon from "@mui/icons-material/ManOutlined";
import CakeIcon from '@mui/icons-material/Cake';
import VillaIcon from '@mui/icons-material/Villa';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const root = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
};
const chip = {margin: 0.5};

const PeopleDetails = ({actor}) => {
    return (
        <>
            <Typography variant="h5" component="h3">
                Overview
            </Typography>

            <Typography variant="h6" component="p">
                {actor.biography}
            </Typography>

            <Paper
                elevation={2}
                component="ul"
                sx={{
                    ...root,
                    marginTop: "1em",
                }}
            >
                <li>
                    <Chip label="KnownAs" sx={{...chip}} color="primary"/>
                </li>
                {actor.also_known_as.map((k) => (
                    <li key={k}>
                        <Chip label={k} sx={{...chip}}/>
                    </li>
                ))}
            </Paper>
            <Paper component="ul" sx={{...root}}>
                <Chip icon={<CakeIcon/>} label={`${actor.birthday}`}/>
                <Chip
                    icon={<VillaIcon/>}
                    label={`${actor.place_of_birth}`}
                />
                <Chip
                    icon={<AutoAwesomeIcon/>}
                    label={`${actor.popularity}`}
                />
            </Paper>
            <Paper component="ul" sx={{ display: 'flex', alignItems: 'center', ...root }}>
                <li>
                    <Chip label="Gender" sx={{ marginRight: 1, ...chip }} color="primary"/>
                    {actor.gender === 1 ? (
                        <>
                            <Woman2OutlinedIcon fontSize="medium" style={{ verticalAlign: 'sub' }}/>
                            <span>Female</span>
                        </>
                    ) : (
                        <>
                            <ManOutlinedIcon fontSize="medium" style={{ verticalAlign: 'sub' }}/>
                            <span>Male</span>
                        </>
                    )}
                </li>
            </Paper>
        </>
    );
};
export default PeopleDetails;