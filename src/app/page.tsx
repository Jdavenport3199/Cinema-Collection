"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import Movie from "../components/Movie";
import MovieGrid from "../components/MovieGrid";
import RelatedMovieGrid from "@/components/RelatedMovieGrid";
import TrendingMovieGrid from "@/components/TrendingMovieGrid";
import { Grid } from "react-loader-spinner";
import Image from "next/image";
import styles from "../app/page.module.css";

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
  const [isEmptyMovies, setIsEmptyMovies] = useState<boolean>(false);

  async function loadMovieGrid(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setIsEmptyMovies(false);

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

      const moviesTest = responseData.data?.map((x: any) => {
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

      if (moviesTest && Array.isArray(moviesTest)) {
        setMovies(moviesTest.filter((movie: null) => movie !== null));
      } else {
        setIsEmptyMovies(true);
      }
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

  const movieDiv = useRef<HTMLDivElement>(null);
  const trendingDiv = useRef<HTMLDivElement>(null);
  const exploreDiv = useRef<HTMLDivElement>(null);

  const scrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

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
            <div className={styles.formHolder}>
              <span className={styles.logoText}>Cinema Collection</span>
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
                <button type="submit" style={{ maxWidth: "2.5rem" }}>
                  <img src="/search.svg" />
                </button>
              </form>
              {/* <div className={styles.navButtons}>
                <button
                  className={styles.btnText}
                  onClick={() => scrollTo(trendingDiv)}
                >
                  Trending
                </button>
                <button
                  className={styles.btnText}
                  onClick={() => scrollTo(exploreDiv)}
                >
                  Explore
                </button>
              </div> */}
            </div>

            <div className={styles.contentContainer}>
              <div className={styles.landingContainer}>
                <div style={{ paddingBottom: "4rem" }}>
                  <h1 style={{ fontSize: "clamp(64px, 10vw, 120px" }}>
                    Discover Fresh Films
                  </h1>
                  <p className={styles.subHeading}>
                    Find new films, curated by your favorite genres.
                  </p>
                </div>
                <div style={{ display: "flex", gap: "1rem" }}>
                  <button
                    className={styles.btnLanding}
                    onClick={() => scrollTo(movieDiv)}
                  >
                    Explore Films
                  </button>
                  <button
                    className={styles.btnLandingInverse}
                    onClick={() => scrollTo(trendingDiv)}
                  >
                    Today's Trending
                  </button>
                </div>
              </div>
              <Image
                className={styles.imgSplash}
                src={"/movies.png"}
                width={1920}
                height={1080}
                alt=""
              />
            </div>

            <div ref={movieDiv} className={styles.movieContainer}>
              <>
                <Image
                  className={styles.imgMovie}
                  src={"/nightcrawler.jpg"}
                  width={1920}
                  height={600}
                  alt=""
                />
                <div className={styles.movieTitleContainer}>
                  <div className={styles.content}>
                    <div className={styles.description}>
                      <h1>Nightcrawler</h1>
                      <div className={styles.movieDetailsContainer}>
                        <div className={styles.movieDetails}>
                          <span style={{ fontSize: "18px", color: "#ffffff" }}>
                            <img src="/star-solid.svg" />
                            &nbsp;7.8
                          </span>
                          <span>&nbsp;/&nbsp;10</span>
                        </div>
                        <span
                          style={{
                            color: "#ffffff",
                            paddingRight: "2rem",
                          }}
                        >
                          2014&ensp;&middot;&ensp; R &ensp;&middot;&ensp;117 min
                        </span>
                      </div>
                      <div className={styles.movieGenresContainer}>
                        <span className={styles.movieGenre}>Crime</span>
                        <span className={styles.movieGenre}>Drama</span>
                        <span className={styles.movieGenre}>Thriller</span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            </div>

            <div className={styles.movieExtraHolder}>
              <div className={styles.movieExtraContainer}>
                <div className={styles.content}>
                  <div className={styles.movieExtraDetails}>
                    <h2>Storyline & Details</h2>
                    <hr />
                    <p>
                      When Louis Bloom, a con man desperate for work, muscles
                      into the world of L.A. crime journalism, he blurs the line
                      between observer and participant to become the star of his
                      own story.
                    </p>
                    <hr />
                    <div>
                      <span style={{ lineHeight: "1.4" }}>Director:</span>
                      <p>&emsp;Dan Gilroy</p>
                    </div>
                    <div>
                      <span style={{ lineHeight: "1.4" }}>Writers:</span>
                      <p>&emsp;Dan Gilroy</p>
                    </div>
                    <div>
                      <span style={{ lineHeight: "1.4" }}>Actors:</span>
                      <p>&emsp;Jake Gyllenhaal, Rene Russo, Bill Paxton</p>
                    </div>
                    <div>
                      <span style={{ lineHeight: "1.4" }}>Awards:</span>
                      <p>&emsp;44 wins & 126 nominations total</p>
                    </div>
                    <hr />
                    <hr />
                    <a
                      className={styles.linkIMDB}
                      target="_blank"
                      href={`https://www.imdb.com/title/tt2872718/`}
                      rel="noopener noreferrer"
                    >
                      View on IMDb&ensp;
                      <img src="/forward.svg" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div ref={trendingDiv} className={styles.trendingContainer}>
              <div>
                <h1 style={{ lineHeight: "1.4" }}>Today&apos;s Trending</h1>
                <p className={styles.subHeading}>
                  Today&apos;s top <b>trending</b> films and movies.
                </p>
              </div>
            </div>

            <TrendingMovieGrid
              movieData={moviesTrending}
              changeDisplay={setCurrentDisplay}
              movieDetails={setMovieDetailsIndex}
            />

            {/* <div ref={exploreDiv} className={styles.exploreHolder}>
              <div className={styles.exploreContainer}>
                <Image
                  className={styles.imgSplash}
                  src={"/movies.png"}
                  width={1920}
                  height={920}
                  alt=""
                />
                <div style={{ zIndex: "1", paddingTop: "18rem" }}>
                  <h1 style={{ lineHeight: "1.4" }}>Start Exploring</h1>
                  <p className={styles.subHeading}>
                    Select <b>3</b> film categories to start exploring.
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.btnGenreHolder}>
              <div className={styles.btnGenreContainer}>
                <button className={styles.btnGenre}>Action</button>
                <button className={styles.btnGenre}>Adventure</button>
                <button className={styles.btnGenre}>Comedy</button>
                <button className={styles.btnGenre}>Crime</button>
                <button className={styles.btnGenre}>Documentary</button>
                <button className={styles.btnGenre}>Drama</button>
                <button className={styles.btnGenre}>Family</button>
                <button className={styles.btnGenre}>Fantasy</button>
                <button className={styles.btnGenre}>History</button>
                <button className={styles.btnGenre}>Horror</button>
                <button className={styles.btnGenre}>Music</button>
                <button className={styles.btnGenre}>Mystery</button>
                <button className={styles.btnGenre}>Romance</button>
                <button className={styles.btnGenre}>Science Fiction</button>
                <button className={styles.btnGenre}>Thriller</button>
                <button className={styles.btnGenre}>War</button>
                <button className={styles.btnGenre}>Western</button>
              </div>
            </div> */}
          </>
        )}

        {currentDisplay === "movieGrid" && (
          <>
            <div className="form-holder">
              <span
                className={styles.logoText}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  window.location.reload();
                }}
              >
                Cinema Collection
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
                      console.log(page);
                    } else {
                      setPage((page) => page + 1);
                      console.log(page);
                    }
                  }}
                >
                  <img src="/search.svg" />
                </button>
              </form>
            </div>

            {isLoading && !isEmptyMovies && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "75vh",
                }}
              >
                <div className="text-holder">
                  <span
                    style={{
                      fontSize: "20px",
                      textAlign: "center",
                      color: "white",
                    }}
                  >
                    Finding Films
                  </span>
                  <Grid
                    visible={true}
                    height="25"
                    width="25"
                    color="#b4b4b4"
                    ariaLabel="grid-loading"
                    radius="12.5"
                    wrapperStyle={{ marginTop: ".8rem" }}
                    wrapperClass="grid-wrapper"
                  />
                </div>
              </div>
            )}

            {isLoading && isEmptyMovies && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "75vh",
                }}
              >
                <div className="text-holder">
                  <span
                    style={{
                      fontSize: "20px",
                      color: "white",
                    }}
                  >
                    You&apos;ve Viewed All Films
                  </span>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: ".2rem",
                    }}
                  >
                    <span style={{ fontSize: "16px", textAlign: "center" }}>
                      Find more by adjusting or changing genres.
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: "24px",
                      fontWeight: "800",
                      color: "white",
                      marginTop: "2rem",
                      cursor: "pointer",
                      textAlign: "center",
                    }}
                    onClick={() => {
                      window.location.reload();
                    }}
                  >
                    Cinema Collection
                  </span>
                </div>
              </div>
            )}

            {!isLoading && (
              <>
                <div className="text-holder">
                  <div>
                    <span
                      style={{
                        fontSize: "20px",
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
            <div className="form-holder" style={{ position: "fixed" }}>
              <span
                className={styles.logoText}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setCurrentDisplay("movieGrid");
                }}
              >
                Cinema Collection
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
                      console.log(page);
                    } else {
                      setPage((page) => page + 1);
                      console.log(page);
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
    </>
  );
}
