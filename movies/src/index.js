import React from "react";
import {createRoot} from "react-dom/client";
import {BrowserRouter, Route, Navigate, Routes} from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/moviesDetail/movieDetailsPage";
import FavoriteMoviesPage from "./pages/personal/favoriteMoviesPage";
import UpcomingMoviesPage from "./pages/movies/upcomingMoviesPage";
import NowPlayingMoviesPage from "./pages/movies/nowPlayingMoviesPage";
import ToWatchMoviesListPage from "./pages/personal/toWatchMoviesListPage";
import MovieReviewPage from "./pages/moviesDetail/movieReviewPage";
import SiteHeader from './components/siteHeader'
import {QueryClientProvider, QueryClient} from "react-query";
import {ReactQueryDevtools} from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/moviesDetail/addMovieReviewPage'
import WeekTrendingMoviesPage from "./pages/movies/weekTrendingMoviesPage";
import PopularPeoplePage from "./pages/people/popularPeoplePage";
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 360000,
            refetchInterval: 360000,
            refetchOnWindowFocus: false
        },
    },
});

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <SiteHeader/>
                <MoviesContextProvider>
                    <Routes>
                        <Route path="/people/popular" element={<PopularPeoplePage/>}/>
                        <Route path="/people/popular/:id" element={<PopularPeoplePage/>}/>
                        <Route path="/reviews/form" element={<AddMovieReviewPage/>}/>
                        <Route path="/movies/upcoming" element={<UpcomingMoviesPage/>}/>
                        <Route path="/movies/nowplaying" element={<NowPlayingMoviesPage/>}/>
                        <Route path="/movies/weektrending" element={<WeekTrendingMoviesPage/>}/>
                        <Route path="/movies/favorites" element={<FavoriteMoviesPage/>}/>
                        <Route path="/movies/watchlist" element={<ToWatchMoviesListPage/>}/>
                        <Route path="/reviews/:id" element={<MovieReviewPage/>}/>
                        <Route path="/movies/:id" element={<MoviePage/>}/>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="*" element={<Navigate to="/"/>}/>
                    </Routes>
                </MoviesContextProvider>
            </BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    );
};

const rootElement = createRoot(document.getElementById("root"))
rootElement.render(<DevSupport ComponentPreviews={ComponentPreviews}
                               useInitialHook={useInitial}
>
    <App/>
</DevSupport>);
