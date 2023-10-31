import Avatar from "@mui/material/Avatar";
import React, {useContext} from "react";
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import {MoviesContext} from "../../../contexts/moviesContext";

const AvatarToWatchList = ({movie}) => {

    const {toWatchList} = useContext(MoviesContext);

    if (toWatchList.find((id) => id === movie.id)) {
        movie.toWatch = true;
    } else {
        movie.toWatch = false
    }

    return movie.toWatch? (
        <Avatar sx={{backgroundColor: 'green'}}>
            <PlaylistAddCheckIcon/>
        </Avatar>
    ) : null
};

export default AvatarToWatchList;