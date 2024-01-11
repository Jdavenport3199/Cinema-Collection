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
      <div className="content-container" style={{ margin: 0 }}>
        <div
          className="content"
          style={{
            marginBottom: 0,
            marginTop: "1rem",
          }}
        >
          <button
            className="btn-text"
            onClick={() => {
              changeDisplay("movieGrid");
            }}
            style={{
              paddingLeft: ".9rem",
              paddingRight: ".9rem",
              background: "none",
              padding: 0,
              fontSize: "16px",
              transition: "150ms linear",
            }}
          >
            <img src="/back.svg" />
            &ensp;Back to Films
          </button>
        </div>
      </div>

      <div
        className="content-container"
        style={{ margin: "0rem", marginTop: "1rem", marginBottom: "1rem" }}
      >
        {singleMovie && (
          <div className="content">
            <img src={singleMovie.moviePoster} className="poster" />
            <div className="description">
              <h1>
                {singleMovie?.movieTitle?.length >= 40
                  ? singleMovie.movieTitle.substring(0, 46) + "..."
                  : singleMovie.movieTitle}
              </h1>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  flexWrap: "wrap-reverse",
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
                      lineHeight: "1.6",
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
                {singleMovie.movieGenre.map(
                  (genre, index) =>
                    genre && (
                      <span
                        key={index}
                        style={{
                          color: "#ffffff",
                          background: "rgba(255, 255, 255, 0.125)",
                          border: "1px solid rgba(255, 255, 255, 0.25)",
                          borderRadius: "2px",
                          width: "fit-content",
                          padding: ".4rem",
                          paddingLeft: ".8rem",
                          paddingRight: ".8rem",
                          marginRight: ".4rem",
                          fontWeight: "400",
                          fontSize: "14px",
                        }}
                      >
                        {genre}
                      </span>
                    )
                )}
              </div>
              <hr />
              <span>Director</span>
              <p>&emsp;{singleMovie.movieDirector}</p>
              <hr />
              <span>Writers</span>
              <p>&emsp;{singleMovie.movieWriter}</p>
              <hr />
              <span>Actors</span>
              <p>&emsp;{singleMovie.movieActors}</p>
              <hr />
              <span>Awards</span>
              <p>&emsp;{singleMovie.movieAwards}</p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "right",
                  marginTop: ".8rem",
                }}
              >
                <a
                  style={{ fontSize: "16px", fontWeight: "600" }}
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
        )}
      </div>
    </>
  );
}
