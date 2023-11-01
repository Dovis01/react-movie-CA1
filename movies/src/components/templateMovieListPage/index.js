import React, {useState} from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";
import backgroundImageStyles from "../../theme/background";
import Paper from "@mui/material/Paper";
import {Pagination, Stack} from "@mui/material";


function MovieListPageTemplate({movies, title, action, avatarCheck, pageChange, currentPage,totalPages}) {
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
                    marginTop: 2.0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 1000,
                    position: 'relative',
                    padding: 1.1,
                }}
            >
                <Stack spacing={2}>
                    <Pagination count={totalPages} page={currentPage} onChange={pageChange} variant="outlined"
                                shape="rounded" size="large" boundaryCount={2} showFirstButton showLastButton/>
                </Stack>
            </Paper>
        </Grid>
    );
}

export default MovieListPageTemplate;