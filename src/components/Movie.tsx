"use client";
import { Dispatch, SetStateAction } from "react";
import styles from "../app/movie/page.module.css";

export default function Movie({
  singleMovie,
  changeDisplay,
}: {
  singleMovie:
    | {
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
      }
    | undefined;
  changeDisplay: Dispatch<SetStateAction<"movie" | "movieGrid" | null>>;
}) {
  return (
    <>
      {singleMovie && (
        <>
          <div
            className="content-container"
            style={{
              margin: "0rem",
              width: "100%",
              justifyContent: "center",
              height: "600px",
              alignItems: "center",
              borderBottom: "1px solid rgba(255, 255, 255, 0.15)",
            }}
          >
            <>
              <img
                src={singleMovie.moviePoster}
                style={{
                  width: "70%",
                  height: "600px",
                  objectFit: "cover",
                  position: "absolute",
                  objectPosition: "top center",
                  right: "0px",
                  WebkitMaskImage:
                    "linear-gradient(to right, transparent, black 80%)",
                  maskImage:
                    "linear-gradient(to right, transparent, black 80%)",
                }}
              />
              <div
                className="content-container"
                style={{
                  margin: "0rem",
                  padding: "2rem",
                  justifyContent: "left",
                }}
              >
                <div className="content">
                  <div
                    className="description"
                    style={{ zIndex: "2", paddingTop: "14rem" }}
                  >
                    <h1>
                      {singleMovie?.movieTitle?.length >= 40
                        ? singleMovie.movieTitle.substring(0, 46) + "..."
                        : singleMovie.movieTitle}
                    </h1>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                        flexWrap: "wrap-reverse",
                        gap: "2rem",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <span style={{ fontSize: "18px", color: "#ffffff" }}>
                          <img src="/star-solid.svg" />
                          &nbsp;{singleMovie.movieRating}
                        </span>
                        <span>&nbsp;/&nbsp;10</span>
                      </div>
                      <span
                        style={{
                          color: "#ffffff",
                          paddingRight: "2rem",
                        }}
                      >
                        {singleMovie.movieYear}&ensp;&middot;&ensp;
                        {singleMovie.movieRated}
                        &ensp;&middot;&ensp;{singleMovie.movieRuntime}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        marginTop: "1rem",
                        marginBottom: "1.4rem",
                        flexWrap: "wrap",
                        gap: ".4rem",
                      }}
                    >
                      {singleMovie.movieGenre.map(
                        (genre, index) =>
                          genre && (
                            <span
                              key={index}
                              style={{
                                color: "#ffffff",
                                background: "rgba(255, 255, 255, 0.175)",
                                borderRadius: "100px",
                                width: "fit-content",
                                padding: ".4rem",
                                paddingLeft: "1rem",
                                paddingRight: "1rem",
                                fontWeight: "400",
                                fontSize: "14px",
                                backdropFilter: "blur(20px)",
                              }}
                            >
                              {genre}
                            </span>
                          )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          </div>

          <div
            style={{
              width: "100%",
              borderBottom: "1px solid rgba(255, 255, 255, 0.15)",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              className="content-container"
              style={{
                margin: "0rem",
                padding: "2rem",
                borderLeft: "1px solid rgba(255, 255, 255, 0.15)",
                borderRight: "1px solid rgba(255, 255, 255, 0.15)",
              }}
            >
              <div className="content">
                <div
                  className="description"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <h2>Storyline & Details</h2>
                  <hr />
                  <p>{singleMovie.moviePlot}</p>
                  <hr />
                  <div>
                    <span style={{ lineHeight: "1.4" }}>Director:</span>
                    <p>&emsp;{singleMovie.movieDirector}</p>
                  </div>
                  <div>
                    <span style={{ lineHeight: "1.4" }}>Writers:</span>
                    <p>&emsp;{singleMovie.movieWriter}</p>
                  </div>
                  <div>
                    <span style={{ lineHeight: "1.4" }}>Actors:</span>
                    <p>&emsp;{singleMovie.movieActors}</p>
                  </div>
                  <div>
                    <span style={{ lineHeight: "1.4" }}>Awards:</span>
                    <p>&emsp;{singleMovie.movieAwards}</p>
                  </div>
                  <hr />
                  <hr />
                  <a
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      width: "fit-content",
                    }}
                    target="_blank"
                    href={`https://www.imdb.com/title/${singleMovie.movieID}/`}
                    rel="noopener noreferrer"
                  >
                    View on IMDb&ensp;
                    <img src="/forward.svg" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
