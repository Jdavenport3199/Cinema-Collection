"use client";
import { FormEvent, useEffect, useState } from "react";
import Movie from "../components/Movie";
import MovieGrid from "../components/MovieGrid";
import RelatedMovieGrid from "@/components/RelatedMovieGrid";
import TrendingMovieGrid from "@/components/TrendingMovieGrid";

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
      movieBoxoffice: string;
      movieMetascore: string;
    } | null>
  >([]);

  const [moviesTrending, setMoviesTrending] = useState<
    Array<{
      moviePoster: string;
    } | null>
  >([]);

  const [genre, setGenre] = useState("");
  const [subgenre1, setSubgenre1] = useState("");
  const [subgenre2, setSubgenre2] = useState("");
  const [page, setPage] = useState<number>(1);

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
        page: page,
      }),
    });

    try {
      const responseData = await response.json();

      // const moviesArray: string[] = [];
      let genreArray: any[] = [];

      // if (
      //   !moviesArray.includes(responseData.data.Title) &&
      //   responseData.data.Response === "True" &&
      //   responseData.data.Poster !== "N/A"
      // ) {
      //   moviesArray.push(responseData.data.Title);
      //   genreArray = responseData.data.Genre.split(",").map((genre: string) =>
      //     genre.trim()
      //   );

      const moviesTest = responseData.data.map((x: any) => {
        return {
          movieID: x.imdbID,
          movieTitle: x.Title,
          movieYear: x.Year,
          movieRated: x.Rated,
          movieRuntime: x.Runtime,
          movieRating: x.imdbRating,
          movieVotes: x.imdbVotes,
          moviePlot: x.Plot,
          movieGenre: genreArray,
          movieDirector: x.Director,
          movieWriter: x.Writer,
          movieActors: x.Actors,
          movieAwards: x.Awards,
          moviePoster: x.Poster,
          movieBoxoffice: x.BoxOffice,
          movieMetascore: x.Metascore,
        };
      });

      setMovies(moviesTest);
      // } else {
      //   console.log("IF STATEMENT")
      //   return null;
      // }
    } catch (error) {
      console.error("Error in form submission:", error);
    }
  }

  async function loadTrendingGrid() {
    try {
      const trending = await fetch("/api/movieTrending", {
        method: "POST",
        body: JSON.stringify({}),
      });

      const trendingData = await trending.json();
      const moviePosters = trendingData.data.results.map((x: any) => {
        return {
          moviePoster: "https://image.tmdb.org/t/p/w500/" + x.poster_path,
        };
      });

      setMoviesTrending(moviePosters);
    } catch (error) {
      console.error("Error in form submission:", error);
    }
  }

  useEffect(() => {
    loadTrendingGrid();
  }, []);

  const [currentDisplay, setCurrentDisplay] = useState<
    "movie" | "movieGrid" | null
  >(null);

  const [movieDetailsIndex, setMovieDetailsIndex] = useState<null | number>(
    null
  );

  return (
    <>
      <main>
        {currentDisplay === null && (
          <>
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
                    Genre
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
                    Genre
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
                    Genre
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
                <button type="submit" style={{ width: "28%" }}>
                  <img src="/search.svg" />
                </button>
              </form>
            </div>

            <div className="content-container">
              <div
                className="content"
                style={{
                  textAlign: "left",
                  marginTop: "12%",
                  display: "block",
                }}
              >
                <h1 className="title">Cinema Collection</h1>
                <span style={{ fontSize: "18px" }}>
                  Discover Fresh Films, Curated by Your Favorite Genres
                </span>

                <TrendingMovieGrid
                  movieData={moviesTrending}
                  changeDisplay={setCurrentDisplay}
                  movieDetails={setMovieDetailsIndex}
                />
              </div>
            </div>
          </>
        )}

        {currentDisplay === "movieGrid" && (
          <>
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
                    Genre
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
                    Genre
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
                    Genre
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
                <button
                  type="submit"
                  onClick={() => {
                    setPage((page) => page + 1);
                  }}
                  style={{ width: "28%" }}
                >
                  <img src="/search.svg" />
                </button>
              </form>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "1rem",
              }}
            >
              <span style={{ fontSize: "16px", textAlign: "center" }}>
                Press&ensp;
              </span>
              <img src="/search-extra.svg" />
              <span style={{ fontSize: "16px", textAlign: "center" }}>
                &ensp;for New Movies
              </span>
            </div>

            <MovieGrid
              movieData={movies}
              changeDisplay={setCurrentDisplay}
              movieDetails={setMovieDetailsIndex}
            />
          </>
        )}

        {currentDisplay === "movie" && (
          <>
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
                    Genre
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
                    Genre
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
                    Genre
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
                <button
                  type="submit"
                  onClick={() => {
                    setPage((page) => (page = 1));
                  }}
                  style={{ width: "28%" }}
                >
                  <img src="/search.svg" />
                </button>
              </form>
            </div>

            <Movie
              singleMovie={movies[movieDetailsIndex!]!}
              changeDisplay={setCurrentDisplay}
            />

            <RelatedMovieGrid
              movieData={movies}
              changeDisplay={setCurrentDisplay}
              movieDetails={setMovieDetailsIndex}
            />
          </>
        )}
      </main>

      <div
        className="background"
        style={{
          backgroundImage:
            movies?.length > 0
              ? `url(${movies[movieDetailsIndex!]?.moviePoster})`
              : `url('./background.jpg')`,
        }}
      ></div>
    </>
  );
}
