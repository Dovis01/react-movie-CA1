import React from "react";
import { useParams } from 'react-router-dom';
import PeopleDetailPageTemplate from "../../components/template/templatePeoplePage";
import { getPopularPeopleDetail} from '../../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../../components/spinner'
import PeopleDetails from "../../components/peopleDetails";



const PeoplePage = () => {
    const { id } = useParams();
    const { data: peopleDetail, error, isLoading, isError } = useQuery(
        ["popularPeopleDetails", { id: id }],
        getPopularPeopleDetail
    );

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    return (
        <>
            {peopleDetail ? (
                <>
                    <PeopleDetailPageTemplate actor={peopleDetail}>
                        <PeopleDetails actor={peopleDetail} />
                    </PeopleDetailPageTemplate>
                </>
            ) : (
                <p>Waiting for movie details</p>
            )}
        </>
    );
};

export default PeoplePage;