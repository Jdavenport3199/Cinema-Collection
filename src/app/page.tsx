// SERVER COMPONENT!!!!!

import Homepage from "../components/Homepage";

export interface MovieResults {
  movieID: string;
  movieTitle: string;
  movieYear: string;
  movieRated: string;
  movieRuntime: string;
  movieRating: string;
  movieVotes: string;
  moviePlot: string;
  // movieGenre: string[];
  movieDirector: string;
  movieWriter: string;
  movieActors: string;
  movieAwards: string;
  moviePoster: string;
  movieBoxoffice: string;
  movieMetascore: string;
}

export default async function Home() {
  let returnObj = [];
  let finalReturn = [];

  try {
    const genre_key = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=4df29563fef1ac0f15e35abe376b0042&with_genres=27,18,28&page=1`
    );
    const genre_data = await genre_key.json();

    for (let i = 0; i < 16; i++) {
      const movie_key = await fetch(
        `https://www.omdbapi.com/?i=tt3896198&apikey=ed6233cd&t=${
          genre_data.results[
            Math.floor(Math.random() * genre_data.results.length)
          ].original_title
        }`
      );

      const movie_data = await movie_key.json();

      returnObj.push(movie_data);
    }

    const validMovies = returnObj.filter((x) => {
      return x.Response !== "False";
    });

    console.log(validMovies);

    finalReturn = validMovies;
  } catch (err) {
    console.log(err);
    return Response.json({ message: "error" }, { status: 500 });
  }

  return <Homepage backendMovies={finalReturn} />;
}
