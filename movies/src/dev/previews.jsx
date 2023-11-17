import React from 'react'
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import ActorScrollList from "../components/movieDetailActorVideo";
import MoviesContextProvider from "../contexts/moviesContext";
import SignInPage from "../pages/signInPage";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/ActorScrollList">
                <ActorScrollList/>
            </ComponentPreview>
            <ComponentPreview
                path="/MoviesContextProvider">
                <MoviesContextProvider/>
            </ComponentPreview>
            <ComponentPreview path="/SignInPage">
                <SignInPage/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews