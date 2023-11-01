import React, {useState} from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";
import backgroundImageStyles from "../../theme/background";
import IconButton from "@mui/material/IconButton";
import LastPageRoundedIcon from '@mui/icons-material/LastPageRounded';
import FirstPageRoundedIcon from '@mui/icons-material/FirstPageRounded';
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";


function MovieListPageTemplate({movies, title, action, avatarCheck, nextPage, previousPage, currentPage}) {
    const [nameFilter, setNameFilter] = useState("");
    const [genreFilter, setGenreFilter] = useState("0");
    const genreId = Number(genreFilter);

    let displayedMovies = movies
        .filter((m) => {
            return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
        })
        .filter((m) => {
            return genreId > 0 ? m.genre_ids.includes(genreId) : true;
        });

    const handleChange = (type, value) => {
        if (type === "name") setNameFilter(value);
        else setGenreFilter(value);
    };

    return (
        <Grid container sx={{padding: '20px'}} style={backgroundImageStyles.backgroundMainContainer}>
            <Grid item xs={12}>
                <Header title={title}/>
            </Grid>
            <Grid item container spacing={5}>
                <Grid key="find" item xs={12} sm={6} md={4} lg={3} xl={2}>
                    <FilterCard
                        onUserInput={handleChange}
                        titleFilter={nameFilter}
                        genreFilter={genreFilter}
                    />
                </Grid>
                <MovieList action={action} movies={displayedMovies} avatarCheck={avatarCheck}></MovieList>
            </Grid>
            <Paper
                elevation={5}
                component="div"
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: 'center',
                    flexWrap: "nowrap",
                    padding: 0,
                    marginBottom: 0,
                    marginTop: 2.0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 1000,
                    position: 'relative',
                }}
            >
                <IconButton aria-label="go previous page" onClick={previousPage} disabled={currentPage === 1}>
                    <FirstPageRoundedIcon color="primary" fontSize="large"/>
                </IconButton>
                <Typography variant="h5" sx={{alignSelf: 'center'}}>
                    {currentPage}
                </Typography>
                <IconButton aria-label="go next page" onClick={nextPage} disabled={movies.length < 20}>
                    <LastPageRoundedIcon  color="primary" fontSize="large" />
                </IconButton>
            </Paper>
        </Grid>
    );
}

export default MovieListPageTemplate;