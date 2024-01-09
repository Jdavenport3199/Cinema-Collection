export async function POST(request: Request) {
  try {
    const res = await request.json();

    const genre_key = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=4df29563fef1ac0f15e35abe376b0042&with_genres=${res.mainGenre},${res.subGenre1},${res.subGenre2}&page=${res.page}`
    );
    const genre_data = await genre_key.json();

    let moviesArray = [];

    for (let i = 0; i < 16; i++) {
      const movie_key = await fetch(
        `https://www.omdbapi.com/?i=tt3896198&apikey=ed6233cd&t=${
          genre_data.results[
            Math.floor(Math.random() * genre_data.results.length)
          ].original_title
        }`
      );

      const movie_data = await movie_key.json();
      moviesArray.push(movie_data);

    }

    return Response.json(
      {
        message: "Eureka!",
        data: moviesArray,
      },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return Response.json({ message: "error" }, { status: 500 });
  }
}