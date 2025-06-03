import React from "react";

type movie = {
    title: string;
    posterURL: string;
}

export default function Movies() {
    const [query, setQuery] = React.useState("");
    const [movies, setMovies] = React.useState([]);

    const searchMovies = async () => {
        try {
            const response = await fetch(`https://api.sampleapis.com/movies/classic`);
            const data = await response.json();
            const filteredMovies = data.filter((movies: movie) =>
                movies.title.toLowerCase().includes(query.toLowerCase())
            );
            setMovies(filteredMovies);
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    }

    return (
        <>
            <div className="container">
                <h1 className="title">Movie Search Page</h1>
            </div>
            <div>
                <input
                    className="input"
                    type="text"
                    name="query"
                    placeholder="e.g Jurassic Park"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button className="button" onClick={searchMovies}>Search</button>
            </div>
            <div className="movie-container">
                {movies.length > 0 ? (
                    <ul className="movie-list">
                        {movies.map((movie: movie, index: number) => (
                            <li key={index} className="movie-item">
                                <h2 className="movie-title">{movie.title}</h2>
                                <img src={movie.posterURL} alt={movie.title} className="movie-poster" />
                                
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="no-results">No results found</p>
                )}
            </div>
        </>
    );
}