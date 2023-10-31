import React from "react";
import {getUpcomingMovies} from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import AddToFavorites from "../components/cardIconAndAvatar/icons/addToFavorites";
import AddToWatchList from "../components/cardIconAndAvatar/icons/addToWatchList";
import {useQuery} from "react-query";
import Spinner from "../components/spinner";
import AvatarFavoriteCheck from "../components/cardIconAndAvatar/avatar/favoritesCheck";
import AvatarToWatchListCheck from "../components/cardIconAndAvatar/avatar/toWatchListCheck";

const UpcomingMoviesPage = () => {
    //have done for using react-query
    const {data, error, isLoading, isError} = useQuery(
        "upcoming",
        getUpcomingMovies
    );

    if (isLoading) {
        return <Spinner/>;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    const movies = data.results;

    return (
        <PageTemplate
            title="Upcoming Movies"
            movies={movies}
            action={(movie) => {
                return (
                    <>
                        <AddToFavorites movie={movie}/>
                        <AddToWatchList movie={movie}/>
                    </>
                );
            }}
            avatarCheck={(movie) => {
                return (
                    <>
                        <AvatarFavoriteCheck movie={movie} />
                        <AvatarToWatchListCheck movie={movie} />
                    </>
                );
            }}
        />
    );
};

export default UpcomingMoviesPage;