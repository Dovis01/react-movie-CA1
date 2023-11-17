import React, { useState } from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
    const [favorites, setFavorites] = useState( [] )
    const [myReviews, setMyReviews] = useState( {} )
    const [toWatchList, setToWatchList] = useState( [] )
    const [user, setUser] = useState({});

    const addToFavorites = (movie) => {
        let newFavorites = [];
        if (!favorites.includes(movie.id)){
            newFavorites = [...favorites, movie.id];
        }
        else{
            newFavorites = [...favorites];
        }
        setFavorites(newFavorites)
    };

    const addToWatchList = (movie) => {
        let newWatchList = [];
        if (!toWatchList.includes(movie.id)){
            newWatchList = [...toWatchList, movie.id];
        }
        else{
            newWatchList = [...toWatchList];
        }
        setToWatchList(newWatchList);
        console.log(newWatchList);
    };

    // We will use this function in a later section
    const removeFromFavorites = (movie) => {
        setFavorites( favorites.filter(
            (mId) => mId !== movie.id
        ) )
    };

    const removeFromWatchList = (movie) => {
        setToWatchList( toWatchList.filter(
            (mId) => mId !== movie.id
        ) )
    };

    const addReview = (movie, review) => {
        setMyReviews( {...myReviews, [movie.id]: review } )
    };
    //console.log(myReviews);
    const addUser = (user) => {
        setUser(user);
    };

    return (
        <MoviesContext.Provider
            value={{
                favorites,
                toWatchList,
                user,
                addUser,
                addToFavorites,
                removeFromFavorites,
                removeFromWatchList,
                addReview,
                addToWatchList,
            }}
        >
            {props.children}
        </MoviesContext.Provider>
    );
};

export default MoviesContextProvider;