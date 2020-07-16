import React from 'react'
function Movie(props) {
    const {title, release_date} = props.movie;
    return (
    <div>
        {title}<div className="movie-date">Release Year  {release_date.substring(0, 4)}</div>
    </div>
    )
}

export default Movie