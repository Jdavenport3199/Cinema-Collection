"use client";
import { FormEvent, useEffect, useState } from "react";
import Movie from "../components/Movie";
import MovieGrid from "../components/MovieGrid";
import RelatedMovieGrid from "@/components/RelatedMovieGrid";
import TrendingMovieGrid from "@/components/TrendingMovieGrid";
import { Grid } from "react-loader-spinner";

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

  const [previousGenre, setPreviousGenre] = useState("");
  const [previousSubgenre1, setPreviousSubgenre1] = useState("");
  const [previousSubgenre2, setPreviousSubgenre2] = useState("");
  const [page, setPage] = useState<number>(1);

  const [isLoading, setIsLoading] = useState<boolean>();

  async function loadMovieGrid(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

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

      let genreArray: any[] = [];
      let moviesArray: string[] = [];

      const moviesTest = responseData.data.map((x: any) => {
        if (
          !moviesArray.includes(x.Title) &&
          x.Response === "True" &&
          x.Poster !== "N/A"
        ) {
          moviesArray.push(x.Title);

          genreArray = x.Genre.split(",").map((genre: string) => genre.trim());
          setIsLoading(false);
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
        } else {
          return null;
        }
      });

      setMovies(moviesTest.filter((movie: null) => movie !== null));
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
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "800",
                  color: "white",
                  marginRight: "1rem",
                }}
              >
                Cinema
                <br />
                Collection
              </span>

              <form
                onSubmit={(e) => {
                  loadMovieGrid(e);

                  if (!genre || !subgenre1 || !subgenre2) {
                    setCurrentDisplay(null);
                  } else {
                    setCurrentDisplay("movieGrid");
                  }
                }}
              >
                <select
                  className="dropdown"
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
                  {/* <option value="99">Documentary</option> */}
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
                  className="dropdown"
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
                  {/* <option value="99">Documentary</option> */}
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
                  className="dropdown"
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
                  {/* <option value="99">Documentary</option> */}
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
                <button type="submit" style={{ maxWidth: "2.5rem" }}>
                  <img src="/search.svg" />
                </button>
              </form>
            </div>

            <div className="content-container" style={{ marginTop: 0 }}>
              <div
                className="content"
                style={{
                  textAlign: "left",
                  marginTop: "14%",
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
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "800",
                  color: "white",
                  marginRight: "1rem",
                  cursor: "pointer",
                }}
                onClick={() => {
                  window.location.reload();
                }}
              >
                Cinema
                <br />
                Collection
              </span>

              <form
                onSubmit={(e) => {
                  loadMovieGrid(e);
                  setCurrentDisplay("movieGrid");
                }}
              >
                <select
                  className="dropdown"
                  name="genre"
                  value={genre}
                  onChange={(e) => {
                    setGenre(e.target.value);
                  }}
                  defaultValue=""
                >
                  <option value="" disabled hidden>
                    Genre
                  </option>
                  <option value="28">Action</option>
                  <option value="12">Adventure</option>
                  <option value="35">Comedy</option>
                  <option value="80">Crime</option>
                  {/* <option value="99">Documentary</option> */}
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
                  className="dropdown"
                  name="subgenre1"
                  value={subgenre1}
                  onChange={(e) => {
                    setSubgenre1(e.target.value);
                  }}
                  defaultValue=""
                >
                  <option value="" disabled hidden>
                    Genre
                  </option>
                  <option value="28">Action</option>
                  <option value="12">Adventure</option>
                  <option value="35">Comedy</option>
                  <option value="80">Crime</option>
                  {/* <option value="99">Documentary</option> */}
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
                  className="dropdown"
                  name="subgenre2"
                  value={subgenre2}
                  onChange={(e) => {
                    setSubgenre2(e.target.value);
                  }}
                  defaultValue=""
                >
                  <option value="" disabled hidden>
                    Genre
                  </option>
                  <option value="28">Action</option>
                  <option value="12">Adventure</option>
                  <option value="35">Comedy</option>
                  <option value="80">Crime</option>
                  {/* <option value="99">Documentary</option> */}
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
                  style={{ maxWidth: "2.5rem" }}
                  onClick={() => {
                    setPreviousGenre(genre);
                    setPreviousSubgenre1(subgenre1);
                    setPreviousSubgenre2(subgenre2);
                    if (
                      genre !== previousGenre ||
                      subgenre1 !== previousSubgenre1 ||
                      subgenre2 !== previousSubgenre2
                    ) {
                      setPage(1);
                    } else {
                      setPage((page) => page + 1);
                    }
                  }}
                >
                  <img src="/search.svg" />
                </button>
              </form>
            </div>

            {isLoading && (
              <div className="text-holder">
                <span
                  style={{
                    fontSize: "20px",
                    textAlign: "center",
                    color: "white",
                  }}
                >
                  &ensp;Finding Films
                </span>
                <Grid
                  visible={true}
                  height="20"
                  width="20"
                  color="#ffffff"
                  ariaLabel="grid-loading"
                  radius="12.5"
                  wrapperStyle={{ marginTop: ".8rem" }}
                  wrapperClass="grid-wrapper"
                />
              </div>
            )}

            {!isLoading && (
              <>
                <div className="text-holder">
                  <div>
                    <span
                      style={{
                        fontSize: "20px",
                        textAlign: "center",
                        color: "white",
                      }}
                    >
                      We Found Films for You
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: ".2rem",
                    }}
                  >
                    <span style={{ fontSize: "16px", textAlign: "center" }}>
                      Press&ensp;
                    </span>
                    <img src="/search-extra.svg" />
                    <span style={{ fontSize: "16px", textAlign: "center" }}>
                      &ensp;for New Films
                    </span>
                  </div>
                </div>
                <MovieGrid
                  movieData={movies}
                  changeDisplay={setCurrentDisplay}
                  movieDetails={setMovieDetailsIndex}
                />
              </>
            )}
          </>
        )}

        {currentDisplay === "movie" && (
          <>
            <div className="form-holder">
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "800",
                  color: "white",
                  marginRight: "1rem",
                  cursor: "pointer",
                }}
                onClick={() => {
                  window.location.reload();
                }}
              >
                Cinema
                <br />
                Collection
              </span>

              <form
                onSubmit={(e) => {
                  loadMovieGrid(e);
                  setCurrentDisplay("movieGrid");
                }}
              >
                <select
                  className="dropdown"
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
                  {/* <option value="99">Documentary</option> */}
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
                  className="dropdown"
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
                  {/* <option value="99">Documentary</option> */}
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
                  className="dropdown"
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
                  {/* <option value="99">Documentary</option> */}
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
                  style={{ maxWidth: "2.5rem" }}
                  onClick={() => {
                    setPreviousGenre(genre);
                    setPreviousSubgenre1(subgenre1);
                    setPreviousSubgenre2(subgenre2);
                    if (
                      genre !== previousGenre ||
                      subgenre1 !== previousSubgenre1 ||
                      subgenre2 !== previousSubgenre2
                    ) {
                      setPage(1);
                    } else {
                      setPage((page) => page + 1);
                    }
                  }}
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

      <div className="background-overlay"></div>
      <div
        className="background"
        style={{
          // backgroundImage: movies.length > 0 ? `url(${movies[movieDetailsIndex!]?.moviePoster})` : `url('./background.jpg')`,
          backgroundImage:
            movies.length <= 0
              ? `url('./background.jpg')`
              : `url(${movies[movieDetailsIndex!]?.moviePoster})`,
        }}
      ></div>
    </>
  );
}
