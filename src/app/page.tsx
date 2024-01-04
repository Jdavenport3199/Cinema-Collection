"use client";
import { FormEvent, useState } from "react";
import Movie from "../components/Movie";
import MovieGrid from "../components/MovieGrid";

export default function Home() {
  const [movies, setMovies] = useState<
    Array<{
      movieID: string;
      movieTitle: string;
      movieYear: string;
      movieRated: string;
      movieRuntime: string;
      movieRating: string;
      movieVotes: string;
      moviePlot: string;
      movieGenre: string[];
      movieDirector: string;
      movieWriter: string;
      movieActors: string;
      movieAwards: string;
      moviePoster: string;
    } | null>
  >([]);

  const [genre, setGenre] = useState("");
  const [subgenre1, setSubgenre1] = useState("");
  const [subgenre2, setSubgenre2] = useState("");

  async function loadMovieGrid(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!genre || !subgenre1 || !subgenre2) {
      console.error("Genre and both subgenres are required.");
      return;
    }

    const response = await fetch("/api/movieSearch", {
      method: "POST",
      body: JSON.stringify({
        mainGenre: genre,
        subGenre1: subgenre1,
        subGenre2: subgenre2,
      }),
    });

    try {
      const testData = await response.json();
      const moviesAdded: string[] = [];

      const additionalMovies = await Promise.all(
        [...Array(16)].map(async () => {
          const response: any = await fetch("/api/movieSearch", {
            method: "POST",
            body: JSON.stringify({
              mainGenre: genre,
              subGenre1: subgenre1,
              subGenre2: subgenre2,
            }),
          });

          const data = await response.json();
          const genreArray = testData.data.Genre.split(",");
          console.log(data.data);

          if (
            !moviesAdded.includes(data.data.Title) &&
            data.data.Response === "True" &&
            data.data.Poster !== "N/A"
          ) {
            moviesAdded.push(data.data.Title);

            return {
              movieID: data.data.imdbID,
              movieTitle: data.data.Title,
              movieYear: data.data.Year,
              movieRated: data.data.Rated,
              movieRuntime: data.data.Runtime,
              movieRating: data.data.imdbRating,
              movieVotes: data.data.imdbVotes,
              moviePlot: data.data.Plot,
              movieGenre: genreArray,
              movieDirector: data.data.Director,
              movieWriter: data.data.Writer,
              movieActors: data.data.Actors,
              movieAwards: data.data.Awards,
              moviePoster: data.data.Poster,
            };
          } else {
            return null;
          }
        })
      );

      setMovies(additionalMovies);
    } catch (error) {
      console.error("Error in form submission:", error);
    }
  }

  const [currentDisplay, setCurrentDisplay] = useState<
    "movie" | "movieGrid" | null
  >(null);

  const [movieDetailsIndex, setMovieDetailsIndex] = useState<null | number>(
    null
  );

  return (
    <>
      <main>
        <div className="form-holder">
          <form
            onSubmit={(e) => {
              loadMovieGrid(e);
              setCurrentDisplay("movieGrid");
            }}
          >
            <select
              name="genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              defaultValue=""
            >
              <option value="" disabled hidden>
                *Genre
              </option>
              <option value="28">Action</option>
              <option value="12">Adventure</option>
              <option value="35">Comedy</option>
              <option value="80">Crime</option>
              <option value="99">Documentary</option>
              <option value="18">Drama</option>
              <option value="10751">Family</option>
              <option value="14">Fantasy</option>
              <option value="36">History</option>
              <option value="27">Horror</option>
              <option value="10402">Music</option>
              <option value="9648">Mystery</option>
              <option value="10749">Romance</option>
              <option value="878">Science Fiction</option>
              <option value="53">Thriller</option>
              <option value="10752">War</option>
              <option value="37">Western</option>
            </select>

            <select
              name="subgenre1"
              value={subgenre1}
              onChange={(e) => setSubgenre1(e.target.value)}
              defaultValue=""
            >
              <option value="" disabled hidden>
                *Genre
              </option>
              <option value="28">Action</option>
              <option value="12">Adventure</option>
              <option value="35">Comedy</option>
              <option value="80">Crime</option>
              <option value="99">Documentary</option>
              <option value="18">Drama</option>
              <option value="10751">Family</option>
              <option value="14">Fantasy</option>
              <option value="36">History</option>
              <option value="27">Horror</option>
              <option value="10402">Music</option>
              <option value="9648">Mystery</option>
              <option value="10749">Romance</option>
              <option value="878">Science Fiction</option>
              <option value="53">Thriller</option>
              <option value="10752">War</option>
              <option value="37">Western</option>
            </select>

            <select
              name="subgenre2"
              value={subgenre2}
              onChange={(e) => setSubgenre2(e.target.value)}
              defaultValue=""
            >
              <option value="" disabled hidden>
                *Genre
              </option>
              <option value="28">Action</option>
              <option value="12">Adventure</option>
              <option value="35">Comedy</option>
              <option value="80">Crime</option>
              <option value="99">Documentary</option>
              <option value="18">Drama</option>
              <option value="10751">Family</option>
              <option value="14">Fantasy</option>
              <option value="36">History</option>
              <option value="27">Horror</option>
              <option value="10402">Music</option>
              <option value="9648">Mystery</option>
              <option value="10749">Romance</option>
              <option value="878">Science Fiction</option>
              <option value="53">Thriller</option>
              <option value="10752">War</option>
              <option value="37">Western</option>
            </select>
            <button type="submit" style={{ width: "30%" }}>
              <img src="/search.svg" />
            </button>
          </form>
        </div>

        {currentDisplay === null && (
          <>
            <div className="content">
              <h1>Welcome to MovieSearch</h1>
            </div>
          </>
        )}

        {currentDisplay === "movieGrid" && (
          <MovieGrid
            movieData={movies}
            changeDisplay={setCurrentDisplay}
            movieDetails={setMovieDetailsIndex}
          />
        )}

        {currentDisplay === "movie" && (
          <Movie
            singleMovie={movies[movieDetailsIndex!]!}
            changeDisplay={setCurrentDisplay}
          />
        )}
      </main>

      <div
        className="background"
        style={{
          backgroundImage: `url('./background1.jpg')`,
          // backgroundImage:
          // movies?.length > 0
          //     ? `url(${movies[0]?.moviePoster})`
          //     : `url('./background1.jpg')`,
        }}
      ></div>
    </>
  );
}
