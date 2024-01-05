import { Dispatch, SetStateAction } from "react";

export default function MovieGrid({
  movieData,
  changeDisplay,
  movieDetails,
}: {
  movieData: Array<{
    movieID: string;
    movieTitle: string;
    movieRating: string;
    moviePoster: string;
  } | null>;
  changeDisplay: Dispatch<SetStateAction<"movie" | "movieGrid" | null>>;
  movieDetails: Dispatch<SetStateAction<number | null>>;
}) {
  return (
    <>
      <div className="content-container" style={{ width: "90%" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: ".8rem",
            justifyContent: "center",
          }}
        >
          {movieData.map((movie, index) => (
            <>
              {movie !== null && (
                <div
                  key={index}
                  style={{
                    border: "1px solid rgba(255, 255, 255, 0.25)",
                    display: "flex",
                    flexDirection: "column",
                    width: "200px",
                    background: "rgba(255, 255, 255, 0.125)",
                    boxShadow: "0em .2em .8em rgba(0, 0, 0, 0.25)",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    movieDetails(index);
                    changeDisplay("movie");
                  }}
                >
                  <img
                    src={movie.moviePoster}
                    alt="Movie Poster"
                    style={{
                      maxWidth: "200px",
                      height: "325px",
                      objectFit: "cover",
                    }}
                  />
                  <div
                    style={{
                      padding: ".4rem",
                      paddingTop: ".8rem",
                      marginBottom: ".8rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "left",
                      }}
                    >
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          fontSize: "16px",
                          color: "#ffffff",
                          marginBottom: ".4rem",
                        }}
                      >
                        <img src="/star-solid.svg" />
                        &nbsp;{movie.movieRating}
                      </span>
                    </div>
                    <p style={{ display: "block" }}>
                      {movie.movieTitle.length >= 18
                        ? movie.movieTitle.substring(0, 18) + "..."
                        : movie.movieTitle}
                    </p>
                  </div>
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    </>
  );
}
