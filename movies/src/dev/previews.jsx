import React from 'react'
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import ActorScrollList from "../components/movieDetailActorCard";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/ActorScrollList">
                <ActorScrollList/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews