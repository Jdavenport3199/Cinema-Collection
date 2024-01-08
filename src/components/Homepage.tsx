"use client";
import { FormEvent, useEffect, useState } from "react";
import Movie from "../components/Movie";
import MovieGrid from "../components/MovieGrid";
import RelatedMovieGrid from "@/components/RelatedMovieGrid";
import TrendingMovieGrid from "@/components/TrendingMovieGrid";

import { MovieResults } from "../app/page";

export default function Home({
  backendMovies,
}: {
  backendMovies: MovieResults[];
}) {
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
      // movieGenre: string[];
      movieDirector: string;
      movieWriter: string;
      movieActors: string;
      movieAwards: string;
      moviePoster: string;
      movieBoxoffice: string;
      movieMetascore: string;
    } | null>
  >(backendMovies);

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
      await response.json();
      const moviesAdded: string[] = [];

      const additionalMovies = await Promise.all(
        [...Array(16)].map(async () => {
          const response: any = await fetch("/api/movieSearch", {
            method: "POST",
            body: JSON.stringify({
              mainGenre: genre,
              subGenre1: subgenre1,
              subGenre2: subgenre2,
              page: page,
            }),
          });

          const data = await response.json();
          // const genreArray = data.data.Genre.split(",").map((genre: string) =>
          //   genre.trim()
          // );

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
              // movieGenre: genreArray,
              movieDirector: data.data.Director,
              movieWriter: data.data.Writer,
              movieActors: data.data.Actors,
              movieAwards: data.data.Awards,
              moviePoster: data.data.Poster,
              movieBoxoffice: data.data.BoxOffice,
              movieMetascore: data.data.Metascore,
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

  // async function loadTrendingGrid() {
  //   const trending = await fetch("/api/movieTrending", {
  //     method: "POST",
  //     body: JSON.stringify({
  //     }),
  //   });

  //   try {
  //     await trending.json();
  //     const moviesAdded: string[] = [];

  //     const additionalMovies = await Promise.all(
  //       [...Array(8)].map(async () => {
  //         const trending: any = await fetch("/api/movieTrending", {
  //           method: "POST",
  //           body: JSON.stringify({
  //           }),
  //         });

  //         const data = await trending.json();
  //         console.log("MOVIES ADDED: " + moviesAdded);

  //         if (
  //           !moviesAdded.includes(data.data.Title) &&
  //           data.data.Response === "True" &&
  //           data.data.Poster !== "N/A"
  //         ) {
  //           moviesAdded.push(data.data.Title);
  //           console.log("MOVIES ADDED:" + moviesAdded);
  //           return {
  //             movieID: data.data.imdbID,
  //             movieTitle: data.data.Title,
  //             movieYear: data.data.Year,
  //             movieRated: data.data.Rated,
  //             movieRuntime: data.data.Runtime,
  //             movieRating: data.data.imdbRating,
  //             movieVotes: data.data.imdbVotes,
  //             moviePlot: data.data.Plot,
  //             // movieGenre: genreArray,
  //             movieDirector: data.data.Director,
  //             movieWriter: data.data.Writer,
  //             movieActors: data.data.Actors,
  //             movieAwards: data.data.Awards,
  //             moviePoster: data.data.Poster,
  //             movieBoxoffice: data.data.BoxOffice,
  //             movieMetascore: data.data.Metascore,
  //           };
  //         } else {
  //           return null;
  //         }
  //       })
  //     );

  //     setMovies(additionalMovies);
  //   } catch (error) {
  //     console.error("Error in form submission:", error);
  //   }
  // }

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

  const [currentDisplay, setCurrentDisplay] = useState<
    "movie" | "movieGrid" | null
  >("movieGrid");

  const [movieDetailsIndex, setMovieDetailsIndex] = useState<null | number>(
    null
  );

  return (
    <>
      <main>
        {currentDisplay === null && (
          <>
            <div className="content-container">
              <div
                className="content"
                style={{
                  textAlign: "center",
                  marginTop: "15%",
                  display: "block",
                }}
              >
                <h1 style={{ fontSize: "64px", lineHeight: 1.2 }}>
                  Cinema Collection
                </h1>
                <span style={{ fontSize: "16px" }}>
                  Discover Fresh Films, Curated by Your Favorite Genres
                </span>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "2rem",
                  }}
                >
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
                    <button type="submit" style={{ width: "28%" }}>
                      <img src="/search.svg" />
                    </button>
                  </form>
                </div>

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
                <button
                  type="submit"
                  style={{ width: "28%", marginRight: ".8rem" }}
                >
                  <img src="/search.svg" />
                </button>
                <button
                  onClick={() => {
                    setCurrentDisplay("movieGrid");
                  }}
                  style={{
                    paddingLeft: ".7rem",
                    paddingRight: ".7rem",
                    width: "28%",
                  }}
                >
                  <img src="/home.svg" />
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
