import { Dispatch, SetStateAction } from "react";

export default function TrendingMovieGrid({
  movieData,
  changeDisplay,
  movieDetails,
}: {
  movieData: Array<{
    moviePoster: string;
  } | null>;
  changeDisplay: Dispatch<SetStateAction<"movie" | "movieGrid" | null>>;
  movieDetails: Dispatch<SetStateAction<number | null>>;
}) {
  const maxMoviesToShow = 8;

  return (
    <>
      <div
        className="content-container"
        style={{ flexDirection: "column", width: "100%", marginTop: "8rem" }}
      >
        <div>
          <span style={{ fontSize: "16px", lineHeight: "2.4" }}>
            Trending Films
          </span>
        </div>
        <div
          className="content"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            margin: 0,
            justifyContent: "space-between",
          }}
        >
          {/* {movieData.map((movie, index) => ( */}
          {movieData.slice(0, maxMoviesToShow).map((movie, index) => (
            <>
              {movie !== null && (
                <div
                  style={{
                    perspective: "100px",
                  }}
                >
                  <div
                    className="test"
                    key={index}
                    style={{
                      // border: "1px solid rgba(255, 255, 255, 0.25)",
                      display: "flex",
                      flexDirection: "column",
                      width: "125px",
                      background: "rgba(255, 255, 255, 0.125)",
                      // boxShadow: "0em .2em .8em rgba(0, 0, 0, 0.25)",
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
                        maxWidth: "125px",
                        height: "190px",
                        objectFit: "cover",
                      }}
                    />
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
