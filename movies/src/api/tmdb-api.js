
export const getMovies = (args) => {
    const [, pagePart] = args.queryKey;
    const {page} = pagePart;

    const pageLast = page * 2;
    const pageFirst = pageLast - 1;

    return Promise.all([
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${pageFirst}`),
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${pageLast}`)
    ])
        .then(responses => {
            // 检查所有响应是否成功
            for (const response of responses) {
                if (!response.ok) {
                    throw new Error('Problem fetching movies');
                }
            }
            // 将所有响应转换为 JSON
            return Promise.all(responses.map(response => response.json()));
        })
        .then(data => {
            // 合并两页的结果
            const moviesPage1 = data[0].results || [];
            const moviesPage2 = data[1].results || [];
            const combinedMovies = [...moviesPage1, ...moviesPage2];

            // 你可能需要合并其它分页数据，这取决于你如何处理分页
            // 例如，总条目数、总页数等
            // 这里我们只返回了合并后的电影结果
            return {
                page: pageFirst,
                results: combinedMovies,
                total_results: 10000,
                total_pages: 250
            };
        })
        .catch((error) => {
            throw error;
        });
};

export const getMovie = (args) => {
    //console.log(args) -> queryKey JSON
    const [, idPart] = args.queryKey;
    const {id} = idPart;
    return fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
    ).then((response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};

export const getGenres = async () => {
    return fetch(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
        process.env.REACT_APP_TMDB_KEY +
        "&language=en-US"
    ).then((response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};

export const getMovieImages = ({queryKey}) => {
    const [, idPart] = queryKey;
    const {id} = idPart;
    return fetch(
        `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.REACT_APP_TMDB_KEY}`
    ).then((response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();

    })
        .catch((error) => {
            throw error
        });
};

export const getMovieReviews = ({queryKey}) => {
    const [, idPart] = queryKey;
    const {id} = idPart;
    return fetch(
        `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.REACT_APP_TMDB_KEY}`
    ).then((response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();

    }).catch((error) => {
        throw error
    });
};

export const getUpcomingMovies = (args) => {
    const [, pagePart] = args.queryKey;
    const {page} = pagePart;

    const pageLast = page * 2;
    const pageFirst = pageLast - 1;

    return Promise.all([
        fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=${pageFirst}`),
        fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=${pageLast}`)
    ])
        .then(responses => {
            for (const response of responses) {
                if (!response.ok) {
                    throw new Error('Problem fetching movies');
                }
            }
            return Promise.all(responses.map(response => response.json()));
        })
        .then(data => {
            const moviesPage1 = data[0].results || [];
            const moviesPage2 = data[1].results || [];
            const combinedMovies = [...moviesPage1, ...moviesPage2];

            return {
                page: pageFirst,
                results: combinedMovies,
                total_results: 537,
                total_pages: 14
            };
        })
        .catch((error) => {
            throw error;
        });
};


export const getNowPlayingMovies = (args) => {
    const [, pagePart] = args.queryKey;
    const {page} = pagePart;

    const pageLast = page * 2;
    const pageFirst = pageLast - 1;

    return Promise.all([
        fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=${pageFirst}`),
        fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=${pageLast}`)
    ])
        .then(responses => {
            for (const response of responses) {
                if (!response.ok) {
                    throw new Error('Problem fetching movies');
                }
            }
            return Promise.all(responses.map(response => response.json()));
        })
        .then(data => {
            const moviesPage1 = data[0].results || [];
            const moviesPage2 = data[1].results || [];
            const combinedMovies = [...moviesPage1, ...moviesPage2];

            return {
                page: pageFirst,
                results: combinedMovies,
                total_results: 2003,
                total_pages: 51
            };
        })
        .catch((error) => {
            throw error;
        });
};