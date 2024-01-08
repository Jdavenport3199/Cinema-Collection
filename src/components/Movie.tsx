"use client";
import { Dispatch, SetStateAction } from "react";

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
        // movieGenre: string[];
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
      <div className="content-container">
        {singleMovie && (
          <div className="content">
            <img src={singleMovie.moviePoster} className="poster" />
            <div className="description">
              <h1>{singleMovie.movieTitle}</h1>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    color: "#ffffff",
                    lineHeight: "1.6",
                    paddingRight: "2rem",
                  }}
                >
                  {singleMovie.movieYear}&ensp;&middot;&ensp;
                  {singleMovie.movieRated}
                  &ensp;&middot;&ensp;{singleMovie.movieRuntime}
                </span>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "18px",
                      color: "#ffffff",
                    }}
                  >
                    <img src="/star-solid.svg" />
                    &nbsp;{singleMovie.movieRating}
                  </span>
                  <span>
                    &nbsp;/&nbsp;10&ensp;&middot;&ensp;{singleMovie.movieVotes}{" "}
                    Reviews
                  </span>
                </div>
              </div>
              <hr />
              <p>{singleMovie.moviePlot}</p>
              <div
                style={{
                  display: "block",
                  marginTop: "1rem",
                  marginBottom: "1.4rem",
                }}
              >
                {/* {singleMovie.movieGenre.map(
                  (genre, index) =>
                    genre && (
                      <span
                        key={index}
                        style={{
                          color: "#ffffff",
                          background: "rgba(255, 255, 255, 0.125)",
                          borderRadius: "100px",
                          border: "1px solid rgba(255, 255, 255, 0.25)",
                          width: "fit-content",
                          padding: ".4rem",
                          paddingLeft: ".8rem",
                          paddingRight: ".8rem",
                          marginRight: ".4rem",
                          opacity: "1",
                        }}
                      >
                        {genre}
                      </span>
                    )
                )} */}
              </div>
              <hr />
              <span style={{ fontWeight: 600 }}>DIRECTOR</span>
              <p>&emsp;{singleMovie.movieDirector}</p>
              <hr />
              <span style={{ fontWeight: 600 }}>WRITERS</span>
              <p>&emsp;{singleMovie.movieWriter}</p>
              <hr />
              <span style={{ fontWeight: 600 }}>ACTORS</span>
              <p>&emsp;{singleMovie.movieActors}</p>
              <hr />
              <span style={{ fontWeight: 600 }}>AWARDS</span>
              <p>&emsp;{singleMovie.movieAwards}</p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "right",
                  marginTop: ".4rem",
                }}
              >
                <button>
                  <a
                    target="_blank"
                    href={`https://www.imdb.com/title/${singleMovie.movieID}/`}
                    rel="noopener noreferrer"
                  >
                    View on IMDb
                  </a>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
