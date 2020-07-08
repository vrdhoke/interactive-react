import React from 'react'
import { Link } from 'react-router-dom';

function Movie(props) {
    const {title, release_date,episode_id} = props.movie;
    return (
        <div>
            {title}
            {release_date}
        </div>
    )
}

export default Movie