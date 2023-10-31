import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner'
import WriteReview from "../components/cardIconAndAvatar/icons/writeReview";
import RemoveFromWatchList from "../components/cardIconAndAvatar/icons/removeFromWatchList";

const ToWatchMoviesListPage = () => {
    const {toWatchList: movieIds } = useContext(MoviesContext);

    // Create an array of queries and run in parallel.
    const toWatchListQueries = useQueries(
        movieIds.map((movieId) => {
            return {
                queryKey: ["movie", { id: movieId }],
                queryFn: getMovie,
            };
        })
    );
    // Check if any of the parallel queries is still loading.
    const isLoading = toWatchListQueries.find((m) => m.isLoading === true);

    if (isLoading) {
        return <Spinner />;
    }

    const movies = toWatchListQueries.map((q) => {
        q.data.genre_ids = q.data.genres.map(g => g.id)
        return q.data
    });

    return (
        <PageTemplate
            title="Movies To Watch"
            movies={movies}
            action={(movie) => {
                return (
                    <>
                        <RemoveFromWatchList movie={movie} />
                        <WriteReview movie={movie} />
                    </>
                );
            }}
            avatarCheck={() => {}}
        />
    );
};

export default ToWatchMoviesListPage;