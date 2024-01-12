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
      <div className="content-container" style={{ width: "auto" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: ".8rem",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {movieData.map((movie, index) => (
            <>
              {movie !== null && (
                <div style={{ perspective: "100px" }}>
                  <div
                    key={index}
                    className="moviegrid-poster"
                    onClick={() => {
                      movieDetails(index);
                      changeDisplay("movie");
                      window.scrollTo(0, 0);
                    }}
                  >
                    <img
                      src={movie.moviePoster}
                      alt="Movie Poster"
                      style={{
                        maxWidth: "215px",
                        height: "325px",
                        objectFit: "cover",
                        boxShadow: "0em .2em .8em rgba(0, 0, 0, 0.5)",
                      }}
                    />
                    {/* <div
                    style={{
                      padding: ".8rem",
                      paddingTop: ".8rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "right",
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
                      {movie?.movieTitle?.length >= 18
                        ? movie.movieTitle.substring(0, 18) + "..."
                        : movie.movieTitle}
                    </p>
                  </div> */}
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
