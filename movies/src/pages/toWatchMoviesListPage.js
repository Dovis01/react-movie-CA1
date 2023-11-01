import React, {useContext, useState} from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner'
import WriteReview from "../components/cardIconAndAvatar/icons/writeReview";
import RemoveFromWatchList from "../components/cardIconAndAvatar/icons/removeFromWatchList";

const ToWatchMoviesListPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const {toWatchList: movieIds } = useContext(MoviesContext);

    const moviesPerPage = 20;

    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMoviesIds = movieIds.slice(indexOfFirstMovie, indexOfLastMovie);

    // Create an array of queries and run in parallel.
    const toWatchListQueries = useQueries(
        currentMoviesIds.map((movieId) => {
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
            currentPage={currentPage}
            nextPage={() => setCurrentPage(currentPage + 1)}
            previousPage={() => setCurrentPage(currentPage - 1)}
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